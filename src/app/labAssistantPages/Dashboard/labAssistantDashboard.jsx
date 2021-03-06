import { useState } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ItemCategories from './ItemCategories/itemCategories';
import BorrowedItems from './borrowedItems/borrowedItems';
import TemporaryBorrowedItems from './tempBorrowedItems/tempBorrowedItems';
import { ReactComponent as HomeIcon } from '../../../icons/Home.svg';
import { ReactComponent as ItemIcon } from '../../../icons/Item.svg';
import { ReactComponent as AltItemIcon } from '../../../icons/Lab.svg';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(
    createDrawerTile(
      'My Lab',
      <HomeIcon style={{ width: 24 }} />,
      <ItemCategories />,
    ),
    createDrawerTile(
      'Borrowed Items',
      <ItemIcon style={{ width: 24 }} />,
      <BorrowedItems />,
    ),
    createDrawerTile(
      'Temporarily Borrowed',
      <AltItemIcon style={{ width: 24 }} />,
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
