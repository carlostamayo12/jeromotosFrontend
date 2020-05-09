<template>
  <q-card style="min-width: 450px" class="q-px-md">
    <q-card-section>
      <div class="text-h6">Crear Persona</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        dense
        v-model.trim="dato.nombre"
        class="text-uppercase"
        autofocus
        stack-label
        label="Nombre"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-input
        dense
        v-model.trim="dato.identificacion"
        color="black"
        class="text-uppercase"
        stack-label
        label="Identificacion"
        :rules="[val => !!val || 'Field is required']"
        mask="##########"
      />
      <q-input
        dense
        v-model="dato.telefono"
        color="black"
        class="text-uppercase"
        stack-label
        label="telefono"
        mask="##########"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-input
        dense
        v-model.trim="dato.direccion"
        color="black"
        class="text-uppercase"
        stack-label
        label="Direccion"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-input
        dense
        v-model.trim="dato.correo"
        color="black"
        class="text-lowercase"
        stack-label
        label="CORREO"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-option-group
        dense
        style="font-size:10px;"
        v-model="roles"
        :options="listaRoles"
        color="green"
        type="checkbox"
        inline
      />
      <pre>{{dato}}</pre>
    </q-card-section>
    <!--v-if=" this.$q.sessionStorage.getItem('administrador').id > 3"-->
    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton" @click="createPersona" />
    </q-card-actions>
  </q-card>
</template>
<script>
  import { firebaseAuth, firebaseDB } from "../../../boot/firebase";
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";

  export default {
    props: ["dato"],
    data() {
      return {
        roles: [],
        listaRoles: [
          { value: 1, label: "Tecnico" },
          { value: 2, label: "Administrador" }
        ]
      };
    },
    computed: {
      disabledButton: function() {
        return false;
      }
    },
    beforeMount() {
      this.$nextTick(() => {});
    },
    methods: {
      createPersona() {
        //this.dato.adminId = (SessionStorage.getItem('administrador').id)
        this.dato.rol = this.roles.length == 0 ? 0 : this.roles.length == 1 ? this.roles[0] : 3;
        var ruta = "persona/create";

        firebaseAuth
          .createUserWithEmailAndPassword(
            this.dato.correo,
            this.dato.identificacion
          )
          .then(response => {
            this.dato.uId = response.user.uid
            http(ruta, this.dato, response => {
              if(!response.data.error){
                this.$emit('click', false, response.data.datos.nombre)
              }else{
                this.$emit('click', true, response.data.mensaje)
              }
            }, e => {
              this.$emit('click', true, e.message)
            } )
          })
          .catch(e => {
            this.$emit('click', true, e.message)
          });
      }
    }
  };
</script>