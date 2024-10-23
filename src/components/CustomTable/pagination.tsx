/* eslint-disable import/no-unresolved */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function TablePagination({
  limit,
  changePage,
  currentPage,
  total,
}: {
  limit: number;
  changePage: (_page: number) => void;
  currentPage: number;
  total: number;
}) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <p className="mb-2 w-full text-center text-sm md:mb-0 md:w-[200px] ">
        Page {currentPage} of {totalPages}
      </p>
      <div className="w-full md:w-[400px]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      changePage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col items-center justify-between md:flex-row">
  //     <p className="mb-2 w-full text-center text-sm md:mb-0 md:w-[200px] ">
  //       Page 1 of 7
  //     </p>
  //     <div className="w-full md:w-[400px]">
  //       <Pagination>
  //         <PaginationContent>
  //           <PaginationItem>
  //             <PaginationPrevious href="#" />
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink href="#">1</PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink href="#" isActive>
  //               2
  //             </PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationLink href="#">3</PaginationLink>
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationEllipsis />
  //           </PaginationItem>
  //           <PaginationItem>
  //             <PaginationNext href="#" />
  //           </PaginationItem>
  //         </PaginationContent>
  //       </Pagination>
  //     </div>
  //   </div>
  // );
}

export default TablePagination;
