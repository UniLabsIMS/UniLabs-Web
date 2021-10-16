import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ItemCategories from './ItemCategories/itemCategories';
import InventorySummary from './inventorySummary/inventorySummary';
import { resetLabManagerDashboardState } from '../../../store/actions/labManager/labManagerDashboardActions';
import { ReactComponent as Graphs } from '../../../icons/Graphs.svg';
import { ReactComponent as Home } from '../../../icons/Home.svg';

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
      <Home style={{ width: 24 }} />,
      <ItemCategories />,
    ),
  );
  drawerTiles.push(
    createDrawerTile(
      'Inventory Summary',
      <Graphs style={{ width: 24 }} />,
      <InventorySummary />,
    ),
  );
  return drawerTiles;
};

export default function LabManagerDashboard() {
  const [currentDrawerTileIndex, setCurrentDrawerTileIndex] = useState(0);
  const dispatch = useDispatch();
  const drawerTiles = getDrawerTiles();
  const currentDrawerTile = drawerTiles[currentDrawerTileIndex];
  const handleDrawerTileChange = i => {
    setCurrentDrawerTileIndex(i);
  };
  useEffect(
    () => () => {
      dispatch(resetLabManagerDashboardState());
    },
    [dispatch],
  );

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
