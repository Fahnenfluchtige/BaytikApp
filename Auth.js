import React, { Component } from 'react';
import GetNews from './GetNews';
import GetLists from './GetLists';
import GetTime from './GetTime';
import Maps from './Maps';
import { Spinner } from 'native-base';
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
import {Footer} from 'native-base';
import SpinImage from './SpinImage';
var { height, width } = Dimensions.get('window');

class Auth extends React.Component  {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      token: false,
      logged: false
    }
  };

  componentDidMount() { //Получаю токен
    this._isMounted = true;
    const logpass = { username: 'loss', password: 'ssol1234'};
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

  render(){
    const NAMES = ['', "Новости", "Расписание", "Списки", "Карты"]
    function returnpages(page) {
      this.setState({page:page})
    }
    if(!this.state.token){return(<SpinImage/>)}
    return (
     
      <SafeAreaView style={[styles.safeareaview]}>
        <Header   
          centerComponent={{ text: NAMES[this.state.page], style: { color: '#fff',  fontSize:0.07*width, marginTop: -30, fontFamily: 'Rotonda Bold'  } }}
          containerStyle={{
            backgroundColor: '#7a8bff',
            height: 60,
          }}
        />     
        
        <ScrollView style={ styles.scrollView }>
          { this.state.page===1 && <GetNews token={this.state.token}/> }
          { this.state.page===2 && <GetTime token={this.state.token}/> }
          { this.state.page===3 && <GetLists token={this.state.token}/> }
          { this.state.page===4 && <Maps /> }
        </ScrollView >
       
        <Footer style={[styles.footernav]}> 
          <TouchableOpacity onPress={ () => this.setState({page:1}) } style={[styles.footer_bottom]}>
            <Image source={require('./assets/slai_774_derfinalnyi_774.png')} style={[styles.footer_image_bottom]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.setState({page:2}) } style={[styles.footer_bottom]}>
            <Image source={require('./assets/vazhnoraspisanie.png')} style={[styles.footer_image_bottom]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.setState({page:3}) } style={[styles.footer_bottom]}>
            <Image source={require('./assets/vazhnospiski.png')} style={[styles.footer_image_bottom]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.setState({page:4}) } style={[styles.footer_bottom]}>
            <Image source={require('./assets/vazhnokarta.png')} style={[styles.footer_image_bottom]}/>
          </TouchableOpacity>
        </Footer>
      </SafeAreaView>
    );
    
    
  }
  
}

const styles = StyleSheet.create({
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
  separator: {
    marginVertical: 80,
    padding: 10,
  },
});
export default Auth;

