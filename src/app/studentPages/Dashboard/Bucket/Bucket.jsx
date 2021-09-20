import { Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PageWrapper from '../../../commonComponents/PageWrapper';
import DisplayBucketItemCard from './components/DisplayBucketItemCard';
import RequestBucket from './components/BucketRequestForm';

function BucketPage() {
  const allDisplayItems = [
    {
      name: 'Item 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 1,
      quantity: 2,
    },
    {
      name: 'Item 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 2,
      quantity: 5,
    },
    {
      name: 'Item 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 4,
      quantity: 1,
    },
    {
      name: 'Item 7',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 7,
      quantity: 4,
    },
  ];

  const displayItems = allDisplayItems.map(displayItem => (
    <Grid item key={displayItem.id}>
      <DisplayBucketItemCard displayItem={displayItem} />
    </Grid>
  ));

  return (
    <PageWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          My Bucket
        </Typography>
      </Zoom>
      <Zoom triggerOnce>
        <RequestBucket />
      </Zoom>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="stretch"
        direction="column"
      >
        {displayItems}
      </Grid>
    </PageWrapper>
  );
}

export default BucketPage;
