const mapping = {
  tablaInit:(data) =>{
    return data.map(item =>{
      return {
				id: 0,
				kilometraje: 0,
				tiempo: 0,
				estado: 0,
				tipo_motoId: 0,
				servicioId: item.id
			}
    })

    }
}

export default mapping