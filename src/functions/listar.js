
function ultimoServicio(listaOrdenes, servicioId) {
	var orden = null
	listaOrdenes.forEach(lo => {
		lo.servicios.forEach(servicios => {
			if (servicios.realizados && servicios.servicioId == servicioId) {
				orden = lo
			}
		})
	})
	return orden
}

function CallcularkmPromedio(listaOrdenes, orden) {
	var promedio = 0
	var dias = 0
	var km = 0
	var kmPromedio = []

	//console.log(listaOrdenes.length)
	for (let i = listaOrdenes.length - 1; i > 0; i--) {
		dias = listaOrdenes[i - 1].fechaSalida - listaOrdenes[i].fechaSalida
		km = listaOrdenes[i - 1].kilometraje - listaOrdenes[i].kilometraje
		//promedio = Number.parseFloat(km/dias).toFixed(2)
		promedio = km / dias
		kmPromedio.push(km / dias)
	}
	var ajuste = (orden.kilometraje - listaOrdenes[0].kilometraje) / (orden.fechaSalida - listaOrdenes[0].fechaSalida)
	//console.log(ajuste)
	kmPromedio.push(ajuste)
	var sumaPromedio = 0
	for (let i = 0; i < kmPromedio.length; i++) {
		sumaPromedio += kmPromedio[i]
	}
	//console.log(sumaPromedio)
	return sumaPromedio / (kmPromedio.length)
}



const listar = {
	ordenSalidaEnvio: (orden, listaJoin, Ordenes, chekedRealizados, fechaSalida) => {
		var listaOrdenes = (Ordenes.filter(o => o.estado === 'Finalizado'))
		var envio = []
		var contador = []
		var kmPromedioEnvio = 0

		// Numero de Ordenes = 0
		if (listaOrdenes.length === 0) {

			if (chekedRealizados.length > 0) {
				listaJoin.forEach(lj => {
					if (chekedRealizados.includes(lj.servicioId)) {
						if (lj.tiempo > 0 && lj.kilometraje == 0) {
							var contadorTime = parseFloat(listaJoin.tiempo * 30) + parseFloat(fechaSalida)
							contador.push({ id: lj.id, fecha_km: lj.fecha_km, fecha_time: contadorTime, servicioId: lj.servicioId, motoId: orden.motoId })
						}
					}
				})
			}
		}
		//Numero de ordenes = 1
		else if (listaOrdenes.length === 1) {

			let km = (orden.kilometraje - listaOrdenes[0].kilometraje)
			let dias = (orden.fechaSalida - listaOrdenes[0].fechaSalida)
			var promedio = (km / dias)
			kmPromedioEnvio = promedio

			listaJoin.forEach(lj => {
				if (chekedRealizados.includes(lj.servicioId)) {
					if (lj.kilometraje > 0) {
						var contadorKm = parseFloat(lj.kilometraje / promedio) + parseFloat(fechaSalida)
						contador.push({ id: lj.id, fecha_km: contadorKm, fecha_time: lj.fecha_time, servicioId: lj.servicioId, motoId: orden.motoId })
					}
					else if (lj.kilometraje == 0 && lj.tiempo > 0) {
						var contadorTime = parseFloat(listaJoin.tiempo * 30) + parseFloat(fechaSalida)
						contador.push({ id: lj.id, fecha_km: lj.fecha_km, fecha_time: contadorTime, servicioId: lj.servicioId, motoId: orden.motoId })
					}
				} else {
					var realizoServicio = listaOrdenes[0].servicios.filter(s => s.realizados == 1 && s.servicioId == lj.servicioId)
					if (realizoServicio.length > 0) {
						if (lj.kilometraje > 0 && lj.tiempo == 0) {
							var kmRecorrido = (fechaSalida - listaOrdenes[0].fechaSalida) * promedio
							var contadorKm = parseFloat((lj.kilometraje - kmRecorrido) / promedio) + parseFloat(fechaSalida)
							contador.push({ id: lj.id, fecha_km: contadorKm, fecha_time: 0, servicioId: lj.servicioId, motoId: orden.motoId })
						}
					}
				}
			})

		}
		//Numero de Ordenes mayor a 1
		else {
			var kmPromedioNew = CallcularkmPromedio(listaOrdenes, orden)
			kmPromedioEnvio = kmPromedioNew

			listaJoin.forEach(lj => {
				if (chekedRealizados.includes(lj.servicioId)) {
					if (lj.kilometraje > 0) {
						var contadorKm = parseFloat(lj.kilometraje / kmPromedioNew) + parseFloat(fechaSalida)
						contador.push({ id: lj.id, fecha_km: contadorKm, fecha_time: lj.fecha_time, servicioId: lj.servicioId, motoId: orden.motoId })
					}
					else if (lj.kilometraje == 0 && lj.tiempo > 0) {
						var contadorTime = parseFloat(listaJoin.tiempo * 30) + parseFloat(fechaSalida)
						contador.push({ id: lj.id, fecha_km: lj.fecha_km, fecha_time: contadorTime, servicioId: lj.servicioId, motoId: orden.motoId })
					}
				} else {
					var ultimaOrden = ultimoServicio(listaOrdenes, lj.servicioId)
					if (ultimaOrden !== null) {
						if (lj.kilometraje > 0 && lj.tiempo == 0) {
							var kmRecorrido = (fechaSalida - ultimaOrden.fechaSalida) * kmPromedioNew
							var contadorKm = parseFloat((lj.kilometraje - kmRecorrido) / kmPromedioNew) + parseFloat(fechaSalida)
							contador.push({ id: lj.id, fecha_km: contadorKm, fecha_time: 0, servicioId: lj.servicioId, motoId: orden.motoId })
						}
					} else {

					}
				}
			})
		}
		//envio.push(contador)
		//console.log(envio)
		envio = {envio: contador}
		console.log(envio)
		return envio
	},

	kilometraje: () => {
		var obj = [];
		for (let i = 0; i <= 20; i++) {
			obj.push({ value: i * 1000, label: (i * 1000).toString() });
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
	existTabla: (data) => {
		if (data.length > 0) {
			return true
		}
		if ((data.filter(t => t.tiempo > 0 || t.kilometraje > 0)).length > 0) {
			return true
		}
		return false
	}
}

export default listar