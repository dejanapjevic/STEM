
import { IconButton, Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useFetchTutorialsQuery } from "./tutorialApi";
import { useEffect, useState } from "react";


const VideoLesson = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [groupedVideos, setGroupedVideos] = useState<any>({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState<any>({});
  const { data: tutorials, isLoading } = useFetchTutorialsQuery();

  useEffect(() => {
    fetch("http://localhost:5211/api/Video/get-all-videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        groupVideosByTutorial(data);
      });
  }, []);

  const groupVideosByTutorial = (videos: any[]) => {
    const grouped: any = {};
    const initialIndexState: any = {};

    videos.forEach((video) => {
      const tutorialId = video.tutorialId;
      if (!grouped[tutorialId]) {
        grouped[tutorialId] = [];
        initialIndexState[tutorialId] = 0;
      }
      grouped[tutorialId].push(video);
    });

    setGroupedVideos(grouped);
    setCurrentVideoIndex(initialIndexState);
  };

  const handleNext = (tutorialId: number) => {
    setCurrentVideoIndex((prevState: any) => {
      const newIndex = (prevState[tutorialId] + 1) % groupedVideos[tutorialId].length;
      return { ...prevState, [tutorialId]: newIndex };
    });
  };

  const handlePrev = (tutorialId: number) => {
    setCurrentVideoIndex((prevState: any) => {
      const newIndex = (prevState[tutorialId] - 1 + groupedVideos[tutorialId].length) % groupedVideos[tutorialId].length;
      return { ...prevState, [tutorialId]: newIndex };
    });
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <div>
      {Object.keys(groupedVideos).map((tutorialId) => {
        const numericTutorialId = Number(tutorialId);
        const tutorial = tutorials?.find((t: any) => t.id === numericTutorialId);
        return (
          <div key={numericTutorialId} className="tutorial-group" style={{ display: "flex", alignItems: "center", padding: "20px" }}>
            {/* Tutorijal naslov sa leve strane */}
            <Box width="20%" textAlign="center">
              <Typography variant="h6" fontWeight="bold">
                {tutorial?.name || "Unknown Tutorial"}
              </Typography>
            </Box>

            {/* Glavni deo sa videom */}
            <Box width="80%" display="flex" flexDirection="column" alignItems="center">
              {/* Naslov trenutnog videa iznad videa */}
              <Typography variant="h5" fontWeight="bold" marginBottom={2}>
                {groupedVideos[numericTutorialId][currentVideoIndex[numericTutorialId]].title}
              </Typography>
              
              <Box display="flex" justifyContent="center" alignItems="center" width="100%" position="relative">
                <IconButton onClick={() => handlePrev(numericTutorialId)} style={{ position: "absolute", left: "10px" }}>
                  <ArrowBack fontSize="large" />
                </IconButton>

                {groupedVideos[numericTutorialId].length > 0 && (
                  <video
                    controls
                    src={`http://localhost:5211${groupedVideos[numericTutorialId][currentVideoIndex[numericTutorialId]].path}`}
                    style={{
                      width: "600px", // Fiksirana širina
                      height: "300px", // Fiksirana visina
                      objectFit: "cover", // Osigurava da video popuni zadate dimenzije
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}

                <IconButton onClick={() => handleNext(numericTutorialId)} style={{ position: "absolute", right: "10px" }}>
                  <ArrowForward fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </div>
        );
      })}
    </div>
  );
};

export default VideoLesson;
