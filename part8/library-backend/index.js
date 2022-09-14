const {
  ApolloServer,
  gql,
  AuthenticationError,
  UserInputError,
} = require("apollo-server");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const JWT_SECRET = "SPAGHETII_BOLOLOLOGNESE";
const MONGO_URI =
  "mongodb+srv://erzar:qwertydvorak@cluster0.we8w9xa.mongodb.net/Library";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to mongodb :))))");
  })
  .catch((e) => {
    console.log("error connection to mongodb", e.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async (root) => {
      if (!root || !root.name) return await Book.collection.countDocuments();
      const books = await Book.find({}).populate("author");
      return books.filter((b) => b.author === root.name);
    },
    allBooks: async (root, args) => {
      const { author, genre } = args;
      let res = await Book.find({}).populate("author");
      if (author) {
        res = res.filter((b) => b.author.name === author);
      }
      if (genre) {
        res = res.filter((b) => b.genres.includes(genre));
      }
      return res;
    },

    allAuthors: async () => await Author.find({}),
    me: async (root, args, ctx) => {
      return ctx.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      console.log(currentUser);
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { author } = args;
      let newAuthor;
      if (!(await Author.findOne({ name: author }))) {
        newAuthor = new Author({ name: author, born: null });
        try {
          await newAuthor.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
      } else {
        newAuthor = await Author.findOne({ name: author });
      }
      const book = new Book({ ...args, author: newAuthor.id });
      try {
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return await book.populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { name, setBornTo } = args;
      let author = await Author.findOne({ name });
      if (!author) return author;
      if (setBornTo) {
        author.born = setBornTo;
      }
      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return author;
    },
    createUser: async (root, args) => {
      const { username, favouriteGenre } = args;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return null;
      }
      const newUser = await User.create(args);
      try {
        await newUser.save();
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return newUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("Wrong credentials Mr User!");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      console.log(currentUser);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
