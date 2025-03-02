import { Box, Pagination, Typography } from "@mui/material";
import { Pagination as PaginationType } from "../models/pagination";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
  const { totalPages, currentPage } = metadata;
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(currentPage);
  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={1.5}
    >
      {location.pathname == "/catalog" && (
        <Typography
          sx={{
            color: "black",
            fontWeight: "bold",
            borderBottom: "2px solid black",
            fontSize: "1.2rem",
          }}
        >
          Pratite najaktuelnije novosti iz STEM oblasti
        </Typography>
      )}
      <Pagination
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(_, page) => handlePageChange(page)}
      />
    </Box>
  );
}
