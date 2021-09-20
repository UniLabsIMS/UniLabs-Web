import { Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import LabCard from './components/labCard';

function Labs() {
  const allLabs = [
    {
      name: 'CSE Lab1',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/CSE1.svg',
      id: 1,
    },
    {
      name: 'CSE Lab2',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/CSE2.svg',
      id: 2,
    },
    {
      name: 'ENTC Lab1',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/ENTC1.svg',
      id: 3,
    },
    {
      name: 'CE Lab1',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/CE1.svg',
      id: 4,
    },
    {
      name: 'ME Lab1',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/ME1.svg',
      id: 5,
    },
    {
      name: 'ME Lab2',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/ME2.svg',
      id: 6,
    },
    {
      name: 'CPE Lab1',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/CPE1.svg',
      id: 7,
    },
  ];

  const labs = allLabs.map(lab => (
    <Grid item key={lab.id}>
      {/* <h1>{lab.id}</h1> */}
      {/* <LabCard /> */}
      <LabCard lab={lab} />
    </Grid>
  ));

  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          All Labs
        </Typography>
      </Zoom>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        {labs}
      </Grid>
    </div>
  );
}

export default Labs;
