import React, {Component} from 'react';
import {View, TouchableHighlight, FlatList} from 'react-native';
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
    LD.forEach(k => {
      k.forEach((x, i) => {
        x.matrix.forEach(m => {
          for (var j = 0; j < m; j++) {
            images.push(require('./assets/empty.jpg'));
          }
        });
        x.images = images;
        x.key = i;
        layoutData.push(x);
        images = [];
      });
    });
    layoutData.filter((value, index, self) => {
      index === self.findIndex(t => value.matr);
    });
    this.setState({LayoutData: layoutData});
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <FlatList
        data={this.state.LayoutData}
        renderItem={({item}) => (
          <View>
          <TouchableHighlight style={{
                  zIndex: 999999,
                  elevation: 50,
                }}
                onPress={() => console.log('aaaaa')}>

              <DynamicCollage
                width={400}
                height={400}
                scaleAmplifier = {0}
                images={item.images}
                matrix={item.matrix}
                direction={item.direction}
                isButtonVisible={false}
              />

            </TouchableHighlight>
          </View>
        )}
      />
    );
  }
}
