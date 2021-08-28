import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,SafeAreaView, Dimensions} from 'react-native'
import * as db from '../assets/db/dbcontroller'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ViewPager from '@react-native-community/viewpager'
import { Spinner } from 'native-base'
import {Badge} from 'react-native-elements'


const itemSize = 50
var prevId = null

export default function main(props) {

  const numColumns = Math.round(Dimensions.get('window').width/itemSize)
  const numRows = Math.round((Dimensions.get('window').height- props.offset)/itemSize)

  const [data,setData] = useState("")
  const [pageNum,setPageNum] = useState(1)
  const loadScreen = 
    <View style = {styles.loadView}>
      <Spinner color = 'white' />
    </View>

  const [load,setLoad] = useState({
    content:loadScreen,
    loading:true
  })

  useEffect(() => {
    async function loadData(){
      await db.loadAllCharacters(props.ids,setData)

    }
    setData("")
    setLoad({
      content:loadScreen,
      loading:true
    })
    setPageNum(1)
    loadData()
  },[props])

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns)
    var totalLastRow = dataList.length - (totalRows * numColumns)

    while (totalLastRow !== 0 && totalLastRow !== numColumns){
        dataList.push({id: 'blank',character: 'X', empty : true})
        totalLastRow ++
    }
    return dataList
  }

  const _renderItem = ({item,index}) => {
    if(item.empty == true){
      return(
          <View style = {[styles.item,styles.blankItem]}/>
      )
    }

    const pressHandler = () => {
        props.onPress(item)
    }
    return(
        <View style = {styles.item}>
            
            <TouchableOpacity
                onPress = {pressHandler}
            >
                
                <Text style = {styles.itemtext}>{item.character}</Text>
            </TouchableOpacity>
        </View>
    )
  }

  const createPages = () => {
    if(data.length == 0 || !load.loading){
      
      return
    }
    let pages = []
    
    let totalPage = Math.ceil(data.length/(numColumns*numRows))
    for (let i = 0; i < totalPage; i++){
      let start = (i)*numColumns*numRows
      let end = (i+1)*numColumns*numRows
      pages.push(
        <View key = {i.toString()}>
          <FlatList
            data = {formatData(data.slice(start,end),numColumns)}
            renderItem = {_renderItem}
            keyExtractor = {item => item.id.toString()}
            numColumns = {numColumns}
          />
        </View>
      )
    }
    setLoad({
      content:<ViewPager style={styles.viewPager} initialPage={0} onPageSelected = {onScroll}>{pages}</ViewPager>,
      loading:false
    })
  }

  const onScroll = (stuff) => {
    setPageNum(stuff.nativeEvent.position+1)
  }

  const pageNumberString = () => {
    if (data.length == 0){
      return ''
    } else {
      return `${pageNum}/${Math.ceil(data.length/(numColumns*numRows))}`
    }
  }

  createPages()
  return (
    <View style = {styles.container}>
      {load.content}
      <View style = {styles.textContainer}>
        <Text style = {styles.text}>{pageNumberString()}</Text>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  item : {
      backgroundColor: '#1b1b1b',
      alignItems : 'center',
      justifyContent : 'center',
      height : itemSize,
      flex : 1,
      margin : 2
      
  },
  blankItem : {
    backgroundColor : 'transparent'
  },
  itemtext : {
      color : '#fff',
      fontSize : itemSize-25
  },
  viewPager: {
    flex: 1,
  },
  text : {
    color : '#fff',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  textContainer: {
    height: 20,
    alignItems : 'center',
    justifyContent : 'center',
    margin: 20,
  },
  loadView: {
    flex: 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  testS:{
    fontSize : 5
  }

})
