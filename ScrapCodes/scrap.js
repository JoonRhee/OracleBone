if(dbinfo.loading){
    console.log("dbloadingpage")
    return (
      <View style={styles.container}>
        <Text>loadingDB</Text>
      </View>
    ) 
  } else {
    if(resultInfo.loading){
      console.log("resloadingpage")
      return (
        <View style={styles.container}>
          <Text>loadingSearch</Text>
        </View>
      )
    } else {
      console.log("hpage")
      console.log(JSON.stringify(dbinfo))
      console.log(JSON.stringify(resultInfo))
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>{JSON.stringify(resultInfo.result)}</Text>
        </View>
      )
    }
  }

  {"modificationTime":1582643247,"isDirectory":false,"size":10047488,"uri":"file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540seungjoonrhee%252FOraclebone/SQLite/char_info.db","exists":true}

async function checkAndLoadDB(){

    //check if DB exists
    //(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/jp_vocabs.db`)).exists
    const dbexists = false

    //if DB doesnt exists, download it
    if(!dbexists){
      console.log("db doesnt exist")

      //check if directory for db download exists. If it doesnt, make it
      const direxists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists;
      if(!direxists){
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
      }

      //download db
      await FileSystem.downloadAsync(
        Asset.fromModule(require("./assets/db/jp_vocabs1.db")).uri,
        `${FileSystem.documentDirectory}SQLite/jp_vocabs1.db`
      )
      await FileSystem.downloadAsync(
        Asset.fromModule(require("./assets/db/jp_vocabs2.db")).uri,
        `${FileSystem.documentDirectory}SQLite/jp_vocabs2.db`
      )
      await FileSystem.downloadAsync(
        Asset.fromModule(require("./assets/db/jp_vocabs3.db")).uri,
        `${FileSystem.documentDirectory}SQLite/jp_vocabs3.db`
      )
      await FileSystem.downloadAsync(
        Asset.fromModule(require("./assets/db/jp_vocabs.db")).uri,
        `${FileSystem.documentDirectory}SQLite/jp_vocabs.db`
      )
      console.log("db exist now")

      //load db
      setDbInfo({
        loading : false,
        db : SQLite.openDatabase("jp_vocabs.db")
      })
    
    //if DB already exist, load it
    } else {
      console.log("db exists")
      setDbInfo({
        loading : false,
        db : SQLite.openDatabase("jp_vocabs.db")
      })
    }

    var ndb = SQLite.openDatabase("jp_vocabs.db")

    //make the wanted db call
    ndb.transaction((tx) => {
      tx.executeSql(query, params, (tx, results) => {
          console.log(results);
          if (results.rows._array.length > 0) {
              setResultInfo({
                  loading: false,
                  result : results.rows._array
              })
          }
        }, function (tx, err) {
          Alert.alert("FUCK")
        })
    })
}


if(!dbexists){
    console.log("db doesnt exist")

    //check if directory for db download exists. If it doesnt, make it
    const direxists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists;
    if(!direxists){
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    }

    //download db
    await FileSystem.downloadAsync(
      Asset.fromModule(require("./assets/db/jp_vocabs.db")).uri,
      `${FileSystem.documentDirectory}SQLite/jp_vocabs.db`
    )
    console.log("db exist now")

  
  //if DB already exist, load it
  } else {
    console.log("db exists")
    setDbInfo({
      loading : false,
      db : SQLite.openDatabase("jp_vocabs.db")
    })
  }




  import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,SafeAreaView, Dimensions} from 'react-native'
import * as db from '../assets/db/dbcontroller'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ViewPager from '@react-native-community/viewpager'

const itemSize = 50
const numColumns = Math.round(Dimensions.get('window').width/itemSize)
const numRows = Math.round((Dimensions.get('window').height- 200)/itemSize)


export default function main(props) {
  const [data,setData] = useState("")
  const [pageNum,setPageNum] = useState(0)
  const [pages,setPages] = useState(null)

  useEffect(() => {
    async function loadData(){
      await db.loadAllCharacters(props.ids,setData)

    }

    loadData()
  },[])

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
      console.log("X")
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
    let pages = []
    if(data.length == 0){
      return(
        <View key = {"loading"} style = {styles.textContainer}>
          <Text style = {styles.text}>Loading...</Text>
        </View>
      )
    }
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
    return pages
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


  return (
    <View style = {styles.container}>
      <ViewPager style={styles.viewPager} initialPage={0} showPageIndicator={true} >
        {createPages()}
      </ViewPager>
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
    height: 40,
    alignItems : 'center',
    justifyContent : 'center',
  },

})
