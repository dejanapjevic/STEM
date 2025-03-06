import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useFetchArticleDetailsQuery } from "./CatalogApi";

export default function ArticleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchArticleDetailsQuery(id ? +id : 0);

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
        justifyContent: "flex-start", // Pomera sadržaj na vrh ekrana

        overflow: "hidden",
      }}
    >
      {isLoading && !data && <div>Loading...</div>}
      {data && (
        <>
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
              minHeight: "120px", // Fiksna visina naslova
              maxHeight: "150px", // Sprečava preveliko razvlačenje
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

          {/* Glavni sadržaj */}
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
                maxHeight: "75vh", // Sprečava da tekst zauzme ceo ekran
                overflowY: "auto", // Omogućava skrolovanje ako je predugačak sadržaj
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
                  columnGap: "30px",
                  textAlign: "justify",
                  paddingBottom: "10px",
                }}
              >
                {data.content}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
