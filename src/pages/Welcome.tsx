import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';

export default function Welcome() {

  const navigation = useNavigation();

  function handleNavigateToNextWindow() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
            Gerencie {"\n"}
            suas plantas {"\n"}
            de forma fácil! 
          </Text>
        <Image 
          source={wateringImg} 
          style={styles.img} 
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
            Não esqueça mais de regar suas plantas. 
            Nós cuidamos de lembrar você sempre que precisar!
        </Text>

        <TouchableOpacity 
          style={styles.btn} 
          activeOpacity={0.8} 
          onPress={handleNavigateToNextWindow}>
              <Text>
                  <Feather 
                    name="chevron-right" 
                    size={18}
                    color={colors.white} 
                  />
              </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  title: {
      fontSize: 28,
      textAlign: "center",
      color: colors.heading,
      marginTop: 38,
      fontFamily: fonts.heading,
      lineHeight: 34,
  },

  subtitle: {
      textAlign: "center",
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading,
      fontFamily: fonts.text,
  },

  img: {
    height: Dimensions.get("window").width * 0.7,
  },

  btn: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
});
