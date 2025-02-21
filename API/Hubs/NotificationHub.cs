using Microsoft.AspNetCore.SignalR;
//Hub je specijalizovana klasa koja omogućava slanje i primanje poruka u realnom vremenu između servera i klijenata
//osnovna klasa za dvosmjernu komunikaciju
namespace API.Hubs
{
    public class NotificationHub : Hub
    {
        //to je metoda koja se poziva svaki put kada se klijent uspešno poveže sa SignalR hub-om.
        public override async Task OnConnectedAsync()
        {

            // Pristup kolačićima da biste dobili ID korisnika
            var signalRUserCookie = Context.GetHttpContext()?.Request.Cookies[".AspNetCore.Identity.Application"];

            // Ako postoji korisnik koji je identifikovan putem kolačića
            if (signalRUserCookie != null)
            {
                // Dodajte korisnika u grupu na osnovu ID-a korisnika
                await Groups.AddToGroupAsync(Context.ConnectionId, signalRUserCookie);
               
            }

            // Pozovite osnovnu implementaciju
            await base.OnConnectedAsync();

        }
    }
}