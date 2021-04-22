import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import userImg from "../assets/gouvea.jpeg";

export default function Header() {
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Ola,</Text>
                <Text style={styles.username}>Gouvea!</Text>
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