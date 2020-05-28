import axios from "axios";
import URL from "../config/dataConfig"


export default {
    layout: "blank",
    data() {
        return {

            usuario: {
                documento: "",
                clave: "",
                autenticado: false
            }
        };
    },

    beforeMount() {

    },

    methods: {

        //Método que permite iniciar sesión al usuario
        async iniciarSesion() {
            try {
                const res = await axios.post(URL + "login", this.usuario)
                this.usuario.autenticado = true
                console.log(res);
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("rol", res.data.usuario.rol)
                localStorage.setItem("documento", res.data.usuario.id)
                window.location.replace("http://localhost:3000/administradorMotos");
            } catch (error) {
                console.log(error);
            }
        },
    }
};