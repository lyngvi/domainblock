// <!--

window.addEventListener("load", function(ev) {
	var domainList = document.getElementById("domainList");
	var status = document.getElementById("status");
	document.getElementById("save").addEventListener("click", function(ev) {
		var out = [];
		var newList = domainList.value.split(',');
		for (var k = 0; k < newList.length; ++k) {
			var domain = newList[k].trim();
			if (domain == "")
				continue;
			out.push(domain);
		}
		// Save it
		chrome.storage.sync.set({
				version: 1,
				domainList: out,
			},
			function() { // callback
				status.textContent = 'Options saved.';
				setTimeout(function() { status.textContent = ''; }, 750);
			}
		);
	});
	chrome.storage.sync.get({
			version: 1,
			domainList: [],
		}, function(config) {
			var s = '';
			for (var k = 0; k < config.domainList.length; ++k)
				{ s += ', ' + config.domainList[k]; }
			domainList.value = s.substring(s.length < 2 ? 0 : 2, s.length);
			status.textContent = 'Options loaded.';
			setTimeout(function() { status.textContent = ''; }, 750);
		}
	);
}, false);

// -->