import { useState } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import StudentTable from './Students/Students';
import LecturerTable from './Lecturers/Lecturers';
import LabManagerTable from './LabManagers/LabManagers';
import LabAssistantTable from './LabAssistants/LabAssistants';
import DepartmentTable from './Departments/Departments';
import LabTable from './Labs/Labs';
import AdminTable from './Admins/Admins';
import { ReactComponent as StudentIcon } from '../../../icons/Student.svg';
import { ReactComponent as LecturerIcon } from '../../../icons/Lecturer.svg';
import { ReactComponent as LabManagerIcon } from '../../../icons/LabManager.svg';
import { ReactComponent as LabAssistantIcon } from '../../../icons/LabAssistant.svg';
import { ReactComponent as AdminIcon } from '../../../icons/Admin.svg';
import { ReactComponent as DepartmentIcon } from '../../../icons/Department.svg';
import { ReactComponent as LabIcon } from '../../../icons/Lab.svg';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(
    createDrawerTile(
      'Students',
      <StudentIcon style={{ width: 24 }} />,
      <StudentTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'Lecturers',
      <LecturerIcon style={{ width: 24 }} />,
      <LecturerTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'LabManagers',
      <LabManagerIcon style={{ width: 24 }} />,
      <LabManagerTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'LabAssistants',
      <LabAssistantIcon style={{ width: 24 }} />,
      <LabAssistantTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'Admins',
      <AdminIcon style={{ width: 24 }} />,
      <AdminTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'Departments',
      <DepartmentIcon style={{ width: 24 }} />,
      <DepartmentTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile('Labs', <LabIcon style={{ width: 24 }} />, <LabTable />),
  );
  return drawerTiles;
};

export default function AdminDashboard() {
  const [currentDrawerTileIndex, setCurrentDrawerTileIndex] = useState(0);

  const drawerTiles = getDrawerTiles();
  const currentDrawerTile = drawerTiles[currentDrawerTileIndex];
  const handleDrawerTileChange = i => {
    setCurrentDrawerTileIndex(i);
  };

  return (
    <PageWrapper
      navBar={
        <Navbar
          showDrawer
          drawerTiles={drawerTiles}
          activeIndex={currentDrawerTileIndex}
          onDrawerTileClick={handleDrawerTileChange}
        />
      }
    >
      {currentDrawerTile.component}
    </PageWrapper>
  );
}
