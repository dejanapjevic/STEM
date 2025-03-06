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
import {
  ArrowBack,
  ArrowForward,
  DoneOutline,
  Star,
} from "@mui/icons-material";
import {
  useFetchProgressForUserQuery,
  useFetchTutorialsWithVideosQuery,
  useUpdateProgressMutation,
} from "./tutorialApi";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setPageNumber } from "./tutorialSlice";
import AppPagination from "../components/AppPagination";
import { useUserInfoQuery } from "../account/accountApi";

// Define the types for progress and video objects
interface Video {
  id: number;
  tutorialId: number;
  title: string;
  path: string;
}

interface TutorialProgress {
  tutorialId: number;
  isStarred: boolean;
  videos: { videoId: number; isWatched: boolean }[];
}

export const VideoLesson = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const { data: user } = useUserInfoQuery();
  const dispatch = useAppDispatch();
  const tutorialParams = useAppSelector((state) => state.tutorial);
  const [groupedVideos, setGroupedVideos] = useState<Record<number, Video[]>>(
    {}
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState<
    Record<number, number>
  >({});
  const [watchedVideos, setWatchedVideos] = useState<Record<number, boolean>>(
    {}
  );
  const { data, isLoading } = useFetchTutorialsWithVideosQuery(tutorialParams);
  const { data: progress } = user?.id
    ? useFetchProgressForUserQuery(user.id)
    : { data: [] }; // Ensure progress is always an array
  const [updateProgress] = useUpdateProgressMutation();

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

  useEffect(() => {
    if (progress && Array.isArray(progress)) {
      const updatedWatchedVideos: Record<number, boolean> = {};
      progress.forEach((tutorialProgress: TutorialProgress) => {
        tutorialProgress.videos.forEach((video) => {
          updatedWatchedVideos[video.videoId] = video.isWatched;
        });
      });
      setWatchedVideos(updatedWatchedVideos);
    }
  }, [progress]);

  const groupVideosByTutorial = (videos: Video[]) => {
    const grouped: Record<number, Video[]> = {};
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

  const handleVideoEnd = (videoId: number) => {
    setWatchedVideos((prevState) => ({
      ...prevState,
      [videoId]: true,
    }));

    if (user?.id) {
      updateProgress({
        userId: user?.id,
        videoId: videoId,
        isWatched: true,
      })
        .then(() => {
          console.log(`Video ${videoId} je odgledan`);
        })
        .catch((error) => {
          console.error("Greška prilikom ažuriranja napretka:", error);
        });
    }
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

  const isTutorialCompleted = (tutorialId: number): boolean => {
    const videosForTutorial = groupedVideos[tutorialId] || [];
    return videosForTutorial.every(
      (video) => watchedVideos[video.id] === true
    );
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "right" }}>
        {data?.pagination && (
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => dispatch(setPageNumber(page))}
          />
        )}
      </div>

      <Grid container spacing={3} padding="10px">
        {Object.keys(groupedVideos).map((tutorialId) => {
          const numericTutorialId = Number(tutorialId);
          const tutorial = data?.tutorials?.find(
            (t: any) => t.id === numericTutorialId
          );
          const videosForTutorial = groupedVideos[numericTutorialId] || [];
          const currentIndex = currentVideoIndex[numericTutorialId] || 0;
          const currentVideo = videosForTutorial[currentIndex];
          const isTutorialStarred =
            isTutorialCompleted(numericTutorialId);

          return (
            <Grid item xs={12} sm={6} md={4} key={numericTutorialId}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "590px",
                }}
              >
                <CardContent sx={{ flexGrow: 1, height: "200px" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {tutorial?.name}
                    <Star
                      sx={{
                        marginLeft: "20px",
                        color: isTutorialStarred ? "green" : "gray", // Change color based on isStarred
                      }}
                    />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: "140px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 5,
                    }}
                  >
                    {tutorial?.description}
                  </Typography>
                </CardContent>

                {videosForTutorial.length > 0 ? (
                  <CardMedia
                    component="video"
                    controls
                    src={`http://localhost:5211${currentVideo?.path}`}
                    sx={{ width: "100%", height: "300px", objectFit: "cover" }}
                    onEnded={() => handleVideoEnd(currentVideo?.id)}
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

                <Box padding="10px">
                  <LinearProgress
                    variant="determinate"
                    value={
                      ((currentIndex + 1) / videosForTutorial.length) * 100
                    }
                    sx={{ width: "100%" }}
                  />
                </Box>

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
                    {currentVideo?.title}
                    <DoneOutline
                      sx={{
                        color: watchedVideos[currentVideo?.id]
                          ? "green"
                          : "red",
                        marginLeft: "25px",
                      }}
                    />
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
