import React, { Component } from 'react';
import Spiski from './Spiski';
import SpinImage from './SpinImage';

export default class GetLists extends React.Component {

  _isMounted = false;

    constructor (props) {
      super(props);
      this.state = {
        spiski: false
      }
    };
  
    componentDidMount () {
      this._isMounted = true;
        var Authorization = 'Token ' + this.props.token;
        fetch('http://109.196.164.109/lists/view/', {   //Авторизуюсь в Lists
        method: 'get',
        headers: {authorization: Authorization},
        })
        .then(response=>response.json())
        .then(getLists => { //Получаю новости
          var listOfLists = getLists
          this.setState({
            spiski: listOfLists.lists
          })
        })
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render(){
      return(<Spiski 
      spiski={this.state.spiski}
      />)}
  }
