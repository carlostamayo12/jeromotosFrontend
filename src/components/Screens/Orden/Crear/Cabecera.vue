<template>
  <div>
    <q-card>
      <q-card-section style="background: #000" class="text-white q-py-none">
        <div class="text-overline q-py-none">Orden # 0001</div>
      </q-card-section>
      <q-card-section class="row q-pt-xs">
        <q-btn round color="secondary" icon="search" @click="findMoto" />

        <q-select
          label="Tecnico"
          color="black"
          dense
          class="q-mx-md col"
          v-model="selectTecnico"
          :options="listaTecnicos"
          style="padding: 0"
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
          mask = "XXXXX"
          autofocus
          stack-label
          label="Kilometraje"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogFind" persistent >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Buscar Motocicleta</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="black"
            v-model.trim="placa"
            class="text-uppercase"
            autofocus
            dense
            maxlength="20"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-black">
          <q-btn flat label="Cancel"  v-close-popup @hide="closeDialog" />
          <q-btn flat label="Aceptar" @click="findMotoAcept()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { Dialog } from "quasar";
  import http from "../../../../functions/http";

  export default {
    components: {
      Dialog
    },
    props: ["dato", "selectTecnico", "listaTecnicos", "km"],
    data() {
      return {
        dialogFind: false,
        date: "2019-02-01 12:44",
        placa: ""
      };
    },
    beforeMount() {
      this.placa = this.dato.placa;
    },
    methods: {
      closeDialog(){
        console.log('hide')
      },
      findMotoAcept() {
        this.dialogFind = true;
      }
    }
  };
</script>