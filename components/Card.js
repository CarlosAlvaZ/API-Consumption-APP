import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font'

export default function Card({name, height, mass, birth, gender, species}){
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [speciesData, setSpeciesData] = useState({})
    
    useEffect(()=>{
        if(!fontsLoaded) {
            loadfonts()
        }
        if (species[0]!==undefined){
            fetch(`${species[0]}`)
                .then(res=>res.json())
                .then(res=>setSpeciesData(res))
                .catch(err=>console.log(err))
        }
    }, [])

    const loadfonts = async () => {
        await Font.loadAsync({
          'display' : require('../assets/fonts/Display.ttf'),
          'displayOTF' : require('../assets/fonts/DisplayOTF.otf')
        })
    
        setFontsLoaded(true)
    }

  return(
    <View style={styles.mainCard}>
        <View style={styles.title}>
            <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.cardBody}>
            <View style={styles.cardRow}>
                <View style={styles.keyData}>
                    <Text style={styles.dataTitle}>Altura :</Text>
                    <Text style={styles.dataText}> -    {height}</Text>
                </View>
                <View style={styles.keyData}>
                    <Text style={styles.dataTitle}>Masa :</Text>
                    <Text style={styles.dataText}> -    {mass}</Text>
                </View>
                <View style={styles.keyData}>
                    <Text style={styles.dataTitle}>Nacimiento :</Text>
                    <Text style={styles.dataText}> -    {birth}</Text>
                </View>
            </View>
            <View style={styles.cardRow}>
                <View style={styles.keyData}>
                    <Text style={styles.dataTitle}>Género :</Text>
                    <Text style={styles.dataText}> -    {gender}</Text>
                </View>
                <View style={styles.keyData}>
                    <Text style={styles.dataTitle}>Especie :</Text>
                    <Text style={styles.dataText}> -    {speciesData.name}</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainCard : {
        backgroundColor : 'transparent',
        padding : 20,
        borderRadius : 10,
        borderColor : 'green',
        borderWidth : 2,
        borderStyle : 'dotted',
        marginVertical : 20
    },
    name : {
        fontFamily : 'displayOTF',
        color : 'green',
        fontSize : 20
    },
    cardBody : {
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        marginTop : 20
    },
    cardRow : {
        width : '50%',
    },
    dataTitle : {
        color : 'white',
        fontWeight : '400',
        fontSize : 14,
        fontFamily : 'display'
    },
    dataText : {
        color : 'gray',
        fontFamily : 'display',
        fontSize : 14,
        marginVertical : 10
    }
})