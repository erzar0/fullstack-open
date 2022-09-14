const Books = ({ books, show, favGenre }) => {
  if (!show) {
    return null;
  }
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
                // .filter((b) => (favGenre ? b.genres.includes(favGenre) : false))
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
    </div>
  );
};

export default Books;
