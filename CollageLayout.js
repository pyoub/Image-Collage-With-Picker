import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {LayoutData, StaticCollage} from 'react-native-images-collage';

export default class CollageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LayoutData: [],
    };
  }
  componentWillMount() {
    let LD = LayoutData;
    let images = [];
    LD.forEach((x, i) => {
      x.matrix.forEach(m => {
        for (var j = 0; j < m; j++) {
          images.push(require('./assets/empty.jpg'));
        }
      });
      LD[i].images = images;
      images = [];
    });
    this.setState({LayoutData: LD});
  }
  render() {
    return (
      <FlatList
        data={this.state.LayoutData}
        renderItem={({item}) => (
          <StaticCollage
            width={400}
            height={400}
            images={item.images}
            matrix={item.matrix}
            direction={item.direction}
          />
        )}
      />
    );
  }
}
