import React, { Fragment, Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Image,
    Dimensions,
    TouchableHighlight, Button,
    TouchableOpacity, Alert, Modal, TextInput,
  ScrollView,
  StatusBar,


  } from 'react-native';
  import { Icon } from 'react-native-elements'
  import ImagePicker from 'react-native-image-picker';
import Lenta from './Lenta';
import GetNews from './GetNews';
import SpinImage from './SpinImage';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';

var { height, width } = Dimensions.get('screen');
var content_count = 1;
var content_height = width / content_count;


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class CreateNews extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "Добавить заголовок...",
            body: "Добавить описание...",
            description: "Добавить текст...",
            submit: false,
            editNews: this.props.editNews,
            lists: [],
            filepath: {
                data: '',
                uri: ''
              },
              fileData: '',
              fileUri: ''
            }
          }

    chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('./assets/dummy.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./assets/galeryImages.jpg')}
        style={styles.images}
      />
    }
  }
    
    render(){
    if(!this.state.submit) {return(
        <View style={{padding: 10}}>
        <TextInput 
        style={{
            fontFamily: "Rotonda Bold",
            color: '#12284c',
            fontSize: 0.06*width,
             }}
        onChange = {event => this.setState({ title: event.nativeEvent.text })}
        value={this.state.title}
        />
    <View style={styles.body}>
            <View style={styles.ImageSections}>
            </View>
            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.chooseImage}   >
                 <View>
                {this.renderFileData()}
              </View>
              </TouchableOpacity>
            </View>
          </View>
    <TextInput style={{
      fontFamily: "RotondaC",
      color: '#12284c',
      fontSize: 0.05*width,
    }}
    onChange = {event => this.setState({ body: event.nativeEvent.text })}
    value={this.state.body}/>
    <TextInput style={{
      fontFamily: "RotondaC",
      color: '#12284c',
      fontSize: 0.05*width,
      
    }}
    editable
    onChange = {event => this.setState({ description: event.nativeEvent.text })}
    onSubmitEditing = {() => console.log(this.state.description)}
    value={this.state.description}/>
    <TouchableOpacity
        style={styles.saveButton}
        onPress= { () => (this.state.body&&this.state.description&&this.state.title&&this.setState({submit:true})
        )
    }
    >
        <Text style={styles.textButton}>СОХРАНИТЬ</Text>
    </TouchableOpacity>
    
  </View>
        )
    }
    return(<SendNews title={this.state.title} 
        body={this.state.body} 
        description={this.state.description} 
        token={this.props.token}/>)
}
}

export class SendNews extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lists : false,
        }
    }
    componentDidMount () {
        var Authorization = 'Token ' + this.props.token;
        var data = {
            "title": this.props.title,
            "body": this.props.body,
            "description": this.props.description,
          }
          fetch('http://109.196.164.109/news/create/', {   //Авторизуюсь в news
            method: 'post',
            headers: {authorization: Authorization,
            'Content-Type': 'application/json'},
            body:  JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(getNews => { 
        var listOfNews = getNews
         })
         .then(fetch('http://109.196.164.109/news/news/',{
             method: 'get',
             headers: {authorization: Authorization},
         })
         .then(response=>response.json())
        .then(getNews => { //Получаю новости
          var listOfNews = getNews
          this.setState({
            lists: listOfNews.lists
          })
        })
         )
    }
    render() {
        return(<GetNews logged={true} lists={this.state.lists} token={this.props.token}/>)
    }
}

const styles = StyleSheet.create({
    saveButton: {
        
        justifyContent:'flex-end',
        marginLeft: "auto",
        marginTop: width/2,
        backgroundColor: '#7a8bff',
        borderRadius: 8,
        width: 0.4*width,
        height: 0.075*height,
        justifyContent: "center",
       
    },
    textButton: {
        fontFamily: "Rotonda Bold",
        justifyContent: "center",
        textAlign: 'center',
        color: 'white'
    },
   

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 300,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
})