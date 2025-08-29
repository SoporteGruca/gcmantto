import { View, Text, TextInput, ScrollView, StyleSheet, FlatList } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Linking, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import userStore from '../store';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
import { router } from 'expo-router';

const Mensajes = () => {
    var moment = require('moment/min/moment-with-locales')
    moment.locale('es');

    const [comentario, setComentario] = useState('');
    const [commentData, setCommentData] = useState<any[]>([]); // ✅ Cambiado a estado
    let idMaquina, folio;

    useEffect(() => {
        idMaquina = userStore.MaquinaStorage;
        folio = userStore.TicketStorage;
        getComment(folio, idMaquina);
    }, []);

    const getComment = async (folio: any, idMaquina: any) => {
        try {
        const response = await axios.get(`http://192.168.0.46:4100/comments/${folio}/${idMaquina}`);
        const datos = response.data;
        const newCommentData = [];
        
        for (var i = 0; i < datos.length; i++) {
            let fecha = moment(datos[i].fechaComentario).subtract(6, 'hours').format("LLL");
            newCommentData.push({
            id: datos[i].id_comentario,
            comentario: datos[i].comentario,
            fecha: fecha,
            usuario: datos[i].usuario                    
            });
        }
        setCommentData(newCommentData); // ✅ Actualizar estado
        } catch (error) {
        console.log(error);
        }
    };

    const limpiar = () => {
        setComentario("");
        userStore.TicketStorage = "";
        userStore.MaquinaStorage = "";
    };

    const agregarComentario = async () => {
        const fecha = moment().format();

        try {
        await axios.put('http://192.168.0.46:4100/comments/', {
            id_maquina: userStore.MaquinaStorage,
            id_ticket: userStore.TicketStorage,
            comentario: comentario,
            fecha: fecha,
            usuario: userStore.fullName,
        });
        } catch (error) {
        console.log(error);
        }
    };

    const enviarDatos = async () => {
        await agregarComentario();
        limpiar();
        // Recargar comentarios después de agregar uno nuevo
        getComment(userStore.TicketStorage, userStore.MaquinaStorage);
    };

    const volverAtras = () => {
        router.back();
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
        <View style={styles.boxComment}>
            <View style={styles.boxCommentTitle}>
            <View style={styles.boxAvatar}>
                <FontAwesome6 name="user-large" size={34} color="#4F5FB3" />
            </View>
            <View style={styles.boxCommentSub}>
                <Text style={styles.boxCommentSubU}>{item.usuario}</Text>
                <Text style={styles.boxCommentSubF}>{item.fecha}</Text>
            </View>
            </View>

            <View style={styles.boxComments}>
            <TextInput 
                style={styles.boxCommentsIn}
                placeholder="Comentarios"
                value={item.comentario}
                multiline
                editable={false}
            />
            </View>
        </View>
        );
    };

    return (
        <View style={styles.contForms}>
        <View style={styles.contFormTitle}>
            <View style={styles.contFormbtnIzq}>
            <Button onPress={volverAtras} style={styles.btnMain}>
                <FontAwesome name="arrow-left" size={24} color="#242f66" />
            </Button>
            </View>
            <View style={styles.contFormtxtTitle}>
            <Text style={styles.textTitle}>Comentarios</Text>
            </View>
        </View>

        <FlatList
            data={commentData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={{ flex: 1 }}
        />

        <View style={styles.boxCommentInput}>
            <TextInput 
            style={styles.txtComment} 
            placeholder="Nuevo comentario..."
            onChangeText={setComentario}
            value={comentario}
            multiline
            />
        </View>

        <View style={styles.boxButtons}>
            <View style={styles.boxLimpiar}>
            <Button 
                buttonColor="#b01212"
                onPress={limpiar}
                mode="contained"
            >
                Limpiar
                <FontAwesome name="trash-o" size={24} color="white" />
            </Button>
            </View>
            <View style={styles.boxAgregar}>
            <Button 
                buttonColor="#374175"
                onPress={enviarDatos}
                mode="contained"
            >
                Agregar comentario
                <FontAwesome6 name="add" size={24} color="white" />
            </Button>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contForms: {
    backgroundColor:'#e8e8e8',
    height: '100%',
    width:'100%',
    paddingLeft: 15,
    paddingRight: 15,
    },
    contFormTitle: {
    width: '100%',
    height: '8%',
    paddingTop: "2%",
    flexDirection: "row",
    },
    contFormbtnIzq: {
    zIndex: 1,
    width: "20%",
    justifyContent: "center",
    alignItems:"flex-start",
    },
    btnMain: {
    top: "20%",
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1,
    },
    contFormtxtTitle: {
    width: "60%",
    justifyContent:"center",
    },
    contFormbtnDer: {
    zIndex: 1,
    width: "20%",
    alignItems:"flex-end",
    justifyContent:"center",
    },
    textTitle: {
    width: "100%",
    fontSize: 26,
    textAlign:"center",
    fontWeight: '600',
    fontStyle:'italic',
    marginVertical:'4%',
    },
    boxCommentSub: {
    fontSize: 18,
    paddingLeft: "3%",
    paddingRight: "2%",
    },
    boxCommentSubU: {
    fontSize: 18,
    },
    boxCommentSubF: {
    fontSize: 16,
    justifyContent:"flex-end",
    color: "gray",
    },
    boxComment: {
    width: '100%',
    height: 120,
    marginBottom: "10%",
    flexDirection: "column",
    alignItems:"center",
    },
    boxComments: {
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems:"center",
    width: "100%",
    top: "3%",
    },
    boxCommentsIn: {
    width: "95%",
    height: "80%",
    fontSize: 18,
    },
    boxComment2: {
    width: '100%',
    height: '20%',
    marginVertical: "2%",
    },
    boxCommentTitle: {
    width: '100%',
    flexDirection: "row",
    },
    boxAvatar: {
    position: "relative",
    top: "30%",
    left: "2%",
    },
    boxCommentInput: {
    width: '100%',
    },
    txtComment: {
    backgroundColor: "#fff",
    marginVertical:'3%',
    textAlign:"center",
    fontStyle:"italic",
    borderRadius: 30,
    fontSize: 18,
    height: 100,
    },
    boxButtons: {
    flexDirection: "row",
    width: "100%",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical: "5%",
    },
    boxLimpiar: {
        width: "48%",
        height: 60,
    },
    boxAgregar: {
        width: "48%",
        height: 60,
    },
});

export default Mensajes;