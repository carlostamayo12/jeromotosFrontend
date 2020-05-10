const mapping = {
	tablaInit: (data) => {
		return data.map(item => {
			return {
				id: 0,
				kilometraje: 0,
				tiempo: 0,
				estado: 0,
				tipo_motoId: 0,
				servicioId: item.id
			}
		})
	},
	tablaEdit:(data) => {
		return data.map(item => {
			item.kilometraje = {value: item.kilometraje , label: item.kilometraje}
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
	}
}

export default mapping