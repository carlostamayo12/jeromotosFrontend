<template>
  <q-card>
    <q-card-section style="background: #24292e" class="text-white q-py-none">
      <div class="text-overline q-py-none">Orden # 0001</div>
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

      <q-input dense v-model="date" color="black">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date color="red" v-model="date" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time color="red" v-model="date" mask="YYYY-MM-DD HH:mm" format24h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

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
    props: ["dato", "selecTecnico", "listaTecnicos"],
    data() {
      return {
        date: "2019-02-01 12:44"
      };
    }
  };
</script>