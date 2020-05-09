<!--<template>
  <q-card style="min-width: 450px; min-height: 350px">
    <q-card-section>
      <div class="text-h6">Edit Moto</div>
    </q-card-section>
    
		<q-card-section class="q-pt-none row">
      <q-input
        color="black"
        v-model.trim="dato.placa"
        class="text-uppercase col q-mr-md"
        autofocus
        stack-label
        label="Placa"
        dense
        maxlength="6"
      />
      <q-input
        color="black"
        v-model="dato.color"
        class="text-uppercase col q-mx-md"
        stack-label
        dense
        label="Color"
      />
    </q-card-section>
    
		<q-card-section class="q-pt-none row ">
      <q-select
        label="MARCA"
        color="black"
        class="col q-mr-md"
				dense
        v-model="selectMarca"
        :options="listaMarcas"
        style="padding: 0"
      />
      <q-select 
			label="REFERENCIA" 
			color="black" 
			class="col q-mx-md"
			dense 
			v-model="selectTipo" 
			:options="listarTipos" 
			/>
    </q-card-section>
    
		<q-card-section class="q-pt-none">
      <q-input
        dense
        v-model.trim="persona.nombre"
        color="black"
        class="text-uppercase"
        stack-label
        label="Propietario"
      />
      <q-list dense>
        <q-item
          v-for="(persona,i) in listarPersonas"
          :key="i"
          clickable
          v-ripple
          style="margin: 10px 16px;"
          @click="propietario(persona)"
        >
          <q-item-section>
            <q-item-label caption>{{persona.nombre}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    
		<q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton" @click="createMoto" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
	data(){
		return{

		}
	}
}
</script>-->