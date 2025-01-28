
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {

        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<STEMContext>()
            ?? throw new InvalidOperationException("Failed to retrieve STEM context");

            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user manager");

            SeedData(context, userManager).GetAwaiter().GetResult(); //provjeri ovo za await

        }

        private static async Task SeedData(STEMContext context, UserManager<User> userManager)
        {
            
            context.Database.Migrate();

            if(!userManager.Users.Any()) {

                var user = new User {
                    UserName="dejana@test.com",
                    Email="dejana@test.com",
                };

                await userManager.CreateAsync(user,"Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                 var admin = new User {
                    UserName="admin@test.com",
                    Email="admin@test.com",
                };

                await userManager.CreateAsync(admin,"Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, ["Member","Admin"]);
                                          }

            if (context.Articles.Any()) return;

            var articles = new List<Article> {

    new() {

        Title = "Napredak u oblasti nanotehnologije",
        Description = "Nanotehnologija je naučna oblast koja se bavi proučavanjem i manipulisanjem materijala na nanometarskoj skali.",
        Content = "Nanotehnologija je ključna za razvoj novih materijala i uređaja. Kroz kontrolu struktura na molekularnom nivou, inženjeri mogu stvoriti proizvode sa izuzetnim svojstvima. Na primer, u medicini, nanotehnologija omogućava precizno dostavljanje lekova direktno do ciljanih ćelija.",
        Category = "Nauka",
        PictureUrl = "/images/articles/picture2.jpg"
    },
    new() {

        Title = "Održivost u građevinskoj industriji",
        Description = "Korišćenje održivih materijala i tehnologija u građevinskoj industriji postaje ključni faktor za smanjenje ekološkog otiska.",
        Content = "Sustainable building practices are changing the landscape of architecture. The use of recycled materials, energy-efficient designs, and renewable energy sources are becoming standard. Engineers are now focusing on creating buildings that have minimal environmental impact, with advanced insulation and solar panel systems being widely used.",
        Category = "Inženjerstvo",
        PictureUrl = "/images/articles/picture1.jpg"
    },
    new() {

        Title = "Računarske mreže i budućnost interneta",
        Description = "Računarske mreže su osnova za globalnu povezanost, a njihova budućnost je u razvoju 5G i 6G tehnologija.",
        Content = "Računarske mreže omogućavaju prenos podataka širom sveta. Tehnologije kao što su 5G i 6G obećavaju revolucionarne promene u brzini internetske veze, povezanosti uređaja i načinu na koji koristimo internet. Inženjeri rade na izgradnji infrastrukture koja će omogućiti još brži i efikasniji internet.",
        Category = "Inženjerstvo",
        PictureUrl = "/images/articles/picture3.webp"
    },
    new() {

        Title = "Budućnost automobila sa električnim pogonom",
        Description = "Električni automobili predstavljaju budućnost automobilske industrije, a razvoj baterija je ključni faktor za njihov uspeh.",
        Content = "S obzirom na sve veću potrebu za smanjenjem emisije ugljen-dioksida, električni automobili postaju ključni element održivog saobraćaja. Napredak u baterijskim tehnologijama omogućava duži domet i brže punjenje, što je omogućilo širu upotrebu električnih vozila u svakodnevnom životu.",
        Category = "Inženjerstvo",
        PictureUrl = "/images/articles/picture4.jpg"
    },
    new() {

        Title = "Kako kvantno računarstvo menja svet tehnologije",
        Description = "Kvantno računarstvo ima potencijal da reši probleme koji su previše složeni za klasične računare.",
        Content = "Kvantno računarstvo koristi principe kvantne mehanike kako bi obradio informacije na način koji nije moguć sa klasičnim računarima. Ova tehnologija može revolucionirati oblasti kao što su sigurnost podataka, simulacije u nauci i optimizacija složenih sistema.",
        Category = "Nauka",
        PictureUrl = "/images/articles/picture5.jpg"
    },
    new() {
    Title = "Revolucija u veštačkoj inteligenciji",
    Description = "Veštačka inteligencija (AI) menja način na koji razmišljamo o računarskim sistemima.",
    Content = "Veštačka inteligencija je tehnologija koja omogućava računarima da obavljaju zadatke koji tradicionalno zahtevaju ljudsku inteligenciju. AI sistemi uče iz podataka, prepoznaju obrasce, i na osnovu toga donose odluke, što im omogućava da unaprede mnoge industrije. U proizvodnji, AI se koristi za automatizaciju procesa i optimizaciju lanaca snabdevanja, dok u medicini omogućava precizniju dijagnostiku i razvoj personalizovanih tretmana. Algoritmi za prepoznavanje slika i prirodnog jezika koriste se u prepoznavanju bolesti kao što su rak ili srčani problemi, dok sistemi za duboko učenje unapređuju tehnologije autonomnih vozila i robota.",
    Category = "Tehnologija",
    PictureUrl = "/images/articles/picture3.webp"
},

new() {
    Title = "Napredak u kvantnoj računarstvu",
    Description = "Kvantno računarstvo obećava da će rešiti probleme koje klasični računari ne mogu.",
    Content = "Kvantno računarstvo je nova grana računarstva koja koristi kvantne bitove ili kubite. Za razliku od tradicionalnih računara, koji koriste binarne bitove, kubiti mogu biti u više stanja simultano, što omogućava kvantnim računarima da rešavaju veoma složene probleme u mnogo kraćem vremenskom periodu. Kvantni računari koriste kvantne fenomene kao što su superpozicija i zapetljavanje da bi postigli neviđenu računarsku snagu. Ovi napreci mogu značajno uticati na oblasti poput šifrovanja podataka, simulacije molekularnih interakcija u farmaceutskoj industriji, kao i u optimizaciji kompleksnih problema u logistikama i industriji. Kvantno računarstvo je i dalje u fazi istraživanja, ali se očekuje da će transformisati mnoge industrije u budućnosti.",
    Category = "Tehnologija",
    PictureUrl = "/images/articles/picture4.jpg"
},

new() {
    Title = "Sistemi obnovljivih izvora energije",
    Description = "Obnovljivi izvori energije predstavljaju održivu budućnost u borbi protiv klimatskih promena.",
    Content = "Obnovljivi izvori energije, kao što su solarna, vetroturbinska, hidroenergija i biomasu, postaju sve značajniji u globalnom energetskom miksu. Ovi izvori su ključni za smanjenje emisije štetnih gasova, smanjenje zavisnosti od fosilnih goriva i postizanje ciljeva održivog razvoja. Solarni paneli i vetroturbine postaju sve efikasniji, sa većim kapacitetima proizvodnje energije uz niže troškove instalacije i održavanja. U nekim regionima, kao što su Severna Evropa, vetroturbine pružaju značajan deo potrebne energije. Hidroenergija, koja se već dugo koristi, omogućava stabilan i predvidljiv izvor energije. Međutim, energija iz biomase i geotermalna energija također igraju važnu ulogu u održivim energetskim sistemima, koji su otporni na klimatske promene.",
    Category = "Inženjerstvo",
    PictureUrl = "/images/articles/picture5.jpg"
},

new() {
    Title = "3D štampanje: Novi horizonti proizvodnje",
    Description = "3D štampanje omogućava izradu složenih objekata po preciznim specifikacijama.",
    Content = "3D štampanje, poznato i kao aditivna proizvodnja, koristi digitalne modele da stvori fizičke objekte, jedan sloj po sloj. Ova tehnologija omogućava proizvodnju objekata sa veoma kompleksnim oblicima, koji bi bili veoma teški ili skupi za izradu tradicionalnim metodama. U industriji, 3D štampanje omogućava brzu izradu prototipova, čime se ubrzava razvoj proizvoda i smanjuju troškovi. Takođe, 3D štampanje se koristi za proizvodnju personalizovanih medicinskih uređaja, kao što su implantati i proteze koje se tačno prilagođavaju potrebama pacijenta. U automobilskoj industriji, 3D štampanje omogućava brzu proizvodnju rezervnih delova, dok u građevinskoj industriji postoje eksperimenti sa 3D štampanjem čitavih zgrada. Ova tehnologija pruža nove mogućnosti za efikasnost i prilagodljivost u proizvodnji.",
    Category = "Inženjerstvo",
    PictureUrl = "/images/articles/picture1.jpg"
},

new() {
    Title = "Veze između matematike i prirodnih nauka",
    Description = "Matematika je temelj za razumevanje zakona prirode.",
    Content = "Matematika je jezik prirodnih nauka. Kroz matematičke modele, naučnici mogu da precizno predviđaju ponašanje prirodnih sistema. Na primer, zakon gravitacije, koji je formulisan pomoću diferencijalnih jednadžbi, opisuje kako tela u svemiru utiču jedno na drugo. Slično tome, matematički modeli predviđaju širenje bolesti u populacijama, što pomaže u oblikovanju javnozdravstvenih politika. Matematičke teorije kao što su statistika, verovatnoća i analiza podataka ključne su u fizici, biologiji, hemiji i ekologiji. Sa novim alatima kao što su računarski programi i simulacije, matematika omogućava da se testiraju hipoteze i predviđaju efekti promena u sistemima, čineći naučno istraživanje preciznijim i bržim.",
    Category = "Matematika",
    PictureUrl = "/images/articles/picture1.jpg"
},

new() {
    Title = "Nanomaterijali: Promena u materijalskim naukama",
    Description = "Nanomaterijali nude poboljšane karakteristike kao što su čvrstoća, fleksibilnost i vodljivost.",
    Content = "Nanomaterijali su materijali čija struktura na nano skali daje im izuzetna svojstva u odnosu na njihove veće komponente. Na primer, grafen, jedan od najpoznatijih nanomaterijala, je izuzetno jak, ali istovremeno veoma lagan i dobar provodnik električne energije. Nanomaterijali se koriste u raznim industrijama, uključujući elektroniku, medicinu, energetiku i zaštitu životne sredine. U elektronici, omogućavaju razvoj manjih, bržih i efikasnijih uređaja, dok u medicini mogu poboljšati preciznost dijagnoze i tretmana, kao što je u terapijama za ciljano dostavljanje lekova. Takođe, nanomaterijali se koriste u razvoju novih tipova baterija i fotonaponskih ćelija koje mogu značajno poboljšati efikasnost obnovljivih izvora energije.",
    Category = "Nauka",
    PictureUrl = "/images/articles/picture1.jpg"
},

new() {
    Title = "Razvoj tehnologija za autonomna vozila",
    Description = "Autonomna vozila postaju realnost zahvaljujući napretku u senzorima i veštačkoj inteligenciji.",
    Content = "Tehnologija autonomnih vozila koristi napredne senzore poput LIDAR-a, radara i kamera kako bi omogućila vozilima da 'vide' i analiziraju svoju okolinu. Kombinovanjem ovih senzora sa veštačkom inteligencijom, autonomna vozila mogu doneti odluke kao što su kočenje, ubrzanje i skretanje, bez ljudske intervencije. S obzirom na to da vozila mogu komunicirati sa drugim vozilima i sa infrastrukturom, mogu se postići viši nivoi bezbednosti na putevima, smanjiti saobraćajne nesreće i olakšati saobraćajnu kontrolu. Ova tehnologija ima potencijal da preoblikuje transport, smanjujući saobraćajne gužve, troškove goriva i emisiju CO2. Autonomna vozila takođe mogu poboljšati mobilnost za starije i osobe sa invaliditetom, omogućavajući im veću nezavisnost.",
    Category = "Tehnologija",
    PictureUrl = "/images/articles/picture1.jpg"
},

new() {
    Title = "Budućnost biotehnologije u medicini",
    Description = "Biotehnologija omogućava nove pristupe u lečenju bolesti.",
    Content = "Biotehnologija koristi biološke procese za razvoj novih terapija, lekova i medicinskih uređaja. Jedan od najuzbudljivijih napredaka u ovom polju je razvoj CRISPR tehnologije, koja omogućava precizno modifikovanje DNK. Ova tehnologija omogućava lekare da leče genetske bolesti, kao što su cistična fibroza ili hemofilija, direktnim ispravljanjem grešaka u DNK pacijenta. Biotehnologija se takođe koristi za proizvodnju bioloških lekova, kao što su vakcine, antitela i terapije zasnovane na ćelijama. Personalizovana medicina, koja koristi genetske informacije pacijenata za kreiranje specifičnih tretmana, postaje sve češća praksa. Biotehnologija pruža potencijal za transformaciju zdravstvene zaštite, omogućavajući preciznije i efikasnije lečenje.",
    Category = "Nauka",
    PictureUrl = "/images/articles/picture1.jpg"
},
new() {
    Title = "Razumevanje crnih rupa kroz teoriju relativnosti",
    Description = "Teorija relativnosti pruža uvid u misteriozni svet crnih rupa.",
    Content = "Crne rupe su objekti u svemiru sa tako velikom gravitacijom da ništa, pa čak ni svetlost, ne može da pobegne iz njih. Prema Ajnštajnovoj opštoj teoriji relativnosti, gravitacija nije samo privlačenje, već zakrivljuje prostor-vreme, a crne rupe predstavljaju ekstremne tačke ove zakrivljenosti. Njihovo postojanje je dokazano kroz teleskopske slike, kao što je ona koju je napravio Event Horizon Telescope, koji je prikazao prvi snimak horizonta događaja crne rupe. Crne rupe su fascinantni predmeti za astronome jer mogu da pomognu u testiranju teorija o gravitaciji i kvantnim fenomenima. Iako su predmet istraživanja već duže vreme, crne rupe ostaju jedan od najvećih misterija u astrofizici.",
    Category = "Nauka",
    PictureUrl = "/images/articles/picture1.jpg"
},
new() {
    Title = "Matematički modeli za klimatske promene",
    Description = "Matematika je ključ u predviđanju uticaja klimatskih promena.",
    Content = "Klimatske promene postale su jedan od najvećih izazova sa kojima se svet suočava. Korišćenjem matematičkih modela, naučnici mogu da predviđaju kako se klima menja, na osnovu podataka o emisijama ugljen-dioksida, globalnim temperaturama, i promenama u atmosferi. Ovi modeli pomažu u razumevanju budućih scenarija kao što su porast nivoa mora, promene u padavinama, i učinci na ekosisteme. Takođe, statistički modeli pomažu u proceni verovatnoće ekstrema, kao što su poplave, suše i uragani. Predviđanje klimatskih promena je od suštinskog značaja za razvoj politika koje mogu smanjiti uticaj na životnu sredinu i ljudsku populaciju.",
    Category = "Matematika",
    PictureUrl = "/images/articles/picture1.jpg"
},
new() {
    Title = "Razumevanje crnih rupa kroz teoriju relativnosti",
    Description = "Teorija relativnosti pruža uvid u misteriozni svet crnih rupa.",
    Content = "Crne rupe su objekti u svemiru sa tako velikom gravitacijom da ništa, pa čak ni svetlost, ne može da pobegne iz njih. Prema Ajnštajnovoj opštoj teoriji relativnosti, gravitacija nije samo privlačenje, već zakrivljuje prostor-vreme, a crne rupe predstavljaju ekstremne tačke ove zakrivljenosti. Njihovo postojanje je dokazano kroz teleskopske slike, kao što je ona koju je napravio Event Horizon Telescope, koji je prikazao prvi snimak horizonta događaja crne rupe. Crne rupe su fascinantni predmeti za astronome jer mogu da pomognu u testiranju teorija o gravitaciji i kvantnim fenomenima. Iako su predmet istraživanja već duže vreme, crne rupe ostaju jedan od najvećih misterija u astrofizici.",
    Category = "Nauka",
    PictureUrl = "/images/articles/picture1.jpg"
},
new() {
    Title = "Razumjevanje crnih rupa kroz teoriju relativnosti",
    Description = "Teorija relativnosti pruža uvid u misteriozni svet crnih rupa.",
    Content = "Crne rupe su objekti u svemiru sa tako velikom gravitacijom da ništa, pa čak ni svetlost, ne može da pobegne iz njih. Prema Ajnštajnovoj opštoj teoriji relativnosti, gravitacija nije samo privlačenje, već zakrivljuje prostor-vreme, a crne rupe predstavljaju ekstremne tačke ove zakrivljenosti. Njihovo postojanje je dokazano kroz teleskopske slike, kao što je ona koju je napravio Event Horizon Telescope, koji je prikazao prvi snimak horizonta događaja crne rupe. Crne rupe su fascinantni predmeti za astronome jer mogu da pomognu u testiranju teorija o gravitaciji i kvantnim fenomenima. Iako su predmet istraživanja već duže vreme, crne rupe ostaju jedan od najvećih misterija u astrofizici.",
    Category = "Nauka",
    PictureUrl = "/images/articles/picture1.jpg"
},
new() {
    Title = "Razumjevanje crnih rupa kroz teoriju relativnosti",
    Description = "Teorija relativnosti pruža uvid u misteriozni svet crnih rupa.",
    Content = "Crne rupe su objekti u svemiru sa tako velikom gravitacijom da ništa, pa čak ni svetlost, ne može da pobegne iz njih. Prema Ajnštajnovoj opštoj teoriji relativnosti, gravitacija nije samo privlačenje, već zakrivljuje prostor-vreme, a crne rupe predstavljaju ekstremne tačke ove zakrivljenosti. Njihovo postojanje je dokazano kroz teleskopske slike, kao što je ona koju je napravio Event Horizon Telescope, koji je prikazao prvi snimak horizonta događaja crne rupe. Crne rupe su fascinantni predmeti za astronome jer mogu da pomognu u testiranju teorija o gravitaciji i kvantnim fenomenima. Iako su predmet istraživanja već duže vreme, crne rupe ostaju jedan od najvećih misterija u astrofizici.",
    Category = "Nauka",
    PictureUrl = "/images/articles/picture1.jpg"
     }
        };

        context.Articles.AddRange(articles);
        context.SaveChanges();
    }

    }
}