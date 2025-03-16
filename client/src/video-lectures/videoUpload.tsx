import { useState } from "react";
import { Button, TextField, Typography, Stack, Box } from "@mui/material";
import { toast } from "react-toastify";

const VideoUpload = ({
  tutorialId,
  refetchVideos,
}: {
  tutorialId: number;
  refetchVideos: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !videoTitle) {
      alert("Molimo vas da popunite sve podatke.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", videoTitle);
    formData.append("tutorialId", tutorialId.toString());

    try {
      const response = await fetch(
        "http://localhost:5211/api/Tutorials/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const baseUrl = "http://localhost:5211";
        setUploadedVideo(`${baseUrl}${data.path}`);

        // Refetch liste videa nakon uploada
        refetchVideos();
        toast.success("Uspješno ste uploadovali video");
      } else {
        alert("Greška pri uploadu videa.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 1 }}>
      <Stack spacing={1} sx={{ maxWidth: 250 }}>
        <TextField
          label="Naslov"
          variant="outlined"
          size="small"
          fullWidth
          value={videoTitle}
          onChange={handleTitleChange}
          InputProps={{
            style: { fontWeight: "bold" }, // Podebljava tekst unutar input polja
          }}
          InputLabelProps={{
            style: { fontWeight: "bold" }, // Podebljava labelu iznad inputa
          }}
        />

        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{ backgroundColor: "black" }}
        >
          Izaberite video
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ backgroundColor: "black" }}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Stack>

      {/* Video i naslov pored upload dugmadi */}
      {uploadedVideo && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <video width="100" height="60" controls>
            <source src={uploadedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Stack>
      )}
    </Box>
  );
};

export default VideoUpload;
