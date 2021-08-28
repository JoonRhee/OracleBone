import React, {useState,useEffect} from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as db from '../assets/db/dbcontroller'
import {Card, Icon} from 'react-native-elements'

export default function main({ids,lang}) {
    const [data,setData] = useState(null)
    const [collapsed,setCollapsed] = useState(false)
    useEffect(()=>{
        async function loadData(){
            if(lang == 'cn'){
                await db.loadHanziDefsByID(ids.split(","),setData)
            }
            if(lang == 'jp'){
                await db.loadKanjiDefsByID(ids.split(","),setData)
            }
            if(lang == 'kr'){
                await db.loadHanjaDefsByID(ids.split(","),setData)
            }
        }
        setCollapsed(false)
        loadData()
    },[ids,lang])

    const onHeadPress = () =>{
        setCollapsed(!collapsed)
    }
    

    if(data!=null){
        const dataPage = () => {
            let sorted = data
            if(lang == 'cn'){
                sorted.sort((a,b) =>{
                    let lenCheck = ((a.pinyin.length == 0) - (b.pinyin.length == 0))
                    if(lenCheck != 0){
                        return lenCheck
                    }

                    let seeCheck = ((a.meaning.split(";")[0].includes("see ")) - (b.meaning.split(";")[0].includes("see ")))
                    if(seeCheck != 0){
                        return seeCheck
                    }

                    let varCheck = ((a.meaning.split(";")[0].includes("variant of")) - (b.meaning.split(";")[0].includes("variant of")))
                    if(varCheck != 0){
                        return varCheck
                    }

                    let capCheck = ((b.pinyin[0] == b.pinyin[0].toLowerCase()) - (a.pinyin[0] == a.pinyin[0].toLowerCase()))
                    if(capCheck != 0){
                        return capCheck
                    }
                })
            }

            return sorted.map((ele,index) =>{
                
                if(lang == 'cn'){
                    return(
                        <View key = {index}>
                            <Card
                                containerStyle = {{borderRadius:10, backgroundColor:"#121212"}}
                                titleStyle = {{alignSelf:"flex-start", color:"white"}}
                                title = {((ele.pinyin == "") ? " ":ele.pinyin)}>
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
                                title = {((ele.onyomi == "") ? " ":ele.onyomi.split(";").join(" ·"))}>
                                <Text style = {styles.meaningText}>{((ele.kunyomi == "") ? "":ele.kunyomi+"\n" ) +ele.meaning}</Text>
                            </Card>
                        </View>
                    )
                }
                if(lang == 'kr'){
                    return(
                        <View key = {index}>
                            <Card
                                containerStyle = {{borderRadius:10, backgroundColor:"#121212"}}
                                titleStyle = {{alignSelf:"flex-start", color:"white", }}
                                title = {((ele.reading == "") ? " ":ele.reading)}>
                                <Text selectable={true} style = {styles.meaningText}>{ele.meaning}</Text>
                            </Card>
                        </View>
                    )
                }
                return (
                    <View key = {index}>
                        <Text >{JSON.stringify(ele)}</Text>
                    </View>
                )
            })
        }


        let head = ""
        if(lang == 'cn'){
            head = "Chinese Definition" + ((data.length == 1) ? "":"s" )
        }
        if(lang == 'jp'){
            head = "Japanese Definition" + ((data.length == 1) ? "":"s")
        }
        if(lang == 'kr'){
            head = "Korean Definition" + ((data.length == 1) ? "":"s")
        }

        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.headContainer} onPress={onHeadPress}>
                    <Text style={styles.headText}>{head}</Text>
                    <Icon name= {collapsed ? "arrow-drop-down":"arrow-drop-up"} type = 'material' color = 'white' size = {25}/>
                </TouchableOpacity>
                {collapsed ? null:dataPage()}
            </View>
        )
    } else {
        return(
            <View></View>
        )
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
    }
})