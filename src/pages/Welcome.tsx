import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Button from "../components/Button";
import wateringImg from "../assets/watering.png";

import { Feather } from "@expo/vector-icons";

export default function Welcome() {

    const [visible, setVisible] = useState(false);

  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
          Gerencie {"\n"}
          suas plantas {"\n"}
          de forma fácil! 
          </Text>
      <Image source={wateringImg} style={styles.img} />

      <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar!
      </Text>

    <Button />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      color: "#52665A",
      marginTop: 38,
  },

  subtitle: {
      textAlign: "center",
      fontSize: 18,
      paddingHorizontal: 20,
      color: "#52665A",
  },

  img: {
    width: 292,
    height: 284,
  },


});
