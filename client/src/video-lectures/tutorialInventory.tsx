import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useFetchTutorialsQuery, useFetchVideosQuery } from "./tutorialApi";
import VideoUpload from "./videoUpload";
import { Delete } from "@mui/icons-material";

export default function TutorialInventory() {
  const { data: tutorials, isLoading } = useFetchTutorialsQuery();
  const { data: videos, refetch } = useFetchVideosQuery();

  if (isLoading || !tutorials) return <div>Loading....</div>;

  return (
    <Table
      sx={{
        minWidth: 650,
        mb: "1%",
        maxWidth: "90%",
        padding: "0 16px",
        margin: "0 auto",
        marginTop: "4%",
      }}
      aria-label="simple table"
    >
      <TableHead>
        <TableRow>
          <TableCell align="center">Tutorijal</TableCell>
          <TableCell align="center">Opis</TableCell>
          <TableCell align="center">Kategorija</TableCell>
          <TableCell align="center">Video zapisi</TableCell>
          <TableCell align="center">Dodaj video</TableCell>
          <TableCell align="center">Dodaj video</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tutorials.map((item) => (
          <TableRow key={item.id}>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.description}</TableCell>
            <TableCell align="center">{item.category}</TableCell>
            <TableCell align="center">
              <Select
                value=""
                displayEmpty
                renderValue={() => "Lista video zapisa"}
                sx={{ minWidth: 200, pointerEvents: "auto" }}
                onOpen={(e) => e.stopPropagation()}
                onClose={(e) => e.stopPropagation()}
              >
                {videos
                  ?.filter((v) => v.tutorialId === item.id)
                  .map((video) => (
                    <MenuItem key={video.id} value={video.path} disableRipple>
                      {video.title}
                    </MenuItem>
                  ))}
              </Select>
            </TableCell>
            <TableCell align="center">
              <VideoUpload tutorialId={item.id} refetchVideos={refetch} />{" "}
              {/* Prosljeđujemo ID tutorijala */}
            </TableCell>
            <TableCell align="center">
              <Button startIcon={<Delete />} color="error" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
