<template>
  <div>
    <b-container>
      <center>
        <h1>Gestión de Mantenimientos</h1>
      </center>

      <b-card v-if="usuario.rol == 2 || modificacion_mecanico" class="mt-5">
        <b-form action="javascript:void(0)" @submit="registrarMantenimiento()">
          <center>
            <h3 v-if="!editando">Registrar un Mantenimiento</h3>

            <h3
              v-if="editando "
            >Modificación para el mantenimiento de la moto placa : {{mantenimiento.placa}}</h3>
            <h6>
              Todos los campos marcados con un
              <span>"*"</span> son obligatorios
            </h6>
          </center>

          <b-form-group v-if="usuario.rol == 2" class="mt-4" label-for="tipo_documento">
            <p>
              <span>*</span>Seleccione el mecánico:
            </p>
            <b-form-select
              class="form-control"
              type="text"
              required
              id="tipo_documento"
              :options="listMecanicos"
              v-model="mantenimiento.id_mecanico"
            />
          </b-form-group>

          <b-form-group
            v-if="usuario.rol == 2 && !editando"
            class="mt-4"
            label-for="tipo_documento"
          >
            <p>
              <span>*</span>Seleccione la placa de la moto que requiere mantenimiento:
            </p>
            <b-form-select
              class="form-control"
              type="text"
              required
              id="tipo_documento"
              :options="listPlacas"
              v-model="mantenimiento.placa"
            />
          </b-form-group>

          <b-form-group
            v-if="usuario.rol == 1"
            id="input-group-1"
            label
            label-for="trabajos_realizados"
          >
            <p>
              <span>*</span>Trabajos Realizados:
            </p>
            <b-form-textarea
              required
              placeholder="Ingrese los trabajos que le ha realizado a esta moto"
              id="trabajos_realizados"
              v-model="mantenimiento.trabajos_realizados"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            v-if="usuario.rol == 1"
            id="input-group-1"
            label
            label-for="horas_invertidas"
          >
            <p>
              <span>*</span>Horas Invertidas:
            </p>
            <b-form-input
              type="number"
              required
              placeholder="Ingrese las horas de trabajo para este mantenimiento"
              id="horas_invertidas"
              v-model="mantenimiento.horas_invertidas"
            ></b-form-input>
          </b-form-group>

          <b-button v-if="!editando" type="submit" variant="dark">Registrar</b-button>
          <b-button
            v-if="editando"
            @click="actualizarMantenimiento()"
            type="submit"
            variant="dark"
          >Modificar</b-button>
        </b-form>
      </b-card>
      <b-card class="mt-5">
        <center>
          <h3 v-if="usuario.rol == 2">Mantenimientos Registrados</h3>
          <h3 v-if="usuario.rol == 1">Mantenimientos Asignados</h3>
        </center>
        <b-table responsive striped hover :items="listMantenimientos" :fields="camposTabla">
          <template v-slot:cell(Modificar)="row">
            <b-button block variant="dark" size="sm" @click="cargarMantenimiento(row)">Modificar</b-button>
          </template>
          <template v-if="usuario.rol == 2" v-slot:cell(Eliminar)="row">
            <b-button block variant="danger" size="sm" @click="eliminarMantenimiento(row)">Eliminar</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/administradorMantenimientos.js" />

