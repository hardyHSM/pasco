(function() {
	let select = document.querySelectorAll(".select");

	for (let i = 0 ; i < select.length; i++) {
		select[i].addEventListener('click', function (e) {

		e.stopPropagation();


		let context = this;
		let selectOption = this.getElementsByClassName("selectOption")[0];


		selectOption.classList.toggle("selectToggle");

		document.onclick = function (e) {
            selectOption.classList.remove("selectToggle");
        }


		  for (let i = 0; i < selectOption.children.length ; i++) {
		    selectOption.children[i].addEventListener("click", function () {
		     	let selectTitle = selectOption.parentNode.querySelector('.select__title');
			    selectTitle.innerHTML = this.innerHTML;
			  });
			}
		});

	}

}());


