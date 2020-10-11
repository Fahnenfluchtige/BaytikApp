
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,Text, Alert
} from 'react-native';
import Enter from './Enter';
import Navigation from './Nav';
import Comp from './ConsNav';
import Admin from './Admin';
import Wrong from './GetWrong';
import Auth from './Auth';
import AuthAsCounselor from './AuthAsCounselor';
const App = () => {
  
  const [role, setRole] = useState('child');
  const [isEnterShown, setIsEnterShown] = useState(true);

  const handleClick = (role) => {
    setIsEnterShown(!isEnterShown);
    setRole(role) 
  }

  if(isEnterShown) {
    return  <Enter click={ handleClick } />
  } else if(role==='cons'){
    return (<AuthAsCounselor/>)
  } else { 
    return <Auth /> 
  }
} 

export default App;