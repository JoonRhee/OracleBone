import React, {useState,useEffect} from 'react'
import { Text, TouchableOpacity} from 'react-native'
import * as db from '../assets/db/dbcontroller'
import idGetter from "../assets/db/IDbyChar.json"

export default function main({param,head = "",tail = "",textStyle = {},navigation = null}) {
    const [data,setData] = useState(null)
    useEffect(()=>{
        async function loadData(){
            await db.loadCharacterByID(param,setData)
        }
        if(isNaN(param)){
            setData({
                id:idGetter[param],
                character:param,
            })
        } else{
            loadData()
        }
    },[param])

    const onPress = () => {
        if (navigation != null) {
            navigation.navigate("Character",data)
        }
    }


    if(data!=null){
        return(
            <TouchableOpacity onPress = {onPress}>
                <Text style = {textStyle}>{head + data.character + tail}</Text>
            </TouchableOpacity>
        )
    } else {
        return(
            <Text> </Text>
        )
    }
}