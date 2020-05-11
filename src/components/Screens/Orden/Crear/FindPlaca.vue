<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Buscar Motocicleta</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        v-model.trim="dato.placa"
        class="text-uppercase"
        autofocus
        dense
        maxlength="20"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" @click="findMoto()" />
    </q-card-actions>
  </q-card>
</template>

<script>
  //import http from "../../../../../../functions/http";
  

  export default {
    props: ["dato"],
    data() {
      return {
				placa: ''
			};
    },
    methods: {
      findMoto() {
        var ruta = "moto/findByPlaca";
        http(ruta, { placa: this.placa }, response => {
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