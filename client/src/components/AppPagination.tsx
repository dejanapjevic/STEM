import { Box, Pagination } from "@mui/material";
import { Pagination as PaginationType } from "../models/pagination";
import { useState } from "react";

type Props = {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
  const { totalPages, currentPage } = metadata;

  const [pageNumber, setPageNumber] = useState(currentPage);
  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }
  return (
    <Box
      display="flex"
      justifyContent="right"
      alignItems="center"
      marginBottom={1.5}
    >
      <Pagination
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(_, page) => handlePageChange(page)}
      />
    </Box>
  );
}
