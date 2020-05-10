const listar = {
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
	}
}

export default listar