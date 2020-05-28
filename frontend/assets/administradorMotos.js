import axios from "axios";
import URL from "../config/dataConfig"


export default {

    data() {
        return {

            //Valida si se está editando
            editando: false,

            //Lista de motos que se muestra en la tabla
            listMotos: [],

            //Lista de estados de una moto

            listEstados: [
                "Necesita mantenimiento",
                "No necesita mantenimiento",
                "En mantenimiento",
                "Mantenimiento Realizado",
            ],

            //Datos del motos a registrar 
            moto: {
                placa: "",
                estado: "",
                clase: "",
                marca: "",
                modelo: "",
                color: "",
                cilindraje: "",
                id_propietario: "",
                nro_soat: "",
                vencimiento_soat: "",
                nro_tecnomecanica: "",
                vencimiento_tecnomecanica: ""
            },

            //Campos de la tabla de motos
            camposTabla: [
                {

                    key: "placa",
                    label: "Placa"
                },
                {
                    key: 'estado',
                    label: "Estado"
                },
                {
                    key: 'clase',
                    label: 'Clase',
                },
                {
                    key: 'marca',
                    label: 'Modelo',
                },
                {
                    key: 'modelo',
                    label: 'Modelo',
                },
                {
                    key: 'color',
                    label: 'Color',
                },
                {
                    key: 'cilindraje',
                    label: 'Cilindraje',
                },
                {
                    key: 'id_propietario',
                    label: 'Documento Propietario',
                },
                {
                    key: 'nro_soat',
                    label: 'N. Soat',
                },
                {
                    key: 'vencimiento_soat',
                    label: 'Vencimiento Soat',
                },
                {
                    key: 'nro_tecnomecanica',
                    label: 'N. tecnomecanica',
                },
                {
                    key: 'vencimiento_tecnomecanica',
                    label: 'Vencimiento Tecnomecánica',
                },
                'Modificar',
            ],

            token: ""
        }
    },
    beforeMount() {
        this.token = localStorage.getItem("token")
        this.listarMotos();
    },

    methods: {
        //Registra la moto, y la agrega al table
        registrarMoto() {
            if (!this.editando) {
                if (!this.moto.vencimiento_soat || !this.moto.vencimiento_tecnomecanica) {
                    alert("Las fechas de vencimiento deben ser ingresadas")
                    return
                };
                const token = this.token
                axios.post(URL + "motos", this.moto, { headers: { token } }).then(res => {
                    alert("Moto registrada")
                    this.recargarPagina();
                    console.log(res);

                }).catch(error => {
                    console.log(error.response);
                });
            }
        },

        //Lista todo los motos ya existentes
        listarMotos() {
            const token = this.token
            axios.get(URL + "motos", { headers: { token } }).then(res => {
                res.data.forEach(moto => {
                    const newMoto = {
                        Modificar: true,
                        Eliminar: true,
                        placa: moto.placa,
                        estado: moto.estado,
                        clase: moto.clase,
                        marca: moto.marca,
                        modelo: moto.modelo,
                        color: moto.color,
                        cilindraje: moto.cilindraje,
                        id_propietario: moto.id_propietario,
                        nro_soat: moto.nro_soat,
                        vencimiento_soat: moto.vencimiento_soat,
                        nro_tecnomecanica: moto.nro_tecnomecanica,
                        vencimiento_tecnomecanica: moto.vencimiento_tecnomecanica
                    }
                    this.listMotos.push(newMoto)
                });
            }).catch(error => {
                console.log(error);

            });

        },

        eliminarMoto(row) {
            const token = this.token
            axios.delete(URL + "motos/" + row.item.placa, { headers: { token } }).then(res => {
                console.log(res);
                alert("Moto Eliminada")
                this.recargarPagina();
            }).catch(error => {
                alert(error.response.data.detail);
            });
        },


        cargarMoto(row) {
            const index = this.listMotos.findIndex(moto => moto.placa == row.item.placa)
            const moto = this.listMotos[index]
            this.moto = {
                placa: moto.placa,
                estado: moto.estado,
                clase: moto.clase,
                marca: moto.marca,
                modelo: moto.modelo,
                color: moto.color,
                cilindraje: moto.cilindraje,
                id_propietario: moto.id_propietario,
                nro_soat: moto.nro_soat,
                vencimiento_soat: moto.vencimiento_soat,
                nro_tecnomecanica: moto.nro_tecnomecanica,
                vencimiento_tecnomecanica: moto.vencimiento_tecnomecanica
            }
            this.editando = true;
        },

        actualizarMoto() {
            if (this.moto.estado == "" || this.moto.clase == "" || this.moto.marca == "" || this.moto.modelo == ""
                || this.moto.color == "" || this.moto.cilindraje == "" || this.moto.id_propietario == ""
                || this.moto.nro_soat == "" || this.moto.vencimiento_soat == "" || this.moto.vencimiento_tecnomecanica == "" || this.moto.nro_tecnomecanica == ""
            ) {
                alert("Los campos no pueden quedar vacíos")
                return;
            }
            const token = this.token
            axios.put(URL + "motos/" + this.moto.placa, this.moto, { headers: { token } }).then(res => {
                console.log(res);

                alert("Moto Actualizada")
                this.recargarPagina();
            }).catch(error => {
                console.log(error.response.data.detail);
            });
        },
        // Valida que los campos tengan la cantidad de caracteres correcta
        validaciones() {
            this.moto.placa = this.moto.placa.length > 6 ? this.moto.placa.slice(0, 5) : this.moto.placa
            this.moto.cilindraje = this.moto.cilindraje.length > 3 ? this.moto.placa.slice(0, 2) : this.moto.cilindraje
            this.moto.modelo = this.moto.modelo.length > 4 ? this.moto.modelo.slice(0, 3) : this.moto.modelo
        },
        recargarPagina() {
            window.location.replace("http://localhost:3000/administradorMotos");
        },

    }
};



