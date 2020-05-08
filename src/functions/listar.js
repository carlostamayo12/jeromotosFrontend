const listar = {
    servicioTaller:(ctn, datos, textFind, numberPages, page)=>{
		//const ctn = 5;
		let lista = datos.filter(
			d => d.nombre.indexOf(textFind.toUpperCase()) > -1
		);
		if (numberPages < page) {
			page = 1;
		}
		return lista.slice((page - 1) * ctn, page * ctn);
		}
}

export default listar