document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.querySelector(".categories");

    const categoryItems = document.querySelectorAll(".category-item");
    const categories = document.querySelectorAll(".service-category");
    const images = document.querySelectorAll(".service-image");

    let currentCategory = document.querySelector(".category-item.active")?.dataset.category || "haircuts";
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    const updateForScreenSize = () => {
        if (mobileQuery.matches) {
            categories.forEach(section => (section.classList.add("active")));
        } else {
            categories.forEach(section => {
                section.classList.toggle("active", section.id === currentCategory);
            });
            images.forEach(img => {
                img.classList.toggle("active", img.id === `image-${currentCategory}`);
            });
        }
    };

    updateForScreenSize();
    mobileQuery.addEventListener('change', updateForScreenSize);

    categoryList.addEventListener("click", function (e) {
        if (e.target.classList.contains("category-item")) {
            categoryItems.forEach(item => {
                item.classList.remove("active");
            });
            e.target.classList.add("active");

            const selectedCategory = e.target.dataset.category;

            categories.forEach(section => {
                section.classList.remove("active");
            });

            const targetSection = document.getElementById(selectedCategory);
            if (targetSection) targetSection.classList.add("active");

            images.forEach(img => img.classList.remove("active"));
            const targetImage = document.getElementById("image-" + selectedCategory);
            if (targetImage) targetImage.classList.add("active");
        }
    });
});