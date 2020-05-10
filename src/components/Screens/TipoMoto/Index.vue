<template>
  <div class="q-pa-md fila" style="max-width: 500px; margin-top:80px;">
    <q-toolbar class="bg-red text-white rounded-borders">
      <q-toolbar-title>Tipo Moto</q-toolbar-title>
      <q-input dark dense standout v-model="textFind" input-class="text-left" class="q-ml-md text-uppercase">
        <template v-slot:append>
          <q-icon v-if="textFind === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
        </template>
      </q-input>
      <q-btn @click="addTipo" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
    </q-toolbar>

    <q-list bordered style="max-width:500px;height: 300px;">
      <q-item
        v-for="(dato,i) in listarTipoMotos"
        :key="i"
        clickable
        v-ripple
        style="margin: 10px 16px;"
      >
        <q-item-section avatar>
          <q-icon name="motorcycle" style="font-size:30px;" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{dato.referencia}}</q-item-label>
          <q-item-label caption>{{dato.marca.nombre}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon @click.native="editTipo(dato)" name="edit" color="grey-9" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" @click.native="viewMarca(dato)" color="grey-9" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="build" @click.native="editTabla(dato)" color="grey-9" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="flex fila q-mt-xl" style="max-width:500px;" v-if="listarTipoMotos.length > 0">
      <q-pagination
        boundary-links
        style="margin:auto"
        v-model="page"
        :min="minPages"
        :max="numberPages"
        :max-pages="3"
        color="black"
      />
    </div>

    <q-dialog v-model="dialogAdd">
      <Add :dato="dato" @click="createTipo" />
    </q-dialog>

    <q-dialog v-model="dialogEdit">
      <Edit :dato="dato" @click="updateTipo" />
    </q-dialog>

    <q-dialog v-model="dialogView">
      <Ver :dato="dato" />
    </q-dialog>

    <q-dialog v-model="dialogTabla" persistent>
      <TablaEdit :tipo="dato" />
    </q-dialog>
    
    <q-dialog v-model="dialogError">
      <Error :error="error" />
    </q-dialog>

    <q-dialog v-model="dialogSaved">
      <Saved />
    </q-dialog>

  </div>
</template>

<script>
  import { Dialog } from "quasar";
  import http from "../../../functions/http";
  import numberPages from "../../../functions/numberPages";
	
	import Add from "./Add";
  import Edit from "./Edit";
  import Ver from "./Ver";
  import TablaEdit from "../TablaMantenimiento/Edit";
  import Error from "../Error";
  import Saved from "../Saved";

  export default {
    components: {
      Add,
      Edit,
      Ver,
      TablaEdit,
      Error,
      Saved,
      Dialog
    },
    data() {
      return {
        error: "",
        textFind: "",
        dialogAdd: false,
        dialogEdit: false,
				dialogView: false,
        dialogError: false,
        dialogTabla: false,
        dialogSaved: false,
        datos: [],
        dato: {
          id: null,
          referencia: null,
          marcaId: null,
          marca: {
            id: null,
            nombre: null
          }
        },
        page: 1,
        minPages: 1,
        max: 5
      };
    },
    beforeMount() {
      this.cargarDatos();
    },
    computed: {
      listarTipoMotos: function() {
        const ctn = 5;
        let lista = this.datos.filter(
          d =>
            d.referencia.indexOf(this.textFind.toUpperCase()) > -1 ||
            d.marca.nombre.indexOf(this.textFind.toUpperCase()) > -1
        );
        if (this.numberPages < this.page) {
          this.page = 1;
        }
        return lista.slice((this.page - 1) * ctn, this.page * ctn);
      },
      numberPages: function() {
        return numberPages.tipoMoto(5, this.datos, this.textFind);
      }
    },
    methods: {
      createTabla(data) {
        var ruta = "tablaMantenimiento/create";
        var datos = {};
        http(ruta, datos);
      },
      addTipo() {
        this.dato = {
          id: 0,
          referencia: "",
          marcaId: null,
          marca: {
            id: null,
            nombre: null
          }
        };
        this.dialogAdd = true;
      },
      createTipo(val, msg) {
        if (!val) {
          this.error = "";
          this.textFind = msg;
          this.cargarDatos();
          this.dialogAdd = val;
        } else {
          this.textFind = "";
          this.error = msg;
        }
      },
      editTipo(dato) {
        this.dato = JSON.parse(JSON.stringify(dato));
        this.dialogEdit = true;
      },
      updateTipo(val, msg) {
        if (!val) {
          this.error = "";
          this.textFind = msg;
          this.cargarDatos();
          this.dialogEdit = val;
        } else {
          this.textFind = "";
          this.error = msg;
          this.dialogError = true;
        }
      },
      viewTipo(dato) {
        this.dato = dato;
        this.dialogView = true;
      },
      editTabla(dato){
        this.dato = JSON.parse(JSON.stringify(dato));
        this.dialogTabla = true;
      },
      cargarDatos() {
        var ruta = "tipoMoto/findAll";
        http(
          ruta,
          null,
          response => {
            this.datos = response.data.datos;
          },
          e => {
            this.error = e.message;
            this.dialogError = true;
          }
        );
      }
    }
  };
</script>

<style scoped>
  .fila {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>