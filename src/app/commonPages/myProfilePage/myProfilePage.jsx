import { Zoom } from 'react-awesome-reveal';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import ProfileDetailsCard from './components/profileDetailsCard';

function MyProfilePage() {
  return (
    <PageWrapper navBar={<Navbar />}>
      <Zoom triggerOnce>
        <ProfileDetailsCard />
      </Zoom>
    </PageWrapper>
  );
}

export default MyProfilePage;
