const rol = {

	filterByRol: (data, rol) => {
		if (rol == 1) {
			return data.filter(d => d.rol == 1 || d.rol == 3);
		} else if (rol == 2) {
			return data.filter(d => d.rol == 2 || d.rol == 3);
		} else if (rol == 3) {
			return data.filter(d => d.rol >= 0);
		} else {
			return data.filter(d => d.rol >= 0);
		}
	}
}

export default rol