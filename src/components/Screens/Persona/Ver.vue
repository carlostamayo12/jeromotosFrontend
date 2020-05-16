<template>
  <q-card style="min-width: 450px" class="q-px-md">
    <q-card-section>
      <div class="text-h6">Persona</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        dense
        v-model.trim="dato.nombre"
        class="text-uppercase"
        autofocus
        stack-label
        label="Nombre"
        readonly
      />
      <q-input
        dense
        v-model.trim="dato.identificacion"
        color="black"
        class="text-uppercase"
        stack-label
        label="Identificacion"
        readonly
        mask="##########"
      />
      <q-input
        dense
        v-model="dato.telefono"
        color="black"
        class="text-uppercase"
        stack-label
        label="telefono"
        mask="##########"
        readonly
      />
      <q-input
        dense
        v-model.trim="dato.direccion"
        color="black"
        class="text-uppercase"
        stack-label
        label="Direccion"
        readonly
      />
      <q-input
        dense
        v-model.trim="dato.correo"
        color="black"
        class="text-lowercase"
        stack-label
        label="CORREO"
        readonly
      />
      <!--<q-option-group
        v-if=" adminRol > 3"
        dense
        style="font-size:10px;"
        v-model="roles"
        :options="listaRoles"
        color="green"
        type="checkbox"
        inline
      />-->
    </q-card-section>
    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Ok" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
	props:['dato'],
	data(){
    return{

    }
	}
}
</script>