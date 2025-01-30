
import "../../../styles/welcome.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div>
      <div className="relative w-full h-screen border-b-4 border-purple-400">
        {/* ljubicasti div sa animacijom, umesto boje pozadine koristi sliku */}
        <div  className="absolute w-1/2 h-full bg-purple-400 animate-zoom-and-move z-10 flex flex-col justify-center items-center gap-4 left-1/2 transform -translate-x-1/2  ">
          <Button
            variant="outlined"
            component={NavLink}
            to={"/login"}
            key={"/login"}
            sx={{
              borderRadius: 15,
              borderColor: "white", // Beli okvir
              color: "white", // Beli tekst
              fontWeight: "bold", // Boldovani tekst
              width: "80%", // Veća širina
              height: "50px", // Povećanje visine
              padding: "10px", // Dodatno povećanje unutar dugmadi
              ":active": {
                borderWidth: "3px", // Deblji okvir kada je dugme aktivno
                backgroundColor: "transparent", // Zadrži proziran pozadinski kolor
              },
              ":hover": {
                border: 4,
                borderColor: "white",
                color: "white",
              },
            }}
          >
            Prijavi se
          </Button>
          <Button
            component={NavLink}
            to={"/register"}
            key={"/register"}
            variant="outlined"
            sx={{
              borderRadius: 15,
              borderColor: "white",
              color: "white",
              fontWeight: "bold",
              width: "80%",
              height: "50px",
              padding: "10px",
              ":active": {
                borderWidth: "3px",
                backgroundColor: "transparent",
              },
              ":hover": {
                border: 4,
                borderColor: "white",
                color: "white",
              },
            }}
          >
            Registruj se
          </Button>
        </div>

        {/* bijeli div sa paddingom i pomerajem ispod crnog diva */}
        <div className="absolute w-full h-full bg-white opacity-0 animate-fade-in z-0 flex justify-start items-start pt-20 pb-12">
          {/* Levo poravnati div, sa vertikalnim centriranjem */}
          <div className="text-black w-1/2 h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 text-center">
              Inovacije počinju sa vama
            </h1>
            <h2 className="text-3xl md:text-3xl font-medium text-center">
              istražujte STEM i stvorite budućnost
            </h2>
          </div>
        </div>
      </div>

      {/* Divovi HELLO i HI sa istim stilovima */}
      <div className="relative w-full h-screen flex justify-start items-center bg-white ani border-b-purple-400 border-b-4">
  <img src="icon.avif" className="w-1/3 h-auto mr-8 ml-12" />
  <div className="flex flex-col w-1/2">
    <h1 className="text-xl md:text-xl font-bold">
      Otkrij svijet nauke, tehnologije, inženjeringa i matematike.
    </h1>
    <h1 className="text-xl md:text-xl font-bold">
      Nauči kako da koristiš svoju radoznalost i kreativnost za rešavanje problema, stvaranje inovacija i oblikovanje budućnosti. Zajedno možemo istražiti nepoznato, testirati granice i inspirišemo sledeću generaciju lidera u STEM oblasti.
    </h1>
  </div>
</div>





<div className="relative w-full h-screen flex justify-center items-center bg-white  ani">
  <h1 className="text-xl md:text-xl font-bold">Pridruži nam se sada i pristupi besplatnom, inovativnom sadržaju! Otkrij aktuelne informacije koje će te pokrenuti ka budućnosti.</h1>
</div>

    </div>
  );
}
