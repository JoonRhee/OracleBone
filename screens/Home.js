import React,{useState} from 'react'
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native'
import {SearchBar} from 'react-native-elements'
import ViewPager from '@react-native-community/viewpager'

export default function main({navigation}) {
  const [search,setSearch] = useState('')
  const [page,setPage] = useState(0)
  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  viewPager:{
      backgroundColor:"#fff"
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text:{
    color:"#fff",
    backgroundColor:"blue"
    
  },
  aaa:{
    backgroundColor:"orange"

  }
})
