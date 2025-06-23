import React from 'react';
import PropTypes from 'prop-types';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { motion } from 'framer-motion';

const Table = ({
  columns,
  data,
  totalElements,
  pageSize = 10, // Default pageSize to 10
  currentPage,
  onPageChange,
  renderRow, // New prop for custom row rendering
  keyField, // New prop for custom key field
  isLoading, // New prop to indicate loading state
}) => {
  const totalPages = Math.ceil(totalElements / Number(pageSize)); // Ensure pageSize is a number

  const getPageNumbers = () => {
    const pages = [];
    const totalDisplayPages = 4; // Number of pages to display at the start and end
    const currentRange = 2; // Number of pages to display around the current page

    // Start pages
    for (let i = 1; i <= totalDisplayPages && i <= totalPages; i++) {
      pages.push(i);
    }

    // Current page range
    for (
      let i = Math.max(totalDisplayPages + 1, currentPage - currentRange);
      i <= Math.min(totalPages - totalDisplayPages, currentPage + currentRange);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // End pages
    for (
      let i = Math.max(
        totalPages - totalDisplayPages + 1,
        totalDisplayPages + 1,
      );
      i <= totalPages;
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Sort and add ellipses
    const finalPages = [];
    let prevPage = 0;
    pages.forEach((page) => {
      if (page - prevPage > 1) {
        finalPages.push('...');
      }
      finalPages.push(page);
      prevPage = page;
    });

    return finalPages;
  };

  const getValue = (obj, path) => {
    const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value;
  };

  const pageNumbers = getPageNumbers();

  const handlePreviousClick = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const renderSkeleton = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        {columns.map((column, colIndex) => (
          <td key={colIndex} className="py-2 px-3 border-b">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
        ))}
      </tr>
    ));
  };

  const renderSkeletonOrMessage = () => {
    if (data.length === 1 && data[0] === 'No Data Found') {
      return (
        <tr>
          <td
            colSpan={columns.length}
            className="py-2 px-3 border-b text-center">
            No Data Found
          </td>
        </tr>
      );
    }
    return renderSkeleton();
  };

  return (
    <div className="container mx-auto mb-5 mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200">
          <thead className="bg-gray-200 font-400 text-left min-w-full">
            <tr>
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className={`py-2 px-3 border-b text-base ${
                    column.header === 'ACTIONS' ? 'text-center' : ''
                  }`}>
                  <span>{column.header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            className={
              data?.length === 0 && !isLoading
                ? 'text-center min-w-full font-600 text-base'
                : ''
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {isLoading ||
            !data ||
            data.length === 0 ||
            (data.length === 1 && data[0] === 'No Data Found') ? (
              renderSkeletonOrMessage()
            ) : (
              <>
                {data?.map((item, index) => (
                  <React.Fragment
                    key={keyField ? item[keyField] : index} // Use keyField if provided
                  >
                    <motion.tr
                      className="hover:bg-slate-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}>
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={`py-2 px-3 border-b font-500 text-sm ${
                            column.header === 'ACTIONS' ? 'text-center' : ''
                          }`}
                          style={{ whiteSpace: 'nowrap' }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}>
                          {column.render
                            ? column.render(item)
                            : getValue(item, column.field)}
                        </td>
                      ))}
                    </motion.tr>
                    {renderRow && (
                      <motion.tr
                        className="bg-gray-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                        <td colSpan={columns.length}>{renderRow(item)}</td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </motion.tbody>
        </table>
      </div>
      {totalElements > 0 && (
        <div className="lg:flex lg:justify-between my-5 mx-10 sm:flex sm:justify-center items-center">
          <div className="text-sm font-600 text-gray-400 w-1/4">
            Showing {currentPage * Number(pageSize) + 1} to{' '}
            {Math.min((currentPage + 1) * Number(pageSize), totalElements)} of{' '}
            {totalElements} entries
          </div>
          <div className="flex flex-wrap items-center">
            {currentPage !== 0 && (
              <button
                onClick={handlePreviousClick}
                disabled={currentPage === 0}
                className="px-2 py-1 text-xs rounded hover:bg-gray-200 disabled:bg-gray-200 w-7 h-7">
                <GrPrevious />
              </button>
            )}
            {pageNumbers.map((pageNumber, index) =>
              pageNumber === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-xs rounded text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${pageNumber}`}
                  className={`px-2 py-1 text-xs rounded-full mx-1 w-9 h-9 font-700 text-nowrap m-1 ${
                    currentPage === pageNumber - 1
                      ? 'btn-primary'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => onPageChange(pageNumber - 1)}>
                  {pageNumber}
                </button>
              ),
            )}
            {currentPage !== totalPages - 1 && (
              <button
                onClick={handleNextClick}
                disabled={currentPage === totalPages - 1}
                className="px-2 py-1 text-xs rounded hover:bg-gray-200 disabled:bg-gray-200 w-7 h-7">
                <GrNext />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string,
      render: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalElements: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  renderRow: PropTypes.func, // Add prop type for custom row rendering
  keyField: PropTypes.string, // Add prop type for custom key field
  isLoading: PropTypes.bool, // Add prop type for loading state
};

export default Table;
