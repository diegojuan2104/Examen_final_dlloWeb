import axios from "axios";
import URL from "../config/dataConfig"


export default {

    data() {
        return {
            //Valida si se está editando
            editando: false,

            //Lista de mantenimientos que se muestra en la tabla
            listMantenimientos: [],

            //Lista de Motos disponibles
            listPlacas: [],

            //lisa de mecanicos disponibles

            listMecanicos: [],

            //Datos los mantenimientos a registrar 
            mantenimiento: {
                id_mecanico: "",
                placa: "",
                fecha: "",
                trabajos_realizados: "",
                horas_invertidas: ""
            },

            //Campos de la tabla de mantenimientos
            camposTabla: [
                {

                    key: "id_mecanico",
                    label: "Id Mecánico"
                },
                {
                    key: 'placa',
                    label: "Placa"
                },
                {
                    key: 'fecha',
                    label: 'Fecha',
                },
                {
                    key: 'trabajos_realizados',
                    label: 'Trabajos Realizados',
                },
                {
                    key: 'horas_invertidas',
                    label: 'Horas invertidas',
                },

                'Modificar',

            ],

            usuario: {
                documento: "",
                rol: ""
            },

            mecanico_id_edit: "",

            modificacion_mecanico: false,

            token: ""
        }
    },

    beforeMount() {
        this.usuario.documento = localStorage.getItem("documento")
        this.usuario.rol = localStorage.getItem("rol")
        this.token = localStorage.getItem("token")


        if (this.usuario.rol == 2) {
            this.camposTabla.push("Eliminar")
        }


        this.listarPlacas();
        this.listarMecanicos();
        this.listarMantenimientos();
    },

    methods: {
        //Lista las placas de las motos disponibles 
        listarPlacas() {
            const token = this.token
            axios.get(URL + "motos", { headers: { token } }).then(res => {
                res.data.forEach(moto => {
                    if (moto.estado == "Necesita mantenimiento") { this.listPlacas.push(moto.placa) }
                });
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        },

        listarMecanicos() {
            const token = this.token;
            axios.get(URL + "usuarios", { headers: { token } }).then(res => {
                res.data.forEach(usuario => {
                    if (usuario.rol == 1) {
                        const info = " Id: " + usuario.documento + " Nombre Completo: " + usuario.nombre + " " + usuario.apellidos
                        const newMecanico = {
                            text: info,
                            value: usuario.documento
                        }
                        this.listMecanicos.push(newMecanico)
                    }
                });
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        },

        //Registra el manteniemiento, y lo agrega al table
        registrarMantenimiento() {
            if (!this.editando) {
                const f = new Date();
                const fecha_actual = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

                this.mantenimiento.fecha = fecha_actual;
                this.mantenimiento.trabajos_realizados = "Ninguno"
                this.mantenimiento.horas_invertidas = 0;
                const token = this.token
                axios.post(URL + "mantenimientos", this.mantenimiento, { headers: { token } }).then(res => {
                    axios.put(URL + "actualizarEstadoMoto/" + this.mantenimiento.placa, { estado: "En mantenimiento" }, { headers: { token } }).then(res => {
                        console.log(res);
                        alert("Mantenimiento registrado")
                        this.recargarPagina();
                    }).catch(error => {
                        console.log(error.response.data.detail);
                    });
                    console.log(res);
                }).catch(error => {
                    alert("El mantenimiento de esta moto ya ha sido asignado aa este mecánico")
                });

            }
        },

        //Lista todo los mantenimientos ya existentes
        listarMantenimientos() {
            const token = this.token;
            axios.get(URL + "mantenimientos", { headers: { token } }).then(res => {
                res.data.forEach(mantenimiento => {
                    const newMantenimiento = {
                        Modfificar: true,
                        Eliminar: true,
                        id_mecanico: mantenimiento.id_mecanico,
                        placa: mantenimiento.placa,
                        fecha: mantenimiento.fecha,
                        trabajos_realizados: mantenimiento.trabajos_realizados,
                        horas_invertidas: mantenimiento.horas_invertidas
                    }

                    if (this.usuario.rol == 2 || this.usuario.documento == mantenimiento.id_mecanico) {
                        this.listMantenimientos.push(newMantenimiento)
                    }
                });
            }).catch(error => {
                console.log(error);

            });

        },

        //Elimina un mantenimiento
        async  eliminarMantenimiento(row) {
            const fecha = row.item.fecha.slice(0, 10);
            let mantenimiento = {
                id_mecanico: row.item.id_mecanico,
                placa: row.item.placa,
                fecha: fecha
            }
            console.log(mantenimiento);
            const token = this.token
            await axios.put(URL + "mantenimientosEliminar/", mantenimiento, { headers: { token } }).then(res => {
                console.log(res);
                alert("Mantenimiento Eliminado")
                this.recargarPagina();
            }).catch(error => {
                alert(error.response.data.detail);
            });
        },

        //Carga el mantenimiento para posteriormente actualizarlo
        cargarMantenimiento(row) {
            if (this.usuario.rol == 1) {
                this.modificacion_mecanico = true
            }
            const index = this.listMantenimientos.findIndex(mantenimiento => mantenimiento.placa == row.item.placa && mantenimiento.fecha == row.item.fecha)
            const mantenimiento = this.listMantenimientos[index]
            this.mantenimiento = {
                id_mecanico: mantenimiento.id_mecanico,
                placa: mantenimiento.placa,
                trabajos_realizados: mantenimiento.trabajos_realizados,
                fecha: mantenimiento.fecha,
                horas_invertidas: mantenimiento.horas_invertidas
            }
            this.editando = true;
            this.mecanico_id_edit = mantenimiento.id_mecanico;
        },

        //Actualiza el mantenimiento, dado que necesite un cambio de mecanico por ejemplo
        actualizarMantenimiento() {

            const fecha = this.mantenimiento.fecha.slice(0, 10);
            const mantenimiento = {
                id_mecanico: this.mantenimiento.id_mecanico,
                fecha,
                placa: this.mantenimiento.placa,
                trabajos_realizados: this.mantenimiento.trabajos_realizados,
                horas_invertidas: this.mantenimiento.horas_invertidas,
                id: this.mecanico_id_edit,
            }

            console.log(mantenimiento);
            const token = this.token
            axios.put(URL + "mantenimientos/", mantenimiento, { headers: { token } }).then(res => {
                console.log(res);
                if (this.usuario.rol == "1") {
                    axios.put(URL + "actualizarEstadoMoto/" + mantenimiento.placa, { estado: "Mantenimiento Realizado" }, { headers: { token } }).then(res => {
                        console.log(res);
                        alert("Mantenimiento Actualizado")
                        this.recargarPagina();
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        },

        recargarPagina() {
            window.location.replace("http://localhost:3000/administradorMantenimientos");
        },

    }
};



