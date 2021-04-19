import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

interface ButtonProps {
    icon: string;
}

export default function Button() {
    return(
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text>
                <Feather name="arrow-right" size={18} color="#FFF" />
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#32B768",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
});
  