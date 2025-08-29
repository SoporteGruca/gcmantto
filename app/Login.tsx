// app/Login.tsx
import { View, Text, Image, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from "react";
import { observer } from 'mobx-react'; 
import userStore from '../store';
import { styles } from './Estilos';
import axios from "axios";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

const Login = ({}) => {
    const [loading, setLoading] = useState(false);
    // const [Usuario, setUsuario] = useState('');
    // const [contrasena, setContrasena] = useState('');
    const [Usuario, setUsuario] = useState('Oscar');
    const [contrasena, setContrasena] = useState('1234');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

    const getUser = async (Usuario: string, contrasena: string) => {
        try {
        const response = await axios.get('http://192.168.0.46:4100/logins');
        const userArray = response.data.map((user: any) => ({
            User: user.Usuario,
            Pass: user.contrasena,    
        }));
        
        const userFound = userArray.find((user: any) => 
            user.User === Usuario && user.Pass === contrasena
        );
        
        if (userFound) {
            userStore.setUsuario(Usuario);
            router.replace('/tabs/Reportes');
            setContrasena("");
            setUsuario("");
        } else {
            Alert.alert("Aviso", "Credenciales inválidas");
        }
        } catch (error) {
        Alert.alert("Error", "Error de conexión");
        } finally {
        setLoading(false);
        }
    }

    const entrar = async () => {
        setLoading(true);
        await getUser(Usuario, contrasena);
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.contLogin}>
                    <View style={styles.contLogo}>
                        <Image style={styles.Logo}
                            source={require("../assets/images/logo.png")} />

                        <View style={styles.textoLogo}>
                            <Text style={styles.titulo}>Mantenimiento</Text>
                            <Text style={styles.subTitulo}>Maquinas</Text>
                        </View>
                    </View>
                
                    <View style={styles.containerImagen}>
                        <Image 
                        style={styles.image} 
                        source={require("../assets/images/login.png")} 
                        />
                        <View style={styles.textInputContainer}>
                        <Text style={styles.textos}>Iniciar Sesion</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Usuario"
                            value={Usuario}
                            onChangeText={setUsuario}
                            returnKeyType="next"
                        />
                        
                        <View style={styles.passwordContainer}>
                            <TextInput 
                            style={styles.passwordInput}
                            placeholder="Contraseña"
                            secureTextEntry={!showPassword}
                            value={contrasena}
                            onChangeText={setContrasena}
                            returnKeyType="done"
                            onSubmitEditing={entrar}
                            />
                            <TouchableOpacity 
                            style={styles.eyeIcon}
                            onPress={togglePasswordVisibility}
                            >
                            <Ionicons 
                                name={showPassword ? "eye-off" : "eye"} 
                                size={24} 
                                color="#666" 
                            />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Button 
                            onPress={entrar}
                            icon="login"
                            style={styles.txtBoton}
                            mode='contained'
                            buttonColor='#b83233'
                            disabled={loading}
                            >
                            {loading ? "Cargando..." : "Ingresar"}
                            </Button>
                        </View>
                        {loading && (
                            <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#b83233" />
                            </View>
                        )}
                        </View>
                    </View>
                
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default observer(Login);