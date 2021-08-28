import React,{useState} from 'react'
import { StyleSheet, View,Text, TouchableOpacity} from 'react-native'
import hsk_s_characters from '../assets/db/hsk_S_characters.json'
import hsk_t_characters from '../assets/db/hsk_T_characters.json'
import CharGrid from '../components/CharacterGrid'
import {ButtonGroup,Icon,Tooltip} from 'react-native-elements'



export default function main({navigation}) {
  const [selectedIndex,setSelectedIndex] = useState(0)

  const onPress = (stuff) => {
    navigation.navigate('Character',stuff)
  }

  const updateIndex = (stuff) => {
    setSelectedIndex(stuff)
  }

  const buttons = ['1', '2', '3', '4', '5', '6']
  return (
    <View style={styles.container}>
      <View style={styles.lvlButtons}>
        <Text style={styles.text}> Level</Text>
        <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 30,flex: 1,backgroundColor:'#121212'}}
        />
      </View>
      <CharGrid ids = {hsk_s_characters[buttons[selectedIndex]]} onPress = {onPress} offset = {230}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  lvlButtons:{
    flexDirection: "row",
    alignItems : 'center',
    alignContent : 'stretch'

  },
  text: {
    color : '#fff',
    fontSize : 20
  },
  infoText: {
    color : '#fff',
    fontSize : 15
  },
  info: {
    top: -5
  }
})
