import React, {Component, Fragment} from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {DynamicCollage} from 'react-native-images-collage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {chooseImage} from './Tools';
import CollageLayout from './CollageLayout';

export default class ImageColl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      images: [
        require('./assets/empty.png'),
        require('./assets/empty.png'),
        require('./assets/empty.png'),
        require('./assets/empty.png'),
      ],
    };
  }
  componentDidMount() {
    console.log('matrix', this.props.matrix);
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <CollageLayout />
          {/* <DynamicCollage
            width={400}
            height={400}
            images={this.state.images}
            matrix={[3, 1]}
            direction="column"
            containerStyle={{height: '100%'}}
            onPress={(m, i) => chooseImage()}
          /> */}
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
