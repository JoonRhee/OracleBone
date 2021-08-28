import React, {useState,useEffect} from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as db from '../assets/db/dbcontroller'
import {Card, Icon} from 'react-native-elements'
import {Badge } from 'native-base'

export default function main({ids,lang,header}) {
    const [data,setData] = useState(null)
    const [collapsed,setCollapsed] = useState(true)

    useEffect(()=>{
        async function loadData(){
            if(lang == "cn"){
                await db.loadCnVocabsByID(ids.split(","),setData)
            }
            if(lang == "jp"){
                await db.loadJpVocabsByID(ids.split(","),setData)
            }
            if(lang == "kr"){
                await db.loadKrVocabsByID(ids.split(","),setData)
            }
        }
        loadData()


    },[ids,lang,header])

    const onHeadPress = () =>{
        setCollapsed(!collapsed)
    }

    if(data!= null){
        const dataPage = () => {
            let sorted = data

            return sorted.map((ele,index) =>{
                if(lang == 'cn'){
                    return(
                        <View key = {index}>
                            
                            <Card
                                containerStyle = {{borderRadius:10, backgroundColor:"#121212"}}
                                titleStyle = {{alignSelf:"flex-start", color:"white"}}
                                title = {((ele.traditional == ele.simplified) ? ele.traditional:(ele.simplified + " ["+ ele.traditional +"]"))}>
                                <Text style = {styles.meaningText}>{ele.pinyin}</Text>
                                <Text style = {styles.meaningText}>{"HSK "+ele.hsk}</Text>
                                <Text style = {styles.meaningText}>{ele.meaning}</Text>

                            </Card>

                        </View>
                    )
                }
                if(lang == 'jp'){
                    return(
                        <View key = {index}>
                            
                            <Card
                                containerStyle = {{borderRadius:10, backgroundColor:"#121212"}}
                                titleStyle = {{alignSelf:"flex-start", color:"white"}}
                                title = {ele.vocab.split(";").join(' ·')}>
                                <Text style = {styles.meaningText}>{ele.reading}</Text>
                                <Text style = {styles.meaningText}>{"JLPT "+ele.jlpt}</Text>
                                <Text style = {styles.meaningText}>{ele.meaning.split("_").join(" ").split("\\").join("\n")}</Text>

                            </Card>

                        </View>
                    )
                }
                if(lang == 'kr'){
                    return(
                        <View key = {index}>
                            
                            <Card
                                containerStyle = {{borderRadius:10, backgroundColor:"#121212"}}
                                titleStyle = {{alignSelf:"flex-start", color:"white"}}
                                title = {ele.vocab}>
                                <Text style = {styles.meaningText}>{ele.reading}</Text>
                                <Text style = {styles.meaningText}>{ele.meaning}</Text>

                            </Card>

                        </View>
                    )
                }

                return(
                    <View key = {index}>
                        <Text>{JSON.stringify(ele)}</Text>
                    </View>
                )
            })
        }

        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.headContainer} onPress={onHeadPress}>
                    <Text style={styles.headText}>{header}</Text>
                    <Icon name= {collapsed ? "arrow-drop-down":"arrow-drop-up"} type = 'material' color = 'white' size = {25}/>
                </TouchableOpacity>
                {collapsed ? null:dataPage()}
            </View>
        )

    } else {
        return(<View></View>)
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
        marginBottom:10
    },
    meaningText:{
        fontSize:15,
        color:"white"
    },
    badgeContainer:{
        marginRight: 10
    },
    badgeText:{
        color : '#fff',
    },
    cnBadge:{
        justifyContent:"center",
        backgroundColor:"#B62D33",
    },
    jpBadge:{
        justifyContent:"center",
        backgroundColor:"#2f7532",

    },
    krBadge:{
        justifyContent:"center",
        backgroundColor:"#0047a0",
    }
})