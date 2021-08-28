import React from 'react'
import { Text, View,StyleSheet} from 'react-native'

export default function main({navigation,route}) {

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>You Don't Deserve To Change The Settings :)</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    text: {
      fontSize: 17,
      color: '#fff',
    },
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
})