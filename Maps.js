import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity
} from 'react-native';
import Gallery from 'react-native-image-gallery';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';

var { height, width } = Dimensions.get('screen');
const Separator = () => {
  return <View style={styles.separator} />;
}

const Maps = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [anothermodalVisible, setAnotherModalVisible] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", marginTop:15,  }}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible);
              }}><Image 
          resizeMode={ImageResizeMode.contain} 
          source={require('./assets/novaya_karta.png')} 
          style={{flex:1, width: 350, height: 255 }} /></TouchableOpacity>
        <Separator />
        <TouchableOpacity onPress={() => {
                setAnotherModalVisible(!anothermodalVisible);
              }}><Image source={require('./assets/Snimok_ekrana_2019-11-23_v_15_26_14.png')} style={{height:250, width:352,backgroundColor:'white'}}/>
      </TouchableOpacity></ScrollView >
      <Modal
      visible={modalVisible}
      animationType="fade"
      >
      <Gallery
      onSingleTapConfirmed={() => {
        setModalVisible(!modalVisible);
      }}
      useNativeDriver={true}
        style={{backgroundColor:'white', flex:2}}
        images={[
          { source: require('./assets/novaya_karta.png'), dimensions: { width: 150, height: 150, backgroundColor:'white' } },
          
        ]}
      ></Gallery>
      </Modal>

      <Modal
      visible={anothermodalVisible}
      animationType="fade"
      >
        <Gallery
      onSingleTapConfirmed={() => {
        setAnotherModalVisible(!anothermodalVisible);
      }}
      useNativeDriver={true}
        style={{backgroundColor:'white', flex:2}}
        images={[
          { source: require('./assets/Snimok_ekrana_2019-11-23_v_15_26_14.png'), dimensions: { width: 150, height: 150 } },
        ]}
      ></Gallery>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default Maps;
