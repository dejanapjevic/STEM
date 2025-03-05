import "../../styles/welcome.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HorizontalTimeline from "./AbouUs";
import StemSection from "./AboutSTEM";
import NavMenu from "./NavMenu";
import { useResetPasswordMutation } from "../account/accountApi";
import { useState } from "react";
import { toast } from "react-toastify";
export default function WelcomePage() {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setEmail("");
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleResetPassword = async () => {
    if (email.trim() !== "") {
      toast.info("Slanje zahtjeva..."); // Prikazuje obavještenje odmah

      try {
        await resetPassword({ email }).unwrap();
        toast.success("Provjerite e-mail za dalje instrukcije");
        setDialogOpen(false);
      } catch (error) {
        console.error("Greška prilikom resetovanja lozinke:", error);
        toast.error("Došlo je do greške.Provjerite da li ste unijeli ispravnu e-mail adresu.");
      }
    } else {
      toast.warn("Unesite validan email.");
    }
  };

  const buttonStyle = {
    display: "flex",
    paddingLeft: 6,
    justifyContent: "flex-start",
    borderRadius: "30px",
    clipPath: "polygon(0 0, 50% 0%, 100% 50%, 50% 100%, 0 100%)",
    border: "3px solid white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    width: "40%",
    backgroundColor: "rgba(255, 255, 255, 1.5)",
    "&:hover": {
      border: "8px solid white",
      color: "black",
    },
    "&:active": {
      border: "6px solid white",
      color: "black",
    },
  };

  return (
    <div>
      <NavMenu />
      <div
        className="container"
        // style={{ backgroundColor: "#9F7AEA" }}
        style={{ backgroundColor: "grey" }}
        id="home"
      >
        {/* Ljubičasti div sa animacijom */}
        <div className="bg-purple">
          <Button
            component={NavLink} // Postavljanje tipa na NavLink
            to="/login"
            variant="outlined"
            sx={buttonStyle}
          >
            Prijavi se
          </Button>
          <Button
            component={NavLink}
            to={"/register"}
            variant="outlined"
            sx={buttonStyle}
          >
            Registruj se
          </Button>
          <Button sx={{ width: "260px" }} onClick={handleOpenDialog}>
            <Typography sx={{ marginLeft: "10px" , color:"black"}}>
              Zaboravili ste lozinku?
            </Typography>
          </Button>
        </div>

        {/* Bijeli div sa fade-in animacijom */}
        <div className="white-bg">
          <div className="text-container">
            <h1 className="text-main">Inovacije počinju sa vama</h1>
            <h2 className="text-sub">
              Izgradite budućnost kroz STEM edukaciju
            </h2>
          </div>
        </div>
      </div>

      <div id="about" className="bottom-first-section ">
        <HorizontalTimeline />
      </div>

      <div id="future" className="bottom-second-section">
        <StemSection />
      </div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}     PaperProps={{ sx: { width: "600px", height: "200px" } }} >
        <DialogTitle>Resetovanje lozinke</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Unesite vaš email"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Otkaži</Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
          >
            Pošalji
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
