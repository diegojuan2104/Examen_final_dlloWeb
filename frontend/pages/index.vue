<template>
  <div>
    <b-container>
      <center>
        <h1>Taller de motos</h1>
      </center>
      <b-card class="mt-5">
        <b-form action="javascript:void(0)" @submit="iniciarSesion()">
          <b-form-group id="input-group-1" label="Documento:" label-for="input-1">
            <b-form-input
              v-model="usuario.documento"
              type="number"
              required
              placeholder="Ingrese su documento"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Clave:" label-for="input-1">
            <b-form-input
              v-model="usuario.clave"
              type="password"
              required
              placeholder="Ingrese su clave"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="dark">Iniciar Sesión</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>



<script src="@/assets/index.js" />
