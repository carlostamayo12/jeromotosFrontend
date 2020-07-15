<template>
  <q-card style="min-width: 450px">
    <q-card-section>
      <div class="text-h6">Editar Persona</div>
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
      />
      <q-input
        dense
        v-model.trim="dato.telefono"
        color="black"
        class="text-uppercase"
        stack-label
        label="telefono"
        mask="##########"
      />
      <q-input
        dense
        v-model.trim="dato.direccion"
        color="black"
        class="text-uppercase"
        stack-label
        label="Direccion"
      />
      <q-input
        dense
        v-model.trim="dato.correo"
        color="black"
        class="text-lowercase"
        stack-label
        label="Correo"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton" @click="updatePersona" />
    </q-card-actions>
  </q-card>
</template>

<script>
  import { LocalStorage, SessionStorage } from 'quasar'
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";

  export default {
    props: ["dato"],
    data() {
      return {};
    },
    computed: {
      disabledButton: function() {
        return false;
      }
    },
    methods: {
      updatePersona() {
        let ruta = "persona/update";
        this.dato.adminId = (SessionStorage.getItem('administrador').id)
        
        http(ruta, this.dato, response => {
            if (!response.data.error) {
              this.$emit('click', false, this.dato.nombre)
            } else {
              this.$emit('click', true, response.data.mensaje)
            }
          },
          e => {
						this.$emit('click', true, e.message)
					}
        );
      }
    }
  };
</script>
