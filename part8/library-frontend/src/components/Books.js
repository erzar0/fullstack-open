import { useState } from "react";
const Books = ({ books, show }) => {
  const [genreFilter, setGenreFilter] = useState(null);
  const possibleGenres = books ? new Set(books.flatMap((b) => b.genres)) : null;
  if (!show) {
    return null;
  }
  // console.log(possibleGenres);
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            ? books
                .filter((b) =>
                  genreFilter ? b.genres.includes(genreFilter) : true
                )
                .map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
      {possibleGenres
        ? [...possibleGenres].map((g) => (
            <button onClick={() => setGenreFilter(g)} key={g}>
              {g}
            </button>
          ))
        : null}
    </div>
  );
};

export default Books;
