<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Editar Marca</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        v-model.trim="dato.nombre"
        class="text-uppercase"
        autofocus
        dense
        maxlength="20"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton"  @click="updateMarca()" />
    </q-card-actions>
  </q-card>
</template>

<script>
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";
  import { LocalStorage, SessionStorage } from 'quasar'

  export default {
    props: ["dato"],
    data() {
      return {};
    },
    computed: {
      disabledButton: function() {
        return disabled.marca(this.dato)
        //return false;
      }
    },
    methods: {
      updateMarca() {
        var ruta = "marca/update";
        var datos = {
  					id: this.dato.id,
  					nombre: this.dato.nombre.toUpperCase(),
  					adminId: SessionStorage.getItem('administrador').id
        }
        http(ruta, datos, response => {
  					if (!response.data.error) {
  							this.$emit('click', false, this.dato.nombre)
  						} else {
  							this.$emit('click', true, response.data.mensaje)
  						}
  				}, e => {
  						this.$emit('click', true, e.message)
  				})
      }
    }
  };
</script>