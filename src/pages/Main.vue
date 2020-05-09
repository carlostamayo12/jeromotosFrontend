<template>
	<q-page class="flex">
		<q-card class="full-width">
			<q-toolbar  style="position:fixed;z-index: 100;background: #24292e" class="text-white shadow-2 rounded-borders q-py-sm q-px-md">
				<q-item class="q-pl-none">
					<q-item-section>
						<q-item-label style="font-size:18px;" class="text-bold q-pr-none">Jeromotos24</q-item-label>
						<q-item-label style="font-size:10px;" class="q-pr-none">{{administrador}}</q-item-label>
					</q-item-section>	
				</q-item>				
			
				<q-space />  
				
				<q-tabs v-model="tab" shrink denseinline-label>
					<q-tab name="marca" label="Marca" />
					<q-tab name="moto" label="Moto" />
					<q-tab name="persona" label="Persona" />
					<q-tab name="serviciotaller" label="Servicio Taller" />
					<q-tab name="tablamantenimiento" label="Tabla Mantenmiento" />
					<q-tab name="tipomoto" label="Tipo Moto" />
					<q-tab name="ordenservicio" label="Orden Servicio" />
					<q-route-tab class="text-bold" icon="close" to="/" exact />
				</q-tabs>
			
			</q-toolbar>

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="marca">
					<Marca />
				</q-tab-panel>

				<q-tab-panel name="moto">
					<Moto />
				</q-tab-panel>

				<q-tab-panel  name="ordenservicio">
					<Orden />
				</q-tab-panel>

				<q-tab-panel name="persona">
					<Persona />
				</q-tab-panel>  

				<q-tab-panel name="serviciotaller">
					<ServicioTaller />
				</q-tab-panel>

				<q-tab-panel  name="tablamantenimiento">
					<TablaMantenimiento />
				</q-tab-panel>
				
				<q-tab-panel  name="tipomoto">
					<TipoMoto />
				</q-tab-panel>

				

			</q-tab-panels>
		</q-card>
	</q-page>
</template>  

<script>
	//import Marca from "../components/Marca";
	import Marca from "../components/Screens/Marca/Index";
	import Moto from "../components/Screens/Moto/Index";
	import Orden from "../components/Screens/Orden/Index"
	import Persona from "../components/Screens/Persona/Index";
	import ServicioTaller from "../components/Screens/ServicioTaller/Index";
	import TablaMantenimiento from "../components/Screens/TablaMantenimiento/Index"
	import TipoMoto from "../components/Screens/TipoMoto/Index";
	

	//import OrdenServicio from "../components/OrdenServicio"*/
	//import { LocalStorage, SessionStorage } from 'quasar'
	
	export default {
		components: {
			Marca,
			Moto,
			Orden,
			Persona,
			ServicioTaller,
			TablaMantenimiento,
			TipoMoto
			
		},
		data() {
			return {  
				tab: 'marca',
				administrador:'Admin'
			};
		},
		beforeMount(){
    this.$nextTick(()=>{
      /*if(SessionStorage.isEmpty()){
        this.$router.push('/')
      }else{
				this.administrador = SessionStorage.getItem('administrador').nombre
			}*/
			this.administrador = "Carlos Tamayo";
    })
  },
		methods:{
			close(){
				//this.$router.push('/')
			}
		},
	};
</script>