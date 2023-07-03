import MyRockets from './child/myRockets';
import MyMissions from './child/myMissions';
import MyAnimes from './child/myAnimes';

const MyProfile = () => (
  <div id="myprofile">
    <MyMissions />
    <MyRockets />
    <MyAnimes />
  </div>
);

export default MyProfile;
