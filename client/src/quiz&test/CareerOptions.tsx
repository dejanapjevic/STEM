import { useState } from "react";
import { useCareerOptionsQuery } from "./quiz&testApi";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function CareerOptions() {
  const navigate = useNavigate();
  const { data, isLoading } = useCareerOptionsQuery();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{
    science: number;
    tech: number;
    eng: number;
    math: number;
  }>({
    science: 0,
    tech: 0,
    eng: 0,
    math: 0,
  });
  const [finished, setFinished] = useState(false);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!data || data.length === 0)
    return <Typography>No questions available</Typography>;

  const handleAnswer = (category: "science" | "tech" | "eng" | "math") => {
    setScores((prevScores) => ({
      ...prevScores,
      [category]: prevScores[category] + 1,
    }));
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    const maxCategory = Object.keys(scores).reduce((a, b) =>
      scores[a as keyof typeof scores] > scores[b as keyof typeof scores]
        ? a
        : b
    );

    const careerMapping = {
      science: "Nauka",
      tech: "Tehnologija",
      eng: "Inženjerstvo",
      math: "Matematika",
    };
    return careerMapping[maxCategory as keyof typeof careerMapping];
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScores({ science: 0, tech: 0, eng: 0, math: 0 });
    setFinished(false);
  };
  const ExitQuizButton: React.FC = () => (
    <Box sx={{ position: "absolute", top: 20, left: 20 }}>
      <Button onClick={() => navigate("/catalog")} sx={{ color: "white" }}>
        <ArrowBackIos sx={{ color: "white" }} /> NAPUSTI TEST
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#9f7aea",
      }}
    >
      <ExitQuizButton />
      <Card
        sx={{
          width: "500px",
          padding: "20px",
          textAlign: "center",
          minHeight: "400px", // Fiksna minimalna visina
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Centriranje sadržaja
          overflow: "auto", // Omogućava skrolovanje ako je sadržaj previše dugačak
        }}
      >
        <CardContent>
          {finished ? (
            <>
              <Typography variant="h5">
                Vaša idealna karijera je: {getResult()}
              </Typography>
              <Button
                variant="contained"
                onClick={resetTest}
                sx={{
                  marginTop: 2,
                  backgroundColor: "#9f7aea",
                  color: "white",
                }}
              >
                Ponovo uradi test
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
                {data[currentQuestion].title}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", // Dva dugmadi u redu
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#9f7aea", color: "white" }}
                  onClick={() => handleAnswer("science")}
                >
                  {data[currentQuestion].optionA}
                </Button>
                <Button
                  sx={{ backgroundColor: "#9f7aea", color: "white" }}
                  variant="contained"
                  onClick={() => handleAnswer("tech")}
                >
                  {data[currentQuestion].optionB}
                </Button>
                <Button
                  sx={{ backgroundColor: "#9f7aea", color: "white" }}
                  variant="contained"
                  onClick={() => handleAnswer("eng")}
                >
                  {data[currentQuestion].optionC}
                </Button>
                <Button
                  sx={{ backgroundColor: "#9f7aea", color: "white" }}
                  variant="contained"
                  onClick={() => handleAnswer("math")}
                >
                  {data[currentQuestion].optionD}
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
