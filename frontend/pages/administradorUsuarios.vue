<template>
  <div>
    <b-container>
      <center>
        <h1>Gestión usuarios</h1>
      </center>

      <b-card class="mt-5">
        <b-form action="javascript:void(0)" @submit="registrarUsuario()">
          <center>
            <h3 v-if="!editando">Registrar un usuario</h3>
            <h3
              v-if="editando"
            >Actualizando el usuario con el actual documento : {{usuario.documento}}</h3>
            <h6>
              Todos los campos marcados con un
              <span>"*"</span> son obligatorios
            </h6>
          </center>

          <b-form-group class="mt-4" label-for="tipo_documento">
            <p>
              <span>*</span>Tipo de documento:
            </p>
            <b-form-select
              class="form-control"
              type="text"
              required
              id="tipo_documento"
              :options="listTiposDeDocumento"
              v-model="usuario.tipo_documento"
            />
          </b-form-group>
          <b-form-group v-if="!editando" id="input-group-1" label label-for="documento">
            <p>
              <span>*</span>Documento:
            </p>
            <b-form-input
              type="number"
              required
              placeholder="Ingrese el documento"
              id="documento"
              v-model="usuario.documento"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="nombre">
            <p>
              <span>*</span>Nombre:
            </p>
            <b-form-input
              type="text"
              required
              placeholder="Ingrese el nombre"
              id="nombre"
              v-model="usuario.nombre"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="apellidos">
            <p>
              <span>*</span>Apellidos:
            </p>
            <b-form-input
              type="text"
              required
              placeholder="Ingrese los apellidos"
              id="apellidos"
              v-model="usuario.apellidos"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="celular">
            <p>
              <span>*</span>Celular:
            </p>
            <b-form-input
              type="number"
              required
              placeholder="Ingrese el celular"
              id="celular"
              v-model="usuario.celular"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="correo">
            <p>
              <span>*</span>Correo:
            </p>
            <b-form-input
              type="email"
              required
              placeholder="Ingrese el correo"
              id="correo"
              v-model="usuario.correo"
            ></b-form-input>
          </b-form-group>

          <b-form-group label label-for="rol">
            <p>
              <span>*</span>Rol:
            </p>
            <b-form-select
              class="form-control"
              type="text"
              required
              id="rol"
              :options="listRoles"
              v-model="usuario.rol"
            />
          </b-form-group>

          <b-form-group v-if="!editando" id="input-group-1" label label-for="clave">
            <p>
              <span>*</span>Clave:
            </p>
            <b-form-input
              type="password"
              required
              placeholder="Ingrese la clave"
              id="clave"
              v-model="usuario.clave"
            ></b-form-input>
          </b-form-group>

          <b-button v-if="!editando" type="submit" variant="dark">Registrar</b-button>
          <b-button
            v-if="editando"
            @click="actualizarUsuario()"
            type="submit"
            variant="dark"
          >Modificar</b-button>
        </b-form>
      </b-card>
      <b-card class="mt-5">
        <center>
          <h3>Usuarios Registrados</h3>
        </center>
        <b-table responsive striped hover :items="listUsuarios" :fields="camposTabla">
          <template v-slot:cell(Modificar)="row">
            <b-button block variant="dark" size="sm" @click="cargarUsuario(row)">Modificar</b-button>
          </template>
          <template v-slot:cell(Eliminar)="row">
            <b-button block variant="danger" size="sm" @click="eliminarUsuario(row)">Eliminar</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>


<script src="@/assets/administradorUsuarios.js" />

