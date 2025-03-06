
namespace API.Extensions
{
    public static class AccountExtension
    {
        public static  string GenerateRandomPassword()
        {
            var random = new Random();
            string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lower = "abcdefghijklmnopqrstuvwxyz";
            string digits = "0123456789";
            string special = "!@#$%^&*()-_=+";

            string password =
                upper[random.Next(upper.Length)].ToString() +
                lower[random.Next(lower.Length)].ToString() +
                digits[random.Next(digits.Length)].ToString() +
                special[random.Next(special.Length)].ToString() +
                new string(Enumerable.Repeat(upper + lower + digits + special, 4)
                    .Select(s => s[random.Next(s.Length)]).ToArray()); // Ostali nasumični karakteri

            return new string(password.ToCharArray().OrderBy(x => random.Next()).ToArray());
        }
    }
}