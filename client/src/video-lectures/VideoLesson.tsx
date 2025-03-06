import {
  IconButton,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useFetchTutorialsWithVideosQuery } from "./tutorialApi";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setPageNumber } from "./tutorialSlice";
import AppPagination from "../components/AppPagination";
import MySearch from "../catalog/Search";

export const VideoLesson = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const tutorialParams = useAppSelector((state) => state.tutorial);
  const [groupedVideos, setGroupedVideos] = useState<Record<number, any[]>>({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState<
    Record<number, number>
  >({});
  const { data, isLoading } = useFetchTutorialsWithVideosQuery(tutorialParams);

  useEffect(() => {
    if (!data?.tutorials || data.tutorials.length === 0) {
      setVideos([]);
      setGroupedVideos({});
      return;
    }

    const tutorialIds = data.tutorials.map((t: any) => t.id);

    fetch(
      `http://localhost:5211/api/Tutorials/get-videos-by-tutorials?ids=${tutorialIds.join(
        ","
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        return response.json();
      })
      .then((videoData) => {
        setVideos(videoData);
        groupVideosByTutorial(videoData);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setVideos([]);
        setGroupedVideos({});
      });
  }, [data]);
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
      const newIndex =
        (prevState[tutorialId] + 1) % groupedVideos[tutorialId].length;
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

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      {/* Pretraga i paginacija */}
      <div style={{ display: "flex", justifyContent: "right" }}>
        {data?.pagination && (
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => dispatch(setPageNumber(page))}
          />
        )}
      </div>

      {/* Grid Layout za prikaz tutorijala */}
      <Grid container spacing={3} padding="10px">
        {Object.keys(groupedVideos).map((tutorialId) => {
          const numericTutorialId = Number(tutorialId);
          const tutorial = data?.tutorials?.find(
            (t: any) => t.id === numericTutorialId
          );
          const videosForTutorial = groupedVideos[numericTutorialId] || [];
          const currentIndex = currentVideoIndex[numericTutorialId] || 0;
          const currentVideo = videosForTutorial[currentIndex];

          return (
            <Grid item xs={12} sm={6} md={4} key={numericTutorialId}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "590px",
                }}
              >
                {/* Tutorijal naslov i opis */}
                <CardContent sx={{ flexGrow: 1, height: "200px" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {tutorial?.name || "Unknown Tutorial"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: "140px", // Povećana visina opisa
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 5, // Ograničenje na 5 linija teksta
                    }}
                  >
                    {tutorial?.description || "No description available"}
                  </Typography>
                </CardContent>

                {/* Video sa povećanom visinom */}
                {videosForTutorial.length > 0 ? (
                  <CardMedia
                    component="video"
                    controls
                    src={`http://localhost:5211${currentVideo?.path}`}
                    sx={{ width: "100%", height: "300px", objectFit: "cover" }} // Povećana visina videa
                  />
                ) : (
                  <Box
                    sx={{
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>No videos available</Typography>
                  </Box>
                )}

                {/* Progress bar */}
                <Box padding="10px">
                  <LinearProgress
                    variant="determinate"
                    value={
                      ((currentIndex + 1) / videosForTutorial.length) * 100
                    }
                    sx={{ width: "100%" }}
                  />
                </Box>

                {/* Kontrole */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding="10px"
                >
                  <IconButton
                    onClick={() => handlePrev(numericTutorialId)}
                    disabled={videosForTutorial.length === 0}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Typography>
                    {currentVideo?.title || "Unknown Video"}
                  </Typography>
                  <IconButton
                    onClick={() => handleNext(numericTutorialId)}
                    disabled={videosForTutorial.length === 0}
                  >
                    <ArrowForward />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
