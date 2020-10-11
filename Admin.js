import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
import AuthAsCounselor from './AuthAsCounselor';
import superagent from 'superagent' ;
import GetLists from './GetLists';
import GetTime from './GetTime';

var { height, width } = Dimensions.get('window');


export default class Admin extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      password: false,
      userLogin: false,
      userPassword: false,
      userName: false,
      childName: false,
      childBirth: false,
      childNum: false,
      childRoom: false,
      time: false,
      event: false,
      place: false,
      counsellor: false,
      saveChild: false,
      saveEvent: false,
      saveUserPassword : false,
    }
  }
    render(){
      if(this.state.saveChild){ return <SendChild 
        childNum={this.state.childNum}
        childName={this.state.childName}
        childRoom={this.state.childRoom}
        childBirth={this.state.childBirth}
        token={this.props.token}
        />}
      if(this.state.saveEvent) {
        return <SendEvent 
          time={this.state.time}
          event={this.state.event}
          counsellor = {this.state.counsellor}
          place = {this.state.place}
          token={this.props.token}
        />
      }
      if(this.state.saveUserPassword) { 
        return <CreateUser 
          token={this.props.token}
          userLogin={this.state.userLogin}
          userPassword={this.state.userPassword}
          
          />}
   return (
    <View>
      {/*<View>  
        <Text style={[styles.title]}>Личные данные</Text>
        <TextInput style={[styles.input]}>Логин...</TextInput>
        <TouchableOpacity style={[styles.input, styles.button]}><Text style={[styles.button_txt]}>Save</Text></TouchableOpacity>
        <TextInput 
        onChange = {event => this.setState({ password: event.nativeEvent.text })}
        style={[styles.input]}>Пароль...</TextInput>
        <TouchableOpacity style={[styles.input, styles.button]}><Text style={[styles.button_txt]}>Save</Text></TouchableOpacity>
      </View>
      <View>  
        <Text style={[styles.title]}>Добавить вожатого</Text>
        <TextInput style={[styles.input]}>ФИО</TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ userLogin: event.nativeEvent.text })}
          >Логин...</TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ userPassword: event.nativeEvent.text })}
          >
            Пароль...
        </TextInput>
        <TouchableOpacity 
          style={[styles.input, styles.button]}
          onPress = { () => this.setState({saveUserPassword: true})}
          ><Text style={[styles.button_txt]}>Save</Text></TouchableOpacity>
      </View>*/}
      <View>  
        <Text style={[styles.title]}>Добавить ребенка</Text>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ childNum: event.nativeEvent.text })}
          >№</TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ childName: event.nativeEvent.text })}>
            ФИО...
        </TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ childBirth: event.nativeEvent.text })}
          >
            Дата рождения...
        </TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ childRoom: event.nativeEvent.text })}
          >
            Комната...
        </TextInput>
        <TouchableOpacity 
          style={[styles.input, styles.button]}
          onPress = { () => this.setState({saveChild: true})}
          >
            <Text style={[styles.button_txt]}>Save</Text></TouchableOpacity>
      </View>
      <View>
      <Text style={[styles.title]}>Добавить событие</Text>
      <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ time: event.nativeEvent.text })}
          >
            Время...
        </TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ place: event.nativeEvent.text })}
          >
            Место...
        </TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ event: event.nativeEvent.text })}
          >
            Мероприятие...
        </TextInput>
        <TextInput 
          style={[styles.input]}
          onChange = {event => this.setState({ counsellor: event.nativeEvent.text })}
          >
            Ответственный...
        </TextInput>
        <TouchableOpacity 
          style={[styles.input, styles.button]}
          onPress = { () => this.setState({saveEvent: true})}
          >
            <Text style={[styles.button_txt]}>Save</Text></TouchableOpacity>
      </View>
    </View>
   )}
  }
  
export class SendChild extends React.Component {
  componentDidMount () {
  
    var Authorization = 'Token ' + this.props.token;
    var data = {
      "numberOfGroup": this.props.childNum,
      "name_surname": this.props.childName,
      "dateOfBirth": this.props.childBirth,
      "room_corpus": this.props.childRoom
    }
    fetch('http://109.196.164.109/lists/create/', {   //Авторизуюсь в news
    method: 'post',
    headers: {authorization: Authorization,
    'Content-Type': 'application/json'},
    body:  JSON.stringify(data)
  })
    .then(response=>response.json())
  }
  render(){
    return(<GetLists token={this.props.token}/>)
  }
}

export class SendEvent extends React.Component {
  componentDidMount () {
  
    var Authorization = 'Token ' + this.props.token;
    var data = {
      "datetime": this.props.time,
      "place": this.props.place,
      "event": this.props.event,
      "main_p": this.props.counsellor
    }
    fetch('http://109.196.164.109/schedule/create/', {   //Авторизуюсь в news
    method: 'post',
    headers: {authorization: Authorization,
    'Content-Type': 'application/json'},
    body:  JSON.stringify(data)
  })
    .then(response=>response.json())
   
  }
  render() {
    return <GetTime token={this.props.token} />
  }
}

class CreateUser extends React.Component {
  componentDidMount () {
    var Authorization = 'Token ' + this.props.token;
    let formdata = new FormData();
    formdata.append('username', this.props.userLogin)
    formdata.append('password', this.props.userPassword)
    formdata.append('re_password', this.props.userPassword)
    var data = {
      username: 'this.props.userLogin',
      password: 'this.props.userPassword',
      re_password: 'this.props.userPassword'
    }
    fetch('http://109.196.164.109/news/news/'), {
    method: 'get',
    headers: {authorization: Authorization},
    //headers: {authorization: Authorization,
      //'Content-Type': 'application/json'},
    
    //body: data
  }
  .then(response=>response.json())
    }
    render() {return <Admin />}
  }
class SendPassword extends React.Component {
  componentDidMount () {
    var Authorization = 'Token' + this.props.token;
    var data = {
      "password": this.props.password,
    }
    fetch('http://109.196.164.109/users/users/'), {
    method: 'post',
    headers: {authorization: Authorization,
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
        "Accept": "application/json",
        "type": "formData"
      },
    body: JSON.stringify(formdata)
  }
  .then(response=>response.json())
  }
  render() {return <Maps token={this.props.token}/>}
}
  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Rotonda Bold', 
      color: '#1d355e',
      margin: 5,
    },
    input: {
      justifyContent: "center",
      backgroundColor: '#c4ceff',
      borderRadius:8,
      fontFamily: "Rotonda Bold",
      color: '#1d355e',
      height: 0.052*height,
      margin: 5,
      fontSize: 0.035*width,
    },
    separator: {
      marginHorizontal: 80,
      padding: 10,
    },
    button: {
      marginLeft: 'auto',
      width: 0.3*width,
      margin: 5
    },
    button_txt: {
      textAlign: 'center',
      fontFamily: 'Rotonda Bold',
      color: '#1d355e',
    },
    cons: {
      alignItems: 'stretch',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    del_input: {
      width: 0.7*width,
      
    },
    del: {
      backgroundColor: '#7a8bff',
      marginLeft: 'auto',
      borderRadius: 8,
      width: 0.3*width,
      height: 0.052*height,
      justifyContent: "center",
      margin: 5
    }
  });
  