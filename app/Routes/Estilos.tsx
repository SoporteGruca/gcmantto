import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contLogin: {
    height: "100%",
    width:"100%",
    justifyContent: "flex-end",
    },
    containerLogo: {
    alignItems: "center",
    },
    containerImagen: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: 30,
    },
    image: {
    resizeMode: "stretch",
    width: "100%",
    },
    logo: {
    width: 150,
    height: 150,
    },
    textoLogo: {
    alignItems: "center",
    },
    titulo: {
    fontSize: 35,
    marginTop: "5%",
    textShadowColor: "blue",
    textShadowRadius: 1,
    },
    textos: {
    textShadowRadius: 5,
    textShadowColor:"#6e758b",
    textAlign:"center",
    fontSize: 30,
    color:"white",
    },
    textInputContainer: {
    position: "absolute",
    top: "25%",
    left:0,
    zIndex: 1,
    width:"100%",
    alignItems:"center"
    },
    textInput: {
    width: 250,
    height: 50,
    borderRadius: 20,
    marginVertical:20,
    backgroundColor: 'white',
    textAlign:'center',
    },
    txtBoton: {
    color: "white",
    borderRadius: 30,
    overflow: "hidden",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 60,
    },
    loadingContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
    padding:20,
    },
    contForms: {
    backgroundColor:'#e8e8e8',
    height: '100%',
    width:'100%',
    paddingLeft: 15,
    paddingRight: 15,
    },
    containerLine: {
    width:'100%',
    flexDirection:'column',
    marginVertical: '2%',
    justifyContent:'center',
    },
    containerButton:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingTop:'5%',
    paddingBottom:"5%",
    },
    LineButtonBorrar: {
    width: 150
    },
    LineButtonTomarFoto: {
    width: 150
    },
    text: {
    fontSize: 18,
    marginVertical:'2%',
    textAlign:"center",
    },
    contFormTitle: {
    width: '100%',
    height: '10%',
    paddingTop: "2%",
    },
    textTitle: {
    fontSize: 26,
    textAlign:"center",
    fontWeight: '600',
    fontStyle:'italic',
    marginTop: "5%",
    },
    textSubTitle: {
    fontSize: 24,
    fontFamily: "Helvetica",
    fontWeight: 'bold',
    fontStyle: "italic",
    color:"#374175",
    marginBottom: "4%",
    },
    dropdown: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderRadius: 20,
    paddingLeft:'3%',
    width: '98%',
    height: 40,
    },
    iconStyle: {
    backgroundColor:'#3a456f',
    position: 'relative',
    tintColor:'white',
    height: 20,
    width: 20,
    right: 15,
    },
    placeholderStyle: {
    fontSize: 16,
    left:10,
    textAlign:"center",
    },
    selectedTextStyle: {
    fontSize: 16,
    left:10,
    fontWeight:'600',
    textAlign:"center",
    fontStyle:'italic',
    },
    inputSearchStyle: {
    height: 40,
    fontSize: 18,
    borderRadius:20,
    backgroundColor:"#E4E4E4",
    },
    containerLineInside: {
    alignItems:'center',
    width: '100%',
    },
    boxsmall: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: '2%',
    borderColor: 'gray', 
    textAlign:"center",
    borderRadius: 20,
    width: '100%',
    height: 40,
    },
    boxlarge: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    textAlign: 'center',
    borderRadius: 20,
    color: '#000000',
    width: '100%',
    height: 80,
    },
    boxComment: {
    width: '100%',
    height: '20%',
    marginVertical: "2%",
    },
    boxComment2: {
    width: '100%',
    height: '20%',
    marginVertical: "2%",
    },
    boxCommentInput: {
    width: '100%',
    height: '15%',
    marginVertical: "6%",
    },
    boxCommentTitle: {
    width: '100%',
    position: "fixed",
    top: "12%",
    left: "1%",
    zIndex: 1,
    flexDirection: "row",
    },
    boxCommentTitle2: {
    width: '100%',
    position: "fixed",
    top: "12%",
    left: "65%",
    zIndex: 1,
    flexDirection: "row",
    },
    boxCommentSub: {
    fontSize: 18,
    paddingLeft: "2%",
    paddingRight: "2%",
    },
    containerFoto: {      
    width:'100%',
    height: 240,
    },
    txtComment: {
    backgroundColor: "#fff",
    marginVertical:'2%',
    textAlign:"center",
    fontStyle:"italic",
    borderRadius: 30,
    fontSize: 18,
    },
    imagenContainer: {
    maxWidth:'100%',
    minWidth:300,
    height: 300,
    marginVertical:'2%',
    resizeMode:"contain",
    borderRadius: 10,
    },
    //Tickets
    btnMain: {
    top: "20%",
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1,
    },
    btnMain2: {
    top: "20%",
    right: 0,
    position: 'absolute',
    paddingHorizontal: 10,
    zIndex: 1,
    },
    textCenter: {
    marginVertical:'2%',
    textAlign:'center',
    fontSize:16,
    },
    containerSeparate: {
    flexDirection: 'column',
    marginVertical:'2%',
    width:'100%',
    },
    containerSeparate2: {
    justifyContent: 'space-evenly',
    width:'100%',
    },
    container: {
    marginVertical:'2%',
    width:'100%',
    },
    containerDrop: {
    marginVertical:'2%',
    width:'100%',
    flexDirection: "row",
    },
    containerDropIn: {
    marginVertical:'2%',
    marginInline:"1%",
    width:'48%',
    },
    button: {
    marginVertical: '10%',
    alignItems: 'center',
    },
    Txtboton: {
    backgroundColor: '#b01212',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 4,
    color: 'white',
    padding: 15,
    width: '60%',
    },
});

export default styles;