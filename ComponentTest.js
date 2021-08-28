import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import * as db from './assets/db/dbcontroller'


export default function Test() {
  return(
      <Text>Haha true</Text>
  )
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
