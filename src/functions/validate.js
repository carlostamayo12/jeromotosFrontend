const validate = {
	orden: (data) => {
		return data.map(orden => {
			return {
				label: (orden.id.toString()).padStart(6, "000000"),
				sublabel: orden.moto.placa + " ==> " + orden.moto.tipo_moto.referencia,
				value: orden.id
			}
		})
	},
}

export default validate