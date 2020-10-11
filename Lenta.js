import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  TouchableHighlight, Button,
  TouchableOpacity, Alert, Modal, TextInput
} from 'react-native';
import { Icon } from 'react-native-elements'
import CreateNews from './CreateNews';

var { height, width } = Dimensions.get('screen');
var content_count = 1;
var content_height = width / content_count;


function Separator() {
  return <View style={styles.separator} />;
}
export default function Lenta (props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editNews, setEditNews] = useState(false);
  const [newsTitle, setNewsTitle] = useState([]);
  const [newsBody, setNewsBody] = useState([]);
  const [newsDescription, setNewsDescription] = useState([])
  var title = 'Добавить заголовок...'
  var body = "Добавить описание..."

  if(!editNews) {return ( <View>
    
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View >
        {(props.logged)&&<TouchableOpacity
        onPress={() => setEditNews(true)} 
        style={
          {padding:15, 
          flexDirection: 'row', 
          backgroundColor:'#e9edf5'}
        } 
          >
          <Icon name='note-add' 
          color="#20155e"
          size={30}
          />
          <Text style={
            {color:'#20155e', 
            fontSize:0.065*width,
            fontFamily:'Rotonda Bold', 
            justifyContent:'center', 
            marginTop:'auto', 
            margin: 5}
            }>
              Создать новость
          </Text>
          </TouchableOpacity>}
          <View  >
          {props.lists.map((index)=> (
          <TouchableOpacity key={index.id} style={[styles.Navigation]} 
          onPress={() => { 
            setModalVisible(true);
            setNewsTitle(index.title);
            setNewsBody(index.body);
            setNewsDescription(index.description);
          }}
          >
              
              <Text key={index.title} style={[styles.title]}>{index.title}</Text>
              <Text key={index.body} style={[styles.Navigation_content]}>{index.body}</Text>
              {/* <Text  style={{ color:'grey', fontFamily: 'Rotonda Bold', fontSize: 0.025*width}}>01.01.2030</Text> */}
          </TouchableOpacity>
          
          ) )}
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{newsTitle}</Text>
            <Image 
              source={require('./assets/it.png')} 
              style={{
                height:0.30*height,
                width:0.9*width,  
                marginTop: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                justifyContent: 'center'
                }}/>
            <Text style={styles.modalText}>{newsBody}</Text>
            <Text style={styles.modalText}>{newsDescription}</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "white" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          </View>
          
      </View>
      <Separator/>
    </SafeAreaView>
    </View>
  );
  }

  return(<CreateNews editNews={editNews} token={props.token}/>)
}

const styles = StyleSheet.create({
  Navigation: {
    padding:10,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  title: { 
    //justifyContent: 'center', 
    color: '#12284c',
    fontSize:0.065*width,
    fontFamily: 'Rotonda Bold'
  },
  Navigation_content: {
    height:0.065*height,
    fontSize:0.04*width,
    fontFamily: "Rotonda Bold",   
    marginTop:10, 
    justifyContent: 'center'
  },
  modalView: {
    marginTop: 60,
    backgroundColor: "white",
    height: height,
    padding: 10,
    //alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontFamily: 'Rotonda Bold',
    margin:10
  },
  modalTitle: {
   // marginBottom: 15,
    fontFamily: 'Rotonda Bold',
    marginLeft:10,
    fontSize:0.065*width
  },
  openButton: {
    padding: 10,
  },
  textStyle: {
    fontFamily: 'Rotonda Bold',
    color: '#7a8bff',
  }
});