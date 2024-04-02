//
const bodyElement = document.body;
const bodyStyles = getComputedStyle(bodyElement);
let activeElement = '';
let activeElementColour = '';
// Find all elements with the class name 'section-slider'
const sectionSliders = document.querySelectorAll('.section-slider');

function initSectionSliders() {
	// Initialise, run once
	// Get the active element
	let activeElement = getActiveElement();

	if (!activeElement) {
		activeElement = sectionSliders[0].id;
	}

	// Use the active element to update the body background before we remove the defaults
	updateBackground(activeElement);

    // Iterate over each sectionSlider
    sectionSliders.forEach(function(element) {


        // Remove the element's background color and image
        element.style.backgroundColor = 'transparent';
        element.style.backgroundImage = 'none';

	});

}

function updateBackground(id) {

	if (id !== activeElement) {
		// console.log(id);
		const element = document.getElementById(id);

		// Get the background gradient colours from data attributes
		const bgColour = element.dataset.bgColour;
		console.log(bgColour);

		// If we have colours from this element...
		if (bgColour) {

			// Get the values for these variables
			const thisColour = bodyStyles.getPropertyValue(bgColour);

			// Set the background variables to these values
			bodyElement.style.backgroundColor = thisColour;

		}

		// Set the current section so we don't rerun this unnecessarily
		activeElement = id;
	}
}



// Call the function to update section slider colors when the page is loaded
setTimeout(window.addEventListener('load', initSectionSliders), 200);


// The active element is the section slider which occupies 60% or more of the viewport
function getActiveElement() {

	let currentActiveElement = '';

    // Iterate over each sectionSlider
    sectionSliders.forEach(function(element) {

		if (element.classList.contains('iv60')) {
			currentActiveElement = element.id;
		}
		
	})

	return currentActiveElement;

}


// Options for the mutation observer
const mutationConfig = { attributes: true, subtree: true };
let timeout;

// Debounced callback function to execute when mutations are observed
const debouncedMutationCallback = function(mutationsList, observer) {
    // Clear any existing timeout
    clearTimeout(timeout);
    
    // Set a new timeout to run the callback after a defined number of milliseconds
    timeout = setTimeout(() => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Check if iv60 class is added to a .section-slider element
                const targetElement = mutation.target;
                if (targetElement.classList.contains('section-slider') && targetElement.classList.contains('iv60')) {
                    const elementID = getActiveElement();
                    updateBackground(elementID);
					console.log(elementID);
                }
            }
        }
    }, 20);
};

// Configure the MutationObserver with the debounced callback function
const observer = new MutationObserver(debouncedMutationCallback);

// Start observing the target node with the configured mutations
observer.observe(bodyElement, mutationConfig);


// // Options for the observer (which mutations to observe)
// const mutationConfig = { attributes: true, subtree: true };

// // Callback function to execute when mutations are observed
// const mutationCallback = function(mutationsList, observer) {
//     for(const mutation of mutationsList) {
//         if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//             // Check if iv60 class is added to a .section-slider element
//             const targetElement = mutation.target;
//             if (targetElement.classList.contains('section-slider') && targetElement.classList.contains('iv60')) {
// 				const elementID = getActiveElement();
// 				updateBackground(elementID);
// 				console.log(elementID);
//             }
//         }
//     }
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(mutationCallback);

// // Start observing the parent node for configured mutations
// observer.observe(bodyElement, mutationConfig);

// // Later, you can disconnect the observer
// // observer.disconnect();
