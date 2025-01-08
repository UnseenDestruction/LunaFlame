import React from "react"
import { View, Text, TouchableOpacity } from "react-native"


export default function NavM()  {

    return(
        <View style={{
            flexDirection: 'row',
            position: 'relative',
            top: -10,
            
           }}>
            <TouchableOpacity style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <View style={{
                 backgroundColor: '#FC0160',
                 width: 90,
                 height: 1
              }} />
              <Text style={{
                 color: '#FC0160', fontSize: 18,  fontFamily: 'Bold',
              }} >
                Love
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.3
            }}>
              <View style={{
                 backgroundColor: '#FC0160',
                 width: 100,
                 height: 1
              }} />
              <Text style={{
                 color: '#FC0160', fontSize: 18,  fontFamily: 'Bold',
              }} >
               Career
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.3
            }}>
              <View style={{
                 backgroundColor: '#FC0160',
                 width: 100,
                 height: 1
              }} />
              <Text style={{
                 color: '#FC0160', fontSize: 18,  fontFamily: 'Bold',
              }} >
               Friendship
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.3
            }}>
              <View style={{
                 backgroundColor: '#FC0160',
                 width: 100,
                 height: 1
              }} />
              <Text style={{
                 color: '#FC0160', fontSize: 18,  fontFamily: 'Bold',
              }} >
               Sex
              </Text>
            </TouchableOpacity>
           </View>
    )

}




