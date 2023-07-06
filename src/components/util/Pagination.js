
const Pagination = ({ total, limit, page, setPage })=> {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <>
        <buton onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </buton>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <buton
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </buton>
          ))}
        <buton onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </buton>
      </>
    </>
  );
}

export default Pagination;
