<template>
  <div class="q-pa-md fila" style="max-width: 700px; margin-top:80px;">
    <q-toolbar class="bg-red text-white rounded-borders">
      <q-toolbar-title>Tabla Mantenimiento</q-toolbar-title>
      <q-input
        dark
        dense
        standout
        v-model="textFind"
        input-class="text-left"
        class="q-ml-md text-uppercase"
      >
        <template v-slot:append>
          <q-icon v-if="textFind === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
        </template>
      </q-input>
    </q-toolbar>
  </div>
</template>

<script>
  export default {
    textFind: "",
    datos:[],
    
  };
</script>

<style scoped>
  .fila {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>