import Pagination from 'react-bootstrap/Pagination';
import React from 'react';

const CarPagination = ({ totalPages, currentPage, handlePageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
  
    const getPageNumbers = () => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      }
  
      if (currentPage <= 3) {
        return [1, 2, 3, 4, '...', totalPages];
      }
  
      if (currentPage >= totalPages - 2) {
        return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }
  
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const pageNumbers = getPageNumbers();
  
    return (
        <Pagination className='justify-content-center'>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={isFirstPage} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={isFirstPage} />
    
          {pageNumbers.map((pageNumber, index) => {
            const isCurrentPage = pageNumber === currentPage;
            const isEllipsis = pageNumber === '...';
    
            return (
              <React.Fragment key={index}>
                {isEllipsis ? (
                  <Pagination.Ellipsis disabled />
                ) : (
                  <Pagination.Item
                    onClick={() => handlePageChange(pageNumber)}
                    active={isCurrentPage}
                    disabled={isEllipsis}
                  >
                    {pageNumber}
                  </Pagination.Item>
                )}
              </React.Fragment>
            );
          })}
    
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={isLastPage} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={isLastPage} />
        </Pagination>
      );
  };

export default CarPagination;