import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [audio, setAudio] = useState(null);
  const [ musics, setMusics] = useState([
    
    {
      name: ' Emanuel',
      artist: 'Fernandinho',
      playing: false,
      file: ''
    },

    {
      name: ' Meu Universo',
      artist: 'PG',
      playing: false,
      file: require ('./audio.mp3')
    },

    {
      name: 'Save from myself',
      artist: 'Oficina G3',
      playing: false,
      file: require ('./audio.mp3')
    },

    {
      name: 'Eu sou livre',
      artist: 'David Quinlan',
      playing: false,
      file: require ('./audio.mp3')
    }

  ]);

  const changeMusic = async (id) => {
    let curFile = null;
    let newMusics = musics.filter((val,k) =>{
      if(id == k){
        musics[id].playing = true;
        curFile = musics[k].file;
      }
      else{
        musics[k].playing = false;
      }

      return musics[k];
    })

    if(audio != null){
      audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();

    try{
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    }catch(error){}

    setAudio(curAudio);
    setMusics(newMusics);
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Text style={{textAlign:'center', color:'white', fontSize:25}}>Music Player</Text>
      </View>

      <View style={styles.table}>
        <Text style= {{ width:'50%', color:'rgb(200, 200, 200)'}}>Music</Text>
        <Text style= {{ width:'50%', color:'rgb(200, 200, 200)'}}>Artist</Text>
      </View>

      {
        musics.map((val, k)=>{

          if(val.playing){
          // renderiza algo qui
          return(
            <View style={styles.table}>
              <TouchableOpacity onPress={() => changeMusic (k)} style= {{width: '100%', flexDirection:'row'}}>
                <Text style={styles.tableTextSelected}><AntDesign name= "play" size={15} 
                color= '#1D8954' />  {val.name}</Text>
                <Text style={styles.tableTextSelected}> {val.artist}</Text>

              </TouchableOpacity>
            </View>
          );
          } else{
            //renderiza algo aqui
            return(
              <View style={styles.table}>
              <TouchableOpacity onPress={() => changeMusic (k)}  style= {{width: '100%', flexDirection:'row'}}>
                <Text style= {styles.tableText}><AntDesign name= "play" size={15} 
                color="white"/>  {val.name}</Text>
                <Text style= {styles.tableText}> {val.artist}</Text>

                </TouchableOpacity>
              </View>
            );
          }
        })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:{
    backgroundColor: '#1D8954',
    width: '100%',
    padding: 20
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  tableText: { 
    width:'50%', 
    color:'white'
  },

  tableTextSelected: {
      width:'50%', 
      color:'#1D8954'
  },

  });
