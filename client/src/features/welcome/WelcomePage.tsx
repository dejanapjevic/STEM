import "../../../styles/welcome.css";

import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div>
      <ul id="item">
        <li>
          <a href="#home">Početna</a>
        </li>
        <li>
          <a href="#about">O nama</a>
        </li>
        <li>
          <a href="#future">Budućnost STEM-a</a>
        </li>
      </ul>
      <div
        className="container"
        style={{ backgroundColor: "#9F7AEA" }}
        id="home"
      >
        {/* Ljubičasti div sa animacijom */}
        <div className="bg-purple">
          <Button
            component={NavLink} // Postavljanje tipa na NavLink
            to="/login"
            variant="outlined"
            sx={{
              borderRadius: "25px",
              border: "3px solid white",
              color: "white",
              fontWeight: "bold",
              width: "80%",
              "&:hover": {
                border: "6px solid white",
                color: "white",
              },
              "&:active": {
                border: "6px solid white",
                color: "white",
              },
            }}
          >
            Prijavi se
          </Button>
          <Button
            component={NavLink}
            to={"/register"}
            variant="outlined"
            sx={{
              borderRadius: "25px",
              border: "3px solid white",
              color: "white",
              fontWeight: "bold",
              width: "80%",
              "&:hover": {
                border: "6px solid white",
                color: "white",
              },
              "&:active": {
                border: "6px solid white",
                color: "white",
              },
            }}
          >
            Registruj se
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

      {/* Div sa ikonom i tekstom */}
      <div id="about" className="bottom-first-section ">
        <img src="stem.jpg" className="icon-img ani" alt="Stem image" />
        <div className="text-bottom ">
          <h1
            className="ani "
            style={{ fontSize: "22px", marginBottom: "80px" }}
          >
            Aplikacija za STEM učenje predstavlja inovativnu platformu koja
            omogućava korisnicima pristup bogatom naučnom sadržaju iz oblasti
            nauke, tehnologije, inženjeringa i matematike. Kroz interaktivne
            testove validacije, korisnici mogu precizno odrediti koja oblast
            najbolje odgovara njihovim interesovanjima i sposobnostima.
          </h1>
          <h1 className="ani " style={{ fontSize: "22px" }}>
            Platforma nudi besplatnu registraciju, omogućavajući svim
            korisnicima nesmetan pristup različitim resursima i edukativnim
            materijalima. Učesnici takođe imaju priliku da učestvuju u forum
            diskusijama, razmenjujući ideje i iskustva sa kolegama, čime se
            dodatno podstiče aktivno učenje i zajednički razvoj.
          </h1>
        </div>
      </div>
      {/* Div sa ikonom i tekstom */}
      <div id="future" className="bottom-second-section">
        <div
          className="text-bottom"
          style={{ width: "100%", marginLeft: "120px" }}
        >
          <h1 className="ani" style={{ fontSize: "22px" }}>
            STEM oblasti – nauka, tehnologija, inženjering i matematika –
            predstavljaju ključne komponente budućnosti globalnog tržišta rada.
            Sa stalnim napretkom u tehnologijama i naučnim istraživanjima, ove
            discipline postavljaju temelje za stvaranje inovacija koje će
            oblikovati buduće industrije
          </h1>
          <h1 className="ani" style={{ fontSize: "22px", marginTop: "100px" }}>
            Ulaganje u STEM obrazovanje nije samo ulaganje u pojedinca, već i u
            održivi razvoj i ekonomski napredak. Ove oblasti će oblikovati nove
            profesije, omogućujući stvaranje veće vrijednosti i unaprijeđenje
            kvaliteta života u svim sektorima društva.
          </h1>
        </div>

        <div className="image-container ">
          <img src="stem1.jpg" className="stem-img ani" alt="Stem image" />
        </div>
      </div>
    </div>
  );
}
