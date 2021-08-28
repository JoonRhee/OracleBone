import React,{useState} from 'react'
import { StyleSheet, View,Text, TouchableOpacity,Picker} from 'react-native'
import hanja_characters from '../assets/db/hanja_grade_characters.json'
import CharGrid from '../components/CharacterGrid'
import {ButtonGroup,Icon,Tooltip} from 'react-native-elements'



export default function main({navigation}) {
  const [selectedValue,setSelectedValue] = useState("8급")

  const onPress = (stuff) => {
    navigation.navigate('Character',stuff)
  }

  const updateValue = (stuff) => {
    setSelectedValue(stuff)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.lvlButtons}>
        <Text style={styles.infoText}> Level</Text>
        <Picker
          mode="dropdown"
          selectedValue={selectedValue}
          onValueChange={updateValue}
          style={{ alignSelf:"center",height:40,width: 110,color:"#fff"}}
          itemStyle={{height:20,color:"black",backgroundColor:"white"}}
        >
          <Picker.Item label="8급" value="8급"/>
          <Picker.Item label="준7급" value="준7급"/>
          <Picker.Item label="7급" value="7급"/>
          <Picker.Item label="준6급" value="준6급"/>
          <Picker.Item label="6급" value="6급"/>
          <Picker.Item label="준5급" value="준5급"/>
          <Picker.Item label="5급" value="5급"/>
          <Picker.Item label="준4급" value="준4급"/>
          <Picker.Item label="4급" value="4급"/>
          <Picker.Item label="준3급" value="준3급"/>
          <Picker.Item label="3급" value="3급"/>
          <Picker.Item label="2급" value="2급"/>
        </Picker>
      </View>
      <CharGrid ids = {hanja_characters[selectedValue]} onPress = {onPress} offset = {230}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  lvlButtons:{
    flexDirection: 'row',
    alignItems : 'center',
    alignContent : 'center',
    justifyContent: 'flex-start',

  },
  text: {
    color : '#fff',
    fontSize : 20
  },
  infoText: {
    color : '#fff',
    fontSize : 17
  },
  info: {
    top: -5
  }
})
