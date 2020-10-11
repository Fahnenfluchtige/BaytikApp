import React, {  } from "react";
import {
  StyleSheet,
  View,
  Animated, Easing, Text, 
  Dimensions,
} from 'react-native';


export default class SpinImage extends React.Component {
    constructor() {
      super();
      this.state = {
          comments: [
              'Не забудь антисептик.',
            'Носи маску.',
            'Почти готово...',
            'Мой руки 30 секунд.',
            'Пароль от интернета: ******',
            'Дизайнер: Артём Аксинин',
            'Фронтенд разработчик: Алина Краснова',
            'Бэкенд разработчик: Азат Рамазанов',
            'Храни деньги в валюте.',
            'Переходи в онлайн.',
            'Будущее за технологиями.',
            'Готовься к защите проекта заранее.',
            'Не пропускай кружки.',
            'Уже выбрал направление?'
        ]
      }
      this.RotateValueHolder = new Animated.Value(0);
    }
    componentDidMount() {
      this.StartImageRotateFunction();
    }
    StartImageRotateFunction() {
      this.RotateValueHolder.setValue(0);
      Animated.timing(this.RotateValueHolder, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => this.StartImageRotateFunction());
    }
    render() {
      const RotateData = this.RotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg'],
      });
      return (
        <View style={styles.container}>
          <Animated.Image
            style={{
              width:85,
              height: 75,
              transform: [{ rotate: RotateData }],
            }}
            source={require('./assets/load.png')}
          />
          <Text style={styles.commentStyle}>{this.state.comments[Math.floor(Math.random() * this.state.comments.length)]}</Text>
        </View>
      );
    }
  }
  var { height, width } = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#7a8bff',
    },
    commentStyle: {
        fontFamily: 'Rotonda Bold',
        color: 'white',
        fontSize: 0.045*width,
        margin:10
    }
  });