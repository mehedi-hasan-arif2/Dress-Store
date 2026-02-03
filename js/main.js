/* Start of Dynamic Product Loading Logic */
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");
    
    const path = window.location.pathname;
    const page = path.split("/").pop().split(".")[0] || "index"; 

    let displayLimit = 8;
    let filteredProducts = [];

    /* Filter products based on page category */
    if (page === "index" || page === "") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === page);
    }

    const renderProducts = () => {
        const productsToShow = filteredProducts.slice(0, displayLimit);
        if(!productContainer) return;
        
        productContainer.innerHTML = "";
        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
                    <div class="product-actions">
                        <button class="action-btn wishlist-btn" title="Wishlist">
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

        /* Handle load more button visibility */
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
});

/* Start of Quick View Modal Logic */
const openQuickView = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById("qv-qty").value = 1;
    const sizeBtns = document.querySelector("#quick-view-modal .size-options");
    if(sizeBtns) {
        sizeBtns.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
        sizeBtns.querySelector(".size-btn:nth-child(2)").classList.add("active"); 
    }

    // Set product data
    document.getElementById("qv-img").src = product.img;
    document.getElementById("qv-title").innerText = product.name;
    document.getElementById("qv-badge").innerText = product.badge || "Premium";
    document.getElementById("qv-price").innerText = `৳ ${product.price}`;
    document.getElementById("qv-old-price").innerText = product.oldPrice ? `৳ ${product.oldPrice}` : "";
    
    document.getElementById("quick-view-modal").classList.add("active");
};

/* Global Click Handler for Modals and Actions */
document.addEventListener("click", (e) => {
    /* Handle Quick View Trigger */
    const viewBtn = e.target.closest(".quick-view-btn");
    if (viewBtn) {
        const id = parseInt(viewBtn.getAttribute("data-id"));
        openQuickView(id);
    }

    /* Handle Modal Closing (Overlay or Close Button) */
    if (e.target.classList.contains("close-modal") || e.target.classList.contains("modal-overlay")) {
        document.querySelectorAll(".modal-overlay").forEach(modal => modal.classList.remove("active"));
    }

    /* Handle Quantity Controls for both modals */
    if (e.target.classList.contains("qty-plus")) {
        const input = e.target.parentElement.querySelector("input");
        input.value = parseInt(input.value) + 1;
    }
    if (e.target.classList.contains("qty-minus")) {
        const input = e.target.parentElement.querySelector("input");
        if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    }

    /* Handle Size Selection */
    if (e.target.classList.contains("size-btn")) {
        const container = e.target.parentElement;
        container.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
    }
});

/* Start Flash Sale Section Engine */
const injectFlashSaleData = () => {
    const mainImg = document.getElementById("fs-main-img");
    const modalImg = document.getElementById("modal-fs-img");
    
    if(mainImg) mainImg.src = flashSaleData.image;
    if(modalImg) modalImg.src = flashSaleData.image;
    
    const title = document.getElementById("modal-fs-title");
    if(title) {
        title.innerText = flashSaleData.name;
        document.getElementById("modal-fs-badge").innerText = flashSaleData.badge;
        document.getElementById("modal-fs-price").innerText = `৳ ${flashSaleData.price}`;
        document.getElementById("modal-fs-old-price").innerText = `৳ ${flashSaleData.oldPrice}`;
        document.getElementById("modal-fs-desc").innerText = flashSaleData.description;
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
        if(fsSection) fsSection.style.display = "none";
    }
};

/* Flash Sale Specific Trigger */
const grabDealBtn = document.getElementById("grab-deal-btn");
if(grabDealBtn) {
    grabDealBtn.onclick = () => {
        document.getElementById("modal-fs-qty").value = 1;
        const fsSizes = document.querySelector("#flash-modal .size-options");
        if(fsSizes) {
            fsSizes.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
            fsSizes.querySelector(".size-btn:nth-child(2)").classList.add("active"); 
        }
        document.getElementById("flash-modal").classList.add("active");
    };
}

/* Initialization */
injectFlashSaleData();
setInterval(countdown, 1000);