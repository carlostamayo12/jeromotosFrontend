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
        stack-label
        label="Marca"
        maxlength="20"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-black">
      <q-btn color="red" label="Cancel" v-close-popup />
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