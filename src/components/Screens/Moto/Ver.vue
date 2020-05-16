<template>
  <div>
    <q-card style="min-width: 450px; min-height: 350px">
      <q-card-section>
        <div class="text-h6">Motocicleta</div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <q-input
          readonly
          color="black"
          v-model.trim="dato.placa"
          class="text-uppercase col q-mr-md"
          autofocus
          mask="AAA##A"
          stack-label
          label="Placa"
          dense
          maxlength="6"
        />
        <q-input
          readonly
          color="black"
          v-model="dato.color"
          class="text-uppercase col q-mx-md"
          stack-label
          dense
          label="Color"
        />
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <q-input 
            readonly
            color="black"
            label="MARCA"
            stack-label
            class="col q-mr-md"
            dense
            v-model="dato.tipo_moto.marca.nombre"
          
        />
        <q-input
          readonly
          label="REFERENCIA"
          color="black"
          class="col q-mx-md"
          stack-label
          dense
          v-model="dato.tipo_moto.referencia"
          
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          readonly
          dense
          v-model.trim="dato.persona.nombre"
          color="black"
          class="text-uppercase"
          stack-label
          label="Propietario"
        />
        
      </q-card-section>
      <q-card-actions align="right" class="text-black q-mr-lg q-mt-lg">
        <q-btn label="Ok" flat v-close-popup />
      </q-card-actions>
    </q-card>

  </div>
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
