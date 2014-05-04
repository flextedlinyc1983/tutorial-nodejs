var route = function (handle, pathname) {
	console.log("A punto de rutear una petición para " + pathname);
	
	if (typeof handle[pathname] !== 'function') {
		console.log("No se encontro manipulador para " + pathname);
		return "404 No Encontrado";		
	} 

	return handle[pathname]();
}

exports.route = route;