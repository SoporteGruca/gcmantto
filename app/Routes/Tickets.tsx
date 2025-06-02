import { View, Text, TextInput, Image }  from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment/min/moment-with-locales';
import React, { useState, useEffect } from 'react';
import { ScrollView, Linking } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Button } from 'react-native-paper';
import { styles } from './Estilos';
import { Alert } from 'react-native';
import userStore from '../../store';
import axios from 'axios';

const Tickets = () => {
const navigation : any = useNavigation();
var moment = require('moment/min/moment-with-locales')
moment.locale('es');
//Datas
const [fechaLiberacionData, setfechaLiberacionData ] = useState([]);
const [hHomInterna, sethhomInternaData ] = useState([]);
const [costManoHom, setCostManoHomData ] = useState([]);
const [numModeloData, setNumModeloData ] = useState([]);
const [eviMejoraData, setEviMejoraData ] = useState([]);
const [totalReTra, setTotalReTraData ] = useState([]);
const [noTicketData, setNoTicketData] = useState([]);
const [atencionData, setAtencionData] = useState([]);
const [accionesData, setAccionesData] = useState([]);
const [refaccion, setRefaccionData ] = useState([]);
const [costHoraH, setCostHoraHData ] = useState([]);
const [eviDañoData, setEviDañoData ] = useState([]);
const [estMaqui, setEstMaquiData ] = useState([]);
const [attExter, setAttExterData ] = useState([]);
const [repsolData, setRepsolData] = useState([]);
const [motivoData, setMotivoData] = useState([]);
const [estadoData, setEstadoData] = useState([]);
const [fullName, setFullNameData] = useState('');
const [causaData, setCausaData] = useState([]);
const [fechaData, setFechaData] = useState([]);
const [trasla, setTraslaData ] = useState([]);
const [horaData, setHoraData] = useState([]);
const [otData, setOtData ] = useState([]);

let [usuario, setUsuario] = useState("");

//Valores
const [hasCameraPermission, setHasCameraPermission] = useState({});

const [eviDaño, setEviDaño ] = useState('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
const [botonTexto, setBotonTexto] = useState('');
const [numModelo, setNumModelo ] = useState('');
const [eviMejora, setEviMejora ] = useState('');
const [fotoUri, setFotoUri] = useState('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
const [hHomInter, setHHomInter] = useState('');
const [costManoH, setCostManoH] = useState('');
const [noTicket, setNoTicket] = useState('');
const [costHora, setCostHora] = useState('');
const [totalTra, setTotalTra] = useState('');
const [atencion, setAtencion] = useState('');
const [acciones, setAcciones] = useState('');
const [image, setImage] = useState('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
const [estmaq, setEstMaq] = useState('');
const [refacc, setRefacc] = useState('');
const [attExt, setAttExt] = useState('');
const [repsol, setRepsol] = useState('');
const [motivo, setMotivo] = useState('');
const [foto, setFoto] = useState(null);
const [fecha, setFecha] = useState('');
const [causa, setCausa] = useState('');
const [folio, setFolio] = useState('');
const [hora, setHora] = useState('');
const [tras, setTras] = useState('');
const [ot, setOt ] = useState('');
const estadosData = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En progreso...', value: 'En progreso...' },
    { label: 'Cerrado', value: 'Cerrado' },
    { label: 'Liberado', value: 'Liberado' },
    { label: 'Pendiente por un tercero', value: 'Pendiente por un tercero' },
]
let body = '', subject = '', mensaje = '', cuenta : any;
let [fechaLiberacion, setFechaLiberacion] = useState('');
let [horaLiberacion, setHoraLiberacion] = useState('');
let [emailAddress, setemailAddress ] = useState('');
let [fechaCierre, setFechaCierre] = useState('');
let [horaCierre, setHoraCierre] = useState('');
let [estadoDB, setEstadoDB] = useState('');
let [estado, setEstado] = useState('');
let [phone, setphone] = useState('');
let [level, setlevel] = useState('');

let cAgente = '';

//Habilitados Formulario
const [habAcciones, setHabAcciones] = useState(false);
const [habReporte, setHabReporte] = useState(false);
const [formMantto, setFormMantto] = useState(false);
const [userMantto, setuserMantto] = useState(true);
const [habCerrar, setHabCerrar] = useState(false);
const [habEstado, setHabEstado] = useState(false);
const [habMotivo, setHabMotivo] = useState(false);
const [habCausa, setHabCausa] = useState(false);
const [habFecha, setHabFecha] = useState(false);
const [habHora, setHabHora] = useState(false);
const [nivel, setNivel] = useState(false);

useEffect(() => {
    moment.locale('de');
    limpiarcampos();
    usuario = userStore.fullName;
    setUsuario(userStore.fullName);
    setFullNameData(userStore.fullName);
    validarUsuario();
    getFolios();
}, []);

const refrescar  = () => {
    limpiarcampos();
    usuario = userStore.fullName;
    setUsuario(userStore.fullName);
    setFullNameData(userStore.fullName);
    validarUsuario();
    getFolios();
}

const mensajes = async () => {
    if ( noTicket != null ) {
    await navigation.navigate("Mensajes");
    } else {
    Alert.alert("Aviso","Debes seleccionar un ticket antes de poder ver los mensajes");
    }
}

const handleStateAtencionChange = (item : any) => {
    setAtencion(item)
    validarUsuario(item);
}

const validarUsuario = async (atencion?: any) => {
    await axios.get('http://192.168.0.46:4000/verifica').then(function (response) {
    cuenta = response.data.map((item : any) => ( {
        nombre: item['Usuario'],
        email: item['correo'],
        celular: item['celular'],
    }));
    var count = Object.keys(response.data).length;
    let userArray: any = [];
    for (var i = 0; i < count; i++) {
        if (response.data[i].correo && response.data[i].nivelAcceso == "Poweruser" || response.data[i].correo && response.data[i].nivelAcceso == "Admin") {
        userArray.push({
            value: response.data[i].Usuario,
            label: response.data[i].Usuario,
        });
        }
        let user = response.data[i]['NomUsuario'];
        let nivelAcceso = response.data[i]['nivelAcceso'];
        //Se determina el nivel de la cuenta, para otorgar los permisos
        if ( usuario === user) {
            setlevel(nivelAcceso);
            level = nivelAcceso;
            if (nivelAcceso === 'Consu'){
                setHabReporte(false);
                setHabFecha(false);
                setHabMotivo(false);
                setHabCausa(false);
                setHabAcciones(false);
                setHabCerrar(true);
                // setFormMantto(false);
                setNivel(false);
                setBotonTexto('');
                setAtencionData(userArray);
            } else if (nivelAcceso === 'User'){
                setHabReporte(false);
                setHabFecha(false);
                setHabAcciones(false);
                setHabCerrar(false);
                setHabMotivo(false);
                setHabCausa(false);
                setHabEstado(false);
                // setFormMantto(false);
                setNivel(false);
                setBotonTexto('Liberar Ticket')
                setAtencionData(userArray);
            } else if (nivelAcceso === 'FullUser'){
                setHabReporte(false);
                setHabFecha(false);
                setHabMotivo(true);
                setHabCausa(true);
                setHabAcciones(true);
                setHabCerrar(false);
                setuserMantto(false);
                // setFormMantto(true);
                setNivel(false);
                setBotonTexto('Actualizar Ticket')
                setAtencionData(userArray);
            } else if (nivelAcceso === 'Poweruser' || nivelAcceso === 'Admin'){
                setHabReporte(false);
                setHabFecha(false);
                setHabMotivo(true);
                setHabCausa(true);
                setHabAcciones(true);
                setHabCerrar(false);
                setuserMantto(false);
                // setFormMantto(true);
                setNivel(true);
                setBotonTexto('Actualizar Ticket')
                setAtencionData(userArray);
            }
        }
    }
    cuenta.forEach((item : any) => {
        if (item.nombre === atencion){
        setemailAddress(item.email);
        emailAddress = item.email;
        setphone(item.celular);
        phone = item.celular;
        }
    });
    setAtencionData(userArray);
    })
    .catch(function (error) {
    console.log(error);
    console.log("Error al obtener los usuarios");
    
    });
}
const validarAgente  = async ( folio : string) => {
    try {
        const response = await axios.get('http://192.168.0.46:4000/valida/' + `${folio}`);
        const agente = response.data[0]['Atencion de Ticket'];
        let ag = await getCorreoAgente(agente);
    } catch (error) {
        console.log(error);
        console.log("Error al obtener el agente");
        
    }
}
const getCorreoAgente  = async ( agente : string) => {
    try {
        console.log(agente);
        
        const response = await axios.get('http://192.168.0.46:4000/correoA/' + `${agente}`);
        console.log(response.data[0]['correo']);
        
        userStore.CAgente = response.data[0]["correo"];
        return response.data[0]['correo'];
    } catch (error) {
        console.log(error);
        console.log("Error al obtener el correo del agente");
        
        return null;
    }
}
const handleState =  async (folioDB : string) => {
    setFolio(folioDB);
    loadImage(folioDB);
    loadImageEvi(folioDB);
    await axios.get('http://192.168.0.46:4000/maquinasef/' + `${folioDB}`).then(function (response) {
    const datos = response.data;
    let numMaquina = datos[0]['ID']
    userStore.setTicket(folioDB);
    userStore.setMaquina(numMaquina)
    setCostManoHomData(datos.map((item : any) => item['Costo mano de obra interna']));
    setMotivoData     (datos.map((item : any) => item['Descripcion de Incidencia']));
    setCostHoraHData  (datos.map((item : any) => item['Costo por hora hombre']));
    sethhomInternaData(datos.map((item : any) => item['Horas hombre interno']));
    setAttExterData   (datos.map((item : any) => item['Atencion Tec Externo']));
    setEviMejoraData  (datos.map((item : any) => item['Evidencia de mejoras']));
    setEviDañoData    (datos.map((item : any) => item['Evidencia de danios']));
    setAccionesData   (datos.map((item : any) => item['Acciones a Seguir']));
    setEstMaquiData   (datos.map((item : any) => item['Estado de Maquina']));
    setEstadoData     (datos.map((item : any) => item['Estado del Ticket']));
    setfechaLiberacionData(datos.map((item : any) => item['Fecha liberacion']));
    setTotalReTraData (datos.map((item : any) => item['Total re trabajo']));
    setNumModeloData  (datos.map((item : any) => item['Numero de modelo']));
    setFechaData      (datos.map((item : any) => item['Fecha Inicio']));
    setHoraData      (datos.map((item : any) => item['Fecha Inicio Hora']));
    setRefaccionData  (datos.map((item : any) => item['Refacciones']));
    setCausaData      (datos.map((item : any) => item['Causa Raiz']));
    setTraslaData     (datos.map((item : any) => item['Traslado']));
    setRepsolData     (datos.map((item : any) => item['Maquina']));
    setOtData         (datos.map((item : any) => item['OT']));
    if (datos.length > 0) {
        moment.locale("es");
        setCostManoH(datos[0]['Costo mano de obra interna']);
        setMotivo   (datos[0]['Descripcion de Incidencia']);
        setCostHora (datos[0]['Costo por hora hombre']);
        setHHomInter(datos[0]['Horas hombre interno']);
        setAttExt   (datos[0]['Atencion Tec Externo']);
        setEviMejora(datos[0]['Evidencia de mejoras']);
        setEviDaño  (datos[0]['Evidencia de danios']);
        setAtencion (datos[0]['Atencion de Ticket']);
        setAcciones (datos[0]['Acciones a Seguir']);
        setEstado   (datos[0]['Estado del Ticket']);
        setEstadoDB (datos[0]['Estado del Ticket']);
        setEstMaq   (datos[0]['Estado de Maquina']);
        // setFecha    (datos[0]['Fecha Inicio']);
        let fechIni = moment(datos[0]['Fecha Inicio']).format('YYYY-MM-DD');
        if (fechIni == 'Fecha inválida') 
        setFecha('');
        else
        setFecha(fechIni);
        let fechaCie = moment(datos[0]['Fecha Cierre']).format('YYYY-MM-DD');
        // let fechaCie = moment(datos[0]['Fecha Cierre']).format('L');
        if (fechaCie == 'Fecha inválida') 
        setFechaCierre('');
        else
        setFechaCierre(fechaCie);
        // setFetchLibe(datos[0]['Fecha liberacion']);
        let fechLibe = moment(datos[0]['Fecha Liberacion']).format('YYYY-MM-DD');
        if (fechLibe == 'Fecha inválida')
        setFechaLiberacion('');
        else
        setFechaLiberacion(fechLibe);
        setTotalTra (datos[0]['Total re trabajo']);
        setNumModelo(datos[0]['Numero de modelo']);
        setHora(datos[0]['Fecha Inicio Hora']);
        setHoraCierre(datos[0]['Fecha Cierre Hora']);
        setHoraLiberacion(datos[0]['Fecha liberacion Hora']);
        setRefacc(datos[0]['Refacciones']);
        setCausa(datos[0]['Causa Raiz']);
        setTras(datos[0]['Traslado']);
        setRepsol(datos[0]['Maquina']);
        setOt(datos[0]['OT']);
    }
    })
    .catch(function (error) {
    console.error('Error fetching data:', error);
    });
};
const loadImage =  async ( folio : string ) => {
    await fetch('http://192.168.0.46:4000/idPicture/' + `${folio}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'image/jpeg'
    }
    })
    .then((response) =>  {
        return response.text()
    }) 
    .then((base64Imagen) => {
        const imageUri = `data:image/jpeg;base64,${base64Imagen}`;
        setFotoUri(imageUri);
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
}
const loadImageEvi =  async ( folio : string ) => {
    await fetch('http://192.168.0.46:4000/idPicEvi/' + `${folio}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'image/jpeg'
    }
    })
    .then((response) => {
        return response.text();
    })
    .then((base64Imagen) => {
        const imageEvi = `data:image/jpeg;base64,${base64Imagen}`;
        setEviDaño(imageEvi);
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
}
const getFolios  = async () => {
    await axios.get('http://192.168.0.46:4000/maqticket').then(function(response) {
    var count = Object.keys(response.data).length;
    let Array: any = [];
    for (var i = 0; i < count; i++) {
        if (level == 'Admin' || level == 'Poweruser' || level == 'FullUser' ) {
        Array.push({
            value: response.data[i]['Folio'],
            label: response.data[i]['Folio'],
        });
        } else{
        if (response.data[i]['Usuario que Reporta'] == usuario) {
            Array.push({
            value: response.data[i]['Folio'],
            label: response.data[i]['Folio'],
            });
        }
        }
    }
    setNoTicketData(Array);
    })
    .catch(function (error) {
    console.log(error);
    console.log("Error al obtener los folios");
    
    });
}
const getcorreo = async ( folio : string ) => {
    await axios.get('http://192.168.0.46:4000/correof/' + `${folio}`).then(function(response) {
    const reporto = response.data[0]['Usuario que Reporta'];
    axios.get('http://192.168.0.46:4000/correou/' + `${reporto}`).then(function(response) {
        userStore.CEncargado = response.data[0]["correo"];
    }).catch(function (error) {
        console.log(error);
        console.log("Error al obtener el correo del usuario que reporta");
    });
    }).catch(function (error) {
        console.log(error);
        console.log("Error al obtener el correo del folio");
    });
};
const openGmail = async () => {
    subject = `Folio: ${folio} ha sido modficiado a ${estado}`;
    if (estadoDB == 'Pendiente' && estado == 'En progreso...') {
    body = `Se ha cambiado el status del folio: ${folio}, ya esta siendo revisando por personal de mantenimiento`;
    emailAddress = userStore.CEncargado;
    } else if ( estadoDB == 'En progreso...' && estado == 'Cerrado') {
    body = `${usuario} ha cambiado el status del ticket a ${estado} con numero de folio: ${folio}, pendiente de liberacion de ticket`;
    emailAddress = userStore.CEncargado;
    } else if ( estadoDB == 'En progreso...' && estado == 'Pendiente por un tercero') {
    body = `${usuario} ha cambiado el status del ticket a ${estado} con numero de folio: ${folio}, el ticket se encuentra en pendiente, en cuanto se tenga mas informacion se pondran en contacto`;
    emailAddress = userStore.CEncargado;
    } else if ( estadoDB == 'Pendiente por un tercero' && estado == 'En progreso...') {
    body = `Se ha cambiado el status del folio: ${folio}, ya esta siendo revisando por personal de mantenimiento`;
    emailAddress = userStore.CEncargado;
    } else if ( estadoDB == 'Cerrado' && estado == 'Liberado' ) {
    body = `Se ha cambiado el status del ticket a ${estado} con numero de folio: ${folio}`;
    emailAddress = userStore.CAgente;
    console.log("Correo", emailAddress);
    } else {
    Alert.alert('Aviso', 'Se ha producido  un error al enviar el correo electronico');
    }
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    await Linking.openURL(mailtoUrl);
};
const sendWhatsApp = async () => {
    const link = `https://wa.me/${phone}?text=${mensaje}`;
    await Linking.canOpenURL(link).then((supported) => {
    if (!supported) {
        Alert.alert('Por favor instale WhatsApp para enviar un mensaje directo');
    }
    return Linking.openURL(link);
    })
};
const cerrarTicket = () => {
    if (estado == 'Baja') {
    Alert.alert("Aviso", "Opción en proceso de desarrollo")
    return;
    }

    if (!noTicket || !motivo || !atencion) {
    Alert.alert('Aviso', 'Favor de rellenar los campos faltantes, para continuar.');
    return;
    }

    // Definir las condiciones de cierre según el nivel de acceso
    const canCloseTicket = 
    (level === 'User' && estadoDB === 'Cerrado' && estado === 'Liberado') ||
    (level === 'Poweruser' && estadoDB === 'Pendiente' && estado === 'En progreso...') ||
    (level === 'FullUser' && estadoDB === 'Pendiente' && estado === 'En progreso...') ||
    (level === 'Admin' && estadoDB === 'Pendiente' && estado === 'En progreso...') ||
    (level === 'Poweruser' && estadoDB === 'En progreso...' && estado === 'En progreso...') ||
    (level === 'FullUser' && estadoDB === 'En progreso...' && estado === 'En progreso...') ||
    (level === 'Admin' && estadoDB === 'En progreso...' && estado === 'En progreso...') ||
    (level === 'Poweruser' && estadoDB === 'En progreso...' && estado === 'Cerrado') ||
    (level === 'FullUser' && estadoDB === 'En progreso...' && estado === 'Cerrado') ||
    (level === 'Admin' && estadoDB === 'En progreso...' && estado === 'Cerrado') ||
    (level === 'Poweruser' && estadoDB === 'Cerrado' && estado === 'Cerrado') ||
    (level === 'FullUser' && estadoDB === 'Cerrado' && estado === 'Cerrado') ||
    (level === 'Admin' && estadoDB === 'Cerrado' && estado === 'Cerrado') ||
    (level === 'Admin' && estadoDB === 'Liberado' && estado === 'Liberado')
    // Verificar si se puede cerrar el ticket
    if (!canCloseTicket) {
    Alert.alert('Aviso', 'Lamentablemente, no es posible realizar la modificación solicitada en este momento');
    } else {
    //Obtener fecha de Cerrado
    if (estadoDB === "En progreso..." && estado === 'Cerrado') {
        // setFechaCierre( moment().format("YYYY-MM-DD") )
        // setHoraCierre( moment().format("h:mm a") )
        fechaCierre = (moment().format("YYYY-MM-DD"))
        horaCierre = (moment().format("h:mm a"))
    }
    //Obtener fecha de Liberado
    if (estadoDB === "Cerrado" && estado === 'Liberado') {
        // setFechaLiberacion( moment().format("YYYY-MM-DD") )
        // setHoraLiberacion( moment().format("h:mm a"))
        fechaLiberacion = (moment().format("YYYY-MM-DD"))
        horaLiberacion = (moment().format("h:mm a"))
    }
    // Enviar datos
    enviarDatos();
    }
};
const deletePicture = async () => {
    setFotoUri('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
    setImage('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
};
const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
        quality: 1,
    });
    if (!result.canceled) {
        setEviDaño(result.assets[0].uri);
    }
    };
if (hasCameraPermission === false) {
    return (
    <Text style={{ color: "#fff", fontSize: 16 }}>
        Acceso a Camara Denegado
    </Text>
    );
}
const jpgBase64 = async () => {
    try {
        const formData: any = new FormData();
        formData.append("image", {
            uri: eviDaño,
            type: "image/jpg",
            name: "imagen.jpg",
        });
    const response = await axios.post(
        'http://192.168.0.46:4000/maquinasfImage/' + `${noTicket}`,
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
const enviarDatos = async () => {
    try {
        if (eviDaño) {
            await jpgBase64();
        }
        const response = await axios.put(
            'http://192.168.0.46:4000/maquinasf/' + `${noTicket}`, {
            atendio: atencion,
            fechaCierre: fechaCierre,
            horaCierre: horaCierre,
            estadofinal: `${estado}`,
            acciones: acciones,
            ot: ot,
            numModelo: numModelo,
            eviMejora: eviMejora,
            estMaquina: estmaq,
            fetLiberacion: fechaLiberacion,
            horaLiberacion: horaLiberacion,
            hhomInter: hHomInter,
            refacciones: refacc,
            attExt: attExt,
            traslado: tras,
            cosHora: costHora,
            costManoH: costManoH,
            totalTra: totalTra,
            causa: causa,
            }
        );
        openGmail();
        await new Promise(resolve => setTimeout(resolve, 3000));
        sendWhatsApp();
        getFolios();
        limpiarcampos();
    } catch (error) {
        console.error('Error', 'Error al realizar la solicitud POST:', error);
    }
}
const limpiarcampos = () =>  {
    setFotoUri('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
    setNoTicket('');
    setAtencion('');
    setAcciones('');
    setRepsol('');
    setMotivo('');
    setEstado('');
    setFoto(null);
    setFecha('');
    setHora('');
    setFechaCierre('');
    setHoraCierre('');
    setFechaLiberacion('');
    setHoraLiberacion('');
    setCausa('');
    setFolio('');

    setOt('');
    setNumModelo('');
    setEviDaño('https://fakeimg.pl/300x300/e8e8e8/3a456f?text=Not+Found&font=lobster');
    setEviMejora('');
    setEstMaq('');
    setHHomInter('');
    setRefacc('');
    setAttExt('');
    setTras('');
    setCostHora('');
    setCostManoH('');
    setTotalTra('');
}
return (
<View style={styles.contForms}>

    <View style={styles.contFormTitle}>

    <Button onPress={refrescar}
        style={styles.btnMain}>
        <FontAwesome name="refresh" size={22} color="#242f66" />
    </Button>

    <Text style={styles.textTitle}>Mis Tickets</Text>

    <Button onPress={mensajes}
        style={styles.btnMain2}>
        <FontAwesome6 name="message" size={20} color="#242f66" />
    </Button>

    </View>

    <ScrollView>

        <View style={styles.container}>
        <Text style={styles.text}>Numero de Ticket</Text>
        <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={noTicketData}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={'Seleccione ticket...'}
            searchPlaceholder='Search...'
            value={noTicket}
            onChange={(item : any) => {
                setNoTicket(item.value);
                handleState(item.value);
                getcorreo(item.value);
                validarAgente(item.value);
            }}
        />
        </View>

        <View style={styles.container}>
        <Text style={styles.textCenter}>Equipo reportado</Text>
        <TextInput style={styles.boxsmall}
            value={repsol}
            editable={habReporte}
            />
        </View>

        {/* Fecha de Inicio */}
        <View style={styles.containerDrop}>
        <View style={styles.containerDropIn}>
            <Text style={styles.textCenter}>Fecha del Ticket</Text>
            <TextInput style={styles.boxsmall}
            value={fecha}
            editable={habFecha}
            />
        </View>
        
        <View style={styles.containerDropIn}>
            <Text style={styles.textCenter}>Hora del Ticket</Text>
            <TextInput style={styles.boxsmall}
            value={hora}
            editable={habHora}
            />
        </View>
        </View>
        {/* Fecha de Inicio */}
        {/* Fecha de Cerrado */}
        <View style={styles.containerDrop}>
        <View style={styles.containerDropIn}>
            <Text style={styles.textCenter}>Fecha de Cerrado</Text>
            <TextInput style={styles.boxsmall}
            value={fechaCierre}
            editable={habFecha}
            />
        </View>
        
        <View style={styles.containerDropIn}>
            <Text style={styles.textCenter}>Hora de Cerrado</Text>
            <TextInput style={styles.boxsmall}
            value={horaCierre}
            editable={habHora}
            />
        </View>
        </View>
        {/* Fecha de Cerrado */}
        {/* Fecha de Liberado */}
        <View style={styles.containerDrop}>
        <View style={styles.containerDropIn}>
            <Text style={styles.textCenter}>Fecha de Liberado</Text>
            <TextInput style={styles.boxsmall}
            value={fechaLiberacion}
            editable={habFecha}
            />
        </View>

        <View style={styles.containerDropIn}>
            <Text style={styles.textCenter}>Hora de Liberado</Text>
            <TextInput style={styles.boxsmall}
            value={horaLiberacion}
            editable={habHora}
            />
        </View>
        </View>
        {/* Fecha de Liberado */}

        <View style={styles.container}>
        <Text style={styles.textCenter}>Motivo</Text>
        <TextInput style={styles.boxlarge}
            value={motivo}
            multiline
            numberOfLines={6}
            editable={habMotivo}
            onChangeText={setMotivo}
        />
        </View>

        <View style={[styles.container]}>
        <Text style={styles.textCenter}>Agente que atiende</Text>
        <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={atencionData}
            search
            maxHeight={200}
            labelField='label'
            valueField='value'
            placeholder={'Agente que atiende...'}
            searchPlaceholder='Buscar...'
            value={atencion}
            onChange={(item : any) => {
                handleStateAtencionChange(item.value);
            }}
        />
        </View>

        <View style={[styles.container]}>
        <Text style={styles.textCenter}>Estado del ticket</Text>
        <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={estadosData}
            search
            maxHeight={200}
            labelField='label'
            valueField='value'
            placeholder={'Estado del ticket...'}
            searchPlaceholder='Buscar...'
            value={estado}
            onChange={(item : any) => {
            setEstado(item.value);
            }}
            disable={habEstado}
        />
        </View>
        
        <View style={styles.container}>
            <Image style = { styles.imagenContainer }
                source = {{ uri: fotoUri }}>
            </Image>
        </View>
        
        <View style={styles.container}>
        <Text style={styles.textCenter}>Causa Raiz</Text>
        <TextInput value={causa}
            onChangeText={setCausa}
            multiline
            editable={habCausa}
            style={styles.boxlarge}
        />
        </View>

        <View style={styles.container}>
        <Text style={styles.textCenter}>Acciones a Seguir</Text>
        <TextInput value={acciones}
            style={styles.boxlarge}
            editable={habAcciones}
            multiline
            onChangeText={setAcciones}
        />
        </View>
        
        {nivel && (
        <Button onPress={() => setFormMantto(!formMantto)}
        style={styles.button}
        disabled={userMantto}>
        {formMantto ? "Ocultar Informacion" : "Mas Informacion" }
        </Button>
        )}

        {formMantto && (
        <View style={styles.container}>

            <Text style={styles.textCenter}>OT</Text>
            <TextInput value={ot}
            style={styles.boxsmall}
            onChangeText={setOt}/>

            <Text style={styles.textCenter}>Numero de modelo</Text>
            <TextInput value={numModelo}
            style={styles.boxsmall}
            onChangeText={setNumModelo}/>

            <Text style={styles.textCenter}>Estado de maquina</Text>
            <TextInput value={estmaq}
            style={styles.boxsmall}
            onChangeText={setEstMaq}/>

            <Text style={styles.textCenter}>Evidencia de daños</Text>
            {/* <View>
            {eviDaño && <Image source={{ uri: eviDaño }} />}
            <Image style={styles.imagenContainer} source={{ uri: eviDaño }}></Image>
            </View> */}

            <Image style = { styles.imagenContainer }
                source = {{ uri: eviDaño }}>
            </Image>


            <View style={styles.containerButton}>
            <View style={styles.LineButtonBorrar}>
                <Button
                onPress={deletePicture}
                icon="delete"
                mode="contained"
                buttonColor="#b01212">
                    Borrar
                </Button>
            </View>

            <View style={styles.LineButtonTomarFoto}>
                <Button
                onPress={takePicture}
                icon="camera"
                mode="contained"
                buttonColor="#374175">
                    Tomar foto
                </Button>
            </View>
            </View>

            <Text style={styles.textCenter}>Evidencia de mejora</Text>
            <TextInput value={eviMejora}
            style={styles.boxsmall}
            onChangeText={setEviMejora}/>

            <Text style={styles.textCenter}>Horas hombre interno</Text>
            <TextInput value={hHomInter}
            style={styles.boxsmall}
            onChangeText={setHHomInter}/>

            <Text style={styles.textCenter}>Refacciones</Text>
            <TextInput value={refacc}
            style={styles.boxsmall}
            onChangeText={setRefacc}/>

            <Text style={styles.textCenter}>Atencion tecnico externo</Text>
            <TextInput value={attExt}
            style={styles.boxsmall}
            onChangeText={setAttExt}/>

            <Text style={styles.textCenter}>Traslado</Text>
            <TextInput value={tras}
            style={styles.boxsmall}
            onChangeText={setTras}/>

            <Text style={styles.textCenter}>Costo por hora hombre</Text>
            <TextInput value={costHora}
            style={styles.boxsmall}
            onChangeText={setCostHora}/>

            <Text style={styles.textCenter}>Costo mano de obra interna</Text>
            <TextInput value={costManoH}
            style={styles.boxsmall}
            onChangeText={setCostManoH}/>

            <Text style={styles.textCenter}>Total re trabajo</Text>
            <TextInput value={totalTra}
            style={styles.boxsmall}
            onChangeText={setTotalTra}/>
        </View>
        )}

        <View style={styles.container}>
            <Button onPress={ cerrarTicket }
            mode='contained'
            disabled={habCerrar}
            style={styles.button}
            icon='file-document-edit'
            buttonColor='#374175'>
                {botonTexto}
            </Button>
        </View>
        
    </ScrollView>
    </View>
    );
}
export default Tickets;