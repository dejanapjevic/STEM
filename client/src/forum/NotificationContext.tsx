import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import connection from "./signalRService";

// Kreiraj kontekst sa podrazumevanom vrednošću
const NotificationContext = createContext({
  notifications: [] as string[], // Tipiziraj kao niz stringova
});

// Definiši tip za props u NotificationProvider
interface NotificationProviderProps {
  children: ReactNode;
}

// Provider komponenta koja omogućava pristup notifikacijama u celoj aplikaciji
export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<string[]>([]); // Tipiziraj kao niz stringova

 /*  useEffect(() => {
    connection.on("ReceiveNotification", (message: string) => {
        console.log("Primljena notifikacija:", message);
      // Tipiziraj message kao string
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    return () => {
      connection.off("ReceiveNotification");
    };
  }, []); */
  useEffect(() => {
    // Osluškuj notifikacije vezane za forum
    connection.on("ReceiveNotification", (message: string) => {
        console.log("Primljena notifikacija za forum:", message);
        setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    // Osluškuj notifikacije vezane za članke
    connection.on("Notifikacija o člancima", (message: string) => {
        console.log("Primljena notifikacija za članke:", message);
        setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    return () => {
      connection.off("ReceiveNotification");
      connection.off("Notifikacija o člancima");
    };
}, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook za korišćenje notifikacija u drugim komponentama
export const useNotifications = () => {
  return useContext(NotificationContext);
};
