function animateStatistic(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error("Element with ID not found:", id);
        return;
    }

    const from = parseInt(element.getAttribute("data-statistic-from"), 10);
    const to = parseInt(element.getAttribute("data-statistic-to"), 10);
    const step = parseInt(element.getAttribute("data-statistic-step"), 10) || 1;
    const duration = parseInt(element.getAttribute("data-statistic-duration"), 10) || 1000;

    let currentValue = from;
    const increment = () => {
        if (currentValue + step <= to) {
            currentValue += step;
        } else {
            currentValue = to;
        }
        element.textContent = currentValue;
    };

    const interval = duration / Math.abs((to - from) / step);
    const timer = setInterval(increment, interval);

    setTimeout(() => {
        clearInterval(timer);
        element.textContent = to;
    }, duration);
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-statistic-trigger-id]");
    elements.forEach(element => {
        const id = element.id;
        if (id) {
            // Set initial text content on page load
            element.textContent = element.getAttribute("data-statistic-from");

            const ancestorId = element.getAttribute("data-statistic-trigger-id");
            const ancestorElement = document.getElementById(ancestorId);
            if (ancestorElement) {
                const observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (mutation.attributeName === 'style') {
                            const computedStyles = window.getComputedStyle(ancestorElement);
                            const inview = computedStyles.getPropertyValue("--inview").trim();
                            if (inview === "1") {
                                animateStatistic(id);
                                observer.disconnect(); // Stop observing once triggered
                            }
                        }
                    });
                });

                observer.observe(ancestorElement, {attributes: true});
            } else {
                console.error("Ancestor element with ID not found:", ancestorId);
            }
        } else {
            console.error("Element ID missing:", element);
        }
    });
});