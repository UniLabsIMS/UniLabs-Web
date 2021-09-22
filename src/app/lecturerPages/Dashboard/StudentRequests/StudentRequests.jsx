import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import StudentRequestCard from './components/StudentRequestCard';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  cards: {
    width: '100%',
    borderRadius: '5',
  },
}));

function StudentRequestsPage() {
  const classes = useStyles();

  const allStudentRequests = [
    {
      lab: 'Lab1',
      studentName: 'Student 1',
      reason:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      createdAt: '01/01/2020',
      requestedItems: [
        {
          name: 'Item 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 1,
        },
        {
          name: 'Item 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 2,
        },
        {
          name: 'Item 3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 3,
        },
        {
          name: 'Item 4',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 4,
        },
        {
          name: 'Item 5',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 5,
        },
        {
          name: 'Item 6',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 6,
        },
        {
          name: 'Item 7',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 7,
        },
      ],
      id: 1,
    },
    {
      lab: 'Lab1',
      studentName: 'Student 2',
      reason:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      createdAt: '01/01/2020',
      requestedItems: [
        {
          name: 'Item 6',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 6,
        },
        {
          name: 'Item 7',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 7,
        },
      ],
      id: 2,
    },
    {
      lab: 'Lab1',
      studentName: 'Student 3',
      reason:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      createdAt: '01/01/2020',
      requestedItems: [
        {
          name: 'Item 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 1,
        },
        {
          name: 'Item 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 2,
        },
        {
          name: 'Item 3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 3,
        },
        {
          name: 'Item 7',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 7,
        },
      ],
      id: 3,
    },
    {
      lab: 'Lab1',
      studentName: 'Student 4',
      reason:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      createdAt: '01/01/2020',
      requestedItems: [
        {
          name: 'Item 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 1,
        },
        {
          name: 'Item 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 2,
        },
        {
          name: 'Item 4',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 4,
        },
        {
          name: 'Item 6',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
          image: '/images/default-display-item-img.svg',
          id: 6,
        },
      ],
      id: 4,
    },
  ];

  const requests = allStudentRequests.map(studentReq => (
    <Grid item key={studentReq.id}>
      <StudentRequestCard studentReq={studentReq} />
    </Grid>
  ));

  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          All Student Requests
        </Typography>
      </Zoom>
      <div className={classes.cards}>{requests}</div>
    </div>
  );
}

export default StudentRequestsPage;
