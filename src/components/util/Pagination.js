import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  
  const pagesPerGroup = 5;
  const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div>
      {startPage > 1 && <button onClick={() => handlePageChange(startPage - 1)}>이전</button>}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        )
      )}
      {endPage < totalPages && <button onClick={() => handlePageChange(endPage + 1)}>다음</button>}
    </div>
  );
};

export default Pagination;