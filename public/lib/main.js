let underlines = document.querySelectorAll(".navigation_underline");
function ul(index) {
	for (var i = 0; i < underlines.length; i++) {
		underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
	}
}

let apivariable = "categories";
//
function drawItems() {
  fetch(`https://competa-api.dev.competa.com/api/${apivariable}`)
  .then(result => {
    // invalid
    if (result.status !== 200) {

    }
    // If valid
    return result.json();
  }).then(result => {

    console.log(result);
  });
};

drawItems();