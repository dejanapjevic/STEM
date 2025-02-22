using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using API.Entities;
//osnovna klasa za dvosmjernu komunikaciju
namespace API.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly UserManager<User> _userManager;

        public NotificationHub(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public override async Task OnConnectedAsync()
        {
            var user = Context.User;

            if (user?.Identity?.IsAuthenticated == true)
            {
                // Dohvatanje korisnika iz baze na osnovu korisničkog imena
                var appUser = await _userManager.FindByNameAsync(user.Identity.Name);

                if (appUser != null)
                {
                    // Dodavanje u grupu na osnovu ID-a korisnika
                    await Groups.AddToGroupAsync(Context.ConnectionId, appUser.Id);
                }
            }

            await base.OnConnectedAsync();
        }
    }
}
