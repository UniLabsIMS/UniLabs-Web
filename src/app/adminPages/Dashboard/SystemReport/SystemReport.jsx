import { Box, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import ItemSummary from './components/ItemSummary';
import SystemSummary from './components/SystemSummary';
import UserSummary from './components/UserSummary';

const SystemReport = () => (
  <div>
    <Zoom triggerOnce>
      <Typography variant="h4" gutterBottom align="center">
        System Report
      </Typography>
    </Zoom>
    <UserSummary
      totalUsers={8}
      admins={4}
      students={1}
      lecturers={1}
      labMangers={1}
      labAssistants={1}
    />
    <Box m={5} />
    <ItemSummary
      totalItems={5}
      availableItems={5}
      damagedItems={5}
      borrowedItems={5}
      tempBorrowedItems={5}
    />
    <Box m={5} />
    <SystemSummary
      totalDepartments={10}
      totalLabs={10}
      totalCategories={10}
      totalDisplayItems={10}
      totalItems={10}
    />
  </div>
);

export default SystemReport;
