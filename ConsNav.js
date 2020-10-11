

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Header} from 'react-native-elements';
import Spiski from './Spiski';
import Lenta from './Lenta';
import Maps from './Maps';
import Admin from './Admin';
import Timetable from './Time';
import GetNews from './Auth';


import {Footer} from 'native-base';

var { height, width } = Dimensions.get('window');


export default function Navigation() {
  const [page,setPage]=useState(1);

  const [data]=useState([]);

  const returnpages = (page) => {
    setPage(page)
  }

  const NAMES = ['', "Новости", "Расписание", "Списки", "Карты", "Администратор"]
  return (  
    <SafeAreaView style={[styles.safearea]}>
      <Header   
        centerComponent={{ text: NAMES[page], style: 
          { color: '#fff',  fontSize:0.07*width, marginTop: -30, fontFamily: 'Rotonda Bold'  } }}
        rightComponent={{ icon: 'note-add', color: '#fff',}}
        containerStyle={{
          backgroundColor: '#7a8bff',
          height: 60,
        }}
      />     
      
      <ScrollView style={ styles.scrollView }>
        { page===1 && <GetNews /> }
        { page===2 && <Timetable /> }
        { page===3 && <Spiski /> }
        { page===4 && <Maps /> }
        { page===5 && <Admin /> }
      </ScrollView >
     
      <Footer style={[styles.footer]}> 
        <TouchableOpacity onPress={ () => returnpages(1) } style={[styles.footer_bottom]}>
          <Image source={require('./assets/slai_774_derfinalnyi_774.png')} style={[styles.footer_image_bottom]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => returnpages(2) } style={[styles.footer_bottom]}>
          <Image source={require('./assets/vazhnoraspisanie.png')} style={[styles.footer_image_bottom]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => returnpages(3) } style={[styles.footer_bottom]}>
          <Image source={require('./assets/vazhnospiski.png')} style={[styles.footer_image_bottom]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => returnpages(4) } style={[styles.footer_bottom]}>
          <Image source={require('./assets/vazhnokarta.png')} style={[styles.footer_image_bottom]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => returnpages(5) } style={[styles.footer_bottom]}>
          <Image source={require('./assets/vazhnoskrepka.png')} style={[styles.footer_image_bottom]}/>
        </TouchableOpacity> 
      </Footer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea:{
    flex: 1, 
    justifyContent: "center", 
    
    alignItems: 'stretch',
  },
  footer:{
    backgroundColor: '#7a8bff',
    justifyContent: 'space-between',
    height: 60,
  },
  footer_image_bottom:{
    height:50,
    width:50,
    marginTop:5
  },
  separator: {
    marginVertical: 80,
    padding: 10,
  },
});









