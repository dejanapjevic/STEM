import { RootState } from "../store/store"; // Import `RootState`
import { debounce, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { setSearchTerm as setArticleSearchTerm } from "./catalogSlice";
import { setUserSearchTerm } from "../account/userSlice";
import { Search } from "@mui/icons-material";
import { setForumSearchTerm } from "../forum/forumSlice";

interface SearchProps {
  type: "articles" | "users" | "forum" | "tutorials";
}

export default function MySearch({ type }: SearchProps) {
  const searchSelector = (state: RootState) => {
    switch (type) {
      case "articles":
        return state.catalog.searchTerm;
      case "users":
        return state.users.searchTerm;
      case "forum":
        return state.forum.searchTerm;
        case "tutorials":
          return state.tutorial.searchTerm;
      default:
        return "";
    }
  };

  const searchTerm = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = debounce((event) => {
    switch (type) {
      case "articles":
        dispatch(setArticleSearchTerm(event.target.value));
        break;
      case "users":
        dispatch(setUserSearchTerm(event.target.value));
        break;
      case "forum":
        dispatch(setForumSearchTerm(event.target.value));
        break;
    }
  }, 500);

  return (
    <TextField
      label={`Pretraži ${type === "articles" ? "članke" : type === "users" ? "korisnike" : "forum"}`}
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
  );
}
