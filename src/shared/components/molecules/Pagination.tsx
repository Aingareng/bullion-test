import {
  Pagination as Container,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { useState, useEffect } from "react";

interface IProps {
  className?: string;
  total: number;
  limit: number;
  onPageChange: (offset: number, limit: number) => void;
}

export default function Pagination({
  className,
  total,
  limit,
  onPageChange,
}: IProps) {
  const totalPages = Math.ceil(total / limit);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    onPageChange(offset, limit);
  }, [currentPage, limit, onPageChange]);

  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleChangePage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handleChangePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleChangePage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Container>
  );
}
