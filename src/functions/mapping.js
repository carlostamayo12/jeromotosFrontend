const mapping = {
	tablaInit: (data, tipo_motoId) => {
		return data.map(item => {
			return {
				id: 0,
				kilometraje: 0,
				tiempo: 0,
				estado: 0,
				tipo_motoId: tipo_motoId,
				servicioId: item.id
			}
		})
	},
	tablaEdit: (data) => {
		return data.map(item => {
			item.kilometraje = { value: item.kilometraje, label: item.kilometraje }
			item.tiempo = { value: item.tiempo, label: item.tiempo }
			return item
		})
	},
	tablaEnvio: (data, adminId
	) => {
		return data.map(item => {
			return {
				id: item.id,
				kilometraje: item.kilometraje.value,
				tiempo: item.tiempo.value,
				estado: (item.kilometraje.value > 0 || item.tiempo.value > 0) ? 1 : 0,
				servicioId: item.servicioId,
				tipo_motoId: item.tipo_motoId,
				adminId: adminId
			}
		})
	},
	tablaContador: (data, motoId) => {
		return data.map(item => {
			return {
				id: 0,
				servicioId: item.servicioTaller.id,
				motoId: motoId
			}
		})
	},
	listaServiciosSolicitados: (data) => {
		return data.map(item => {
			return {
				id: 0,
				solicitados: 0,
				realizados: 0,
				servicioId: item.servicioId,
				ordenId: 0
			}
		})
	},
	serviciosSolicitados: (data, checkSolicitados, ordenId) => {
		return data.map(item => {
			return {
				id: 0,
				solicitados: (checkSolicitados.filter(s => s === item.servicioId)).length > 0 ? 1 : 0,				
				realizados: 0,
				servicioId: item.servicioId,
				ordenId: ordenId
			}
		})
	},
	serviciosRealizados: (data, checkRealizados) => {
		return data.map(item => {
			return {
				id: item.id,
				solicitados: item.solicitados,
				realizados: (checkRealizados.filter(s => s === item.servicioId)).length > 0 ? 1 : 0,
				servicioId: item.servicioId,
				ordenId: item.ordenId
			}
		})
	},
	datoMotoOrdenNuevo: (dato) =>{
		return {
			id: 0,
			placa: null,
			color: null,
			km_promedio: "0.00",
			tipo_motoId: null,
			propietarioId: null,
			tipo_moto: {
				referencia: null,
				marca: {
					nombre: null
				}
			},
			persona: {
				nombre: null,
				telefono: null,
				direccion: null
			}
		}
	},
	datoOrdenNew: (orden) => {
		return {
			id: 0,
			fechaIngreso: 0,
			fechaEntregaEstimada: 0,
			fechaSalida: 0,
			kilometraje: '',
			kmTotal: 0,
			solicitudes: '',
			observaciones: '',
			costoServicio: 0,
			costoRepuestos: 0,
			estado:'Iniciado',
			motoId: 0,
			tecnicoId: 0,
			adminId: 1
		}
	},
	ordenSelect:(data) =>{
		return data.map(item => {
			return {
				value: item.id,
				label: "Orden: 000" + item.id
			}
		})
	},
	toCheckedSolicitados: (data) =>{
		var chk = []
		data.map(item =>{
			if(item.solicitados){
				chk.push(item.servicioId)
			}
		})
		return chk
	}
}

export default mapping