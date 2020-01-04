import React, {Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {LayoutData, DynamicCollage} from 'react-native-images-collage';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

export default class CollageLayout extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      LayoutData: [],
      isloading: false,
    };
    interstitial.load();
  }

  componentDidMount() {
    let LD = Object.values(LayoutData);
    let layoutData = [];
    let images = [];
    let key = 0;
    LD.forEach(k => {
      k.forEach((x, i) => {
        x.matrix.forEach(m => {
          for (var j = 0; j < m; j++) {
            images.push(require('./assets/empty.jpg'));
          }
        });
        x.images = images;
        x.key = key;
        layoutData.push(x);
        images = [];
        key++;
      });
    });
    this.setState({LayoutData: layoutData});
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advert failed to load: ', error);
          }}
        />
        <FlatList
          data={this.state.LayoutData}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                height: 400,
              }}>
              <View
                style={{
                  zIndex: 99,
                  position: 'absolute',
                  width: '100%',
                  height: 400,
                  backgroundColor: 'green',
                  opacity: 0.2,
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({isloading: true});
                    if (interstitial.loaded) {
                      interstitial.show();
                    }
                    setTimeout(() => {
                      interstitial.load();
                      navigate('ImageColl', {
                        matrix: item.matrix,
                        images: item.images,
                        direction: item.direction,
                      });
                      this.setState({isloading: false});
                    }, 1000);
                  }}>
                  <View
                    style={{
                      zIndex: 99,
                      width: 400,
                      height: 400,
                      opacity: 0,
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
              <DynamicCollage
                height={400}
                images={item.images}
                matrix={item.matrix}
                direction={item.direction}
                isButtonVisible={true}
              />
            </View>
          )}
        />
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
      </View>
    );
  }
}
