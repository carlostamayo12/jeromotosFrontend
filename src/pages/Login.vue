
<template>
  <div class="box">
    <h2>Login</h2>
    <!--<img
      alt="Quasar logo"
      src="statics/bg2.jpg"   
    >-->
    <form>
      <div class="inputBox">
        <input type="text" autocomplete="on" v-model="user" required />
        <label>UserName</label>
      </div>
      <div class="inputBox">
        <input type="password" autocomplete="on" v-model="pwd" placeholder required />
        <label>password</label>
      </div>
      <div class="groupBtn">
        <input type="submit" @click="login()" value="Ingresar" />
        <p style="margin-top: 30px;">
          <a style="cursor: pointer;" @click="recuperarPwd">¿No recuerda su contraseña?</a>
        </p>
        <p style="margin: 0px;">
          <a style="cursor: pointer;" @click="cambiarPwd">Cambiar contraseña</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
  import { LocalStorage, SessionStorage } from 'quasar'
  import http from '../functions/http'
  import Error from '../components/Screens/Error'
  
  export default {
    components:{
      Error
    },
    data() {
      return {
        error:'',
        dialogError: false,
        user: "",
        pwd: ""
      };
    },
    beforeMount() {
      this.$nextTick(() => {
        LocalStorage.clear();
        SessionStorage.clear();
      });
    },
    methods: {
      login() {
        var ruta = 'persona/findOne'
        var datos = {id: 6}
        http(ruta, datos, response => {
          if(!response.data.error){
            SessionStorage.set("administrador",response.data.datos)
            this.$router.push("/main");
          }else{
            this.error = response.data.mensaje
            this.dialogError = true
          }
        }, e =>{
            this.error = e.message
            this.dialogError = true
        })
      },
      recuperarPwd() {},
      cambiarPwd() {}
    }
  };
</script>

<style scoped>
  a {
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 1px;
  }
  .body {
    
    background-image: url("../statics/bg2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right;
  }

  .my-card {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    max-height: 100%;
  }

  .box {
    position: absolute;
    top: 0;
    /*left: 50%;*/
    right: 0;
    /*transform: translate(-50%, -50%);*/
    width: 400px;
    height: 100%;
    padding: 40px;
    background: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    /*border-radius: 10px;*/
  }

  .box h2 {
    margin: 60px 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
  }

  .box .inputBox {
    position: relative;
  }

  .box .inputBox input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .box .inputBox label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    letter-spacing: 1px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .box .inputBox input:focus ~ label,
  .box .inputBox input:valid ~ label {
    top: -18px;
    left: 0;
    /*color: #03a9f4;*/
    font-size: 12px;
    /*border-bottom: 1px solid #CC0001;*/
  }

  .box input[type="submit"] {
    background: transparent;
    border: none;
    outline: none;
    letter-spacing: 1px;
    color: #fff;
    font-size: 16px;
    background: #cc0001;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    width: 50%;
  }

  .box .groupBtn {
    text-align: center;
    color: #fff;
  }

  a:hover {
    font-weight: 300;
  }
</style>
