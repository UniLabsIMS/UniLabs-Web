import { useState } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import StudentTable from './Students/Students';
import LecturerTable from './Lecturers/Lecturers';
import LabManagerTable from './LabManagers/LabManagers';
import LabAssistantTable from './LabAssistants/LabAssistants';
import DepartmentTable from './Departments/Departments';
import LabTable from './Labs/Labs';
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
    createDrawerTile('Students', <StudentIcon />, <StudentTable />),
  );
  drawerTiles.push(
    createDrawerTile('Lecturers', <LecturerIcon />, <LecturerTable />),
  );
  drawerTiles.push(
    createDrawerTile('LabManagers', <LabManagerIcon />, <LabManagerTable />),
  );
  drawerTiles.push(
    createDrawerTile(
      'LabAssistants',
      <LabAssistantIcon />,
      <LabAssistantTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile('Admins', <AdminIcon />, <div>Admins Table</div>),
  );
  drawerTiles.push(
    createDrawerTile('Departments', <DepartmentIcon />, <DepartmentTable />),
  );
  drawerTiles.push(createDrawerTile('Labs', <LabIcon />, <LabTable />));
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
