import { RootState } from "../store/store"; // Import `RootState`
import { debounce, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { setSearchTerm as setArticleSearchTerm } from "./catalogSlice";
import { setUserSearchTerm } from "../account/userSlice";
import { Search } from "@mui/icons-material";
import { setForumSearchTerm } from "../forum/forumSlice";
import { setQuizSearchTerm } from "../quiz&test/quizSlice";
import { useLocation } from "react-router-dom";
import { setSearchType } from "../store/searchSlice";

interface SearchProps {
  type: "articles" | "users" | "forum" | "tutorials" | "quiz";
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
      case "quiz":
        return state.quiz.searchTerm;
      default:
        return "";
    }
  };
  const location = useLocation();
  const searchTerm = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    // Resetuj search term u store-u kada se ruta menja
    dispatch(setArticleSearchTerm(""));
    dispatch(setUserSearchTerm(""));
    dispatch(setForumSearchTerm(""));
    dispatch(setQuizSearchTerm(""));

    // Takođe resetuj lokalno stanje pretrage
    setTerm("");
  }, [location.pathname, dispatch]);

  useEffect(() => {
    // Na osnovu rute postavljamo odgovarajući tip pretrage
    if (location.pathname.includes("/userinventory")) {
      dispatch(setSearchType("users"));
    } else if (location.pathname.includes("/forum")) {
      dispatch(setSearchType("forum"));
    } else if (location.pathname.includes("/tutorials")|| location.pathname.includes("/tutorialinventory")) {
      dispatch(setSearchType("tutorials"));
    } else if (location.pathname.includes("/quizinventory")) {
      dispatch(setSearchType("quiz"));
    } else if (location.pathname.includes("/catalog") || location.pathname.includes("/cataloginventory")) {
      dispatch(setSearchType("articles"));
    }
    
  }, [location.pathname, dispatch]);
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
      case "quiz":
        dispatch(setQuizSearchTerm(event.target.value));
        break;
    }
  }, 500);

  return (
    <TextField
      label={`Pretraži ${
        type === "articles"
          ? "članke"
          : type === "users"
          ? "korisnike"
          : type === "forum"
          ? "forum"
          : type === "tutorials"
          ? "tutorijale"
          : "pitanja"
      }`}
      variant="outlined"
      fullWidth
      type="search"
      sx={{
        color: "black",
        maxWidth: "240px",
        borderRadius: "30px", // Zaobljeni ivici
        paddingRight: "10px", // Da bi ikona bila u centru
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px", // Zaobljeni ivici celog inputa
        },
        "& .MuiInputBase-root": {
          borderRadius: "25px", // Zaobljeni ivici inputa
        },
      }}
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
