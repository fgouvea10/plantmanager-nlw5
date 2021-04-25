import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from '../components/Button';
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const [userId, setUserId] = useState(false);

    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleNavigateToConfirmation() {

        if(!name) return setUserId(!userId);

        try{
            await AsyncStorage.setItem("@plantmanager:user", name);
            navigation.navigate("Confirmation", {
                title: "Prontinho!",
                subtitle: "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
                buttonTitle: "Começar",
                icon: "smile",
                nextScreen: "PlantSelect"
            });
            
        }catch{
            Alert.alert("Não é possivel salvar o nome do usuário.")
        }
    }
    
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                { isFilled ? "😄" : "😃" }
                            </Text>
                            
                            <Text style={styles.title}>
                                Como podemos {"\n"} 
                                chamar você?
                            </Text>
                        </View>

                        <TextInput 
                            style={[
                                styles.input, 
                                (isFocused || isFilled) && { borderColor: colors.green }
                            ]}
                            placeholder="Digite um nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />

                        <View style={styles.footer}>
                            <Button 
                                title="Confirmar" 
                                onPress={handleNavigateToConfirmation} 
                            />

                            <View style={styles.userNull}>
                                <Text style={ userId ? styles.unhide : styles.hide }>
                                    Você deve inserir um nome 😕
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },

  content: {
    flex: 1,
    width: "100%",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },

  header: {
      alignItems: "center"
  },

  emoji: {
    fontSize: 44,
  },

  input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      color: colors.heading,
      fontFamily: fonts.text,
      width: "100%",
      fontSize: 18,
      marginTop: 50,
      padding: 10,
      textAlign: "center",
  },

  title: {
      fontSize: 24,
      lineHeight: 32,
      textAlign: "center",
      color: colors.heading,
      fontFamily: fonts.heading,
      marginTop: 20,
  },

  userNull: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  hide: {
    display: "none",
  },

  unhide: {
    color: colors.red,
    fontFamily: fonts.text,
  },

  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
