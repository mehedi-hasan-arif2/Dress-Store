/* Start of Dynamic Product Loading Logic */
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");
    
    const path = window.location.pathname;
    const page = path.split("/").pop().split(".")[0] || "index"; 

    let displayLimit = 8;
    let filteredProducts = (page === "index" || page === "") 
        ? products 
        : products.filter(p => p.category === page);

    const renderProducts = () => {
        if(!productContainer) return;
        
        const productsToShow = filteredProducts.slice(0, displayLimit);
        productContainer.innerHTML = "";
        
        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
                    <div class="product-actions">
                        <button class="action-btn wishlist-btn" data-id="${product.id}" title="Wishlist">
                           <i class="fa-regular fa-heart"></i>
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
                    <button class="add-to-cart-btn">
                        <span>Add to Cart</span> 
                        <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                </div>
            `;
            productContainer.appendChild(card);
        });

        if (loadMoreWrap) {
            if (filteredProducts.length > displayLimit) {
                loadMoreWrap.classList.remove("hidden");
            } else {
                loadMoreWrap.classList.add("hidden");
            }
        }
    };

    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            displayLimit += 4;
            renderProducts();
        };
    }

    renderProducts();
});

/* Start of Quick View Modal Logic */
const openQuickView = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const qtyInput = document.getElementById("qv-qty");
    if(qtyInput) qtyInput.value = 1;

    // Handle Dynamic Sizes for Quick View
    const qvSizeContainer = document.getElementById("qv-sizes-container");
    const qvSizeWrapper = qvSizeContainer ? qvSizeContainer.closest(".size-wrapper") : null;

    if(qvSizeContainer) {
        if(product.sizes && product.sizes.length > 0) {
            qvSizeWrapper.classList.remove("hidden");
            qvSizeContainer.innerHTML = product.sizes.map((size, index) => 
                `<button class="size-btn ${index === 0 ? 'active' : ''}">${size}</button>`
            ).join("");
        } else {
            // Hide size section if no sizes available
            if(qvSizeWrapper) qvSizeWrapper.classList.add("hidden");
        }
    }

    // Set product data 
    const qvImg = document.getElementById("qv-img");
    const qvTitle = document.getElementById("qv-title");
    if(qvImg) qvImg.src = product.img;
    if(qvTitle) qvTitle.innerText = product.name;
    
    document.getElementById("qv-badge").innerText = product.badge || "Premium";
    document.getElementById("qv-price").innerText = `৳ ${product.price}`;
    document.getElementById("qv-old-price").innerText = product.oldPrice ? `৳ ${product.oldPrice}` : "";
    
    document.getElementById("quick-view-modal").classList.add("active");
};

/* Global Click Handler */
document.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".quick-view-btn");
    if (viewBtn) {
        const id = parseInt(viewBtn.getAttribute("data-id"));
        openQuickView(id);
    }

    if (e.target.classList.contains("close-modal") || e.target.classList.contains("modal-overlay")) {
        document.querySelectorAll(".modal-overlay").forEach(modal => modal.classList.remove("active"));
    }

    if (e.target.classList.contains("qty-plus")) {
        const input = e.target.parentElement.querySelector("input");
        input.value = parseInt(input.value) + 1;
    }
    if (e.target.classList.contains("qty-minus")) {
        const input = e.target.parentElement.querySelector("input");
        if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    }

    if (e.target.classList.contains("size-btn")) {
        const container = e.target.parentElement;
        container.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
    }
});

/* Start of Flash Sale Engine */
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

    // Dynamic Sizes for Flash Sale
    const fsSizeContainer = document.getElementById("fs-sizes-container");
    const fsSizeWrapper = fsSizeContainer ? fsSizeContainer.closest(".size-wrapper") : null;

    if(fsSizeContainer) {
        if(flashSaleData.sizes && flashSaleData.sizes.length > 0) {
            fsSizeWrapper.classList.remove("hidden");
            fsSizeContainer.innerHTML = flashSaleData.sizes.map((size, index) => 
                `<button class="size-btn ${index === 0 ? 'active' : ''}">${size}</button>`
            ).join("");
        } else {
            if(fsSizeWrapper) fsSizeWrapper.classList.add("hidden");
        }
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
    } else {
        const fsSection = document.getElementById("flash-sale");
        if(fsSection) fsSection.classList.add("hidden");
    }
};

/* Flash Sale Trigger */
const grabDealBtn = document.getElementById("grab-deal-btn");
if(grabDealBtn) {
    grabDealBtn.onclick = () => {
        const fsQty = document.getElementById("modal-fs-qty");
        if(fsQty) fsQty.value = 1;
        
        const flashModal = document.getElementById("flash-modal");
        if(flashModal) flashModal.classList.add("active");
    };
}

/* Initialization */
injectFlashSaleData();
setInterval(countdown, 1000);


/* Start of Wish List*/
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

/* Start of Dynamic Product Loading Logic */
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");
    
    const path = window.location.pathname;
    const page = path.split("/").pop().split(".")[0] || "index"; 

    let displayLimit = 8;
    let filteredProducts = (page === "index" || page === "") ? products : products.filter(p => p.category === page);

    const renderProducts = () => {
        if(!productContainer) return;
        const productsToShow = filteredProducts.slice(0, displayLimit);
        
        productContainer.innerHTML = "";
        productsToShow.forEach(product => {
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
            loadMoreWrap.style.display = (filteredProducts.length > displayLimit) ? "block" : "none";
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
});

/* Wishlist Core Functions */
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

/* Global Click Handler for Wishlist Actions */
document.addEventListener("click", (e) => {
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

    if (e.target.classList.contains('remove-wishlist')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        wishlist = wishlist.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderWishlistItems();
        
        const mainBtn = document.querySelector(`.wishlist-btn[data-id="${id}"]`);
        if(mainBtn) {
            mainBtn.querySelector('i').className = 'fa-regular fa-heart';
        }
    }

    if (e.target.closest('#wishlist-trigger')) {
        const drawer = document.getElementById('wishlist-drawer');
        if(drawer) drawer.classList.add('active');
        renderWishlistItems();
    }
    
    if (e.target.id === 'close-wishlist' || e.target.id === 'continue-shopping') {
        document.getElementById('wishlist-drawer').classList.remove('active');
    }
    
    if (e.target.id === 'clear-wishlist') {
        wishlist = [];
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderWishlistItems();
        document.querySelectorAll('.wishlist-btn i').forEach(i => {
            i.className = 'fa-regular fa-heart';
        });
    }
});