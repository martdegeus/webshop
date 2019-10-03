let underlines = document.querySelectorAll(".navigation_underline");
function ul(index) {
	for (var i = 0; i < underlines.length; i++) {
		underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
	}
}
