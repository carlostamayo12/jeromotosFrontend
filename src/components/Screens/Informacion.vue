<template>
  <q-card style="width: 300px">
    <q-card-section>
      <div class="text-h6">Notificacion</div>
    </q-card-section>
    <q-card-section class="q-pt-none">{{informacion}}</q-card-section>
    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn flat label="OK" v-close-popup />
    </q-card-actions>
  </q-card>
</template>   

<script>
export default {
	props: ['informacion'],
	data(){
		return{

		}
	}
}
</script>