import CollageLayout from './CollageLayout';
import ImageColl from './ImageColl';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  CollageLayout: {screen: CollageLayout},
  ImageColl: {screen: ImageColl},
},{headerStyle: {
  height: 0,
  marginTop: 0,
  paddingTop: 10,
  paddingBottom: 30,
  backgroundColor: '#cb7429'
},});
const App = createAppContainer(MainNavigator);
export default App;
