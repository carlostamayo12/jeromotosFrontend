const listar = {
	ordenSalidaEnvio: (km_promedio, listaJoin, Ordenes, chekedRealizados, fechaSalida) => {
		var listaOrdenes = (Ordenes.filter(o => o.estado === 'Finalizado'))
		var envio = {}
		if(listaOrdenes.length === 0){
			var lj = listaJoin.filter(l => l.tiempo > 0 )
			if(lj.length === 0){
				console.log('lj === 0')
			}else{
				lj.map(l =>{

				})
			}
		} else if (listaOrdenes.length === 1){

		}
		else{
			
		
		
		}
		
		return envio
	},
	kilometraje: () => {
		var obj = [];
		for (let i = 0; i <= 20; i++) {
			obj.push({ value: i*1000, label: (i * 1000).toString() });
		}
		return obj;
	},
	tiempo: () => {
		var obj = [];
		for (let i = 0; i <= 24; i++) {
			obj.push({ value: i, label: i.toString() });
		}
		return obj;
	},
	existTabla:(data) =>{
		if(data.length > 0){
			return true
		}
		if((data.filter(t => t.tiempo > 0 || t.kilometraje > 0)).length > 0 ){
			return true
		}
		return false
	}
}

export default listar