import React, { useState, useEffect } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const VideoLesson = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [groupedVideos, setGroupedVideos] = useState<any>({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState<any>({});

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

  const handleNext = (tutorialId: string) => {
    setCurrentVideoIndex((prevState: any) => {
      const newIndex = (prevState[tutorialId] + 1) % groupedVideos[tutorialId].length;
      return { ...prevState, [tutorialId]: newIndex };
    });
  };

  const handlePrev = (tutorialId: string) => {
    setCurrentVideoIndex((prevState: any) => {
      const newIndex = (prevState[tutorialId] - 1 + groupedVideos[tutorialId].length) % groupedVideos[tutorialId].length;
      return { ...prevState, [tutorialId]: newIndex };
    });
  };

  return (
    <div>
      {Object.keys(groupedVideos).map((tutorialId) => (
        <div key={tutorialId} className="tutorial-group" style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "20px" }}>
          {/* Div za naslov */}
          <Box width="30%" textAlign="center">
            <Typography variant="h5" fontWeight="bold">
              {groupedVideos[tutorialId][currentVideoIndex[tutorialId]].title}
            </Typography>
          </Box>

          {/* Div za video */}
          <Box display="flex" justifyContent="center" alignItems="center" width="70%" position="relative">
            <IconButton onClick={() => handlePrev(tutorialId)} style={{ position: "absolute", left: "10px" }}>
              <ArrowBack fontSize="large" />
            </IconButton>

            {groupedVideos[tutorialId].length > 0 && (
              <video
                controls
                src={`http://localhost:5211${groupedVideos[tutorialId][currentVideoIndex[tutorialId]].path}`}
                style={{
                  width: "600px", // Fiksirana širina
                  height: "300px", // Fiksirana visina
                  objectFit: "cover", // Osigurava da video popuni zadate dimenzije
                }}
              >
                Your browser does not support the video tag.
              </video>
            )}

            <IconButton onClick={() => handleNext(tutorialId)} style={{ position: "absolute", right: "10px" }}>
              <ArrowForward fontSize="large" />
            </IconButton>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default VideoLesson;
