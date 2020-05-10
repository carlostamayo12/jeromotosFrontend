<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Crear Marca</div>
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
      <q-btn flat label="Aceptar" :disable="disabledButton" @click="createMarca" />
    </q-card-actions>
  </q-card>
</template>

<script>
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";

  export default {
    props: ["dato"],
    data() {
      return {};
    },
    computed: {
      disabledButton: function() {
        return disabled.marca(this.dato);
      }
    },
    methods: {
      createMarca() {
        var ruta = "marca/create";
        var datos = {
          id: this.dato.id,
          nombre: this.dato.nombre.toUpperCase(),
          adminId: 1
        };
        http(
          ruta,
          datos,
          response => {
            if (!response.data.error) {
              this.$emit("click", false, response.data.datos.nombre);
            } else {
              this.$emit("click", true, response.data.mensaje);
            }
          },
          e => {
            this.$emit("click", false, e.message);
          }
        );
      }
    }
  };
</script>