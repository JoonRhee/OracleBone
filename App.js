import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, ScrollView,Image } from 'react-native';
import { AppLoading } from 'expo'
import * as db from './assets/db/dbcontroller'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './screens/Navigator'

export default function App() {
  const [loading,setLoading] = useState(true)
  
  if (loading){
    return(
      <AppLoading
        startAsync = {db.checkAndDownloadDB}
        onFinish = {()=>setLoading(false)}
        onError = {console.warn}
      />
    )
  }

  return(
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  )
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img : {
    width:1242,
    resizeMode:"contain",
    backgroundColor: "#121212"
  }
});


