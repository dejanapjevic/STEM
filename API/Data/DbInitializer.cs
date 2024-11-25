
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
       public static void Initialize(STEMContext context) {

        if(context.Articles.Any()) return; //ako nesto ima u bazi, ne radimo nista

        var articles = new List<Article> {
            
    new Article {
      
        Title = "Napredak u oblasti nanotehnologije",
        Description = "Nanotehnologija je naučna oblast koja se bavi proučavanjem i manipulisanjem materijala na nanometarskoj skali.",
        Content = "Nanotehnologija je ključna za razvoj novih materijala i uređaja. Kroz kontrolu struktura na molekularnom nivou, inženjeri mogu stvoriti proizvode sa izuzetnim svojstvima. Na primer, u medicini, nanotehnologija omogućava precizno dostavljanje lekova direktno do ciljanih ćelija.",
        Category = "Nauka",
        PictureUrl = "/images/articles/picture2"
    },
    new Article {
       
        Title = "Održivost u građevinskoj industriji",
        Description = "Korišćenje održivih materijala i tehnologija u građevinskoj industriji postaje ključni faktor za smanjenje ekološkog otiska.",
        Content = "Sustainable building practices are changing the landscape of architecture. The use of recycled materials, energy-efficient designs, and renewable energy sources are becoming standard. Engineers are now focusing on creating buildings that have minimal environmental impact, with advanced insulation and solar panel systems being widely used.",
        Category = "Inženjering",
        PictureUrl = "/images/articles/picture1"
    },
    new Article {
     
        Title = "Računarske mreže i budućnost interneta",
        Description = "Računarske mreže su osnova za globalnu povezanost, a njihova budućnost je u razvoju 5G i 6G tehnologija.",
        Content = "Računarske mreže omogućavaju prenos podataka širom sveta. Tehnologije kao što su 5G i 6G obećavaju revolucionarne promene u brzini internetske veze, povezanosti uređaja i načinu na koji koristimo internet. Inženjeri rade na izgradnji infrastrukture koja će omogućiti još brži i efikasniji internet.",
        Category = "Inženjering",
        PictureUrl = "/images/articles/picture3"
    },
    new Article {
      
        Title = "Budućnost automobila sa električnim pogonom",
        Description = "Električni automobili predstavljaju budućnost automobilske industrije, a razvoj baterija je ključni faktor za njihov uspeh.",
        Content = "S obzirom na sve veću potrebu za smanjenjem emisije ugljen-dioksida, električni automobili postaju ključni element održivog saobraćaja. Napredak u baterijskim tehnologijama omogućava duži domet i brže punjenje, što je omogućilo širu upotrebu električnih vozila u svakodnevnom životu.",
        Category = "Inženjering",
        PictureUrl = "/images/articles/picture4"
    },
    new Article {
        
        Title = "Kako kvantno računarstvo menja svet tehnologije",
        Description = "Kvantno računarstvo ima potencijal da reši probleme koji su previše složeni za klasične računare.",
        Content = "Kvantno računarstvo koristi principe kvantne mehanike kako bi obradio informacije na način koji nije moguć sa klasičnim računarima. Ova tehnologija može revolucionirati oblasti kao što su sigurnost podataka, simulacije u nauci i optimizacija složenih sistema.",
        Category = "Nauka",
        PictureUrl = "/images/articles/picture5"
    }

        };

        foreach(var article in articles) {
            context.Articles.Add(article);
        }

        context.SaveChanges();

       } 
    }
}