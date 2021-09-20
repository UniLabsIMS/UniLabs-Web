import { useState } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import Labs from './Labs/Labs';
import BucketPage from './Bucket/Bucket';
import BurrowedItemsTable from './Borrowed Items/BurrowedItems';
import { ReactComponent as LabIcon } from '../../../icons/Lab.svg';
import { ReactComponent as BucketIcon } from '../../../icons/Bucket.svg';
import { ReactComponent as BorrowIcon } from '../../../icons/Borrow.svg';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(
    createDrawerTile('All Labs', <LabIcon style={{ width: 24 }} />, <Labs />),
  );
  drawerTiles.push(
    createDrawerTile(
      'Burrowed Items',
      <BorrowIcon style={{ width: 24 }} />,
      <BurrowedItemsTable />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'My Bucket',
      <BucketIcon style={{ width: 24 }} />,
      <BucketPage />,
    ),
  );
  return drawerTiles;
};

export default function StudentDashboard() {
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
