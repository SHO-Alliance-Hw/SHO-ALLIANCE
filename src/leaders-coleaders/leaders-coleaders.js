let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 25000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 25000)
}
function setPositionThumbnail() {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    if (thumbnailActive) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}


// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})
document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".navbar-toggler");
    const menu = document.querySelector(".menu");

    // Ensure menu is hidden initially
    if (window.innerWidth <= 768) {
        menu.style.display = "none";
    }

    toggler.addEventListener("click", function (event) {
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
        event.stopPropagation(); // Prevent click from propagating to document
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !toggler.contains(event.target)) {
            menu.style.display = "none";
        }
    });

    // Ensure menu resets on window resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            menu.style.display = "flex"; // Show menu for larger screens
        } else {
            menu.style.display = "none"; // Hide menu on smaller screens
        }
    });
});


