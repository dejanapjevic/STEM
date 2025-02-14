import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid2,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import BuildIcon from "@mui/icons-material/Build";
import ComputerIcon from "@mui/icons-material/Computer";
import MathIcon from "@mui/icons-material/Calculate";

const StemSection = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography padding={4} className="ani">
        STEM je ključan za budućnost jer podstiče inovacije, kritičko
        razmišljanje i rješavanje problema. Razvoj vještačke inteligencije,
        automatizacije, obnovljivih izvora energije i biotehnologije zavisi od
        STEM obrazovanja. Buduća zanimanja, poput inženjera robotike, data
        analitičara, programera i naučnika za vještačku inteligenciju, oslanjaju
        se na STEM vještine, koje omogućavaju prilagođavanje tehnološkim
        promjenama i oblikovanje održivog i naprednog društva.
      </Typography>
      <Grid2 container spacing={2} justifyContent="center" padding={2} >
        <Grid2 size={{ xs: 3 }}>
          <Card className="ani">
            <CardMedia
              component="img"
              height="300px"
              image="science.jpg" // Dodaj odgovarajući URL slike
              alt="Science"
              sx={{objectFit:'cover'}}
            />
            <CardContent>
              <ScienceIcon  fontSize="large" />
              <Typography variant="h6" gutterBottom>
                Nauka
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Naučna istraživanja omogućavaju otkrića koja transformišu naš
                svijet i tehnologije koje koristimo svakodnevno.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Technology Card */}
        <Grid2 size={{ xs: 3 }}>
          <Card className="ani">
            <CardMedia
              component="img"
              height="300px"
              image="tech.jpg"
              alt="Technology"
              sx={{objectFit:'cover'}}
            />
            <CardContent >
              <ComputerIcon  fontSize="large" />
              <Typography variant="h6" gutterBottom>
                Tehnologija
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tehnološki napredak omogućava stvaranje novih uređaja,
                aplikacija i sistema koji poboljšavaju svakodnevni život i
                globalnu povezanost.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Engineering Card */}
        <Grid2 size={{ xs: 3 }}>
          <Card className="ani">
            <CardMedia
              component="img"
              height="300px"
              image="eng.jpg"
              alt="Engineering"
              sx={{objectFit:'cover'}}
            />
            <CardContent>
              <BuildIcon  fontSize="large" />
              <Typography variant="h6" gutterBottom>
                Inženjering
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Inženjering omogućava primjenu naučnih principa u stvaranju
                rješenja koja unapređuju infrastrukturu, energetiku i industriju.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Math Card */}
        <Grid2 size={{ xs: 3 }}>
          <Card className="ani">
            <CardMedia
              component="img"
              height="300px"
              image="math.jpg"
              alt="Mathematics"
              sx={{objectFit:'cover'}}
            />
            <CardContent>
              <MathIcon  fontSize="large" />
              <Typography variant="h6" gutterBottom>
                Matematika
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Matematika je osnova za analizu, modelovanje i rješavanje
                problema, te je ključna za razvoj tehnologija i naučnih otkrića.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default StemSection;
