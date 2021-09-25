import { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ItemCategories from './ItemCategories/itemCategories';
import BorrowedItems from './borrowedItems/borrowedItems';
import TemporaryBorrowedItems from './tempBorrowedItems/tempBorrowedItems';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(
    createDrawerTile('My Lab', <HomeIcon />, <ItemCategories />),
    createDrawerTile('Borrowed Items', <HomeIcon />, <BorrowedItems />),
    createDrawerTile(
      'Temporarily Borrowed Items',
      <HomeIcon />,
      <TemporaryBorrowedItems />,
    ),
  );
  return drawerTiles;
};

export default function LabAssistantDashboard() {
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
