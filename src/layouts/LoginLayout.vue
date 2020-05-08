<template>
	<q-layout class="flex-center body">
		<div class="box">
			<h2>Login</h2>
			<form>
				<div class="inputBox">
					<input type="text"  autocomplete="on" v-model="user" required />
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

		<q-dialog v-model="bar2" persistent transition-show="flip-down" transition-hide="flip-up">
			<q-card class="bg-primary text-white">
				<q-bar>
					<q-icon name="network_wifi" />
					<q-icon name="network_cell" />
					<q-icon name="battery_full" />
					<div>9:34</div>

					<q-space />

					<q-btn dense flat icon="close" v-close-popup>
						<q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
					</q-btn>
				</q-bar>

				<q-card-section>
					<div class="text-h6">Alert</div>
				</q-card-section>

				<q-card-section
					class="q-pt-none"
				>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>
			</q-card>
		</q-dialog>

		<q-dialog v-model="prompt" persistent>
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">Your address</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-input dense v-model="email" autofocus @keyup.enter="prompt = false" />
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-input dense v-model="pwd" autofocus @keyup.enter="prompt = false" />
				</q-card-section>

				<q-card-actions align="right" class="text-primary">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Add address" @click="prompt = false" />
				</q-card-actions>
			</q-card>
		</q-dialog>
	
	</q-layout>
</template>

<script>
	//import http from "../funciones/http";
	//import { LocalStorage, SessionStorage } from 'quasar'
	//import { firebaseAuth, firebaseDB } from '../boot/firebase'


	export default {
		name: "LayoutLogin",

		data() {
			return {
				email: '',
				pwd: "123456",
				user:null,
				bar2: false,
				text: '',
				alert: false,
				confirm: false,
				prompt: false,
				address: ''
			};
		},
		beforeMount(){
    /*this.$nextTick(() => {
			 this.text = "nexti"
			 //this.$router.push("app/main");
			 //LocalStorage.clear()
       //SessionStorage.clear()
     })*/
    },
		methods: {
			login(){
				this.$router.push("/app/main");
			},
			cambiarPwd(){},
			recuperarPwd(){}
			
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
		background: url("/statics/bg2.jpg");
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
