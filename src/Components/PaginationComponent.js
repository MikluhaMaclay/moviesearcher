import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = (props) => {
  const { currentPage, totalPages } = props;
  return (
    <div className="mx-auto">
      <Pagination
        style={{ justifyContent: 'center' }}
        className="mx-auto"
        aria-label="Page navigation"
      >
        <PaginationItem
          onClick={() => {
            props.firstPageHandler();
          }}
        >
          <PaginationLink first />
        </PaginationItem>

        <PaginationItem
          disabled={currentPage === 1}
          onClick={() => {
            props.prevPageHandler();
          }}
        >
          <PaginationLink previous />
        </PaginationItem>

        <PaginationItem disabled>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem
          disabled={currentPage === totalPages}
          onClick={() => {
            props.nextPageHandler();
          }}
        >
          <PaginationLink next />
        </PaginationItem>

        <PaginationItem
          onClick={() => {
            props.lastPageHandler();
          }}
        >
          <PaginationLink last />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
