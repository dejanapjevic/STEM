import { RootState } from "../store/store"; // Import `RootState`
import { debounce, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { setSearchTerm as setArticleSearchTerm } from "./catalogSlice";
import { setUserSearchTerm } from "../account/userSlice";
import { Search } from "@mui/icons-material";

interface SearchProps {
  type: "articles" | "users";
}

export default function MySearch({ type }: SearchProps) {
  const searchSelector = (state: RootState) =>
    type === "articles" ? state.catalog.searchTerm : state.users.searchTerm;

  const searchTerm = useAppSelector(searchSelector);
  console.log("SearchTerm from state:", searchTerm);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = debounce((event) => {
    if (type === "articles") {
      dispatch(setArticleSearchTerm(event.target.value));
    } else {
      dispatch(setUserSearchTerm(event.target.value));
    }
  }, 500);

  return (
    <>
     <TextField
  label={`Pretraži ${type === "articles" ? "članke" : "korisnike"}`}
  variant="outlined"
  fullWidth
  type="search"
  sx={{ color: "black", maxWidth: "300px" }}
  value={term}
  onChange={(e) => {
    setTerm(e.target.value);
    debouncedSearch(e);
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    ),
  }}
/>
    </>
  );
}
