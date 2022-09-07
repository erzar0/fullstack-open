import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTHDAY } from "../queries";
import Select from "react-select";

const Authors = ({ show, authors }) => {
  const [authorName, setAuthorName] = useState(null);
  const [birthday, setBirthday] = useState("");

  const [updateAuthorBday] = useMutation(UPDATE_AUTHOR_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  const authorOptions =
    authors &&
    authors.map((a) => {
      return { value: a.name, label: a.name };
    });

  const handleUpdate = () => {
    updateAuthorBday({
      variables: { name: authorName.value, setBornTo: parseInt(birthday) },
    });
    // setAuthorName("");
    setBirthday("");
  };

  console.log(authorName);

  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors &&
            authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Set birthday</h2>
      <Select
        defaultValue={authorName}
        onChange={setAuthorName}
        options={authorOptions}
      />
      {/* author
      <div>
        <input
          type="text"
          value={authorName}
          onChange={({ target }) => setAuthorName(target.value)}
        ></input>
      </div> */}
      birthday
      <div>
        <input
          type="number"
          value={birthday}
          onChange={({ target }) => setBirthday(target.value)}
        ></input>
      </div>
      <button onClick={handleUpdate}>update author</button>
    </div>
  );
};

export default Authors;
