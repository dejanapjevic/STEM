import { IconButton, Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useFetchTutorialsQuery } from "./tutorialApi";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setPageNumber } from "./tutorialSlice";
import AppPagination from "../components/AppPagination";

const VideoLesson = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const tutorialParams = useAppSelector((state) => state.tutorial);
  const [groupedVideos, setGroupedVideos] = useState<Record<number, any[]>>({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState<Record<number, number>>({});
  const { data, isLoading } = useFetchTutorialsQuery(tutorialParams);

  useEffect(() => {
    if (!data?.tutorials) return;
  
    const tutorialIds = data.tutorials.map((t: any) => t.id);
    fetch(`http://localhost:5211/api/Video/get-videos-by-tutorials?ids=${tutorialIds.join(",")}`)
      .then((response) => response.json())
      .then((videoData) => {
        setVideos(videoData);
        groupVideosByTutorial(videoData);
      });
  }, [data]); // Osiguravamo da se useEffect pokrene kad se tutorijali promene
  

  const groupVideosByTutorial = (videos: any[]) => {
    const grouped: Record<number, any[]> = {};
    const initialIndexState: Record<number, number> = {};

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
    setCurrentVideoIndex((prevState) => {
      if (!groupedVideos[tutorialId]) return prevState;
      const newIndex = (prevState[tutorialId] + 1) % groupedVideos[tutorialId].length;
      return { ...prevState, [tutorialId]: newIndex };
    });
  };

  const handlePrev = (tutorialId: number) => {
    setCurrentVideoIndex((prevState) => {
      if (!groupedVideos[tutorialId]) return prevState;
      const newIndex =
        (prevState[tutorialId] - 1 + groupedVideos[tutorialId].length) %
        groupedVideos[tutorialId].length;
      return { ...prevState, [tutorialId]: newIndex };
    });
  };
  console.log("Tutorial IDs in groupedVideos:", Object.keys(groupedVideos));
  console.log("Tutorial IDs in data.tutorials:", data?.tutorials?.map((t: any) => t.id));
  
  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      <div>
        {data?.pagination ? (
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => dispatch(setPageNumber(page))}
          />
        ) : (
          <p>Paginacija</p>
        )}
      </div>
      <div>
        {Object.keys(groupedVideos).map((tutorialId) => {
          const numericTutorialId = Number(tutorialId);
          const tutorial = data?.tutorials?.find((t: any) => t.id === numericTutorialId);
          const videosForTutorial = groupedVideos[numericTutorialId] || [];
          const currentIndex = currentVideoIndex[numericTutorialId] || 0;
          const currentVideo = videosForTutorial[currentIndex];

          return (
            <div
              key={numericTutorialId}
              className="tutorial-group"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
              }}
            >
              {/* Tutorijal naslov sa leve strane */}
              <Box width="20%" textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  {tutorial?.name || "Unknown Tutorial"}
                </Typography>
                <Typography>
                  {tutorial?.description || "Unknown Tutorial"}
                </Typography>
              </Box>

              {/* Glavni deo sa videom */}
              <Box width="80%" display="flex" flexDirection="column" alignItems="center">
                {/* Naslov trenutnog videa iznad videa */}
                <Typography variant="h5" fontWeight="bold" marginBottom={2}>
                  {currentVideo?.title || "Unknown Video"}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  position="relative"
                >
                  <IconButton
                    onClick={() => handlePrev(numericTutorialId)}
                    style={{ position: "absolute", left: "10px" }}
                    disabled={videosForTutorial.length === 0}
                  >
                    <ArrowBack fontSize="large" />
                  </IconButton>

                  {videosForTutorial.length > 0 ? (
                    <video
                      controls
                      src={`http://localhost:5211${currentVideo?.path}`}
                      style={{
                        width: "600px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Typography>No videos available</Typography>
                  )}

                  <IconButton
                    onClick={() => handleNext(numericTutorialId)}
                    style={{ position: "absolute", right: "10px" }}
                    disabled={videosForTutorial.length === 0}
                  >
                    <ArrowForward fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VideoLesson;
