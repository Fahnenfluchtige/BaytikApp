import React, { Component } from 'react';
import Lenta from './Lenta';

class GetNews extends React.Component {

  _isMounted = false;

    constructor (props) {
      super(props);
      this.state = {
        lists: []
      }
    };
  
    componentDidMount () {
      this._isMounted = true;
        var Authorization = 'Token ' + this.props.token;
        fetch('http://109.196.164.109/news/news/', {   //Авторизуюсь в news
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
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render(){
      
      return(<Lenta token={this.props.token} logged={this.props.logged} lists={this.state.lists}/>)}
  }

  export default GetNews;