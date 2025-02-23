import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";
import { Style } from "@mui/icons-material";

export default function Search() {
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = debounce((event) => {
    dispatch(setSearchTerm(event.target.value));
  }, 500);

  return (
    <TextField
      label="Pretraži članke"
      variant="outlined"
      fullWidth
      type="search"
      sx={{ color: "black" }}
      value={term}
      onChange={(e) => {
        setTerm(e.target.value);
        debouncedSearch(e);
      }}
    />
  );
}
