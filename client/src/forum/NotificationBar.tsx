import { useEffect, useState } from "react";
import { useNotifications } from "./NotificationContext"; // Importuj hook za pristup notifikacijama
import { Comment } from "@mui/icons-material";

const NotificationBar = () => {
  // Dohvati notifikacije iz konteksta, ali samo poslednju notifikaciju
  const { notifications } = useNotifications();
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<string | null>(
    null
  ); // Čuvamo samo jednu notifikaciju

  useEffect(() => {
    if (notifications.length > 0) {
      setCurrentNotification(notifications[notifications.length - 1]); // Prikaži poslednju notifikaciju
      setVisible(true); // Prikaži notifikaciju
    }
  }, [notifications]); // Ponovo pokreni kada se notifikacije promene

  const handleClose = () => {
    setVisible(false); // Zatvori NotificationBar kada korisnik klikne
    setCurrentNotification(null); // Očisti trenutnu notifikaciju
  };

  if (!visible || currentNotification === null) return null; // Ako nije vidljivo ili nema notifikacija, nemoj prikazivati ništa

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: "3%",
        right: "3%",
        width: "50%",
        backgroundColor: "white",
        border: "2px solid grey",
        zIndex: 1000,
        padding: "1%",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Comment color="info" style={{ marginRight: "8px" }} />{" "}
        {currentNotification}
      </p>

      <button
        onClick={handleClose}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "3px",
          width: "40%",
        }}
      >
        Zatvori
      </button>
    </div>
  );
};

export default NotificationBar;
