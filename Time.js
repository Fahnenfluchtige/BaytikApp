import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions} from 'react-native';
import { Table, TableWrapper, Row, Rows, Cell, Col, Cols } from 'react-native-table-component';
function Separator() {
  return <View style={styles.separator} />;
}
var { height, width } = Dimensions.get('screen');



export default function Timetable (props) {
var state = {
      tableHead: ['Время', 'Место', 'Мероприятие', 'Отвественные'],
      
    }
    var timeTable = props.time
    var LIST = []
    var TIME = []
    
    for (var i = 0; i < timeTable.length; i++) {
      TIME.push(timeTable[i].datetime.slice(11,16))
    }
    for (var i = 0; i < timeTable.length; i++) {
      delete (timeTable[i].datetime)
      LIST.push(Object.values(timeTable[i]))
    }
    
    return (
      <View style={styles.container}>
        <View>
          <Text style={{fontFamily: 'Rotonda Bold', textAlign: 'center', }}>Cмена</Text>
          <Separator></Separator>
        </View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#1d355e'}} style={{}}>
          <Row data={state.tableHead}  style={styles.head} textStyle={styles.head_text} flexArr={[1, 2, 3, 3]}/>
          <TableWrapper style={{flexDirection: 'row', justifyContent: 'center'}} >
              <Col data={TIME} style={[styles.time_info]} textStyle={[styles.time_info]} heightArr={[50,50]} />
              <Rows data = {LIST} flexArr={[2, 3, 3]} textStyle={styles.data_text} style={{height: 50}}/>
          </TableWrapper>
          
        </Table>
      </View>
    )
  }


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    margin:5
  },
  head: { 
    backgroundColor: '#738cff', 
  },
  head_text: { 
    fontFamily: 'Rotonda Bold',
    //fontSize: 0.029*width,
    color: '#fff',
    textAlign: 'center',
    padding: 1.5
  },
  time_info: {
    backgroundColor: '#d2dafe',
    fontFamily: 'Rotonda Bold',
    textAlign:'center',
    color: '#1d355e',
  },
  data_text: {
    textAlign: 'center',
    //fontSize: 0.03*width
  }
});