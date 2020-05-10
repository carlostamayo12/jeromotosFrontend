<template>
  <q-card>
    <q-card-section style="background: #000; border: 1px solid #000" class="text-white q-py-none">
      <div  class="text-overline q-py-none">Informacion Propietario</div>
		</q-card-section>
		<q-card-section class="row">
      
			<q-input
				readonly
				dense
				v-model.trim="persona.nombre"
				color="black"
				class="text-capitalize col"
				stack-label
				label="Propietario"
			/>
			<q-input
				readonly
				color="black"
				dense
				v-model.trim="persona.telefono"
				class=" q-mr-md col"
				stack-label
				label="Telefono"
			/>
			<q-input
				readonly
				dense
				v-model="persona.direccion"
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
		props:['persona'],
		data() {
      return {};
    }
  };
</script>