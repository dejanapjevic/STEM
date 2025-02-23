import { FieldValues, useForm } from "react-hook-form";
import {
  createArticleSchema,
  CreateArticleSchema,
} from "../schemas/createArticleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import AppTextInput from "../components/AppTextInput";
import { useFetchFiltersQuery } from "../catalog/CatalogApi";
import AppSelectInput from "../components/AppSelectInput";
import AppDropzone from "../components/AppDropzone";
import { Article } from "../models/article";
import { useEffect } from "react";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useUploadImageMutation,
} from "./adminApi";
import { toast } from "react-toastify";

type Props = {
  setEditMode: (value: boolean) => void;
  article: Article | null;
  refetch: () => void;
  setSelectedArticle: (value: Article | null) => void;
};

export default function ArticleForm({
  setEditMode,
  article,
  refetch,
  setSelectedArticle,
}: Props) {
  const { control, handleSubmit, watch, reset } = useForm<CreateArticleSchema>({
    mode: "onTouched",
    resolver: zodResolver(createArticleSchema),
  });

  const watchFile = watch("file");
  //console.log(watchFile);

  //"file" je naziv polja u formi koju prati watch().
  const { data: categories } = useFetchFiltersQuery();
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [storeImage] = useUploadImageMutation();

  const isSubmitting = isCreating || isUpdating;
  useEffect(() => {
    if (article) reset(article);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [article]); //ovde je bilo i watchFile i reset

  const createFormData = (items: FieldValues) => {
    const formData = new FormData();
    for (const key in items) {
      formData.append(key, items[key]);
    }
    return formData;
  };

  const onSubmit = async (data: CreateArticleSchema) => {
    try {
      const formData = createFormData(data);
      // const formDataObj = Object.fromEntries(formData.entries());

      if (watchFile) {
        const formDataImage = new FormData();

        formDataImage.append("file", watchFile);

        const imageUrl = await storeImage(formDataImage).unwrap();
        //formData.append("file", watchFile);
        //formData.append("pictureUrl", imageUrl.pictureUrl);
        formData.delete("pictureUrl"); // Ukloni prethodni ako postoji
        formData.append("pictureUrl", imageUrl.pictureUrl);
      } //ovo

      if (article) {
        //  formData.delete("file");
        console.log("Podaci za apdejt");
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        await updateArticle({ id: article.id, data: formData }); //ovo
        handleConfirmation();
      } else {
        console.log("Podaci za kreiranje");
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        await createArticle(formData).unwrap();
      }

      setEditMode(false);
      setSelectedArticle(null);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
const handleConfirmation = () => {
  toast.success("Uspješno ste izmijenili postojeći članak");
}
  return (
    <Box component={Paper} sx={{ p: 2, m: 40, mt: 2, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Detalji o članku
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <AppTextInput control={control} name="title" label="Naslov" />
          </Grid2>
          <Grid2 size={6}>
            {categories && (
              <AppSelectInput
                control={control}
                name="category"
                label="Kategorija"
                items={categories}
              />
            )}
          </Grid2>
          <Grid2 size={12}>
            <AppTextInput
              multiline
              rows={4}
              control={control}
              name="description"
              label="Opis"
            />
          </Grid2>
          <Grid2 size={12}>
            <AppTextInput
              multiline
              rows={15}
              control={control}
              name="content"
              label="Sadržaj"
            />
          </Grid2>
          <Grid2
            size={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <AppDropzone name="file" control={control} />
            {watchFile?.preview ? (
              <img
                src={watchFile.preview}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : article?.pictureUrl ? (
              <img
                src={article?.pictureUrl}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : null}
          </Grid2>
        </Grid2>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            onClick={() => setEditMode(false)}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={isSubmitting}
           // onClick={() => handleConfirmation()}
          >
            {isSubmitting ? <CircularProgress /> : "Sačuvaj članak"}
            
          </Button>
        </Box>
      </form>
    </Box>
  );
}
