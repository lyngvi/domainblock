// https://developer.chrome.com/extensions/webRequest#implementation
// Google recommends we make it more efficient by setting URLs to just the list of URLs to block; however, this seems to allow
// URLs that are not blocked to load data from URLs that are blocked, which is self-defeating. So screw it.
var _g_UrlMatch = new RegExp('([^:]+):\/\/([^\/]+)');
var _g_DomainMatches = [
	'taboola.com'
];

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var retu = { };
		var matched = false;
		var breakdown = _g_UrlMatch.exec(details.url);
		var domain = RegExp.$2;
		for (var k = 0; k < _g_DomainMatches.length; ++k) {
			var ind = domain.indexOf(_g_DomainMatches[k]);
			if (ind == 0 || domain.substring(ind - 1, ind) == '.') {
				matched = true;
			}
		}
		if (matched) {
			console.log("URL " + details.url + " matched filter, blocked.");
			retu.cancel = true;
		}
		return retu;
	},
	{ "urls": ["<all_urls>"] },
	["blocking"]
);