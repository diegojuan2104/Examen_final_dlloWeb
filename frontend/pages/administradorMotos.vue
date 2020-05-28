<template>
  <div>
    <b-container>
      <center>
        <h1>Gestión de Motos</h1>
      </center>

      <b-card class="mt-5">
        <b-form action="javascript:void(0)" @submit="registrarMoto()">
          <center>
            <h3 v-if="!editando">Registrar una Moto</h3>
            <h3 v-if="editando">Actualizando la moto con la placa actual : {{moto.placa}}</h3>
            <h6>
              Todos los campos marcados con un
              <span>"*"</span> son obligatorios
            </h6>
          </center>

          <b-form-group v-if="!editando" id="input-group-1" label label-for="placa">
            <p>
              <span>*</span>Placa:
            </p>
            <b-form-input
              @input="validaciones()"
              type="text"
              required
              placeholder="Ingrese la placa"
              id="documento"
              v-model="moto.placa"
            ></b-form-input>
          </b-form-group>

          <b-form-group class="mt-4" label-for="estado">
            <p>
              <span>*</span>Seleccione el estado de la moto:
            </p>
            <b-form-select
              class="form-control"
              type="text"
              required
              id="estado"
              :options="listEstados"
              v-model="moto.estado"
            />
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="clase">
            <p>
              <span>*</span>Clase:
            </p>
            <b-form-input
              type="text"
              required
              placeholder="Ingrese la clase de moto"
              id="clase"
              v-model="moto.clase"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="marca">
            <p>
              <span>*</span>Marca:
            </p>
            <b-form-input
              type="text"
              required
              placeholder="Ingrese la marca"
              id="marca"
              v-model="moto.marca"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="modelo">
            <p>
              <span>*</span>Modelo:
            </p>
            <b-form-input
              @input="validaciones()"
              type="text"
              required
              placeholder="Ingrese el modelo de la moto"
              id="modelo"
              v-model="moto.modelo"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="color">
            <p>
              <span>*</span>Color:
            </p>
            <b-form-input
              type="text"
              required
              placeholder="Ingrese el color"
              id="color"
              v-model="moto.color"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="cilindraje">
            <p>
              <span>*</span>Cilindraje:
            </p>
            <b-form-input
              @input="validaciones()"
              type="number"
              required
              placeholder="Ingrese el cilindraje"
              id="cilindraje"
              v-model="moto.cilindraje"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="id_propietario">
            <p>
              <span>*</span>Id Propietario:
            </p>
            <b-form-input
              type="text"
              required
              placeholder="Ingrese la identifiación del propietario"
              v-model="moto.id_propietario"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="nro_soat">
            <p>
              <span>*</span>N. Soat:
            </p>
            <b-form-input
              type="number"
              required
              placeholder="Ingrese el número de soat"
              v-model="moto.nro_soat"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="datepicker1">
            <p>
              <span>*</span>Fecha de vencimiento soat:
            </p>
            <b-form-datepicker
              id="datepicker1"
              required
              v-model="moto.vencimiento_soat"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="nro_tecnomecanica">
            <p>
              <span>*</span>N. tecnomecánica:
            </p>
            <b-form-input
              type="number"
              required
              placeholder="Ingrese el número de tecnomecánica"
              v-model="moto.nro_tecnomecanica"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label label-for="datepicker2">
            <p>
              <span>*</span>Fecha de vencimiento tecnomecánica:
            </p>
            <b-form-datepicker
              id="datepicker2"
              required
              v-model="moto.vencimiento_tecnomecanica"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>

          <b-button v-if="!editando" type="submit" variant="dark">Registrar</b-button>
          <b-button v-if="editando" @click="actualizarMoto()" type="submit" variant="dark">Modificar</b-button>
        </b-form>
      </b-card>
      <b-card class="mt-5">
        <center>
          <h3>Motos Registradas</h3>
        </center>
        <b-table responsive striped hover :items="listMotos" :fields="camposTabla">
          <template v-slot:cell(Modificar)="row">
            <b-button block variant="dark" size="sm" @click="cargarMoto(row)">Modificar</b-button>
          </template>
          <template v-slot:cell(Eliminar)="row">
            <b-button block variant="danger" size="sm" @click="eliminarMoto(row)">Eliminar</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/administradorMotos.js" />

