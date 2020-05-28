import axios from "axios";
import URL from "../config/dataConfig"
import Md5 from "crypto-js/md5";


export default {

    data() {
        return {
            //Valida si se está editando
            editando: false,
            //Lista de tipos de documentos
            listTiposDeDocumento: [],

            //Lista de los roles existentes
            listRoles: [],

            //Lista de usuarios que se muestra en la tabla
            listUsuarios: [],

            //Lista de usuarios con todos sus datos
            listUsuariosCompleta: [],

            //Datos del usuario a registrar 
            usuario: {
                tipo_documento: "",
                documento: "",
                nombre: "",
                apellidos: "",
                celular: "",
                correo: "",
                rol: "",
                clave: "",

            },

            //Campos de la tabla de usuarios
            camposTabla: [


                {

                    key: "tipo_documento",
                    label: "Tipo de documento"
                },
                {
                    key: 'documento',
                    sortable: false
                },
                {
                    key: 'rol',
                    label: 'Rol',
                },
                {
                    key: 'nombre',
                    label: 'Nombre(s)',
                },
                {
                    key: 'apellidos',
                    label: 'Apellido(s)',
                },
                {
                    key: 'apellidos',
                    label: 'Apellidos',
                },
                {
                    key: 'celular',
                    label: 'Celular',
                },
                {
                    key: 'correo',
                    label: 'Correo',
                },
                'Modificar',

                'Eliminar',
            ],

            token: ""
        };
    },

    beforeMount() {
        this.token = localStorage.getItem("token")
        this.listarTipos_documentos();
    },

    methods: {

        // Trae los tipos de documentos de la bd y los lista
        listarTipos_documentos() {
            const token = this.token
            axios.get(URL + "tipos_documentos", {
                headers: { token }
            }).then(res => {

                res.data.forEach(tipo_documento => {
                    const newTipoDocumento = {
                        text: tipo_documento.nombre,
                        value: tipo_documento.id
                    }
                    this.listTiposDeDocumento.push(newTipoDocumento)
                });
                this.listarRoles();
            }).catch(error => {
                console.log(error);
            });
        },

        // Trae los roles de documentos de la bd y los lista
        listarRoles() {
            const token = this.token
            axios.get(URL + "roles", { headers: { token } }).then(res => {
                console.log(res);
                res.data.forEach(rol => {
                    const newRol = {
                        text: rol.nombre,
                        value: rol.id
                    }
                    this.listRoles.push(newRol)
                });
                this.listarUsuarios();
            }).catch(error => {
                console.log(error);
            });
        },

        //Registra el usuario, y lo agrega al table
        registrarUsuario() {
            if (!this.editando) {
                const token = this.token
                axios.post(URL + "usuarios", this.usuario, { headers: { token } }).then(res => {
                    alert("usuario registrado")
                    this.recargarPagina();
                }).catch(error => {
                    console.log();
                    (error.response.data.detail);
                });
            }
        },

        //Lista todo los usuarios ya existentes
        listarUsuarios() {
            const token = this.token
            axios.get(URL + "usuarios", { headers: { token } }).then(res => {
                this.listUsuariosCompleta = res.data
                this.listUsuariosCompleta.forEach(usuario => {
                    let newRol = ""
                    let newTipo_documento = ""
                    try {
                        newRol = this.listRoles[this.listRoles.findIndex(rol => rol.value == usuario.rol)].text
                    } catch (error) {
                        console.log(error);
                    }
                    try {
                        newTipo_documento = this.listTiposDeDocumento[this.listTiposDeDocumento.findIndex(tipo_documento => tipo_documento.value == usuario.tipo_documento)].text
                    } catch (error) {
                        console.log(error);

                    }

                    const newUser = {
                        Modfificar: true,
                        Eliminar: true,
                        tipo_documento: newTipo_documento,
                        documento: usuario.documento,
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        celular: usuario.celular,
                        correo: usuario.correo,
                        rol: newRol,
                        clave: usuario.clave,
                    }
                    this.listUsuarios.push(newUser)
                });
            }).catch(error => {
                console.log(error);

            });

        },

        eliminarUsuario(row) {
            const token = this.token
            axios.delete(URL + "usuarios/" + row.item.documento, { headers: { token } }).then(res => {
                axios.delete(URL + "mantenimientosMecanicoEliminar/" + row.item.documento, { headers: { token } }).then(res => {
                    console.log(res);
                    alert("Usuario Elimininado")
                    this.recargarPagina();
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        },


        cargarUsuario(row) {
            const index = this.listUsuariosCompleta.findIndex(usuario => usuario.documento == row.item.documento)
            const user = this.listUsuariosCompleta[index]
            console.log("wqeqwe", user);
            this.usuario = {
                tipo_documento: user.tipo_documento,
                documento: user.documento,
                nombre: user.nombre,
                apellidos: user.apellidos,
                celular: user.celular,
                correo: user.correo,
                rol: user.rol,
            }
            this.editando = true;
            //console.log(this.usuario);
        },

        actualizarUsuario() {
            if (this.usuario.nombre == "" || this.usuario.apellidos == "" || this.usuario.correo == "" || this.usuario.celular == "") {
                alert("Los campos no pueden quedar vacíos")
                return;
            }
            const token = this.token;
            axios.put(URL + "usuarios/" + this.usuario.documento, this.usuario, { headers: { token } }).then(res => {
                console.log(res);

                alert("Usuario Actualizado")
                this.recargarPagina();
            }).catch(error => {
                console.log(error.response.data.detail);
            });
        },
        recargarPagina() {
            window.location.replace("http://localhost:3000/administradorUsuarios");
        },

    }
};