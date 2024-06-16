import { Text, View ,Image ,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import img from '../assets/youtube.png'
export class Home extends Component {
  render() {

    return (
      <View style={styles.container}>
              <Image source={img} style={styles.image} resizeMode='contain'/>

        <Text style={styles.textmain}>Hello Youtube</Text>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent: 'center',
    },
    textmain : {
        color:"red",
        fontSize:20,
        fontWeight:'bold'
    },
    image : {
        width: 300,
        height:180,
        marginBottom:40
    },
  });
  