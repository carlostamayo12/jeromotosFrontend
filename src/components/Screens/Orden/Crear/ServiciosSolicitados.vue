<template>
  <q-card class="q-mt-lg">
    <q-list bordered >
      <p class="bg-black text-white q-py-xs q-pl-md q-mb-none text-overline ">Servicios Taller</p>
      <q-item
        dense
				class="q-my-none q-pa-none"
        v-for="(servicio,i) in listaServicioTaller"
        :key="i"
        clickable
        v-ripple
        style="margin: 10px 16px;"
      >
        <q-item-section>
          <q-item-label>{{servicio.servicioTaller.nombre}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox
              color="black"
							:val="servicio.servicioTaller.id"
							v-model="checkedSolicitados"
						/>
            <q-checkbox
              color="black"
							:val="servicio.servicioTaller.id"
							v-model="checkedSolicitados"
						/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
  export default {
    props: ['servicio', 'listaServicioTaller', 'checkedSolicitados'],
    data() {
      return {};
    }
  };
</script>