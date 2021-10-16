import { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ItemCategories from './ItemCategories/itemCategories';
import LabSummary from './LabSummary/labSummary';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(createDrawerTile('Lab', <HomeIcon />, <ItemCategories />));
  drawerTiles.push(
    createDrawerTile('Lab Summary', <BarChartIcon />, <LabSummary />),
  );
  return drawerTiles;
};

export default function LabManagerDashboard() {
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
