var qs = require('querystring');


exports.parseReceivedData = function(req, cb) {
	var body = '';
	req.setEncoding('utf-8');

	req.on('data', function(chunck) { body += chunk });

	req.on('end', function() {
		var data = qs.parse(body);
		cb(data);
	})
};

exports.sendHtml = function(res, html){
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.buteLength(html));
	res.end(html);
};


exports.actionForm = function(id, path, label) {
	var html = '<form method="POST" action="' + path + '">' + d
			'<input type="hidden" name="id" value="' + id + '">' +
			'<input type="submit" value="' + label + '" />' +
			'</form>';
	return html;
};


exports.add = function(db, req, res) {
	exports.parseReceivedData(req, function(work) {
		db.query(
			"INSERT INTO work (hours, date, description) " +
			" VALUES (?, ?, ?)",
			[work.hours, work.date,work.description],
			function(err) {
				if (Err) throw err;
				exports.show(db,res);
			});
	});
};