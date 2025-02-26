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
  Grid,
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
      <Typography variant="h6" textAlign="center">
        Učitavanje pitanja...
      </Typography>
    );
  }

  const ExitQuizButton: React.FC = () => (
    <Box sx={{ position: "absolute", top: 20, left: 20 }}>
      <Button onClick={() => navigate("/catalog")} sx={{ color: "white" }}>
        <ArrowBackIos sx={{ color: "white" }} /> NAPUSTI KVIZ
      </Button>
    </Box>
  );

  const QuizCard: React.FC<{ questions: Question[] }> = ({ questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
      new Array(questions.length).fill(null)
    );
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(
      null
    );
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerChange = (value: string) => {
      if (!isAnswered) {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentIndex] = value;
        setUserAnswers(updatedAnswers);
        setIsAnswerCorrect(value === questions[currentIndex].answer);
        setSelectedAnswer(value);
        setIsAnswered(true);
      }
    };

    const handleNext = () => {
      if (!selectedAnswer) return;
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setIsAnswered(false);
    };

    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setIsAnswered(false);
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundImage: "url('background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ExitQuizButton />
        <Card
          sx={{
            maxWidth: 800,
            width: "100%",
            minHeight: 300,
            border: "4px solid ",
            backgroundColor: "white",
            borderColor:
              isAnswerCorrect === true
                ? "#00ff40"
                : isAnswerCorrect === false
                ? "#ff3333"
                : "white",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  {questions[currentIndex].title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  key={currentIndex}
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                >
                  {questions[currentIndex].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio sx={{ color: isAnswered && option === questions[currentIndex].answer ? "green" : "black" }} />}
                      label={
                        <Typography
                          sx={{
                            color:
                              isAnswered && option === questions[currentIndex].answer
                                ? "green"
                                : isAnswered && userAnswers[currentIndex] === option
                                ? "red"
                                : "black",
                            fontWeight: isAnswered && option === questions[currentIndex].answer ? "bold" : "normal",
                          }}
                        >
                          {option}
                        </Typography>
                      }
                      disabled={isAnswered}
                    />
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                <ArrowBack />
              </IconButton>
              <Typography>
                {currentIndex + 1} / {questions.length}
              </Typography>
              {currentIndex === questions.length - 1 ? (
                <Button variant="contained" onClick={() => setCurrentIndex(questions.length)}>
                  Završi kviz
                </Button>
              ) : (
                <IconButton onClick={handleNext}>
                  <ArrowForward />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  return <QuizCard questions={questions} />;
}
