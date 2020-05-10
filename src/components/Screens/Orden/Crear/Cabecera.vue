<template>
  <q-card>
    <q-card-section style="background: #24292e" class="text-white q-py-none">
      <div  class="text-overline q-py-none">Orden # 0001</div>
		</q-card-section>
		<q-card-section class="row q-pt-xs">
      <q-input
        readonly
        color="black"
        dense
        v-model.trim="dato.placa"
        class="q-mr-md col"
        autofocus
        stack-label
        label="Placa"
      />
			<q-select
				label="Tecnico"
				color="black"
				dense
				class="q-mx-md col"
				v-model="selectTecnico"
				:options="listaTecnicos"
				style="padding: 0"
			/>
			<q-input
        readonly
        color="black"
        dense
        v-model.trim="dato.placa"
        class="q-mr-md col"
        autofocus
        stack-label
        label="Placa"
      />
			<q-input
				readonly
				color="black"
				dense
				v-model.trim="fechaEntregaEstimada"
				class="text-uppercase q-mr-none col"
				stack-label
				label="Fecha Entrega"
			/>
			<q-btn round icon="timer" color="red" size="md" />
				<q-input
					color="black"
					dense
					v-model.trim="km"
					class="q-mx-lg col"
					autofocus
					stack-label
					label="Kilometraje"
				/>

		</q-card-section>
  </q-card>
</template>

<script>
	
	export default {
		props:['dato', 'selecTecnico', 'listaTecnicos'],
		data() {
      return {};
    }
  };
</script>