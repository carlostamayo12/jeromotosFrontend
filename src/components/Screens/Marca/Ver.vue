<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Marca</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        v-model="dato.nombre"
        color="black"
        class="text-uppercase"
        autofocus 
        readonly
        dense
        maxlength="20"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Ok" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  props:['dato'],
  data(){
		return{
      nombre: 'Marca'
		}
	}
}
</script>			