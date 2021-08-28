import React,{useState} from 'react'
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import { Icon} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View,Text,StatusBar,ScrollView} from 'react-native'

import Home from './Home'
import JlptChar from './JLPTCharList'
import HskChar from './HSKCharList'
import HangumChar from './HangumCharList'
import CharInfo from './CharacterInfo'
import Void from './void'
import Settings from './Settings'
import CustomSearchBar from '../components/SearchComponent'
import SearchResults from './SearchResults'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
export default function Navigator() {

    const drawerButtonVisibleName = ['JLPT Characters','HSK Characters','Home',"Graded Hanja Characters","Settings" ]
    const headerSetting = (navigation,route) => {
        if(!drawerButtonVisibleName.includes(route.name)){
            return({
                headerStyle: {
                    backgroundColor: '#121212',
                },
                headerTintColor: '#fff',
            })
        }

        const drawerOpenIcon = () => {
            return(
                <View>
                    <TouchableOpacity onPress = {navigation.openDrawer}>
                        <Icon name="menu" type = 'material' color = 'white'/>
                    </TouchableOpacity>
                </View>
            )
        }

        const searchComponent = () => {
            return(
                <CustomSearchBar navigation = {navigation} route = {route}/>
            )
        }

        if(route.name == "Home"){
            return({
                headerStyle: {
                    backgroundColor: '#121212',
                },
                headerTintColor: '#fff',
                headerLeft:drawerOpenIcon,
                headerLeftContainerStyle : {margin:15},
                headerRight: searchComponent
            })
        }
        return({
            headerStyle: {
                backgroundColor: '#121212',
            },
            headerTintColor: '#fff',
            headerLeft:drawerOpenIcon,
            headerLeftContainerStyle : {margin:15}
        })

    }

    const JlptCharStack = () => {
        return(
            <Stack.Navigator headerMode = 'screen' screenOptions = {({navigation,route}) => (headerSetting(navigation,route))}>
                <Stack.Screen name = "JLPT Characters" component = {JlptChar}/>
                <Stack.Screen name = "Character" component = {CharInfo} options = {({route}) => ({ title : route.params.character})}/>
                <Stack.Screen name = "Settings" component = {Settings} />
                <Stack.Screen name = "Void" component = {Void} />
            </Stack.Navigator>
        )
    }
    const HskCharStack = () => {
        return(
            <Stack.Navigator headerMode = 'screen' screenOptions = {({navigation,route}) => (headerSetting(navigation,route))}>
                <Stack.Screen name = "HSK Characters" component = {HskChar}/>
                <Stack.Screen name = "Character" component = {CharInfo} options = {({route}) => ({ title : route.params.character})}/>
                <Stack.Screen name = "Settings" component = {Settings} />
                <Stack.Screen name = "Void" component = {Void} />
            </Stack.Navigator>
        )
    }

    const HangumCharStack = () => {
        return(
            <Stack.Navigator headerMode = 'screen' screenOptions = {({navigation,route}) => (headerSetting(navigation,route))}>
                <Stack.Screen name = "Graded Hanja Characters" component = {HangumChar}/>
                <Stack.Screen name = "Character" component = {CharInfo} options = {({route}) => ({ title : route.params.character})}/>
                <Stack.Screen name = "Settings" component = {Settings} />
                <Stack.Screen name = "Void" component = {Void} />
            </Stack.Navigator>
        )
    }

    const HomeStack = () => {
        return(
            <Stack.Navigator headerMode = 'screen' screenOptions = {({navigation,route}) => (headerSetting(navigation,route))}>
                <Stack.Screen name = "Home" component = {Home}/>
                <Stack.Screen name = "Character" component = {CharInfo} options = {({route}) => ({ title : route.params.character})}/>
                <Stack.Screen name = "Settings" component = {Settings} />
                <Stack.Screen name = "SearchResults" component = {SearchResults} options = {({route}) => ({ title : "Search result for \""+route.params+"\""})}/>
                <Stack.Screen name = "Void" component = {Void} />
            </Stack.Navigator>
        )
    }

    const SettingsStack = () => {
        return(
            <Stack.Navigator headerMode = 'screen' screenOptions = {({navigation,route}) => (headerSetting(navigation,route))}>
                <Stack.Screen name = "Settings" component = {Settings} />
            </Stack.Navigator>
        )
    }

    const testDrawer = () =>{
        
        const CustomDrawerContent = (props) =>{
            return(
                <View style = {styles.container}>
                    <View style = {styles.titleHeader}>
                        <Text style = {styles.text}>Oraclebone - 甲骨</Text>
                    </View>
                    <ScrollView {...props}>
                        <DrawerItemList {...props}/>
                    </ScrollView>
                </View>
            )
        }

        return(
            <Drawer.Navigator
                drawerStyle={{
                    backgroundColor:'#121212'
                }}
                drawerContentOptions={{
                    inactiveTintColor : "#fff"
                }}
                drawerContent={props => CustomDrawerContent(props)}
            >
                <Drawer.Screen 
                    name = "Home" 
                    component = {HomeStack} 
                    options = {{drawerIcon:({focused,color})=>(<Icon name="home" type = 'material' containerStyle = {{}} color = {color}/>)}}
                />

                <Drawer.Screen 
                    name = "JLPT Characters" 
                    component = {JlptCharStack}
                    options = {{drawerIcon:({focused,color})=>(<Icon name="library-books" type = 'material' containerStyle = {{}} color = {color}/>)}}
                />

                <Drawer.Screen 
                    name = "HSK Characters" 
                    component = {HskCharStack}
                    options = {{drawerIcon:({focused,color})=>(<Icon name="library-books" type = 'material' containerStyle = {{}} color = {color}/>)}}
                />

                <Drawer.Screen 
                    name = "Graded Hanja Characters" 
                    component = {HangumCharStack}
                    options = {{drawerIcon:({focused,color})=>(<Icon name="library-books" type = 'material' containerStyle = {{}} color = {color}/>)}}
                />

                <Drawer.Screen 
                    name = "Settings" 
                    component = {SettingsStack}
                    options = {{drawerIcon:({focused,color})=>(<Icon name="settings" type = 'material' containerStyle = {{}} color = {color}/>)}}
                />

            </Drawer.Navigator>
        )

    }

    return(testDrawer())
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    titleHeader:{
        flexDirection: "row",
        marginTop: StatusBar.currentHeight,
        padding:13,
        backgroundColor:"#1b1b1b",
        alignContent: "center",
        justifyContent:"space-between"
        
    },
    text: {
      color : '#fff',
      fontSize : 20,
    },
    test:{
        alignSelf:"stretch"
    }
  })