import { ArrowBack, ArrowBackIos, ArrowForward } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useRandomQuestionsQuery } from "./quiz&testApi";
import "../../styles/welcome.css";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  title: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const { data, isLoading } = useRandomQuestionsQuery();

  const navigate = useNavigate();

  const questions: Question[] = data
    ? data.map((q) => ({
        id: q.id,
        title: q.title,
        options: [q.option1, q.option2, q.option3, q.option4],
        answer: q.answer,
      }))
    : [];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url('background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    );
  }

  const ExitQuizButton: React.FC = () => (
    <Box sx={{ position: "absolute", top: 20, left: 20 }}>
      <Button
        onClick={() => navigate("/catalog")}
        sx={{ color: "black", fontWeight: "bold" }}
      >
        <ArrowBackIos sx={{ color: "black", fontWeight: "bold" }} /> NAPUSTI
        KVIZ
      </Button>
    </Box>
  );

  const QuizCard: React.FC<{ questions: Question[] }> = ({ questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
      new Array(questions.length).fill(null)
    ); // Čuva odgovore korisnika
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(
      null
    ); // Novi state za tačnost odgovora
    const [isAnswered, setIsAnswered] = useState(false); // Novi state da pratimo da li je odgovor izabran

    const handleAnswerChange = (value: string) => {
      if (!isAnswered) {
        // Ako odgovor nije izabran, postavljamo ga
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentIndex] = value;
        setUserAnswers(updatedAnswers);

        // Odmah provjeravamo tačnost odgovora
        if (value === questions[currentIndex].answer) {
          setIsAnswerCorrect(true);
        } else {
          setIsAnswerCorrect(false);
        }

        setSelectedAnswer(value); // Postavljamo selektovani odgovor
        setIsAnswered(true); // Obeležavamo da je odgovor izabran
      }
    };

    const calculateScore = () => {
      let correctAnswers = 0;

      userAnswers.forEach((answer, index) => {
        if (answer === questions[index].answer) {
          correctAnswers++;
        }
      });

      return correctAnswers;
    };

    if (currentIndex === questions.length) {
      // Kada je kviz završen, prikaži rezultat
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url('background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ExitQuizButton />
          <Card
            sx={{
              maxWidth: 600,
              width: "100%", // Postavljamo da se širi do maksimalne širine
              minHeight: 300,
              border: "2px solid black",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Kviz je završen!
              </Typography>
              <Typography variant="h6">
                Tačan broj odgovora: {calculateScore()} / {questions.length}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                  mt: 2,
                }}
              >
                {questions.map((q, index) => (
                  <Box
                    key={q.id}
                    sx={{
                      p: 2,
                      border: "1px solid gray",
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                      animation: "appear 1.2s ease-out",
                    }}
                  >
                    <Typography variant="subtitle1">{q.title}</Typography>
                    <ul style={{ paddingLeft: "15px" }}>
                      {q.options.map((option, idx) => (
                        <li
                          key={idx}
                          style={{
                            color:
                              option === q.answer
                                ? "green" // Tačan odgovor zeleno
                                : userAnswers[index] === option
                                ? "red" // Pogrešan korisnikov odgovor crveno
                                : "black",
                            fontWeight: option === q.answer ? "bold" : "normal",
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCurrentIndex(0); // Resetujemo indeks na početak
                    setUserAnswers(new Array(questions.length).fill(null)); // Resetujemo odgovore
                    setSelectedAnswer(null); // Resetujemo selektovani odgovor
                    setIsAnswerCorrect(null); // Resetujemo stanje tačnosti odgovora
                    setIsAnswered(false); // Resetujemo stanje odgovora
                  }}
                >
                  Igraj ponovo
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      );
    }

    const handleNext = () => {
      if (!selectedAnswer) {
        // Ako nije izabran odgovor, ne dozvoljavamo prelazak
        return;
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null); // Resetujemo odgovor za sledeće pitanje
        setIsAnswerCorrect(null); // Resetujemo stanje tačnosti odgovora
        setIsAnswered(false); // Resetujemo stanje odgovora
      }
    };

    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null); // Resetujemo stanje tačnosti odgovora
        setIsAnswered(false); // Resetujemo stanje odgovora
      }
    };

    return (
      <Box
        sx={{
          display: "flex", // Aktivira flexbox
          justifyContent: "center", // Centriranje horizontalno
          alignItems: "center", // Centriranje vertikalno
          height: "100vh", // Postavlja visinu na celu visinu ekrana
          width: "100%",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url('background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ExitQuizButton />
        <Card
          sx={{
            maxWidth: 600,
            width: "100%", // Postavljamo da se širi do maksimalne širine
            minHeight: 300, // Postavljamo minimalnu visinu kako bi izgledalo dosledno,
            border: "4px solid ",
            backgroundColor: "white",
            borderColor:
              isAnswerCorrect === true
                ? "#00ff40"
                : isAnswerCorrect === false
                ? "#ff3333"
                : "white",
            animation: "appear 1.7s ease-out",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {questions[currentIndex].title}
            </Typography>
            <Divider />

            <RadioGroup
              key={currentIndex}
              value={selectedAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              {questions[currentIndex].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isAnswered} // Onemogućavamo radio dugmiće nakon što je odgovor izabran
                />
              ))}
            </RadioGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                <ArrowBack />
              </IconButton>
              <Typography>
                {currentIndex + 1} / {questions.length}
              </Typography>

              {currentIndex === questions.length - 1 ? (
                <button onClick={() => setCurrentIndex(questions.length)}>
                  Završi kviz
                </button>
              ) : (
                <IconButton
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                >
                  <ArrowForward />
                </IconButton>
              )}
            </div>
          </CardContent>
        </Card>
      </Box>
    );
  };

  return <QuizCard questions={questions} />;
}
