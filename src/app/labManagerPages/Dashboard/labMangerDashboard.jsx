import { useState } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ItemCategories from './ItemCategories/itemCategories';
import LabSummary from './LabSummary/labSummary';
import { ReactComponent as HomeIcon } from '../../../icons/Home.svg';
import { ReactComponent as GraphIcon } from '../../../icons/Graphs.svg';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(
    createDrawerTile(
      'Lab',
      <HomeIcon style={{ width: 24 }} />,
      <ItemCategories />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'Lab Summary',
      <GraphIcon style={{ width: 24 }} />,
      <LabSummary />,
    ),
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
