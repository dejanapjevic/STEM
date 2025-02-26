import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useFetchTutorialsQuery, useFetchVideosQuery } from "./tutorialApi";
import VideoUpload from "./videoUpload";

export default function TutorialInventory() {
  const { data: tutorials, isLoading } = useFetchTutorialsQuery();
  const { data: videos } = useFetchVideosQuery();
  const [selectedVideos, setSelectedVideos] = useState<{
    [key: number]: string;
  }>({});

  if (isLoading || !tutorials) return <div>Loading....</div>;

  const handleVideoChange = (tutorialId: number, videoPath: string) => {
    setSelectedVideos((prev) => ({ ...prev, [tutorialId]: videoPath }));
  };

  return (
    <>
      <VideoUpload />
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
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Tutorijal</TableCell>
            <TableCell align="center">Opis</TableCell>
            <TableCell align="center">Kategorija</TableCell>
            <TableCell align="center">Video zapisi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tutorials.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
              <TableCell align="center">{item.category}</TableCell>
              <TableCell align="center">
                <Select
                  value="" // Osigurava da ništa nije selektovano
                  displayEmpty
                  renderValue={() => "Lista video zapisa"} // Naslov izvan liste
                  sx={{ minWidth: 200, pointerEvents: "auto" }} // Omogućava otvaranje liste
                  onOpen={(e) => e.stopPropagation()} // Omogućava otvaranje liste kada korisnik klikne
                  onClose={(e) => e.stopPropagation()} // Sprečava automatsko zatvaranje liste
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
