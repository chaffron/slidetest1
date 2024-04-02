function animateBar(id) {
    const bar = document.getElementById(id);
    const originalHeight = bar.dataset.originalHeight;
    if (!bar || !originalHeight) {
        console.error("Bar with ID not found:", id);
        return;
    }

    bar.style.setProperty('--chartBarHeight', originalHeight);

}

document.addEventListener("DOMContentLoaded", function () {
    const bars = document.querySelectorAll('.sl-chart__bar');    
    bars.forEach(bar => {
        
        const id = bar.id;

        const originalHeight = bar.style.getPropertyValue('--chartBarHeight');
        bar.dataset.originalHeight = originalHeight;
        bar.style.setProperty('--chartBarHeight', '0');

        const ancestorId = bar.getAttribute("data-chart-bar-trigger-id");
        const ancestorElement = document.getElementById(ancestorId);
        if (ancestorElement) {
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === 'style') {
                        const computedStyles = window.getComputedStyle(ancestorElement);
                        const inview = computedStyles.getPropertyValue("--inview").trim();
                        if (inview === "1") {
                            animateBar(id);
                            observer.disconnect(); // Stop observing once triggered
                        }
                    }
                });
            });

            observer.observe(ancestorElement, {attributes: true});
        } else {
            console.error("Ancestor element with ID not found:", ancestorId);
        }

    });

});