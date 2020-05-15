<template>
	<div class="q-pa-none fila" style="min-width: 650px; margin-top:60px;border-color: black;">
		<q-toolbar class="text-white bg-red q-mt-xl">
			<q-toolbar-title class="text-bold">Orden de Servicio</q-toolbar-title>
			<q-space />
			<!--<q-input dark dense standout v-model="text" input-class="text-left" class="q-ml-md">
				<template v-slot:append>
					<q-icon v-if="text === ''" name="search" />
					<q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
				</template>
			</q-input>-->

			<q-btn-dropdown class="q-my-none" stretch flat :label="selectActivity.label">
				<q-list>
					<q-item
						v-for="(selectActivity,i) in listActivity"
						:key="i"
						clickable
						v-close-popup
						tabindex="0"
						@click ="selectedActivity(selectActivity)"
					>
						<q-item-section>
							<q-item-label>{{selectActivity.label}}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-btn-dropdown>
		</q-toolbar>
		<OrdenCreate v-if="selectActivity.value == 0" />
		<OrdenFin v-if="selectActivity.value == 1" />
		
	</div>
</template>

<script>
	import OrdenCreate from './OrdenCreate'
	import OrdenFin from './OrdenFin'
	
	export default {
		components:{
      OrdenCreate,
      OrdenFin
		},
		data() {
			return {
				selectActivity: { value: 0, label: "Nueva Orden" },
				listActivity: [
					{ value: 0, label: "Nueva Orden" },
					{ value: 1, label: "Finalizar Orden" },
					{ value: 2, label: "Cancelar" }
				]
			};
		},
		methods: {
			selectedActivity(activity) {
				this.selectActivity = JSON.parse(JSON.stringify(activity));
			},
		}
	}
</script>

<style scoped>
	.fila {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}
</style>