import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TextInput, Image, Alert, Linking } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { styles } from "./Estilos";
import { Camera } from "expo-camera";
import userStore from "../../store";
import moment from "moment";
import axios from "axios";

const Tab = createBottomTabNavigator();
const Reportes = () => {

const [atencionData, setAtencionData] = useState([]);
const [equipoData, setEquipoData] = useState([{}]);
const [marcaData, setMarcaData] = useState([{}]);
const [fallaData, setFallaData] = useState([{}]);
const [numData, setNumData] = useState([{}]);
const [ubiData, setUbiData] = useState([{}]);
const [encData, setEncData] = useState([{}]);
const [falla, setFalla] = useState("");

let emailAddress = "", subject = "", body = "";

const [hasCameraPermission, setHasCameraPermission] = useState({});
const [image, setImage] = useState('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
const [fotoUri, setFotoUri] = useState(null);

const [usuarioReport, setUsuarioReport] = useState("");
const [descripcion, setDescripcion] = useState("");
const [encargado, setEncargado] = useState("");
const [fullName, setFullName] = useState("");
const [equipo, setEquipo] = useState("");
const [modelo, setModelo] = useState("");
const [depto, setDepto] = useState("");
const [marca, setMarca] = useState("");
const [cel, setCel] = useState("");
const [num, setNum] = useState("");
const [ubi, setUbi] = useState("");
const [id, setId] = useState("");

const [count, setCount] = useState({});
let [folio, setFolio] = useState("");

useEffect(() => {
    getUserData();
    loadMaquina();
    loadMaqClass();
    camPermission();
    loadUbicacion();
    loadEncargado();
    loadIncidencia();
}, []);

const getUserData = async () => {
    axios.get('http://192.168.0.46:4100/verifica')
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let userArray: any = [];
        for (var i = 0; i < count; i++) {
        userArray.push({
            value: response.data[i].Usuario,
            label: response.data[i].Usuario,
        });
        if (userStore.usuario == response.data[i].Usuario) {
            setFullName(response.data[i].NomUsuario);
            userStore.setFullName(response.data[i].NomUsuario);
        }
        }
        setAtencionData(userArray);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const fetchCount = async () => {
    try {
    const response = await axios.get('http://192.168.0.46:4100/foliosm');
    const recordset = response.data;
    if (Array.isArray(recordset) && recordset.length > 0) {
        const countValue = recordset[0][""];
        if (typeof countValue === "number" || typeof countValue === "string") {
        setCount(countValue);
        const numeroPredeterminado = countValue;
        const folioPredeterminado = `RM-${numeroPredeterminado
            .toString()
            .padStart(4, "0")}`;
        setFolio(folioPredeterminado);
        } else {
        console.error("El valor del recuento no es válido:", countValue);
        }
    } else {
        console.error("La respuesta no contiene datos válidos:", recordset);
    }
    } catch (error) {
    console.error("Error al obtener el recuento:", error);
    }
};
const loadMaquina = async () => {
    await axios.get('http://192.168.0.46:4100/maquinas')
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let nomArray : any = [];
        let numArray : any = [];
        for (var i = 0; i < count; i++) {
        if (response.data[i].StsMaq != 'Baja') {
            numArray.push({
            label: response.data[i].NumMaq,
            value: response.data[i].NumMaq,
            });
            nomArray.push({
            label: response.data[i].NombreMaq,
            value: response.data[i].NombreMaq,
            });
        } 
        }
        setNumData(numArray);
        setMarcaData(nomArray);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const loadMaqClass = async function () {
    await axios.get('http://192.168.0.46:4100/maqcl')
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let equipoArray : any = [];
        let nomArray : any = [];
        let numArray : any = [];
        for (var i = 0; i < count; i++) {
        if (response.data[i].StsMaq != 'Baja') {
            equipoArray.push({
            label: response.data[i].ClasMaq,
            value: response.data[i].ClasMaq,
            });
        } 
        }
        setEquipoData(equipoArray);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const loadEncargado = async () => {
    await axios.get('http://192.168.0.46:4100/encargado')
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let equipoArray : any = [];
        for (var i = 0; i < count; i++) {
        equipoArray.push({
            value: response.data[i].Encargado,
            label: response.data[i].Encargado,
        });
        }
        setEncData(equipoArray);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const loadUbicacion = async () => {
    await axios.get('http://192.168.0.46:4100/ubicacion')
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let ubicacionArray: any = [];
        for (var i = 0; i < count; i++) {
        ubicacionArray.push({
            value: response.data[i].UbicaMaq,
            label: response.data[i].UbicaMaq,
        });  
        }
        setUbiData(ubicacionArray);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const generarFolio = () => {
    const nuevoNumero = parseInt(folio.split("-")[1]) + 1;
    const nuevoFolio = `RM-${nuevoNumero.toString().padStart(4, "0")}`;
    setFolio(nuevoFolio);
    folio = nuevoFolio;
};
const loadIncidencia = async () => {
    await axios.get('http://192.168.0.46:4100/maquinasi')
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let equipoArray = [];
        for (var i = 0; i < count; i++) {
        if (response.data[i].DescIncidencia == "Baja") {
        } else{
            equipoArray.push({
            value: response.data[i].DescIncidencia,
            label: response.data[i].DescIncidencia,
            });
        }
        }
        setFallaData(equipoArray);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const handleState = async (clasmaq: any) => {
    await axios.get('http://192.168.0.46:4100/maquinas' + `/${clasmaq}`)
    .then(function (response) {
        var count = Object.keys(response.data).length;
        let marcaArray = [];
        for (var i = 0; i < count; i++) {
        marcaArray.push({
            value: response.data[i].NombreMaq,
            label: response.data[i].NombreMaq,
        });
        }
        setMarcaData(marcaArray);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const handleState2 = async (equipoMarca: any) => {
    await axios.get('http://192.168.0.46:4100/maqUbica' + `/${equipoMarca}`)
    .then(function (response) {
        const datos = response.data;
        let idArray : any = [];
        let ubiArray : any = [];
        let encArray : any = [];
        let numArray : any = [];
        for (var i = 0; i < datos.length; i++) {
        idArray.push({
            value: datos[i].IdMaquina,
            label: datos[i].IdMaquina,
        });
        ubiArray.push({
            value: datos[i].UbicaMaq,
            label: datos[i].UbicaMaq,
        });
        encArray.push({
            value: datos[i].Encargado,
            label: datos[i].Encargado,
        });
        numArray.push({
            value: datos[i].NumSerMaq,
            label: datos[i].NumSerMaq,
        });
        }
        setId(idArray[0].value);
        setUbi(ubiArray[0].value);
        setNum(numArray[0].value);
        setEncargado(encArray[0].value);
    })
    .catch(function (error) {
        console.log(error);
    });
};
const handleState3 = async (numMaquina: any) => {
    // axios.get(`http://192.168.0.46:4100/maqID/${numMaquina}`)
    await axios.get('http://192.168.0.46:4100/maqID' + `/${numMaquina}`)
    .then(function (response) {
        const datos = response.data;
        let nomArray : any = [];
        let maqArray : any = [];
        let ubiArray : any = [];
        let encArray : any = [];
        let idArray : any = [];
        let deptoArray : any = [];
        let modeloArray : any = [];
        let numMaqArray : any = [];
        for (var i = 0; i < datos.length; i++) {
        maqArray.push({
            value: datos[i].ClasMaq,
            label: datos[i].ClasMaq,
        });
        nomArray.push({
            value: datos[i].NombreMaq,
            label: datos[i].NombreMaq,
        });
        ubiArray.push({
            value: datos[i].UbicaMaq,
            label: datos[i].UbicaMaq,
        });
        encArray.push({
            value: datos[i].Encargado,
            label: datos[i].Encargado,
        });  
        idArray.push({
            value: datos[i].IdMaquina,
            label: datos[i].IdMaquina,
        });
        deptoArray.push({
            value: datos[i].DeptoMaq,
            label: datos[i].DeptoMaq,
        });
        modeloArray.push({
            value: datos[i].ModMaq,
            label: datos[i].ModMaq,
        });
        numMaqArray.push({
            value: datos[i].NumMaq,
            label: datos[i].NumMaq,
        });
        }
        setEquipo(maqArray[0].value);
        setMarca(nomArray[0].value);
        setUbi(ubiArray[0].value);
        setId(idArray[0].value);
        setEncargado(encArray[0].value);
        setDepto(deptoArray[0].value)
        setModelo(modeloArray[0].value)
        setNum(numMaqArray[0].value)
    })
    .catch(function (error) {
        console.log(error);
    });
};
const camPermission = () => {
    (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");
    })();
};
const deletePicture = async () => {
    setFotoUri(null);
    setImage('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
    getfolio();
};
const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
    quality: 1,
    });
    if (!result.canceled) {
    setImage(result.assets[0].uri);
    }
    getfolio();
};
if (hasCameraPermission === false) {
    return (
    <Text style={{ color: "#fff", fontSize: 16 }}>
        Acceso a Camara Denegado
    </Text>
    );
}
const limpiarCampos = () => {
    setUsuarioReport("");
    setEquipo("");
    setMarca("");
    setDescripcion("");
    setFalla("");
    setEncargado("");
    setNum("");
    setUbi("");
    setFotoUri(null);
    setImage('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
};
const getfolio = async () => {
    await fetchCount();
}
const reportar = async () => {
    if ( !equipo || !marca || !falla || !ubi || !encargado || !descripcion) {
    Alert.alert(
        "Debe llenar todos los campos del formulario para generar el reportar"
    );
    } else {
    try {
        getfolio();
        generarFolio();
        enviarDatos();
        limpiarCampos();
        openGmail();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        sendWhatsApp();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        Alert.alert(`Aviso`,`Se ha registrado un reporte con el folio: ${folio}. El reporte ha sido enviado correctamente.`
        );
    } catch (error) {
        console.error("Error:", error);
    }
    }
};
const enviarDatos = async () => {
    try {
    // const fechaHora = moment().format("lll");
    const fecha = moment().format("YYYY-MM-DD");
    const hora = moment().format("h:mm a");
    const formData: any = new FormData();
    formData.append("image", {
        uri: image,
        type: "image/jpg",
        name: "imagen.jpg",
    });
    formData.append("fecha", fecha);
    formData.append("hora", hora);
    formData.append("usuario", fullName);
    formData.append("encargado", encargado);
    formData.append("id", id);
    formData.append("numMaquina", num);
    formData.append("maquina", marca);
    formData.append("clase", equipo);
    formData.append("falla", falla);
    formData.append("ubicacion", ubi);
    formData.append("descripcion", descripcion);
    formData.append("estado", "Pendiente");
    formData.append("personal", "");
    formData.append("descripcionfalla", "");
    formData.append("acciones", "");
    formData.append("folio", folio);
    formData.append("departamento", depto);
    formData.append("modelo", modelo);
    const response = await axios.post(
        'http://192.168.0.46:4100/maquinas',
        formData,
        {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        }
    );
    } catch (error) {
    console.error("Error al realizar la solicitud POST:", error);
    }
};
const openGmail = async () => {
    emailAddress = "gerencia.calidad@gruca.mx, mantenimiento@gruca.mx";
    subject = `Se ha registrado un reporte con el folio: ${folio}`;
    body = `${fullName} ha enviado un reporte de ${equipo}, con numero de folio: ${folio} debido a, ${descripcion}`;
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    await Linking.openURL(mailtoUrl);
};
const sendWhatsApp = () => {
    const phone = 4491156570;
    const link = `https://wa.me/${phone}?text=${body}`;
    Linking.canOpenURL(link).then((supported) => {
    if (!supported) {
        Alert.alert(
        "Por favor instale WhatsApp para enviar un mensaje directo"
        );
    }
    return Linking.openURL(link);
    });
};
return (
    <View style={styles.contForms}>
    <ScrollView>
        <View style={styles.containerLineInside}>
        <Text style={styles.textTitle}>¡Bienvenido!</Text>
        <Text style={styles.textSubTitle}>{fullName}</Text>
        </View>
        <Text style={styles.text}>Numero de maquina</Text>
        <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={numData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={"Numero de maquina"}
        searchPlaceholder="Buscar..."
        value={num}
        onChange={(item: any) => {
            setNum(item.value);
            handleState3(item.value);
        }}
        />
        <Text style={styles.text}>Maquina a reportar</Text>
        <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={equipoData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={"Selecciona una maquina"}
        searchPlaceholder="Buscar..."
        value={equipo}
        renderLeftIcon={() => (
            <MaterialCommunityIcons name="tools" size={24} color="red" />
        )}
        onChange={(item: any) => {
            setEquipo(item.value);
            handleState(item.value);
            getfolio();
        }}
        />
        <Text style={styles.text}>Numero y Modelo</Text>
        <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={marcaData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione el modelo"}
        searchPlaceholder="Buscar..."
        autoScroll={false}
        value={marca}
        renderLeftIcon={() => (
            <FontAwesome name="gears" size={24} color="black" />
        )}
        onChange={(item: any) => {
            setMarca(item.value);
            handleState2(item.value);
            getfolio();
        }}
        />
        <Text style={styles.text}>Ubicación o Area</Text>
        <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={ubiData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione la ubicacion"}
        searchPlaceholder="Buscar..."
        autoScroll={false}
        value={ubi}
        renderLeftIcon={() => (
            <MaterialIcons name="location-pin" size={24} color="black" />
        )}
        onChange={(item: any) => {
            setUbi(item.value);
            getfolio();
        }}
        />
        <Text style={styles.text}>Operador</Text>
        <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={encData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione al operador..."}
        searchPlaceholder="Buscar..."
        autoScroll={false}
        value={encargado}
        renderLeftIcon={() => (
            <FontAwesome6 name="user-gear" size={24} color="black" />
        )}
        onChange={(item: any) => {
            setEncargado(item.value);
            getfolio();
        }}
        />
        <Text style={styles.text}>Tipo Falla</Text>
        <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={fallaData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={"Seleccione la falla..."}
        searchPlaceholder="Buscar..."
        autoScroll={false}
        value={falla}
        renderLeftIcon={() => (
            <MaterialIcons name="sms-failed" size={24} color="black" />
        )}
        onChange={(item: any) => {
            setFalla(item.value);
            getfolio();
        }}
        />
        <View style={styles.containerLine}>
        <View style={styles.containerLineInside}>
            <Text style={styles.text}>ID maquina</Text>
            <TextInput
            placeholder="Numero de maquina"
            style={styles.boxsmall}
            onChangeText={setId}
            value={id}
            editable={false}
            />
        </View>
        </View>
        <View style={styles.containerLineInside}>
        <Text style={styles.text}>Descripción de la falla </Text>
        <TextInput
            multiline
            numberOfLines={6}
            placeholder="Descrpción de la falla "
            style={styles.boxlarge}
            onChangeText={setDescripcion}
            value={descripcion}
        ></TextInput>
        </View>

        <View>
        {image && <Image source={{ uri: image }} />}
        <Image style={styles.imagenContainer} source={{ uri: image }}></Image>
        </View>

        <View style={styles.containerButton}>
        <View style={styles.LineButtonBorrar}>
            <Button
            onPress={deletePicture}
            icon="delete"
            mode="contained"
            buttonColor="#b01212"
            >
            Borrar
            </Button>
        </View>
        <View style={styles.LineButtonTomarFoto}>
            <Button
            onPress={takePicture}
            icon="camera"
            mode="contained"
            buttonColor="#374175"
            >
            Tomar foto
            </Button>
        </View>
        </View>
        
        <View style={styles.containerLine}>
        <Button
            onPress={reportar}
            icon="mail"
            mode="contained"
            buttonColor="#374175"
        >
            Reportar
        </Button>
        </View>

    </ScrollView>
    </View>
);
};
export default Reportes;
function sendWhatsApp() {
throw new Error("Function not implemented.");
}