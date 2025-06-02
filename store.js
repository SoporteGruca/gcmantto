import { makeAutoObservable } from "mobx";

class UserStore {
    usuario = "";
    fullName = "";
    CEncargado = "";
    CAgente = "";
    MaquinaStorage = "";
    TicketStorage = "";
    constructor(parameters) { makeAutoObservable(this)}
        setUsuario(newUsuario) { this.usuario = newUsuario; }
        setFullName(newFullName) { this.fullName = newFullName;}
        setCEncargado(newCEncargado) { this.CEncargado = newCEncargado; }
        setCAgente(newCAgente) { this.CAgente = newCAgente; }
        setMaquina(newMaquina) {this.MaquinaStorage = newMaquina; }
        setTicket(newTicket) {this.TicketStorage = newTicket; }
}
const userStore = new UserStore();
export default userStore;