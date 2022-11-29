import { StyleSheet, Text, View, Image, ImageBackground,TouchableOpacity } from "react-native";
import React from "react";

export default function Stats({ navigation }) {
  return (
    <ImageBackground source = {require('../assets/homeBackground.png')}
    resizeMode = "cover"
    style = {styles.image}>
    
    <Text style={{fontFamily: "Inter-Light", fontSize: 20, padding: 10, backgroundColor: 'white' }}>You Got This! We Are Proud Of You!</Text>
    <Text style={{fontFamily: "Inter-Light", fontSize: 30, padding: 30 }}>Items To Toss To Help Achieve Your Goal of x% Utilization:</Text>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute"
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },
  button1: {
    // flex: 1,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    // marginBottom: 20,
    paddingTop:10,
    paddingBottom:10,
    padding: 40,
    backgroundColor:'#F4BAA7',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  bottomButton: {
    // marginRight:40,
    // marginLeft:40,
    // flex: 1,
    // marginTop:10,
    margin: 8,
    marginBottom: 20,
    paddingTop:10,
    paddingBottom:10,
    padding: 40,
    backgroundColor:'#F4BAA7',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText: {
    fontSize: 20,
    fontFamily: "Inter-Light",
    fontWeight: "bold",
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
});

