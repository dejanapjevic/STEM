import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";

const HorizontalTimelines = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
      }}
    >
      {/* Prvi Timeline - STEM novosti i STEM kviz */}
      <Box style={{ flex: 1, margin: 0 }}>
        <Timeline position="alternate"  >
          <TimelineItem >
            <TimelineOppositeContent>
              <Typography variant="body2" className="ani">
                STEM novosti vam omogućavaju da svakodnevno budete u toku sa
                najnovijim dešavanjima iz svijeta nauke, tehnologije, inženjeringa
                i matematike.Ova sekcija pruža ažurirane i relevantne članke
                koji pokrivaju inovacije, istraživanja i otkrića, kao i važne
                događaje i trendove u STEM oblasti.Bilo da ste student,
                profesionalac ili entuzijasta, uvijek ćete moći da pratite
                najnovije informacije i ostanete u korak sa razvojem STEM
                discipline.
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator >
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">STEM novosti</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem >
            <TimelineOppositeContent>
              <Typography variant="body2" className="ani">
                STEM kviz je interaktivan i zabavan način da testirate svoje
                znanje iz oblasti nauke, tehnologije, inženjeringa i matematike.
                Svakodnevno ćete imati priliku da se suočite sa različitim
                pitanjima koja se stalno mijenjaju, pružajući vam izazove koji će
                vas motivisati da učite i usavršavate se.Bez obzira na nivo
                vašeg znanja, kviz vam nudi šansu da se zabavite, učite nove
                stvari i stalno pomjerate granice svog razumjevanja STEM svijeta.
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">STEM kviz</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>

      {/* Drugi Timeline - Izbori karijere i Forum za diskusiju */}
      <Box style={{ flex: 1 }}>
        <Timeline position="alternate">
          <TimelineItem >
            <TimelineOppositeContent>
              <Typography variant="body2" className="ani">
                Izbori karijere vam omogućavaju da otkrijete koja STEM oblast je
                najbolja za vas kroz interaktivan test.Pitanja se zasnivaju na
                aktivnostima iz svakodnevnog života, što vam pomaže da sagledate
                svoje interesovanje i sposobnosti u kontekstu nauke,
                tehnologije, inženjeringa i matematike.Kroz ovaj test, bićete u
                mogućnosti da saznate koja STEM oblast vam najviše odgovara i
                koja bi mogla da postane vaša buduća karijera. Ovaj alat vam
                pruža vrijedne informacije i usmjerenje za vaš profesionalni razvoj.
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Izbori karijere</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem >
            <TimelineOppositeContent>
              <Typography variant="body2" className="ani">
                Forum za diskusiju je mesto gde možete da se povežete sa drugim
                korisnicima, razmenjujete ideje, postavljate pitanja i
                učestvujete u dijalogu o različitim STEM temama. Kroz ovaj
                forum, možete deliti svoja iskustva, učiti od drugih i razvijati
                svoje razumevanje nauke, tehnologije, inženjeringa i matematike.
                Bilo da ste početnik ili stručnjak, forum pruža priliku za
                konstruktivnu diskusiju i zajedničko učenje.
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Forum za diskusiju</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </Box>
  );
};

export default HorizontalTimelines;
