<template>
  <q-card>
    <q-card-section style="background: #000" class="text-white q-py-none">
      <div  class="text-overline q-py-none">Informacion Motocicleta</div>
		</q-card-section>
		<q-card-section class="row">
      <q-input
						readonly
						color="black"
						dense
						v-model.trim="orden.moto.placa"
						class="text-uppercase q-mr-md col"
						autofocus
						stack-label
						label="Placa"
						style="max-width:80px"
					/>

					<q-input
						readonly
						dense
						v-model="orden.moto.km_promedio"
						color="black"
						class="text-uppercase col q-mr-md"
						stack-label
						label="Km promedio"
						style="max-width:100px"
					/>

					<q-input
						readonly
						
						dense
						v-model="ultimo"
						color="black"
						class="text-uppercase col q-mr-md"
						stack-label
						label="Ultimo Km"
					/>
				<q-input
						readonly
						dense
						v-model="orden.moto.color"
						color="black"
						class="text-uppercase col q-mr-md"
						stack-label
						label="Color"
						style="max-width:100px"
					/>

					<q-input
						readonly
						color="black"
						dense
						v-model.trim="orden.moto.tipo_moto.referencia"
						class="text-uppercase q-mr-md col"
						autofocus
						stack-label
						label="Referencia"
					/>

					<q-input
						readonly
						dense
						v-model="orden.moto.tipo_moto.marca.nombre"
						color="black"
						class="text-uppercase q-mr-md col"
						stack-label
						label="Marca"
					/>

		</q-card-section>
  </q-card>
</template>

<script>
	
	export default {
		props:['orden', 'ultimo'],
		data() {
      return {};
    }
  };
</script>