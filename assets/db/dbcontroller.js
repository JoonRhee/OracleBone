import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'

const mute = true

export async function checkAndDownloadDB(){
    
    if(!mute) console.log("--checkAndDownloadDB start--\n")
    if(!mute) console.log("0.check dir exists")
    var exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists
    if(!exists){
        if(!mute) console.log("\tdir doesnt exist, make em")
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    }
    if(!mute) console.log("\tdir exists!\n")

    if(!mute) console.log("1.check char_info exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/char_info.db`)).exists
    if(!exists){
        if(!mute) console.log("\tchar_info doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./char_info.db")).uri,
            `${FileSystem.documentDirectory}SQLite/char_info.db`
        )
    }
    if(!mute) console.log("\tchar_info exists!\n")

    if(!mute) console.log("2.check char exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/char.db`)).exists
    if(!exists){
        if(!mute) console.log("\tchar doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./char.db")).uri,
            `${FileSystem.documentDirectory}SQLite/char.db`
        )
    }
    if(!mute) console.log("\tchar exists!\n")

    if(!mute) console.log("3.check cn_vocabs exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/cn_vocabs.db`)).exists
    if(!exists){
        if(!mute) console.log("\tcn_vocabs doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./cn_vocabs.db")).uri,
            `${FileSystem.documentDirectory}SQLite/cn_vocabs.db`
        )
    }
    if(!mute) console.log("\tcn_vocabs exists!\n")

    if(!mute) console.log("4.check jp_vocabs exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/jp_vocabs.db`)).exists
    if(!exists){
        if(!mute) console.log("\tjp_vocabs doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./jp_vocabs.db")).uri,
            `${FileSystem.documentDirectory}SQLite/jp_vocabs.db`
        )
    }
    if(!mute) console.log("\tjp_vocabs exists!\n")

    if(!mute) console.log("5.check kr_vocabs exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/kr_vocabs.db`)).exists
    if(!exists){
        if(!mute) console.log("\tkr_vocabs doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./kr_vocabs.db")).uri,
            `${FileSystem.documentDirectory}SQLite/kr_vocabs.db`
        )
    }
    if(!mute) console.log("\tkr_vocabs exists!\n")

    if(!mute) console.log("6.check hanzi exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/hanzi.db`)).exists
    if(!exists){
        if(!mute) console.log("\thanzi doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./hanzi.db")).uri,
            `${FileSystem.documentDirectory}SQLite/hanzi.db`
        )
    }
    if(!mute) console.log("\thanzi exists!\n")

    if(!mute) console.log("7.check kanji exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/kanji.db`)).exists
    if(!exists){
        if(!mute) console.log("\tkanji doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./kanji.db")).uri,
            `${FileSystem.documentDirectory}SQLite/kanji.db`
        )
    }
    if(!mute) console.log("\tkanji exists!\n")
    
    if(!mute) console.log("8.check hanja exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/hanja.db`)).exists
    if(!exists){
        if(!mute) console.log("\thanja doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./hanja.db")).uri,
            `${FileSystem.documentDirectory}SQLite/hanja.db`
        )
    }
    if(!mute) console.log("\thanja exists!\n")

    if(!mute) console.log("9.check variants exists")
    exists = (await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/variants.db`)).exists
    if(!exists){
        if(!mute) console.log("\tvariants doesnt exist")
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./variants.db")).uri,
            `${FileSystem.documentDirectory}SQLite/variants.db`
        )
    }
    if(!mute) console.log("\tvariants exists!\n")
    if(!mute) console.log("--checkAndDownloadDB done--\n")
}

export async function loadAllCharacters(idList,setState){
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("char.db")
    var query = "SELECT * FROM char WHERE id IN ("+idList.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadCharacterInfo(id,setState){
    if(!mute) console.log("loadCharacterInfo")
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("char_info.db")
    var query = "SELECT * FROM character_info WHERE id = ?"
    var params = [id]
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(!mute) console.log("loadCharacterInfo done")
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array[0])
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadCharacterByID(id,setState){
    if(!mute) console.log("loadCharacterByID")
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("char.db")
    var query = "SELECT * FROM char WHERE id = ?"
    var params = [id]
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(!mute) console.log("loadCharacterByID done")
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array[0])
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadHanziDefsByID(ids,setState){
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("hanzi.db")
    var query = "SELECT * FROM hanzi WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadKanjiDefsByID(ids,setState){
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("kanji.db")
    var query = "SELECT * FROM kanji WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadHanjaDefsByID(ids,setState){
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("hanja.db")
    var query = "SELECT * FROM hanja WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })
}

export async function loadCnVocabsByID(ids,setState){
    if(!mute) console.log("loadCnVocabByID")
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("cn_vocabs.db")
    var query = "SELECT * FROM cn_vocabs WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(!mute) console.log("loadCnVocabByID done")
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadJpVocabsByID(ids,setState){
    if(!mute) console.log("loadJpVocabByID")
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("jp_vocabs.db")
    var query = "SELECT * FROM jp_vocabs WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(!mute) console.log("loadJpVocabByID done")
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })

}

export async function loadKrVocabsByID(ids,setState){
    if(!mute) console.log("loadKrVocabByID")
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("kr_vocabs.db")
    var query = "SELECT * FROM kr_vocabs WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(!mute) console.log("loadKrVocabByID done")
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })
}
export async function loadVariantsByID(ids,setState){
    if(!mute) console.log("loadVariantsByID")
    await checkAndDownloadDB()
    var db = SQLite.openDatabase("variants.db")
    var query = "SELECT * FROM variants WHERE id IN ("+ids.join(",")+")"
    var params = []
    
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if(!mute) console.log("loadVariantsByID done")
            if(results.rows.length == 0){
                setState(null)
            } else {
                setState(results.rows._array)
            }
        }, function (tx, err) {
            console.log(err)
        })
    })
}