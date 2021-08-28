import React, {useState,useEffect} from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as db from '../assets/db/dbcontroller'
import {Card, Icon} from 'react-native-elements'
import CharacterText from './CharacterText'

export default function main({Oids,Sids,navigation}) {
    const [objVar,setObjVar] = useState(null)
    const [subVar,setSubVar] = useState(null)
    const [collapsed,setCollapsed] = useState(false)
    console.log("hahahahahah")
    console.log("has " + JSON.stringify(Oids))
    console.log("is " + JSON.stringify(Sids))
    useEffect(()=>{
        async function loadData(){
            await db.loadVariantsByID(Oids.split(","),setObjVar)
            await db.loadVariantsByID(Sids.split(","),setSubVar)
        }
        setCollapsed(false)
        loadData()
    },[Oids,Sids,navigation])

    const onHeadPress = () =>{
        setCollapsed(!collapsed)
    }

    if(objVar != null || subVar != null){

        const objPage = () => {
            if(objVar == null){
                return(null)
            }
            return objVar.map((ele,index) =>{
                return(
                    <View key = {index}>
                        <CharacterText param = {ele.subject} head={ele.variance + " variant "} textStyle = {styles.meaningText} navigation = {navigation}/>
                    </View>
                )
            })
        }
        const subPage = () => {
            if(subVar == null){
                return(null)
            }
            return subVar.map((ele,index) =>{
                return(
                    <View key = {index}>
                        <CharacterText param = {ele.object} head={ele.variance + " variant of "} textStyle = {styles.meaningText} navigation = {navigation}/>
                    </View>
                )
            })
        }

        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.headContainer} onPress={onHeadPress}>
                    <Text style={styles.headText}>Variants</Text>
                    <Icon name= {collapsed ? "arrow-drop-down":"arrow-drop-up"} type = 'material' color = 'white' size = {25}/>
                </TouchableOpacity>
                <View style = {styles.varContainer}>
                    {(objVar != null && !collapsed)? <Text style = {styles.subText}>This character has... </Text>:null}
                    {(objVar != null && !collapsed)? objPage():null}
                    {(subVar != null && !collapsed)? <Text style = {styles.subText}>This character is... </Text>:null}
                    {(subVar != null && !collapsed)? subPage():null}
                </View>
            </View>
        )
    } else {
        return (<View></View>)
    }
}

const styles = StyleSheet.create({
    headContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    headText:{
        fontSize: 25,
        color:"#fff",
    },
    container:{
        flex:1,
        marginBottom:10,
    },
    varContainer:{
        marginHorizontal:20,
    },
    meaningText:{
        fontSize:20,
        color:"white",
        alignSelf:"flex-end"
    },
    subText:{
        fontSize:20,
        color:"white"
    }
})