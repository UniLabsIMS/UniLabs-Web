import { useEffect, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useDispatch } from 'react-redux';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ItemCategories from './ItemCategories/itemCategories';
import InventorySummary from './inventorySummary/inventorySummary';
import { resetLabManagerCategoriesState } from '../../../store/actions/labManager/labManagerCategoriesActions';

const createDrawerTile = (title, icon, component) => ({
  title,
  icon,
  component,
});

const getDrawerTiles = () => {
  const drawerTiles = [];
  drawerTiles.push(
    createDrawerTile('My Lab', <HomeIcon />, <ItemCategories />),
  );
  drawerTiles.push(
    createDrawerTile(
      'Inventory Summary',
      <BarChartIcon />,
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
      dispatch(resetLabManagerCategoriesState());
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
