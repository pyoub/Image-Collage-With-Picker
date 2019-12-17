import ImagePicker from 'react-native-image-picker';

export const chooseImage = func => {
  // let options = {
  //   title: 'Select Image',
  //   customButtons: [
  //     {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  //   ],
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker({}, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // alert(JSON.stringify(response));s
      console.log('response', JSON.stringify(response));
      // this.setState({
      //   filePath: response,
      //   fileData: response.data,
      //   fileUri: response.uri,
      // });
      func(response);
    }
  });
};

export const launchCamera = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};
      console.log('response', JSON.stringify(response));
      this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri,
      });
    }
  });
};

export const launchImageLibrary = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};
      console.log('response', JSON.stringify(response));
      this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri,
      });
    }
  });
};
