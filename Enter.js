import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import {Footer} from 'native-base';



function Separator() {
  return <View style={styles.separator} />;
}

const Enter = (props) => {
  
    return (
        <SafeAreaView style={[styles.safearea]}>
        <ScrollView>
          <View style={{position: 'relative'}}>
            <View style={[styles.content]}>
              <Text style={[styles.content], [styles.title]}> 
                ВОЙТИ 
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() =>  props.click('child') } style={[styles.content, styles.opacity]} >
                <Text onPress={() => props.click('child') } style={[styles.button]}>КАК РЕБЕНОК</Text> 
              </TouchableOpacity>
              <Separator />
              <TouchableOpacity style={[styles.content, styles.opacity]}>
                <Text onPress={() => props.click('cons') } style={[styles.button]}>КАК ВОЖАТЫЙ</Text> 
              </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
       <Footer style={[styles.footer]}>
           <View>
              <Image source={require('./assets/logo_Bai_774_tik_pryamoug.png')} style={[styles.image]}/*{{height:70.5, width:224, }}*/ />
              <Text style={[styles.AppName]}>©App HELPER</Text>
          </View>
          </Footer>
      </SafeAreaView>
    )
}

var { height, width } = Dimensions.get('window');
 
var content_count = 3;
var content_height = height / content_count;


const styles = StyleSheet.create({
  safearea:{
    flex:1, 
    flexDirection: 'column' ,
    backgroundColor: '#7a8bff',
    
  },
  content: {
    height: content_height, 
    justifyContent: 'center',
    
  },
  title: {
    textAlign: 'center',  
    color: 'white',       
    fontSize: 0.13*width,
    fontFamily: 'Rotonda Bold'
  },
  button: {
    textAlign: 'center',   
    color: '#7a8bff',       
    fontSize:0.065*width,
    fontFamily: 'Rotonda Bold' 
  },
  opacity: {
    height: height*0.145,
    width:width*0.75,
    justifyContent: "center",
    backgroundColor: 'white',
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,

  },
  separator: {
    padding: 5,
  },
  footer: {
    height: 75,
    backgroundColor: '#7a8bff'
  },
  AppName: {
    fontSize: 0.03*width,
    color:'white', 
    textAlign:'center',
    padding: 5
  },
  image: {
    height:42.3, 
    width:134.4, 
  }
});
export default Enter;