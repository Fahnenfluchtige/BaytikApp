import React, { Component } from 'react';
import Timetable from './Time';


class GetTime extends React.Component {

  

    constructor (props) {
      super(props);
      this.state = {
        time: false
      }
    };
  
    componentDidMount () {
      
        var Authorization = 'Token ' + this.props.token;
        fetch('http://109.196.164.109/schedule/view/', {   //Авторизуюсь в Lists
        method: 'get',
        headers: {authorization: Authorization},
        })
        .then(response=>response.json())
        .then(getLists => { //Получаю новости
          var listOfTime = getLists
          this.setState({
            time: listOfTime.schedule
          })
        })
    }

   

    render(){
      return(<Timetable 
      time={this.state.time}
      />)}
  }

  export default GetTime;