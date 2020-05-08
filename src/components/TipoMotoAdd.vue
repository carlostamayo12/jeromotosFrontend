<!--<template>
    <div class="q-pa-md fila" style="max-width: 550px; margin-top:80px;">
    <q-dialog v-model="dialogAdd" persistent>
			<q-card style="min-width: 600px">
				<q-card-section class="q-py-xs">
					<div class="text-h6">Crear Tipo Moto</div>
				</q-card-section>
				{{listaServiciosTaller}}
				<q-card-section class="row q-py-none">
					<q-select dense v-model="marca" :options="listMarcas" class="col" style="padding: 0" />
					<q-input
						dense
						v-model="dato.referencia"
						class="text-uppercase col q-mx-md"
						autofocus
						@keyup.enter="dialogAddClose"
					/>
				</q-card-section>

				<q-card-section class="q-pt-md">
					<!--<p class="text-bold">Tabla Mantenimiento</p>

					<q-list dense>
						<q-item-label class="fila text-bold" header>Tabla Mantenimiento</q-item-label>
						<q-item dense v-for="(datoEnvio,i) in listaServicios" :key="i">
							<q-item-section class="col">
								<q-item-label dense >{{datoEnvio.nombre}}</q-item-label>
							</q-item-section>

							<q-item-section class="col-2">
								<q-select
									class="q-py-none"
									@input = selected(datoEnvio,i)
									dense
									v-model="datoEnvio.km"
									:options="listaKm"
									style="padding: 0px !important;"
								/>
							</q-item-section>

							<q-item-section class="col-2">
								<q-select dense v-model="datoEnvio.tiempo" :options="listaTiempo" style="padding: 0" />
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-actions align="right" class="text-primary">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" :disable="disabledButton" @click="createTipo" />
				</q-card-actions>
			</q-card>
		</q-dialog>
		
		</div>	
</template>-->

<!--<script>
export default {
	data() {
		return{

		}
	}
}
</script>-->