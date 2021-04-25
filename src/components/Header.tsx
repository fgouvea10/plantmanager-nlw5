import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import userImg from "../assets/gouvea.jpeg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {

    const [username, setUsername] = useState<string>();

    useEffect(() => {
        async function loadStorageUsername() {
            const user = await AsyncStorage.getItem("@plantmanager:user");
            setUsername(user || "")
        }
        loadStorageUsername();
    }, []);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{ username }!</Text>
            </View>

            <Image source={ userImg } style={styles.img} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },

    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    },

    img: {
        width: 56,
        height: 56,
        borderRadius: 30,
    },
});