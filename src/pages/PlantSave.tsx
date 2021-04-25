import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Platform, TouchableOpacity, Alert } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { useNavigation, useRoute } from '@react-navigation/core'; 
import { getBottomSpace } from "react-native-iphone-x-helper";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import waterDrop from "../assets/waterdrop.png";
import Button from "../components/Button";
import { PlantProps, savePlant } from "../libs/storage";

interface Params {
    plant: PlantProps
}

export default function PlantSave() {
    
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

    const route = useRoute();
    const { plant } = route.params as Params; 

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === "android") {
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());

            return Alert.alert("escolha uma data no futuro")
        }

        if(dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePicker() {
        setShowDatePicker(oldState => !oldState);
    }


    async function handleSavePlant() {

        try {
            
            await savePlant ({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate("Confirmation", {
                title: "Tudo certo!",
                subtitle: "Fique tranquilo que sempre iremos lembrar você de cuidar das suas plantinhas com bastante cuidado!",
                buttonTitle: "Muito obrigado",
                icon: "hug",
                nextScreen: "MyPlants"
            });

        } catch (err) {
          Alert.alert(`Não foi possível salvar. Erro: ${err}`)  
        }
    }

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={ plant.photo }
                        height={150}
                        width={150}
                    />

                    <Text style={styles.plantName}>{ plant.name }</Text>
                    <Text style={styles.aboutThePlant}>
                    { plant.about }
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image 
                            source={waterDrop}
                            style={styles.img}
                        />

                        <Text style={styles.tipText}>
                            { plant.water_tips }
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado!
                    </Text>
                    
                    {  
                        showDatePicker && (
                            <DateTimePicker 
                                value={selectedDateTime}
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                            />
                        )}

                        {
                            Platform.OS === "android" && (
                                <TouchableOpacity style={styles.dateTimePickerBtn} onPress={handleOpenDateTimePicker} >
                                    <Text style={styles.dateTimePickerText}>
                                        {`Mudar ${format(selectedDateTime, "HH:mm")}`}
                                    </Text>
                                </TouchableOpacity>
                                
                            )
                        }

                    <Button 
                        title="Cadastrar planta" 
                        onPress={handleSavePlant}
                    />
                </View>     
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape,
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    aboutThePlant: {
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },

    tipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: "relative",
        bottom: 60,
    },

    img: {
        width: 56,
        height: 56,
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: "justify",
    },

    alertLabel: {
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },

    dateTimePickerBtn: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 40,
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
});