/* Start of Dynamic Product Loading Logic */
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrap = document.getElementById("load-more-wrap");
    
    const path = window.location.pathname;
    const page = path.split("/").pop().split(".")[0] || "index"; 

    let displayLimit = 8;
    let filteredProducts = [];

    // Filter Logic
    if (page === "index" || page === "") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === page);
    }

    const renderProducts = () => {
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
                        <button class="action-btn" title="Wishlist"><i class="fa-regular fa-heart"></i></button>
                        <button class="action-btn" title="Quick View"><i class="fa-solid fa-eye"></i></button>
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

        /* View All Products Button visibility */
        if (loadMoreWrap) {
            if (filteredProducts.length > displayLimit) {
                loadMoreWrap.style.display = "block"; 
            } else {
                loadMoreWrap.style.display = "none";
            }
        }
    };

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            displayLimit += 4;
            renderProducts();
        });
    }

    renderProducts();
});
