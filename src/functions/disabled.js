const disabled = {
	marca: (dato) => {
		if (dato.nombre != null) {
			if (JSON.stringify(dato.nombre.toString().trim().length) == 0) {
				return true;
			}
		} else {
			return true;
		}
		return false;
	},
	servicioTaller: (dato) => {
		if (dato.nombre != null) {
			if (JSON.stringify(dato.nombre.toString().trim().length) == 0) {
				return true;
			}
		} else {
			return true;
		}
		return false;
	},
	tipoMoto: (dato, selectMarca) => {
		if (dato.referencia != null) {
			if (JSON.stringify(dato.referencia.toString().trim().length) == 0 || selectMarca == null) {
				return true;
			}
		} else {
			if (selectMarca == null) {
				return true;
			}
		}
		return false;
	},
	moto: (dato, selectMarca, selectTipo , persona) => {
		let placa = JSON.stringify(dato.placa.toString().trim().length > 0)
		let color = JSON.stringify(dato.color.toString().trim().length > 0)
		
		if(placa && color && selectMarca.value > 0 && selectTipo.value > 0 && persona.id > 0){
			return false
		}else{
			return true
		}
	}


}
export default disabled