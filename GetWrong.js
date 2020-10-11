import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView} from 'react-native';

 export default function Wrong () {
    return(
        <SafeAreaView style={[styles.safearea]}>
        <Text style={[styles.headline]}>Что-то пошло не так. Повторите попытку позже или попробуйте почистить кэш</Text>
        </SafeAreaView>
    )
 }
 const styles = StyleSheet.create( {
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
      },
      safearea:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: 'stretch',
      },
 })