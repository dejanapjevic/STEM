import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Grid2 } from '@mui/material';

interface Tutorial {
  id: number;
  name: string;
  imagePath: string;
}

const Tutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Poziv API-ja za preuzimanje tutorijala
  useEffect(() => {
    axios
      .get('http://localhost:5211/api/Video/get-all-tutorials') // API endpoint
      .then((response) => {
        setTutorials(response.data); // Čuvanje podataka u state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Greška pri preuzimanju podataka:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Učitavanje...</div>;
  }

  return (
    <Grid2 container spacing={4} justifyContent="center" paddingTop="2%">
      {tutorials.map((tutorial) => (
        <Grid item key={tutorial.id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={tutorial.imagePath}
              alt={tutorial.name}
            />
            <CardContent>
              <Typography variant="h6" component="div" noWrap>
                {tutorial.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid2>
  );
};

export default Tutorials;
