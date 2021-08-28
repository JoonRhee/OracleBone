import React, {useState,useEffect} from 'react'
import { Text, View,StyleSheet} from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import CharacterCard from '../components/CharacterCard'

export default function main({navigation,route}) {

    return (
        <View style={styles.container}>
            <Text>{route.params}</Text>
            <CharacterCard/>
        </View>
      )
}

const styles = StyleSheet.create({
    viewPager: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
})