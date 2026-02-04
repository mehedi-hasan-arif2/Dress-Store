/* Feature Collections Products Data */
const products = [
    // New Arrivals Section (10 Products)
    { id: 1, category: "new-arrivals", name: "Hand-Stitched Silk Panjabi", price: 1000, oldPrice: 2200, img: "assests/products/new-arrivals/1.jpg", badge: "New", catName: "Men's Premium", sizes: ["38", "40", "42", "44"] },
    { id: 2, category: "new-arrivals", name: "Designer Jamdani Saree", price: 4500, oldPrice: 6600, img: "assests/products/new-arrivals/2.jpg", badge: "Trending", catName: "Women's Luxury", sizes: ["Free Size"] },
    { id: 3, category: "new-arrivals", name: "Cotton Block Print Kurti", price: 1550, img: "assests/products/new-arrivals/3.jpg", catName: "Women's Wear", sizes: ["36", "38", "40", "42"] },
    { id: 4, category: "new-arrivals", name: "Formal Slim Fit Shirt", price: 800, img: "assests/products/new-arrivals/4.jfif", badge: "Hot", catName: "Men's Fashion", sizes: ["M", "L", "XL", "XXL"] },
    { id: 5, category: "new-arrivals", name: "Royal Festive Panjabi", price: 2400, oldPrice: 3200, img: "assests/products/new-arrivals/5.jpg", catName: "Men's Premium", sizes: ["40", "42", "44", "46"] },
    { id: 6, category: "new-arrivals", name: "Exclusive Silk Kameez", price: 3100, img: "assests/products/new-arrivals/6.jpeg", badge: "New", catName: "Women's Luxury", sizes: ["S", "M", "L", "XL"] },
    { id: 7, category: "new-arrivals", name: "Boys Cotton Set", price: 1250, img: "assests/products/new-arrivals/7.webp", catName: "Kids Collection", sizes: ["24", "26", "28", "30"] },
    { id: 8, category: "new-arrivals", name: "Premium Polo Shirt", price: 950, img: "assests/products/new-arrivals/8.jpg", catName: "Men's Casual", sizes: ["M", "L", "XL"] },
    { id: 9, category: "new-arrivals", name: "Simple Cotton Panjabi", price: 2500, img: "assests/products/new-arrivals/9.jpg", catName: "Men's Premium", sizes: ["38", "40", "42"] },
    { id: 10, category: "new-arrivals", name: "Party Wear Gown", price: 5200, img: "assests/products/new-arrivals/10.jpg", badge: "Exclusive", catName: "Women's Collection", sizes: ["M", "L" ,"XL"] },
    
    // Men Section 
    { id: 11, category: "men", name: "Luxury Kabli Set - Deep Blue", price: 2050, oldPrice: 3400, img: "assests/products/men/1.webp", catName: "Men's Premium", sizes: ["M", "L", "XL"] },
    { id: 12, category: "men", name: "Semi-Formal Slim Fit Shirt", price: 1150, img: "assests/products/men/2.webp", catName: "Men's Casual", sizes: ["M", "L", "XL"] },
    { id: 13, category: "men", name: "Cotton Embroidery Panjabi", price: 2400, img: "assests/products/men/3.jpg", catName: "Men's Ethnic", sizes: ["40", "42", "44"] },
    
    // Women Section
    { id: 14, category: "women", name: "Dhakai Jamdani Silk Saree", price: 5500, oldPrice: 6200, img: "assests/products/women/1.webp", catName: "Women's Luxury", sizes: ["Free Size"] },
    { id: 15, category: "women", name: "Embroidered Cotton Three Piece", price: 2350, img: "assests/products/women/2.jpg", catName: "Women's Ethnic", sizes: ["M", "L", "XL"] },
    { id: 16, category: "women", name: "Digital Print Lawn Kurti", price: 1500, img: "assests/products/women/3.jpg", catName: "Women's Casual", sizes: ["38", "40", "42"] },
    
    // Kids Section
    { id: 17, category: "kids", name: "Boys Cotton Embroidery Panjabi", price: 1200, oldPrice: 1800, img: "assests/products/kids/1.jpg", catName: "Kids Ethnic", sizes: ["22", "24", "26", "28"] },
    { id: 18, category: "kids", name: "Girls Designer Silk Frock", price: 2100, img: "assests/products/kids/2.jpg", catName: "Kids Party Wear", sizes: ["20", "22", "24"] },
    { id: 19, category: "kids", name: "Premium Cotton Print T-Shirt", price: 750, img: "assests/products/kids/3.webp", catName: "Kids Casual", sizes: ["24", "26", "28"] },
    
    // Combo Section
    { id: 20, category: "combo", name: "Premium Panjabi & Aligarhi Pajama Set", price: 2850, oldPrice: 3500, img: "assests/products/combo/1.webp", badge: "Best Value", catName: "Men's Combo", sizes: ["40", "42", "44"] },
    { id: 21, category: "combo", name: "Matching Couple Set (Saree & Panjabi)", price: 5500, oldPrice: 6200, img: "assests/products/combo/2.jpg", badge: "Couple Deal", catName: "Festive Combo", sizes: ["Regular"] },
    { id: 22, category: "combo", name: "Full Family Combo (Dad-Mom-Kid)", price: 6300, img: "assests/products/combo/3.webp", catName: "Family Pack", sizes: ["Standard"] }
];


/* Flash Sale Product Data */
const flashSaleData = {
    id: "fs-01",
    name: "Premium Handcrafted T-Shirt",
    badge: "Limited Edition",
    price: 300,
    oldPrice: 600,
    description: "Experience the ultimate comfort with our premium cotton t-shirt, designed for the modern lifestyle.",
    image: "assests/products/combo/flesh sale.jfif",
    endDate: "February 20, 2028 00:00:00",
    sizes: ["M", "L", "XL"]
};