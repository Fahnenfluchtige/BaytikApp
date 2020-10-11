
import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Cell, Col, Cols } from 'react-native-table-component';
import superagent from 'superagent' ;

function Separator() {
  return <View style={styles.separator} />;
}

var { height, width } = Dimensions.get('screen');

export default function Spiski (props) {

    var Array = props.spiski;
    
    var LIST = []
    
	  for (var i = 0; i < Array.length; i++) {
      LIST.push(Object.values(Array[i]))
	  }
   
    var state = {
      tableHead: ['№','ФИО', 'Дата рождения', 'Комната'],
    }
  
    
    return (
      <View style={{}}>
        <Text style={{fontFamily: 'Rotonda Bold', color: '#1d355e', marginLeft: 5, margin: 10 }}>Cмена</Text>
          <Table borderStyle={{borderWidth: 3, borderColor: '#dfe5ff',marginBottom: 5 }} style={{margin:10}}>
          <Row data={state.tableHead} flexArr={[1, 4, 3, 2]} style={{backgroundColor: '#dfe5ff'}} textStyle={styles.text}/>
          
          
          {
            LIST.map((rowData, index) => (
              
            <TableWrapper style={{}}>
              <Row  flexArr={[1, 4, 3, 2]} 
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#dfe5ff'}]}
                      textStyle={styles.text}
                    />
                  
               </TableWrapper>
              ))
            }
         
        </Table>
      </View>
    )
  
}

const styles = StyleSheet.create({
  data_text: {
    textAlign: "center",
  },
  text: {
    fontFamily: 'Rotonda Bold',
    color : '#1d355e',
    textAlign: 'center'
  }
});