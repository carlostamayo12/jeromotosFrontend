<template>
  <div class="q-pa-md fila" style="max-width: 500px; margin-top:80px;">
    <q-toolbar class="bg-red text-white rounded-borders">
      <q-toolbar-title>Marcas</q-toolbar-title>
      <q-input dark dense standout v-model="textFind" input-class="text-left" class="q-ml-md text-uppercase">
        <template v-slot:append>
          <q-icon v-if="textFind === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
        </template>
      </q-input>
      <q-btn @click="addMarca" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
    </q-toolbar>

    <q-list bordered style="max-width:500px;height: 300px;">
      <q-item
        v-for="(dato,i) in listarMarcas"
        :key="i"
        clickable
        v-ripple
        style="margin: 10px 16px;"
      >
        <q-item-section avatar>
          <q-icon name="motorcycle" style="font-size:30px;" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{dato.nombre}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon @click.native="editMarca(dato)" name="edit" color="grey-9" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" @click.native="viewMarca(dato)" color="grey-9" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="flex fila q-mt-xl" style="max-width:500px;" v-if="listarMarcas.length > 0">
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
      <Add :dato="dato" @click="createMarca" />
    </q-dialog>

    <q-dialog v-model="dialogEdit">
      <Edit :dato="dato" @click="updateMarca" />
    </q-dialog>

    <q-dialog v-model="dialogView">
      <Ver :dato="dato" />
    </q-dialog>

    <q-dialog v-model="dialogError">
      <Error :error="error" />
    </q-dialog>

  </div>
</template>

<script>
  import { Dialog } from "quasar";
  import http from "../functions/http";
  import numberPages from "../functions/numberPages";
  import Add from "components/Dialogs/Marca/Add";
  import Edit from "components/Dialogs/Marca/Edit";
  import Ver from "components/Dialogs/Marca/Ver";
  import Error from "components/Dialogs/Error";

  export default {
    components: {
      Add,
      Edit,
      Ver,
      Error,
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
        datos: [],
        dato: {
          id: null,
          nombre: null
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
      listarMarcas: function() {
        const ctn = 5;
        let lista = this.datos.filter(
          d => d.nombre.indexOf(this.textFind.toUpperCase()) > -1
        );
        if (this.numberPages < this.page) {
          this.page = 1;
        }
        return lista.slice((this.page - 1) * ctn, this.page * ctn);
      },
      numberPages: function() {
        return numberPages.marcas(5, this.datos, this.textFind);
      }
    },
    methods: {
      addMarca() {
        this.dato = {
          id: 0,
          nombre: ""
        };
        this.dialogAdd = true;
      },
      createMarca(val, msg) {
        if (!val) {
          this.error = ''
          this.textFind = msg
          this.cargarDatos();
          this.dialogAdd = val
        } else {
          this.textFind = ''
          this.error = msg
          this.dialogError = val
        }
      },
      editMarca(dato) {
        this.dato = JSON.parse(JSON.stringify(dato));
        this.dialogEdit = true;
      },
      updateMarca(val, msg) {
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
      viewMarca(dato) {
        this.dato = dato;
        this.dialogView = true;
      },
      cargarDatos() {
        var ruta = "marca/findAll";
        http(
          ruta,
          null,
          response => {
            if(!response.data.error){
              this.datos = response.data.datos;
            }else{
              this.error = response.data.mensaje;
              this.dialogError = true;
            }
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