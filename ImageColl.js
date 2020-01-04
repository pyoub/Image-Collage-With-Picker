import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {DynamicCollage} from 'react-native-images-collage';
import {chooseImage} from './Tools';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import {
  TestIds,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

export default class ImageColl extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.setRef = this.setRef.bind(this);
    this.state = {
      uri: '',
      imgDisplay: '',
      fileUri: '',
      direction: navigation.getParam('direction'),
      matrix: navigation.getParam('matrix'),
      images: navigation.getParam('images'),
      isloading: false,
    };
    interstitial.load();
  }
  setRef(input) {
    this.childRef = input;
  }
  render() {
    return (
      <Fragment>
        <ViewShot
          ref="viewShot"
          style={{backgroundColor: '#000', height: '90%'}}
          options={{format: 'jpg', quality: 1}}>
          <View>
            <DynamicCollage
              style={{height: '100%'}}
              images={this.state.images}
              matrix={this.state.matrix}
              direction={this.state.direction}
              containerStyle={{height: '100%'}}
              onPress={(m, i) =>
                chooseImage(rep => {
                  if (rep.uri && rep.uri != '') {
                    let list = this.state.images;
                    let t = this.state.matrix.filter(
                      (v, index, self) => index < m,
                    );
                    let s = 0;
                    if (t.length > 0) {
                      s = t.reduce((a, b) => a + b);
                    }
                    list[s + i] = rep.uri;
                    this.setState({images: list});
                  }
                })
              }
              isButtonVisible={true}
              img={require('./assets/icon-add.png')}
              setRef={this.setRef}
              imgDisplay={this.state.imgDisplay}
            />
          </View>
        </ViewShot>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({imgDisplay: 'none', isloading: true});
            if (interstitial.loaded) {
              interstitial.show();
            }
            setTimeout(
              () =>
                this.refs.viewShot.capture().then(uri => {
                  CameraRoll.saveToCameraRoll(uri, 'photo');
                  interstitial.load();
                  ToastAndroid.show(
                    'Image Saved to gallery!',
                    ToastAndroid.LONG,
                  );
                  this.setState({imgDisplay: '',isloading:false});
                }),
              1000,
            );
          }}
          title="Save">
          <View
            style={{
              height: '10%',
              width: '100%',
              backgroundColor: '#c242f5',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 30}}>Save</Text>
          </View>
        </TouchableWithoutFeedback>
        {this.state.isloading && (
          <View
            style={{
              zIndex: 9999,
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: '#fff',
              opacity: 0.4,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#3000ff" />
          </View>
        )}
      </Fragment>
    );
  }
}
