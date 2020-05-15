<template>
  <q-card style="width: 300px">
    <q-card-section>
      <div class="text-h6">Error</div>
    </q-card-section>
    <q-card-section class="q-pt-none">{{error}}</q-card-section>
    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn flat color="black" label="OK" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
	props: ['error'],
	data(){
		return{

		}
	}
}
</script>