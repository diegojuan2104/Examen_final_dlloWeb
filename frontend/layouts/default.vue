<template>
  <div>
    <template>
      <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#">Taller de motos</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="administrador" class="ml-3">
              <b-nav-item href="http://localhost:3000/administradorUsuarios">Gestión Usuarios</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-3">
              <b-nav-item href="http://localhost:3000/administradorMotos">Gestión de Motos</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-3">
              <b-nav-item
                href="http://localhost:3000/administradorMantenimientos"
              >Gestión de Mantenimientos</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-if="this.autenticado" class="ml-auto">
              <b-nav-item @click="cerrarSesion()" href="#">Cerrar Sesión</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <nuxt />
    </template>
  </div>
</template>


<script>
export default {
  beforeMount() {
    const rol = localStorage.getItem("rol");
    console.log(this.autenticado);
    if (rol != "null") {
      this.autenticado = true;
      if (rol == 2) {
        this.administrador = true;
      }
    }
    console.log(this.autenticado);
  },
  data() {
    return {
      autenticado: false,
      administrador: false
    };
  },

  methods: {
    cerrarSesion() {
      localStorage.setItem("rol", null);
      localStorage.setItem("documento", null);
      localStorage.setItem("token", null);
      window.location.replace("http://localhost:3000");
      this.autenticado = false;
      console.log(this.autenticado);
    }
  }
};
</script>

<style>
span {
  color: rgb(144, 4, 4);
}
</style>


