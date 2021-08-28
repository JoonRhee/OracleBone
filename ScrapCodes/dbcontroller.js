import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'

import { Alert } from 'react-native';

var lastgot = null

export async function checkAndDownloadDB(){
    console.log("--checkAndDownloadDB start--\n")
    console.log("0.check dir exists")
    var exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists
    if(!exists){
        console.log("\tdir doesnt exist, make em")
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    }
    console.log("\tdir exists!\n")

    console.log("1.check char_info exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/char_info.db`)).exists
    if(!exists){
        console.log("\tchar_info doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./char_info.db")).uri,
            `${FileSystem.documentDirectory}SQLite/char_info.db`
        )
    }
    console.log("\tchar_info exists!\n")

    console.log("2.check char exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/char.db`)).exists
    if(!exists){
        console.log("\tchar doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./char.db")).uri,
            `${FileSystem.documentDirectory}SQLite/char.db`
        )
    }
    console.log("\tchar exists!\n")

    console.log("3.check cn_vocabs exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/cn_vocabs.db`)).exists
    if(!exists){
        console.log("\tcn_vocabs doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./cn_vocabs.db")).uri,
            `${FileSystem.documentDirectory}SQLite/cn_vocabs.db`
        )
    }
    console.log("\tcn_vocabs exists!\n")

    console.log("4.check jp_vocabs exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/jp_vocabs.db`)).exists
    if(!exists){
        console.log("\tjp_vocabs doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./jp_vocabs.db")).uri,
            `${FileSystem.documentDirectory}SQLite/jp_vocabs.db`
        )
    }
    console.log("\tjp_vocabs exists!\n")

    console.log("5.check kr_vocabs exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/kr_vocabs.db`)).exists
    if(!exists){
        console.log("\tkr_vocabs doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./kr_vocabs.db")).uri,
            `${FileSystem.documentDirectory}SQLite/kr_vocabs.db`
        )
    }
    console.log("\tkr_vocabs exists!\n")

    console.log("6.check hanzi exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/hanzi.db`)).exists
    if(!exists){
        console.log("\thanzi doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./hanzi.db")).uri,
            `${FileSystem.documentDirectory}SQLite/hanzi.db`
        )
    }
    console.log("\thanzi exists!\n")

    console.log("7.check kanji exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/kanji.db`)).exists
    if(!exists){
        console.log("\tkanji doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./kanji.db")).uri,
            `${FileSystem.documentDirectory}SQLite/kanji.db`
        )
    }
    console.log("\tkanji exists!\n")
    
    console.log("8.check hanja exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/hanja.db`)).exists
    if(!exists){
        console.log("\thanja doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./hanja.db")).uri,
            `${FileSystem.documentDirectory}SQLite/hanja.db`
        )
    }
    console.log("\thanja exists!\n")

    console.log("9.check variants exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/variants.db`)).exists
    if(!exists){
        console.log("\tvariants doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./variants.db")).uri,
            `${FileSystem.documentDirectory}SQLite/variants.db`
        )
    }
    console.log("\tvariants exists!\n")
    console.log("--checkAndDownloadDB done--\n")
}

export async function getCharInfo(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("char_info.db")
    var query = "SELECT * FROM character_info WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, char_info : [...prevState.char_info,results.rows._array]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getChar(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("char.db")
    var query = "SELECT * FROM char WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, char : [...prevState.char,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getCnVocabs(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("cn_vocabs.db")
    var query = "SELECT * FROM cn_vocabs WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, cn_vocabs : [...prevState.cn_vocabs,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getJpVocabs(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("jp_vocabs.db")
    var query = "SELECT * FROM jp_vocabs WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, jp_vocabs : [...prevState.jp_vocabs,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getKrVocabs(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("kr_vocabs.db")
    var query = "SELECT * FROM kr_vocabs WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, kr_vocabs : [...prevState.kr_vocabs,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getHanzi(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("hanzi.db")
    var query = "SELECT * FROM hanzi WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, hanzi : [...prevState.hanzi,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getKanji(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("kanji.db")
    var query = "SELECT * FROM kanji WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, kanji : [...prevState.kanji,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getHanja(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("hanja.db")
    var query = "SELECT * FROM hanja WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, hanja : [...prevState.hanja,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}

export async function getVariants(id,setState,prevState){
    await checkAndDownloadDB()
    var ndb = SQLite.openDatabase("variants.db")
    var query = "SELECT * FROM variants WHERE id = ?"
    var params = [id]

    ndb.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            console.log(results);
            setState({...prevState, variants : [...prevState.variants,results]})
        }, function (tx, err) {
            console.log(err)
            setState({...prevState, err : [...prevState.err,err]})
        })
    })
}