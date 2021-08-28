import React,{useState} from 'react'
import { StyleSheet, View,Text, TouchableOpacity} from 'react-native'
import jlpt_characters from '../assets/db/jlpt_characters.json'
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

  const levelInfo = <Text style = {styles.infoText}>This is pre-2010 level of JLPT. This is because there are no official kanji lists for new JLPT Level. Old level 2 is now divided between N2 and N3, and the old levels 3 and 4 are now N4 and N5.</Text>


  const buttons = ['4', '3', '2', '1']
  return (
    <View style={styles.container}>
      <View style={styles.lvlButtons}>
        <Text style={styles.text}> Level</Text>
        <View style = {styles.info}>
          <Tooltip popover = {levelInfo} overlayColor = "rgba(0, 0, 0, 0.70)" backgroundColor = "#1b1b1b" width = {300} height = {150}>
            <Icon name="info" type = 'material' color = 'grey' size = {17}/>
          </Tooltip>
        </View>
        <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 30,flex: 1,backgroundColor:'#121212'}}
        />
      </View>
      <CharGrid ids = {jlpt_characters[buttons[selectedIndex]]} onPress = {onPress} offset = {230}/>
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
