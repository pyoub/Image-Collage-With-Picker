import CollageLayout from './CollageLayout';
import ImageColl from './ImageColl';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  CollageLayout: {screen: CollageLayout},
  ImageColl: {screen: ImageColl},
});
const App = createAppContainer(MainNavigator);
export default App;
