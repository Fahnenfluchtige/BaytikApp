import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Image, Input,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Footer} from 'native-base';
import {Header} from 'react-native-elements';
import { Form} from 'native-base';
import SpinImage from './SpinImage';
import GetNews from './GetNews';
import GetLists from './GetLists';
import GetTime from './GetTime';
import Maps from './Maps';
import Admin from './Admin';

var { height, width } = Dimensions.get('window');


function Separator() {
  return <View style={styles.separator} />;
}

class AuthAsCounselor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          login: 'loss',
          password: 'ssol1234',
          logged: false,
          token: false,
          cons: false
        };
      }

    render() {
    if (!this.state.logged) {return (
        <SafeAreaView style={[styles.safearea]}>
        <ScrollView>
          <View style={{position: 'relative'}}>
            <TouchableOpacity style={[styles.content]} onPress = { () => 
              (this.state.login&&this.state.password)&&this.setState({logged: true})}>
              <Text style={[styles.content], [styles.title]}> 
                ВОЙТИ 
              </Text>
            </TouchableOpacity>
            <View>
              <Form >
              <Separator />

              <TextInput 
              style={[styles.content, styles.opacity], [styles.input]} 
              textStyle={[styles.input]}
              type='text'
              placeholder='Логин'
              onChange = {event => this.setState({ login: event.nativeEvent.text })}
              value = {this.state.login}
              />
              <TextInput 
              style={[styles.content, styles.opacity, styles.input]} 
              type='text'
              placeholder='Пароль'
              onChange = {event => this.setState({ password: event.nativeEvent.text })}
              value = {this.state.password}
              />
              
              </Form>
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
    )}
    return(<LetsGo login={this.state.login} password={this.state.password}/>)
    }

}

class LetsGo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      page: 1,
      logged: true
    }
  }
  componentDidMount() { //Получаю токен
        this._isMounted = true;
        const logpass = { username: this.props.login, password: this.props.password};
        fetch('http://109.196.164.109/users/token/login/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(logpass),
        })
        .then(response=>response.json())
        .then( (responseJson) => {
          
          this.setState({token: responseJson["auth_token"]})
        })
      }
      
      componentWillUnmount() {
        this._isMounted = false;
      }
      render() {
      const NAMES = ['', "Новости", "Расписание", "Списки", "Карты", "Администратор"]
      function returnpages(page) {
        this.setState({page:page})
      }
      if(!this.state.token){return(<SpinImage/>)}
      return (  
        <SafeAreaView style={[styles.safeareaview]}>
          <Header   
            centerComponent={{ text: NAMES[this.state.page], style: 
              { color: '#fff',  fontSize:0.07*width, marginTop: -30, fontFamily: 'Rotonda Bold'  } }}
            
            
            containerStyle={{
              backgroundColor: '#7a8bff',
              height: 60,
            }}
          />     
          <ScrollView style={ styles.scrollView }>
          { this.state.page===1 && <GetNews logged={this.state.logged} token={this.state.token}/> }
          { this.state.page===2 && <GetTime token={this.state.token}/> }
          { this.state.page===3 && <GetLists token={this.state.token}/> }
          { this.state.page===4 && <Maps /> }
          { this.state.page===5 && <Admin token={this.state.token}/> }
          </ScrollView >
         
          <Footer style={[styles.footernav]}> 
            <TouchableOpacity onPress={ () => this.setState({page:1}) } style={[styles.footer_bottom]}>
              <Image source={require('./assets/slai_774_derfinalnyi_774.png')} style={[styles.footer_image_bottom]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.setState({page:2}) }style={[styles.footer_bottom]}>
              <Image source={require('./assets/vazhnoraspisanie.png')} style={[styles.footer_image_bottom]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.setState({page:3}) } style={[styles.footer_bottom]}>
              <Image source={require('./assets/vazhnospiski.png')} style={[styles.footer_image_bottom]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.setState({page:4}) } style={[styles.footer_bottom]}>
              <Image source={require('./assets/vazhnokarta.png')} style={[styles.footer_image_bottom]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.setState({page:5}) } style={[styles.footer_bottom]}>
              <Image source={require('./assets/vazhnoskrepka.png')} style={[styles.footer_image_bottom]}/>
            </TouchableOpacity> 
          </Footer>
        </SafeAreaView>
      );
      
    }
}

var { height, width } = Dimensions.get('window');
 
var content_count = 2.5;
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
  },
  safeareaview:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: 'stretch',
  },
  footernav:{
    backgroundColor: '#7a8bff',
    justifyContent: 'space-between',
    height: 60,
  },
  footer_image_bottom:{
    height:50,
    width:50,
    marginTop:5
  },
  separatornav: {
    marginVertical: 80,
    padding: 10,
  },
  input: {
    justifyContent: "center",
    backgroundColor: '#ffff',
    borderRadius:8,
    fontFamily: "Rotonda Bold",
    color: '#1d355e',
    height: 0.06*height,
    margin: 6,
    fontSize: 0.05*width,
    width:width*0.75,
    marginLeft: "auto",
    marginRight: 'auto'
  }
});
export default AuthAsCounselor;