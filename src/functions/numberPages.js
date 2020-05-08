import rol from './rol'

const numberPages = {
	marcas: (ctn, datos, textFind) => {
		let size = datos.filter(
			d => d.nombre.indexOf(textFind.toUpperCase()) > -1
		).length;
		let n = parseInt(size) % ctn == 0 ? 0 : 1;
		return Math.trunc(size / ctn) + n;
	},
	servicioTaller: (ctn, datos, textFind) => {
		let size = datos.filter(
			d => d.nombre.indexOf(textFind.toUpperCase()) > -1
		).length;
		let n = parseInt(size) % ctn == 0 ? 0 : 1;
		return Math.trunc(size / ctn) + n;
	},
	tipoMoto: (ctn, datos, textFind) => {
		let size = datos.filter(
			d =>
				d.referencia.indexOf(textFind.toUpperCase()) > -1 ||
				d.marca.nombre.indexOf(textFind.toUpperCase()) > -1
		).length;
		let n = parseInt(size) % ctn == 0 ? 0 : 1;
		return Math.trunc(size / ctn) + n;
	},
	moto: (ctn, datos, textFind) => {
		let size = datos.filter(
			d =>
				d.placa.indexOf(textFind.toUpperCase()) > -1 ||
				d.tipo_moto.referencia.indexOf(textFind.toUpperCase()) > -1 ||
				d.tipo_moto.marca.nombre.indexOf(textFind.toUpperCase()) >
				-1 ||
				d.persona.nombre.indexOf(textFind.toUpperCase()) > -1
		).length;
		let n = parseInt(size) % ctn == 0 ? 0 : 1;
		return Math.trunc(size / ctn) + n;
	},
	persona: (ctn, datos, textFind, selectRol) => {
		let lista = datos.filter(
			d =>d.nombre.indexOf(textFind.toUpperCase()) > -1 ||
					d.identificacion.indexOf(textFind.toUpperCase()) > -1 ||
					d.telefono.indexOf(textFind.toUpperCase()) > -1
		);
		lista = rol.filterByRol(lista, selectRol.value);
		let size = lista.length;
		let n = parseInt(size) % ctn == 0 ? 0 : 1;
		return Math.trunc(size / ctn) + n;
	}
}

export default numberPages