(function() {
	// Select the element with the class 'no-js'
	var element = document.querySelector('.no-js');
  
	// Check if the element exists
	if (element) {
	  // Replace the 'no-js' class with 'js'
	  element.classList.replace('no-js', 'js');
	}
})();