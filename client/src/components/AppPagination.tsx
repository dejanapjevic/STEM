import { Box, Pagination, Typography } from "@mui/material";
import { Pagination as PaginationType } from "../models/pagination";

type Props= {
    metadata:PaginationType
    onPageChange: (page:number) => void
}

export default function AppPagination({metadata, onPageChange} : Props) {
    const {pageSize, totalPages, totalCount, currentPage} = metadata;
    const startItem = (currentPage-1)*pageSize+1;
    const endItem=Math.min(currentPage*pageSize, totalCount);
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={1.5}>
        <Typography sx={{color:'#9C27B0', fontWeight:'bold', borderBottom:'2px solid #9C27B0', fontSize:'1.2rem'}}>
         {/*    Prikazano {startItem}-{endItem} od {totalCount} članaka */}
         Pratite najaktuelnije novosti iz STEM oblasti
        </Typography>
        <Pagination
          color="secondary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={
            (_, page) => onPageChange(page)}
          />
    </Box>
  )
}
