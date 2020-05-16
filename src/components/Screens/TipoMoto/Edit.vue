<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Editar Tipo Moto</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        v-model.trim="dato.referencia"
        class="text-uppercase"
        autofocus
        stack-label
        label="Referencia"
        maxlength="20"
      />
      <q-select color="black" label="MARCA" v-model="selectMarca" :options="listaMarcas" style="padding: 0" />
    </q-card-section>
    
    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton"  @click="updateTipo" />
    </q-card-actions>

	</q-card>
</template>

<script>

import http from "../../../functions/http";
import disabled from "../../../functions/disabled";

export default {
    props:['dato'],
    data(){
        return{

        }
    }
}
</script>