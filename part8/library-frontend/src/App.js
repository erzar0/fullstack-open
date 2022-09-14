import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, GET_CURR_USER_INFO } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient;

  const authors = useQuery(ALL_AUTHORS);
  const userInfo = useQuery(GET_CURR_USER_INFO);
  const books = useQuery(ALL_BOOKS);

  useEffect(() => {
    let t = localStorage.getItem("loginToken") || null;
    setToken(t);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button
              onClick={async () => {
                setPage("recommended");
                // await books.refetch({
                //   variables: {
                //     genre: userInfo.data.favouriteGenre,
                //   },
                // });
              }}
            >
              recomended
            </button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={authors.data && authors.data.allAuthors}
      />

      <Books
        show={page === "books"}
        books={books.data && books.data.allBooks}
      />

      <NewBook show={page === "add"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommended
        show={page === "recommended"}
        favGenre={userInfo.data && userInfo.data.me.favouriteGenre}
        books={books.data && books.data.allBooks}
      />
    </div>
  );
};

export default App;
