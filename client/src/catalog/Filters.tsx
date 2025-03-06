import { Box, Button, Paper } from "@mui/material";

import MySearch from "./Search";
import RadioButtonGroup from "../components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetParams, setCategories, setOrderBy } from "./catalogSlice";
import CheckboxButtons from "../components/CheckboxButtons";

const sortOptions = [
  { value: "title", label: "A-Z" },
  { value: "titleDesc", label: "Z-A" },
];

type Props = {
  categories: string[];
};

export default function Filters({ categories: data }: Props) {
  const { orderBy, categories } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3} >
      <Paper>
        {/* <MySearch type="articles"/> */}
      </Paper>
      <Paper sx={{ padding: 3 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          categories={data}
          checked={categories}
          onChange={(items: string[]) => dispatch(setCategories(items))}
        />
      </Paper>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={() => dispatch(resetParams())}
      >
        Resetuj filtere
      </Button>
    </Box>
  );
}