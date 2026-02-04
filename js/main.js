/* Start of Global State */
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let filteredProducts = []; 

/* Start of Initialization Logic */
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");
    
    const path = window.location.pathname;
    const page = path.split("/").pop().split(".")[0] || "index"; 

    let displayLimit = 8;
    filteredProducts = (page === "index" || page === "") 
        ? products 
        : products.filter(p => p.category === page);

    // Single source of truth for rendering
    window.renderProducts = (dataToRender = filteredProducts, isSearch = false) => {
        if(!productContainer) return;
        
        productContainer.innerHTML = "";
        
        // Search Feedback Logic
        let feedbackArea = document.getElementById('search-feedback');
        if (isSearch) {
            if (!feedbackArea) {
                feedbackArea = document.createElement('div');
                feedbackArea.id = 'search-feedback';
                feedbackArea.className = 'search-feedback';
                productContainer.before(feedbackArea);
            }
            const term = document.getElementById('search-input').value;
            feedbackArea.innerText = term ? `Showing ${dataToRender.length} results for "${term}"` : "";
        } else if (feedbackArea) {
            feedbackArea.innerText = "";
        }

        // Empty State Handler
        if (dataToRender.length === 0) {
            productContainer.innerHTML = `
                <div class="no-results-container">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No products found!</h3>
                    <p>Try searching for something else.</p>
                </div>`;
            if (loadMoreWrap) loadMoreWrap.style.display = "none";
            return;
        }

        const finalData = isSearch ? dataToRender : dataToRender.slice(0, displayLimit);
        
        finalData.forEach(product => {
            const isFav = wishlist.some(item => item.id === product.id);
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
                    <div class="product-actions">
                        <button class="action-btn wishlist-btn" data-id="${product.id}" title="Wishlist">
                           <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                        <button class="action-btn quick-view-btn" data-id="${product.id}" title="Quick View">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-cat">${product.catName}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">৳ ${product.price}</span>
                        ${product.oldPrice ? `<span class="old-price">৳ ${product.oldPrice}</span>` : ""}
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <span>Add to Cart</span> 
                        <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                </div>
            `;
            productContainer.appendChild(card);
        });

        if (loadMoreWrap) {
            loadMoreWrap.style.display = (!isSearch && dataToRender.length > displayLimit) ? "block" : "none";
        }
    };

    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            displayLimit += 4;
            renderProducts();
        };
    }

    renderProducts();
    updateWishlistBadge();
    injectFlashSaleData();
});

/* Start of Modal Logics */
const openQuickView = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Reset quantity to 1
    const qtyInput = document.querySelector("#quick-view-modal input");
    if(qtyInput) qtyInput.value = 1;

    const qvSizeContainer = document.getElementById("qv-sizes-container");
    const qvSizeWrapper = qvSizeContainer ? qvSizeContainer.closest(".size-wrapper") : null;

    if(qvSizeContainer) {
        if(product.sizes && product.sizes.length > 0) {
            if(qvSizeWrapper) qvSizeWrapper.classList.remove("hidden");
            qvSizeContainer.innerHTML = product.sizes.map((size, index) => 
                `<button class="size-btn ${index === 0 ? 'active' : ''}">${size}</button>`
            ).join("");
        } else {
            if(qvSizeWrapper) qvSizeWrapper.classList.add("hidden");
        }
    }

    document.getElementById("qv-img").src = product.img;
    document.getElementById("qv-title").innerText = product.name;
    document.getElementById("qv-badge").innerText = product.badge || "Premium";
    document.getElementById("qv-price").innerText = `৳ ${product.price}`;
    document.getElementById("qv-old-price").innerText = product.oldPrice ? `৳ ${product.oldPrice}` : "";
    document.getElementById("quick-view-modal").classList.add("active");
};

/* Wishlist Functions */
const updateWishlistBadge = () => {
    const badge = document.getElementById('wishlist-count');
    if (badge) badge.innerText = wishlist.length;
};

const renderWishlistItems = () => {
    const container = document.getElementById('wishlist-items-container');
    const emptyBox = document.querySelector('.empty-wishlist-box');
    if (!container) return;

    if (wishlist.length === 0) {
        if(emptyBox) emptyBox.style.display = 'block';
        container.innerHTML = '';
    } else {
        if(emptyBox) emptyBox.style.display = 'none';
        container.innerHTML = wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <h4>${item.name}</h4>
                    <p>৳ ${item.price}</p>
                    <button class="wishlist-add-cart" data-id="${item.id}">Add to Cart</button>
                </div>
                <button class="remove-wishlist" data-id="${item.id}">&times;</button>
            </div>
        `).join('');
    }
};

/* Flash Sale Engine */
const injectFlashSaleData = () => {
    const mainImg = document.getElementById("fs-main-img");
    const modalImg = document.getElementById("modal-fs-img");
    const title = document.getElementById("modal-fs-title");
    
    if(mainImg) mainImg.src = flashSaleData.image;
    if(modalImg) modalImg.src = flashSaleData.image;
    
    if(title) {
        title.innerText = flashSaleData.name;
        document.getElementById("modal-fs-badge").innerText = flashSaleData.badge;
        document.getElementById("modal-fs-price").innerText = `৳ ${flashSaleData.price}`;
        document.getElementById("modal-fs-old-price").innerText = `৳ ${flashSaleData.oldPrice}`;
        document.getElementById("modal-fs-desc").innerText = flashSaleData.description;
    }

    const fsSizeContainer = document.getElementById("fs-sizes-container");
    if(fsSizeContainer && flashSaleData.sizes) {
        fsSizeContainer.innerHTML = flashSaleData.sizes.map((size, index) => 
            `<button class="size-btn ${index === 0 ? 'active' : ''}">${size}</button>`
        ).join("");
    }
};

const countdown = () => {
    const countDate = new Date(flashSaleData.endDate).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    if (gap > 0) {
        const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
        const d = document.getElementById("days");
        if(d) {
            d.innerText = Math.floor(gap / day);
            document.getElementById("hours").innerText = Math.floor((gap % day) / hour);
            document.getElementById("mins").innerText = Math.floor((gap % hour) / minute);
            document.getElementById("secs").innerText = Math.floor((gap % minute) / second);
        }
    }
};
setInterval(countdown, 1000);

/* Global Event Handler */
document.addEventListener("click", (e) => {
    // Quick View Toggle
    const viewBtn = e.target.closest(".quick-view-btn");
    if (viewBtn) openQuickView(parseInt(viewBtn.getAttribute("data-id")));

    // Wishlist Logic
    const wishBtn = e.target.closest(".wishlist-btn");
    if (wishBtn) {
        const id = parseInt(wishBtn.getAttribute("data-id"));
        const product = products.find(p => p.id === id);
        const index = wishlist.findIndex(item => item.id === id);
        const icon = wishBtn.querySelector('i');

        if (index === -1) {
            wishlist.push(product);
            icon.className = 'fa-solid fa-heart';
        } else {
            wishlist.splice(index, 1);
            icon.className = 'fa-regular fa-heart';
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderWishlistItems();
    }

    // Modal Closing
    if (e.target.classList.contains("close-modal") || e.target.classList.contains("modal-overlay") || e.target.id === 'close-wishlist' || e.target.id === 'continue-shopping') {
        document.querySelectorAll(".modal-overlay, #wishlist-drawer").forEach(el => el.classList.remove("active"));
    }

    // Quantity Adjustment
    if (e.target.classList.contains("qty-plus") || e.target.classList.contains("qty-minus")) {
        const input = e.target.parentElement.querySelector("input");
        let val = parseInt(input.value);
        input.value = e.target.classList.contains("qty-plus") ? val + 1 : (val > 1 ? val - 1 : 1);
    }

    // Size Selection
    if (e.target.classList.contains("size-btn")) {
        e.target.parentElement.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
    }

    // Wishlist Drawer
    if (e.target.closest('#wishlist-trigger')) {
        document.getElementById('wishlist-drawer').classList.add('active');
        renderWishlistItems();
    }

    // Item Removal Logic
    if (e.target.classList.contains('remove-wishlist')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        wishlist = wishlist.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderWishlistItems();
        const mainBtnIcon = document.querySelector(`.wishlist-btn[data-id="${id}"] i`);
        if(mainBtnIcon) mainBtnIcon.className = 'fa-regular fa-heart';
    }

    if (e.target.id === 'clear-wishlist') {
        wishlist = [];
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderWishlistItems();
        document.querySelectorAll('.wishlist-btn i').forEach(i => i.className = 'fa-regular fa-heart');
    }

    // Flash Sale Reset & Open 
    const grabBtn = e.target.closest('#grab-deal-btn');
    if (grabBtn) {
        const fsQty = document.querySelector("#flash-modal input");
        if(fsQty) fsQty.value = 1; 
        document.getElementById("flash-modal").classList.add("active");
    }
});

// Dynamic Search Engine 
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchTrigger = document.getElementById('search-trigger');

if (searchTrigger) {
    searchTrigger.onclick = (e) => {
        e.stopPropagation();
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) searchInput.focus();
    };
}

if (searchInput) {
    searchInput.oninput = (e) => {
        const term = e.target.value.toLowerCase().trim();
        const productSection = document.getElementById("product-container");
        
        if (term.length > 0 && productSection) {
            productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const searchResult = products.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.catName.toLowerCase().includes(term)
        );
        renderProducts(searchResult, true); 
    };
}

document.onclick = (e) => {
    if (searchBar && !searchBar.contains(e.target) && e.target !== searchTrigger) {
        searchBar.classList.remove('active');
    }
};