import { useEffect, useState } from "react";
import { useNotifications } from "./NotificationContext"; // Importuj hook za pristup notifikacijama

const NotificationBar = () => {
  // Dohvati notifikacije iz konteksta, ali samo poslednju notifikaciju
  const { notifications } = useNotifications();
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<string | null>(null); // Čuvamo samo jednu notifikaciju

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
        position: "fixed",
        bottom: "3%",
        right: "3%",
        width: "50%",
        backgroundColor: "lightblue",
        zIndex: 1000,
        padding: "10px",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>Notifikacije</h3>
      <ul style={{ paddingLeft: "20px" }}>
        <li
          style={{
            margin: "5px 0",
            padding: "5px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          {currentNotification}
        </li>
      </ul>
      <button
        onClick={handleClose}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "3px",
        }}
      >
        Zatvori
      </button>
    </div>
  );
};

export default NotificationBar;
