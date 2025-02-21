import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5211/notificationHub", {
    withCredentials: true, // Omogućava slanje kolačića sa zahtevima
  })
  .withAutomaticReconnect()
  .build();

const startConnection = async () => {
  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.log("SignalR Connection Error: ", err);
    setTimeout(startConnection, 5000);
  }
};

connection.on("ReceiveNotification", (message) => {
  alert("Nova notifikacija: " + message);
});

startConnection();

export default connection;
