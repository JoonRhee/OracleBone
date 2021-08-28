import React,{useState} from 'react'
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native'
import {SearchBar} from 'react-native-elements'
import idGetter from "../assets/db/IDbyChar.json"

export default function main({navigation}) {
  const [search,setSearch] = useState('')
  const tester = () =>{
      if(search != ''){
        navigation.navigate("Character",{id:idGetter[search],character:search})
      }
  }

  return (
    <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        containerStyle={{alignSelf:"stretch",backgroundColor:"#121212",borderTopWidth:0,borderBottomWidth:0,}}
        onEndEditing={tester}
    />
  )
}
