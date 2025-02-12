import { useForm } from "react-hook-form";
import { Box, Paper, Typography, Grid2, Button, CircularProgress } from "@mui/material";
import AppTextInput from "../components/AppTextInput";
import createQuestionSchema from "../schemas/createQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuestionMutation } from "./quiz&testApi";
interface QuestionFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}
export default function QuestionForm({ onCancel, onSuccess }: QuestionFormProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(createQuestionSchema), // Povezivanje šeme sa formom
    defaultValues: {
      title: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    },
  });
  const [addQuestion, {isLoading:isSubmitting}] = useCreateQuestionMutation();
  const onSubmit = async (data: any) => {
    try {
      await addQuestion(data);
      onSuccess(); // Pozivamo onSuccess nakon dodavanja pitanja
    } catch (error) {
      console.error("Greška pri dodavanju pitanja:", error);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2, m: 40, mt: 2, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Novo pitanje
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <AppTextInput
              name="title"
              label="Pitanje"
              control={control} // Prosleđujemo control za povezivanje sa react-hook-form
            />
          </Grid2>
          <Grid2 size={6}></Grid2>
          <Grid2 size={12}>
            <AppTextInput
              name="option1"
              label="Opcija 1"
              control={control}
              multiline
              rows={2}
            />
          </Grid2>
          <Grid2 size={12}>
            <AppTextInput
              name="option2"
              label="Opcija 2"
              control={control}
              multiline
              rows={2}
            />
          </Grid2>
          <Grid2 size={12}>
            <AppTextInput
              name="option3"
              label="Opcija 3"
              control={control}
              multiline
              rows={2}
            />
          </Grid2>
          <Grid2 size={12}>
            <AppTextInput
              name="option4"
              label="Opcija 4"
              control={control}
              multiline
              rows={2}
            />
          </Grid2>
          <Grid2 size={12}>
            <AppTextInput
              name="answer"
              label="Tačan odgovor"
              control={control}
              multiline
              rows={2}
            />
          </Grid2>
        </Grid2>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
             {isSubmitting ? <CircularProgress /> : "Sačuvaj pitanje"}
            
          </Button>
        </Box>
      </form>
    </Box>
  );
}
