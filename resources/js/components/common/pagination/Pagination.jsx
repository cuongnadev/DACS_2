import { Button, DropdownIcon } from "..";

const Pagination = ({ currentPage, totalPage, onPageChange, className }) => {
    const maxPageToShow = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageToShow / 2));
    let endPage = Math.min(totalPage, startPage + maxPageToShow - 1);

    if(endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(1, endPage - maxPageToShow + 1);
    }

    const pageNumbers = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);

    return (
        <div className={["pagination-container flex items-center justify-between " + className]}>
            {/* title */}
            <p className="pagination-title">Showing <span>{startPage} - {endPage}</span> from <span>{totalPage}</span> page data</p>

            {/* actions */}
            <div className="pagination-actions flex items-center gap-2">
                {/* pre-page */}
                <Button 
                    className={"pagination-pre-page"} 
                    rounded 
                    leftIcon={<DropdownIcon className={"pagination-icon"} width="20px" height="20px" />}
                    onClick={() => onPageChange(currentPage - 1)}
                    disable={currentPage === 1}
                />

                {/* pages */}
                <div className="pagination-pages flex items-center gap-4">
                    {pageNumbers.map((page) => (
                        <Button 
                            className={"pagination-page"} 
                            key={page} 
                            filled={page === currentPage}
                            outline={page !== currentPage}
                            rounded
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                {/* next-page */}
                <Button 
                    className={"pagination-next-page"} 
                    rounded 
                    leftIcon={<DropdownIcon className={"pagination-icon"} width="20px" height="20px" />}
                    onClick={() => onPageChange(currentPage + 1)}
                    disable={currentPage === totalPage}
                />
            </div>
        </div>
    );
}

export default Pagination;