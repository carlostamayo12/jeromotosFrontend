<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
        </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage, SessionStorage } from 'quasar'
export default {
  beforeMount(){
    this.$nextTick(()=>{
      if(SessionStorage.isEmpty()){
        this.$router.push('/')
      }else{
        //this.administrador = SessionStorage.get.item('administrador').nombre
      }
    })
}}
</script>