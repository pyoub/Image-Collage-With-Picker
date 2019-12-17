import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, FlatList} from 'react-native';
import {
  LayoutData,
  StaticCollage,
  DynamicCollage,
} from 'react-native-images-collage';

export default class CollageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LayoutData: [],
    };
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
      <FlatList
        data={this.state.LayoutData}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <View
            style={{
              width: 400,
              height: 400,
            }}>
            <View
              style={{
                zIndex: 99,
                position: 'absolute',
                width: 400,
                height: 400,
                backgroundColor: 'green',
                opacity: 0.2,
              }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigate('ImageColl', {
                    matrix: item.matrix,
                    images: item.images,
                    direction: item.direction,
                  })
                }>
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
              width={400}
              images={item.images}
              matrix={item.matrix}
              direction={item.direction}
              isButtonVisible={true}
            />
          </View>
        )}
      />
    );
  }
}
