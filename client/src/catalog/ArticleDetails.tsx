import { useParams } from "react-router-dom";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchArticleDetailsQuery } from "./CatalogApi";

export default function ArticleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchArticleDetailsQuery(id ? +id : 0);
  const [page, setPage] = useState(0);
  const charsPerPage = 2000; // Broj karaktera po stranici
  const [direction, setDirection] = useState(1); // 1 = napred, -1 = nazad

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  // Podela sadržaja na stranice
  const totalPages = Math.ceil(data.content.length / charsPerPage);
  const currentPageText = data.content.slice(
    page * charsPerPage,
    (page + 1) * charsPerPage
  );

  // Flip animacija za stranice
  const variants = {
    enter: (direction: number) => ({
      rotateY: direction === 1 ? 90 : -90,
      opacity: 0,
    }),
    center: { rotateY: 0, opacity: 1 },
    exit: (direction: number) => ({
      rotateY: direction === 1 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Naslovni boks */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255, 255, 255, 0.5)",
          width: "100vw",
          borderRadius: "10px",
          padding: "15px",
          minHeight: "120px",
          maxHeight: "150px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <img
          src="/article.jpg"
          alt="Opis slike"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginLeft: "20px",
          }}
        />
        <Typography variant="h4" gutterBottom sx={{ flexShrink: 1 }}>
          {data.title}
        </Typography>
      </Box>

      {/* Glavni sadržaj sa paginacijom */}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          lg={10}
          sx={{
            mx: "auto",
            marginTop: "15px",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            padding: "13px",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            perspective: "1200px", // Dodaje 3D efekat
          }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%", // Dodajemo da se prostire preko celog Box-a
                backfaceVisibility: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "justify",
                paddingLeft:"40px",
                maxWidth: "90%", // Ograničava širinu da ne izlazi iz okvira
    wordWrap: "break-word", // Prelomi reči koje su predugačke
    overflow: "hidden"
              }}
            >
              <Typography variant="body1">{currentPageText}</Typography>
            </motion.div>
          </AnimatePresence>

          {/* Dugmad za navigaciju kroz stranice */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => {
                if (page > 0) {
                  setDirection(-1);
                  setPage(page - 1);
                }
              }}
              disabled={page === 0}
            >
              <ArrowBack />
            </IconButton>

            <Typography>{`Strana ${page + 1} od ${totalPages}`}</Typography>

            <IconButton
              onClick={() => {
                if (page < totalPages - 1) {
                  setDirection(1);
                  setPage(page + 1);
                }
              }}
              disabled={page === totalPages - 1}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
