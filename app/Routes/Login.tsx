import { View, Text, Image, Alert, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from "react";
import { observer } from 'mobx-react'; 
import userStore from '../../store';
import axios from "axios";

import { styles } from './Estilos';

const Login = ({}) => {
const navigation : any = useNavigation();
const [loading, setLoading] = useState(false);
const [Usuario, setUsuario] = useState('');
const [contrasena, setContrasena] = useState('');

const getUser = async (Usuario : string, contrasena : string) => {
    try {
    const response = await axios.get('http://192.168.0.46:4100/logins');
    const userArray = response.data.map((user : any) => ({
        User: user.Usuario,
        Pass: user.contrasena,    
    }));
    const userFound = userArray.find( (user : any) => user.User === Usuario && user.Pass === contrasena );
    if (userFound) {
        userStore.setUsuario(Usuario);
        navigation.navigate("Head");
        setContrasena("");
        setUsuario("");
    } else {
        Alert.alert("Aviso", "Credenciales inválidas");
    }
    } catch (error) {
    } finally {
    setLoading(false);
    }
}
const entrar = async () => {
    await getUser( Usuario, contrasena);
};

return (
    <View style={styles.contLogin}>
    <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
        <View style={styles.textoLogo}>
        <Text style={styles.titulo}>Mantenimiento</Text>
        <Text style={styles.titulo}>Maquinas</Text>
        </View>
    </View>
    <View style={styles.containerImagen}>
        <Image style={styles.image} source={require("../../assets/images/login.png")} />
        <View style={styles.textInputContainer}>
        <Text style={styles.textos}>Iniciar Sesion</Text>
        <TextInput style={styles.textInput} 
            placeholder="Usuario"
            value={Usuario}
            onChangeText={setUsuario}
        />
        <TextInput style={styles.textInput}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={contrasena}
            onChangeText={setContrasena}
        />
        <View>
            <Button onPress={entrar}
            icon="login"
            style={styles.txtBoton}
            mode='contained'
            buttonColor='#b83233'>
            Ingresar
            </Button>
        </View>
        {loading && (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            </View>
        )}
        </View>
    </View>
    </View>
);
};
export default observer(Login);