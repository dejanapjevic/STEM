import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const QuizComponent = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {/* Lijeva strana - pitanje */}
        <Grid item xs={6}>
          <Typography variant="h5" component="div">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?
          </Typography>
        </Grid>

        {/* Desna strana - card sa slikom i pitanjima */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                <img src="https://via.placeholder.com/150" alt="Ilustracija osobe" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                a. Lorem ipsum dolor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                b. Lorem ipsum dolor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                c. Lorem ipsum dolor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                d. Lorem ipsum dolor
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizComponent;
