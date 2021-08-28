import React, {useState,useEffect} from 'react'
import { Text, View, SafeAreaView, StyleSheet,ScrollView,Dimensions} from 'react-native'

import * as db from '../assets/db/dbcontroller'
import CharacterText from '../components/CharacterText'
import DefContainer from '../components/DefContainer'
import WordsContainer from '../components/wordsContainer'
import VariantContainer from '../components/VariantContainer'
import {Badge } from 'native-base'

export default function main({navigation,route}) {
    const [data,setData] = useState(null)
    useEffect(() => {
        async function loadData(){
            await db.loadCharacterInfo(route.params.id,setData)
        }
        loadData()
    },[route])

    const badgify = (head,info,lang) =>{
        let styleToUse = styles.cnBadge
        if(lang == 'cn'){
            styleToUse = styles.cnBadge
        }
        if(lang == 'jp'){
            styleToUse = styles.jpBadge
        }
        if(lang == 'kr'){
            styleToUse = styles.krBadge
        }
        return(
            <View style={styles.badgeContainer}>
                <Badge style = {styleToUse}>
                    <Text style = {styles.badgeText}>{head+info}</Text>
                </Badge>
            </View>
        )
    }

    if(data!=null){
        return(
            <View style={styles.container}>
                
                <View style = {styles.core}>
                    <Text selectable style = {styles.character}>{data.character}</Text>
                    <View style = {styles.attributes}>
                        <View style = {styles.badges}>
                            {(data.hsk == '') ? null:badgify("HSK ",data.hsk,"cn")}
                            {(data.jlpt == '') ? null:badgify("JLPT ",data.jlpt,"jp")}
                            {(data.grade == '') ? null:badgify("",data.grade,"kr")}
                        </View> 
                        <Text style = {styles.text}>Stroke Count: {data.stroke_count}</Text>
                        <Text style = {styles.text}>Kangxi Radical: {data.kangxi_radical}</Text>
                        {(data.traditional == "") ? null:<CharacterText param = {data.traditional} head = "Traditional: " textStyle = {styles.charTextStyle} navigation = {navigation}/>}
                        {(data.simplified == "") ? null:<CharacterText param = {data.simplified} head = "Simplified: " textStyle = {styles.charTextStyle} navigation = {navigation}/>}
                        {(data.japanese == "") ? null:<CharacterText param = {data.japanese} head = "Shinjitai: " textStyle = {styles.charTextStyle} navigation = {navigation}/>}
                    </View>
                </View>
                <ScrollView>
                    <DefContainer ids = {data.hanzi} lang = 'cn'/>
                    <DefContainer ids = {data.kanji} lang = 'jp'/>
                    <DefContainer ids = {data.hanja} lang = 'kr'/>
                    <WordsContainer ids = {data.hsk_vocabs} header="HSK Vocabs" lang = 'cn'/>
                    <WordsContainer ids = {data.jlpt_vocabs} header="JLPT Vocabs" lang = 'jp'/>
                    <WordsContainer ids = {data.kr_vocabs} header="Korean Vocabs" lang = 'kr'/>
                    <VariantContainer Oids = {data.variants_object} Sids = {data.variants_subject} navigation = {navigation}/>
                </ScrollView>
            </View>
        )
    } else {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Cannot Find {route.params.character}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    character:{
        fontSize: 75,
        color:"#fff",
        alignSelf:"center",
    },
    text: {
      color : '#fff',
      fontSize : 20,
    },
    test:{
        alignSelf:"stretch"
    },
    core:{
        alignSelf:"stretch",
        flexDirection: "row",
        justifyContent:"space-around",
        borderBottomWidth:1,
        borderBottomColor:"#1b1b1b"
    },
    attributes:{
        flexDirection: 'column',
        justifyContent:"center",
    },
    charTextStyle:{
        color: '#fff',
        fontSize: 20
    },
    badges:{
        alignSelf:"stretch",
        flexDirection: "row",
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
    },
    defBox:{
        flex:1,
        backgroundColor:"blue"
    }
    
})