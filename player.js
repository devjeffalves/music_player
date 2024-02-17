import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Audio}  from 'expo-av';

export default function Player(props) {
    const handlePlay = async ()=>{
        let curFile = props.musics[props.audioIndex].file;

        let newMusics = props.musics.filter((val,k) =>{
            if(id.audioIndex == k){
              props.musics[id].playing = true;
              curFile = props.musics[k].file;
            
            }
            else{
              props.musics[k].playing = false;
            }
      
            return props.musics[k];
          })

          try{

            if(props.audio != null){
                props.setPlaying(true);
                props.setMusics(newMusics);
                await props.audio.playAsync();
            }else{
                let curAudio = new Audio.Sound();
                try{
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();

                }catch(error){}
                props.setAudio(curAudio);
                props.setMusics(newMusics);
                props.setPlaying(true);

            }

          } catch{error}{}
 
    }
    const handlePause = async()=>{
        if(props.audio!= null){
            props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }


    return (
        <View style = {styles.Player}>

            <TouchableOpacity style={{marginRight: 20, marginLeft: 20}}>
            <AntDesign name="banckward" size={35} color="white" />
            </TouchableOpacity>

            {
            (!props.playing)?
            <TouchableOpacity onPress={()=>handlePlay()}style={{marginRight: 20, marginLeft: 20}}>
            <AntDesign name="playcircleo" size={35} color="white" />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=> handlePause()} style={{marginRight: 20, marginLeft: 20}}>
            <AntDesign name="pausecircleo" size={35} color="white" />
            </TouchableOpacity>

            }
            <TouchableOpacity style={{marginRight: 20, marginLeft: 20}}>
            <AntDesign name="forward" size={35} color="white" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    Player: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    }
});
