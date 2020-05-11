<template>
  <q-card>
    <q-card-section style="background: #000; border: 1px solid #000" class="text-white q-py-none">
      <div  class="text-overline q-py-none">Informacion Propietario</div>
		</q-card-section>
		<q-card-section class="row">
      
			<q-input
				readonly
				dense
				v-model.trim="dato.persona.nombre"
				color="black"
				class="text-capitalize col-5 q-mr-md"
				stack-label
				label="Propietario"
			/>
			<q-input
				readonly
				color="black"
				dense
				v-model.trim="dato.persona.telefono"
				class=" q-mr-md col-2"
				stack-label
				label="Telefono"
			/>
			<q-input
				readonly
				dense
				v-model="dato.persona.direccion"
				color="black"
				class="col"
				stack-label
				label="Direccion"
			/>

		</q-card-section>
  </q-card>
</template>

<script>
	
	export default {
		props:['dato'],
		data() {
      return {};
    }
  };
</script>