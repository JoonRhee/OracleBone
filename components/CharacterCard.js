import React, {useState,useEffect} from 'react'
import { Text, View, Button} from 'react-native'
import * as db from '../assets/db/dbcontroller'

export default function main({id}) {
    const [data,setData] = useState(null)


    if(data!=null){
        return(
            <View>
                <Text>aaaaa</Text>
            </View>
        )
    } else {
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
}