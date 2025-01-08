import React from "react"
import { View, Text } from "react-native"



export default function Nav()  {

    return(
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10
          }}>

<View style={{
              flexDirection: 'column',
            }}>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5
            }}>
             DAY
            </Text>
            </View>
            
            <View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              opacity: 0.5
            }}> 
            <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 7,
              width: 7,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
            </View>
            </View>
            <View style={{
              flexDirection: 'column',
            }}>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.8
            }}>
              TODAY
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2
            }}> 
            <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 20,
              borderRadius: 20
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 5,
              width: 5,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 20,
              borderRadius: 20
            }} />
            </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              opacity: 0.5
            }}> 
            <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 7,
              width: 7,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
            </View>
            <View style={{
              flexDirection: 'column',
            }}>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5
            }}>
              TOMMOROW
            </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              opacity: 0.5
            }}> 
            <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 7,
              width: 7,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
            </View>

            <View style={{
              flexDirection: 'column',
            }}>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5
            }}>
             WEEK
            </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              opacity: 0.5
            }}> 
            <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 7,
              width: 7,
              borderRadius: 999
            }} />
             <View style={{
              backgroundColor: '#B2AFFE',
              height: 1,
              width: 5,
              borderRadius: 999
            }} />
            </View>

            <View style={{
              flexDirection: 'column',
            }}>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5
            }}>
             MONTH
            </Text>
            </View>






          </View>
    )

}




