import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as Font from 'expo-font'

import Card from './Card'

const {width, height} = Dimensions.get('screen')


export default function MainView() {

  const [data, setData] = useState({})
  const [results, setResults] = useState([])
  const [url, setUrl] = useState('https://swapi.dev/api/people/')
  const [fontsLoaded, setFontsLoaded] = useState(false)
  
  useEffect(()=>{
    fetch(url)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setData(res)
        setResults(res.results)
      })
      .catch(err=>console.log(err))

      if (!fontsLoaded) {
        loadfonts()
      }
  }, [url])

  const loadfonts = async () => {
    await Font.loadAsync({
      'display' : require('../assets/fonts/Display.ttf'),
      'displayOTF' : require('../assets/fonts/DisplayOTF.otf')
    }).catch(err=>console.log(err))

    setFontsLoaded(true)
  }

  const goBack = (data) => {
    if(data.previous === null) {
      return
    }
    setUrl(data.previous)
  }
  const goForth = (data) => {
    if(data.next === null) {
      return
    }
    setUrl(data.next)
  }

  return (
    <View style={styles.base}>
      <View style={styles.background}>
        <Image source={require('../assets/backgroundImageCrop.jpg')} style={styles.backgroundImage} />
      </View>
      <View style={styles.overlay}>
        <ScrollView style={styles.mainView}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.image}/>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>Base de datos del Imperio</Text>
          </View>
          <View style={styles.list}>
            {results.map(data=><Card name={data.name} height={data.height} mass={data.mass} birth={data.birth_year} gender={data.gender} species={data.species}/>)}
            <View style={styles.controllers}>
                <Text style={styles.pagination}> Pagina Siguiente / Anterior</Text>
                <TouchableOpacity style={{opacity : data.previous!==null ? 1 : 0.5}} onPress={e=>goBack(data)}>
                  <AntDesign name="caretleft" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{opacity : data.next!==null ? 1 : 0.5}} onPress={e=>goForth(data)}>
                  <AntDesign name="caretright" size={24} color="white" />
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    base : {
      width : width,
      height : height,
      position : 'relative'
    },
    background : {
      width : width,
      height : height,
      position : 'absolute',
      top : 0,
      left : 0,
      zIndex : 100
    },
    backgroundImage : {
      resizeMode : 'cover'
    },
    overlay : {
      zIndex : 100000,
      background : 'transparent'
    },
    mainView : {
        padding : 20,
        backgroundColor : 'transparent',
        width : width,
        height : height
    },
    header : {
      width : '100%',
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'center',
      marginTop : 40
    },
    image : {
      width : width - 100,
      height : 150,
      resizeMode : 'stretch',
    },
    description : {
      width : '100%',
      height : 150,
      display : 'flex',
      justifyContent : 'center',
    },
    descriptionText : {
      fontFamily : 'displayOTF',
      color : 'green',
      textAlign : 'center',
      fontSize : 30
    },
    list : {
      marginBottom : 100
    },
    controllers : {
      width : '100%',
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'flex-end',
      alignItems : 'center',
      marginVertical : 10,
      padding : 10
    },
    pagination : {
      fontFamily : 'display',
      color : 'white'
    }
})