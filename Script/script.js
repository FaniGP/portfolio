document.addEventListener("DOMContentLoaded", function() {
    const carouselInner = document.querySelector(".carousel-inner");
    const dots = Array.from(document.querySelectorAll(".carousel-dot"));

    let currentIndex = 0;
    const images = Array.from(carouselInner.querySelectorAll("img"));

    let startPosX = 0;
    let endPosX = 0;

    function showImage(index) {
        if (index < 0 || index >= images.length) {
            return;
        }

        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function() {
            showImage(index);
        });
    });

    carouselInner.addEventListener("touchstart", function(e) {
        startPosX = e.touches[0].clientX;
    });

    carouselInner.addEventListener("touchend", function(e) {
        endPosX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diffX = endPosX - startPosX;

        if (diffX > threshold) {
            showImage(currentIndex - 1);
        } else if (diffX < -threshold) {
            showImage(currentIndex + 1);
        }
    }

    // Mostrar la primera imagen al cargar la página
    showImage(0);
});