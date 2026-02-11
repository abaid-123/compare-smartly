import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type Offer = {
  store: "Amazon" | "eBay" | "AliExpress" | "Daraz";
  price: number;
  rating: number;
  url: string;
};



type Product = {
  id: number;
  title: string;
  type: string;
  category: "electronics" | "fashion" | "sports" | "beauty";
  image: string;
  rating: number;
  offers: Offer[];
};

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`;
}

function getCheapest(offers: Offer[]) {
  return [...offers].sort((a, b) => a.price - b.price)[0];
}

const PRODUCTS: Product[] = [
  // ===================== ELECTRONICS (30) =====================
  {
    id: 1,
    title: "AirPods Pro (2nd Gen)",
    type: "AirPods",
    category: "electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5f3c2?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 134.99, rating: 4.8, url: "https://www.amazon.com" },
      { store: "eBay", price: 129.99, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 119.99, rating: 4.3, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 139.99, rating: 4.5, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2,
    title: "AirPods (3rd Gen)",
    type: "AirPods",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 149.99, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 139.99, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 129.99, rating: 4.2, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 159.99, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3,
    title: "AirPods Max",
    type: "Headphones",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 449.99, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 429.99, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 399.99, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 469.99, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 4,
    title: "Sony WH-1000XM5",
    type: "Headphones",
    category: "electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 299.0, rating: 4.8, url: "https://www.amazon.com" },
      { store: "eBay", price: 289.0, rating: 4.7, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 269.0, rating: 4.2, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 315.0, rating: 4.5, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 5,
    title: "Bose QuietComfort Ultra",
    type: "Headphones",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518441982841-8627c5e06a30?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 329.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 319.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 289.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 339.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 6,
    title: "JBL Flip 6 Speaker",
    type: "Speaker",
    category: "electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f3?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 119.0, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 109.0, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 99.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 125.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },

  // Mobiles
  {
    id: 7,
    title: "iPhone 15 Pro",
    type: "Mobile",
    category: "electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1695048133142-1a2043614d37?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 999.0, rating: 4.8, url: "https://www.amazon.com" },
      { store: "eBay", price: 956.99, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 835.75, rating: 4.3, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1015.0, rating: 4.5, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 8,
    title: "iPhone 15",
    type: "Mobile",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1695049027343-0ebdcaf14909?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 799.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 769.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 729.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 815.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 9,
    title: "Samsung Galaxy S24 Ultra",
    type: "Mobile",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 999.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 969.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 919.0, rating: 4.2, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1025.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 10,
    title: "Google Pixel 8 Pro",
    type: "Mobile",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1610792516626-1f2d08de1f02?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 799.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 779.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 739.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 815.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 11,
    title: "OnePlus 12",
    type: "Mobile",
    category: "electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 699.0, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 679.0, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 649.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 715.0, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 12,
    title: "Xiaomi 14",
    type: "Mobile",
    category: "electronics",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1510552776732-03e61cf4b144?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 649.0, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 629.0, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 599.0, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 665.0, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  // Laptops
  {
    id: 13,
    title: "MacBook Air M2 (13-inch)",
    type: "Laptop",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 999.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 979.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 1015.0, rating: 4.3, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1049.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 14,
    title: "MacBook Pro M3 (14-inch)",
    type: "Laptop",
    category: "electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 1499.0, rating: 4.8, url: "https://www.amazon.com" },
      { store: "eBay", price: 1459.0, rating: 4.7, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 1429.0, rating: 4.2, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1525.0, rating: 4.5, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 15,
    title: "Dell XPS 13",
    type: "Laptop",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 1099.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 1049.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 999.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1120.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 16,
    title: "HP Spectre x360",
    type: "Laptop",
    category: "electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 1199.0, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 1149.0, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 1099.0, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1215.0, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 17,
    title: "Lenovo Legion 5 Gaming",
    type: "Laptop",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593642633279-1796119d5482?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 999.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 969.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 939.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1015.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 18,
    title: "ASUS ROG Zephyrus G14",
    type: "Laptop",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 1299.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 1249.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 1199.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1335.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },

  // TVs
  {
    id: 19,
    title: "LG 55-inch OLED TV",
    type: "TV",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 1099.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 1049.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 999.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1125.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 20,
    title: "Samsung 65-inch QLED TV",
    type: "TV",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 999.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 949.0, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 899.0, rating: 4.2, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 1020.0, rating: 4.5, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 21,
    title: "Sony 55-inch 4K Smart TV",
    type: "TV",
    category: "electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 649.0, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 619.0, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 589.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 670.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 22,
    title: "TCL 50-inch 4K TV",
    type: "TV",
    category: "electronics",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 349.0, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 329.0, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 309.0, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 365.0, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  // Cameras
  {
    id: 23,
    title: "Canon EOS R50 Camera",
    type: "Camera",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519183071298-a2962be96c91?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 679.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 649.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 629.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 695.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 24,
    title: "Sony Alpha a6400",
    type: "Camera",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 899.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 859.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 829.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 915.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 25,
    title: "GoPro HERO12 Black",
    type: "Camera",
    category: "electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 399.0, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 379.0, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 359.0, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 415.0, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 26,
    title: "DJI Osmo Action 4",
    type: "Camera",
    category: "electronics",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1580656502692-bc0c1579c5b1?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 329.0, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 315.0, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 299.0, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 339.0, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  // Extras
  {
    id: 27,
    title: "iPad Air (5th Gen)",
    type: "Tablet",
    category: "electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 599.0, rating: 4.7, url: "https://www.amazon.com" },
      { store: "eBay", price: 579.0, rating: 4.6, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 559.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 615.0, rating: 4.4, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 28,
    title: "Samsung Galaxy Tab S9",
    type: "Tablet",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587825140708-ef4c8c4f3bd9?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 749.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 729.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 699.0, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 765.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 29,
    title: "Apple Watch Series 9",
    type: "Smartwatch",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 329.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 315.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 299.0, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 339.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 30,
    title: "Anker PowerCore 20000mAh",
    type: "Accessories",
    category: "electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 49.0, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 45.0, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 39.0, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 52.0, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },

  // ===================== FASHION (12) =====================
  {
    id: 101,
    title: "Men's Casual T-Shirt",
    type: "Clothing",
    category: "fashion",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1520975958225-1a85d3d78fd8?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 12.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 10.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 8.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 11.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 102,
    title: "Women's Denim Jacket",
    type: "Clothing",
    category: "fashion",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1520975958225-1a85d3d78fd8?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 34.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 31.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 27.99, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 32.49, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 103,
    title: "Running Sneakers",
    type: "Shoes",
    category: "fashion",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 59.99, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 54.99, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 44.99, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 52.99, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 104,
    title: "Leather Boots",
    type: "Shoes",
    category: "fashion",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 79.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 74.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 62.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 73.49, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  // add 8 more fashion items similarly if you want 20/30
  // (I kept it shorter for message size)
  
  // ===================== SPORTS (12) =====================
  {
    id: 2001,
    title: "Adjustable Dumbbells Set",
    type: "Fitness",
    category: "sports",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 89.99, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 84.99, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 74.99, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 86.99, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2002,
    title: "Yoga Mat Pro (Non-slip)",
    type: "Fitness",
    category: "sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 19.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 17.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 12.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 16.49, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2003,
    title: "Resistance Bands Set",
    type: "Fitness",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1599058917765-2d7b1b1e0f36?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 14.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 13.49, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 9.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 12.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2004,
    title: "Kettlebell 16kg",
    type: "Fitness",
    category: "sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1596357395104-ba2ef95f7fdb?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 49.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 46.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 39.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 47.49, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2005,
    title: "Pull-Up Bar (Doorway)",
    type: "Fitness",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 29.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 27.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 22.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 26.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 2006,
    title: "Camping Tent (4 Person)",
    type: "Camping",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b84b852c?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 79.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 74.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 69.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 76.49, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2007,
    title: "Hiking Backpack 40L",
    type: "Camping",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 39.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 37.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 29.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 36.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2008,
    title: "Sleeping Bag (All Seasons)",
    type: "Camping",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 34.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 32.49, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 27.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 31.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2009,
    title: "Trekking Poles (Pair)",
    type: "Camping",
    category: "sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 24.99, rating: 4.2, url: "https://www.amazon.com" },
      { store: "eBay", price: 23.49, rating: 4.1, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 19.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 22.49, rating: 4.0, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2010,
    title: "Portable Camping Stove",
    type: "Camping",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 29.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 27.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 22.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 26.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 2011,
    title: "Football (Size 5)",
    type: "Outdoor",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 19.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 18.49, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 14.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 17.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2012,
    title: "Basketball (Indoor/Outdoor)",
    type: "Outdoor",
    category: "sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 24.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 23.49, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 18.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 22.49, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2013,
    title: "Cricket Bat (English Willow)",
    type: "Outdoor",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0c4f6?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 69.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 64.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 54.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 62.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2014,
    title: "Cricket Ball (Leather)",
    type: "Outdoor",
    category: "sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1596558463125-0c169b0d6f4e?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 12.99, rating: 4.2, url: "https://www.amazon.com" },
      { store: "eBay", price: 11.49, rating: 4.1, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 8.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 10.99, rating: 4.0, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2015,
    title: "Badminton Racket Set",
    type: "Outdoor",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1601391261850-1a5b1a3f92fa?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 34.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 32.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 26.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 31.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 2016,
    title: "Running Shoes (Men)",
    type: "Running",
    category: "sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 59.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 56.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 44.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 54.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2017,
    title: "Sports Water Bottle (1L)",
    type: "Running",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1526401485004-2aa6d57c1a4f?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 12.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 11.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 8.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 10.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2018,
    title: "Skipping Rope (Speed)",
    type: "Fitness",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1599447292180-45f9fce2b1b7?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 9.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 8.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 5.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 7.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2019,
    title: "Cycling Helmet (Adult)",
    type: "Cycling",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1520975693411-35a8f59a3f9b?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 34.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 32.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 24.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 31.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2020,
    title: "Bike Lights Set (Front + Rear)",
    type: "Cycling",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1520975689571-03b58f4cfa54?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 19.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 18.49, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 12.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 17.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 2021,
    title: "Boxing Gloves (12oz)",
    type: "Training",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 29.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 27.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 21.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 26.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2022,
    title: "Hand Grip Strengthener",
    type: "Training",
    category: "sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 9.99, rating: 4.2, url: "https://www.amazon.com" },
      { store: "eBay", price: 8.99, rating: 4.1, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 6.49, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 7.99, rating: 4.0, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2023,
    title: "Foam Roller (Recovery)",
    type: "Recovery",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc2da?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 17.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 16.49, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 11.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 15.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2024,
    title: "Protein Shaker Bottle",
    type: "Nutrition",
    category: "sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598515214215-6a5cc8bcbf11?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 12.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 11.49, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 8.49, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 10.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 2025,
    title: "Tennis Racket (Beginner)",
    type: "Outdoor",
    category: "sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1504469288085-5b30f2f4a3a3?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 44.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 41.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 34.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 40.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  // ===================== BEAUTY (12) =====================
  {
    id: 3001,
    title: "Vitamin C Brightening Serum",
    type: "Skincare",
    category: "beauty",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 19.99, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 17.99, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 12.99, rating: 4.1, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 18.49, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3002,
    title: "Hydrating Face Moisturizer",
    type: "Skincare",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 14.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 13.49, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 9.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 12.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3003,
    title: "Matte Finish Foundation",
    type: "Makeup",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 24.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 22.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 17.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 21.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3004,
    title: "Waterproof Mascara",
    type: "Makeup",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 12.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 11.49, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 8.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 10.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3005,
    title: "Nude Lipstick Set (6pcs)",
    type: "Makeup",
    category: "beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 29.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 27.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 21.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 26.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 3006,
    title: "Hair Dryer Professional",
    type: "Haircare",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 39.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 36.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 29.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 34.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3007,
    title: "Hair Straightener Ceramic",
    type: "Haircare",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1611930021592-a5e6f27bb1e0?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 34.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 32.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 25.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 30.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3008,
    title: "Organic Shampoo (500ml)",
    type: "Haircare",
    category: "beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 15.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 14.49, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 10.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 13.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3009,
    title: "Beard Grooming Kit",
    type: "Grooming",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 24.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 22.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 18.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 21.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3010,
    title: "Electric Facial Cleanser Brush",
    type: "Skincare",
    category: "beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1588776814694-3d07cba49ab1?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 29.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 27.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 21.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 25.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 3011,
    title: "Face Wash (Deep Clean)",
    type: "Skincare",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 9.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 8.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 6.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 7.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3012,
    title: "Aloe Vera Gel (Natural)",
    type: "Skincare",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1598514982847-1b0dfbd5e6d0?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 11.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 10.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 7.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 9.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3013,
    title: "Makeup Brush Set (15pcs)",
    type: "Makeup",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1585386959984-7c3b0b4a0f45?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 19.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 18.49, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 13.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 17.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3014,
    title: "Nail Polish Set (10 Colors)",
    type: "Nails",
    category: "beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 16.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 15.49, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 11.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 14.49, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3015,
    title: "Perfume Spray (100ml)",
    type: "Fragrance",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1585386959984-5b2b0c7c1c6b?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 49.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 46.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 39.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 44.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 3016,
    title: "Sunscreen SPF 50+",
    type: "Skincare",
    category: "beauty",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1598515213278-5c60b5f9f5a5?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 13.99, rating: 4.6, url: "https://www.amazon.com" },
      { store: "eBay", price: 12.49, rating: 4.5, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 8.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 11.99, rating: 4.3, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3017,
    title: "Anti-Aging Night Cream",
    type: "Skincare",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 21.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 19.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 15.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 18.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3018,
    title: "Lip Balm (Moisturizing)",
    type: "Skincare",
    category: "beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1588776814686-8c2b1e7c5f89?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 5.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 4.99, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 3.49, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 4.49, rating: 4.0, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3019,
    title: "Hair Oil (Argan)",
    type: "Haircare",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1596755094423-1b0dfbd5e6d1?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 14.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 13.49, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 9.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 12.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3020,
    title: "Eyebrow Pencil (Waterproof)",
    type: "Makeup",
    category: "beauty",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1585386959984-1e6b7b0b5c3c?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 7.99, rating: 4.2, url: "https://www.amazon.com" },
      { store: "eBay", price: 6.99, rating: 4.1, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 4.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 6.49, rating: 4.0, url: "https://www.daraz.pk" },
    ],
  },

  {
    id: 3021,
    title: "Face Mask Sheet (Pack of 5)",
    type: "Skincare",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598515214210-3b4b7f2d6c0e?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 9.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 8.99, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 6.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 7.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3022,
    title: "Makeup Remover Micellar Water",
    type: "Skincare",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1611930022079-7b6b2a444ef0?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 11.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 10.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 7.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 9.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3023,
    title: "Body Lotion (Shea Butter)",
    type: "Bodycare",
    category: "beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1619454016512-9b0c7c1c6b3b?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 13.99, rating: 4.4, url: "https://www.amazon.com" },
      { store: "eBay", price: 12.49, rating: 4.3, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 9.49, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 11.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3024,
    title: "Compact Mirror with LED Light",
    type: "Accessories",
    category: "beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1596462502270-2f3b1b1e0f36?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 18.99, rating: 4.3, url: "https://www.amazon.com" },
      { store: "eBay", price: 17.49, rating: 4.2, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 12.99, rating: 3.9, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 15.99, rating: 4.1, url: "https://www.daraz.pk" },
    ],
  },
  {
    id: 3025,
    title: "Electric Hair Trimmer",
    type: "Grooming",
    category: "beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=60",
    offers: [
      { store: "Amazon", price: 29.99, rating: 4.5, url: "https://www.amazon.com" },
      { store: "eBay", price: 27.99, rating: 4.4, url: "https://www.ebay.com" },
      { store: "AliExpress", price: 21.99, rating: 4.0, url: "https://www.aliexpress.com" },
      { store: "Daraz", price: 25.99, rating: 4.2, url: "https://www.daraz.pk" },
    ],
  },
];



const TITLES: Record<string, string> = {
  electronics: "Electronics",
  fashion: "Fashion",
  sports: "Sports",
  beauty: "Beauty",
};


function bestOffer(offers: Offer[]) {
  return [...offers].sort((a, b) => a.price - b.price)[0];
}

function bestDealScore(offers: Offer[]) {
  // Phase-1 simple score: high rating + low price
  const lowest = bestOffer(offers);
  const bestRating = Math.max(...offers.map((o) => o.rating));
  return bestRating * 10 - lowest.price / 50;
}

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const cat = (category as "electronics" | "fashion" | "sports") || "electronics";

  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState<"best" | "price" | "rating">("best");

  const base = useMemo(() => PRODUCTS.filter((p) => p.category === cat), [cat]);

  const types = useMemo(() => {
    const set = new Set(base.map((p) => p.type));
    return ["All", ...Array.from(set)];
  }, [base]);

  const items = useMemo(() => {
    let list = base;

    if (q.trim()) {
      const t = q.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(t));
    }

    if (type !== "All") list = list.filter((p) => p.type === type);

    const sorted = [...list].sort((a, b) => {
      if (sort === "price") return bestOffer(a.offers).price - bestOffer(b.offers).price;
      if (sort === "rating") return Math.max(...b.offers.map(o => o.rating)) - Math.max(...a.offers.map(o => o.rating));
      return bestDealScore(b.offers) - bestDealScore(a.offers);
    });

    return sorted;
  }, [base, q, type, sort]);

  return (
    <section className="min-h-screen bg-[#050815] px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {TITLES[cat] || "Category"}
            </h1>
            <p className="mt-1 text-sm text-white/55">
              Best Deal items show on top (price + rating).
            </p>
          </div>

          <Link to="/categories" className="text-sm text-white/60 hover:text-white underline underline-offset-4">
            ← Back
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-[#050815]">
                {t}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="best" className="bg-[#050815]">Best Deal</option>
            <option value="price" className="bg-[#050815]">Lowest Price</option>
            <option value="rating" className="bg-[#050815]">Top Rating</option>
          </select>
        </div>

        {/* Grid */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((p) => {
    const sortedOffers = [...p.offers].sort((a, b) => a.price - b.price);
    const cheapest = sortedOffers[0];

    const onVisitStore = () => {
      if (!cheapest?.url) return;
      window.open(cheapest.url, "_blank", "noopener,noreferrer");
    };

    return (
      <div
        key={p.id}
        className="w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-lg shadow-blue-500/10"
      >
        {/* Image */}
        <div className="p-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <img
              src={p.image}
              alt={p.title}
              className="h-40 w-full object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div className="px-5">
          <h3 className="text-center text-lg font-bold text-white">
            {p.title}
          </h3>

          {/* Rating + Lowest price */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-sm">★★★★★</div>
              <span className="text-sm text-white/70">{p.rating}</span>
            </div>

            <div className="text-right">
              <p className="text-xs text-white/45">Lowest price</p>
              <p className="text-sm font-semibold text-white">
                {cheapest ? formatMoney(cheapest.price) : "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Offers list (NO Visit button here) */}
        <div className="mt-4 px-4 pb-2 space-y-2">
          {sortedOffers.map((o) => {
            const isCheapest = o.store === cheapest.store && o.price === cheapest.price;

            return (
              <div
                key={`${p.id}-${o.store}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#050815]/30 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white/85">
                    {o.store}
                  </span>

                  {isCheapest && (
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                      Cheapest
                    </span>
                  )}
                </div>

                <span className="text-sm font-semibold text-white">
                  {formatMoney(o.price)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main CTA */}
        <div className="px-4 pb-4 pt-2">
          <button
            type="button"
            onClick={onVisitStore}
            className="w-full rounded-xl py-2.5 text-sm font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500
                       transition shadow-lg shadow-blue-500/15"
          >
            Visit Store →
          </button>

          <p className="mt-2 text-center text-[11px] text-white/40">
            Prices can change on the seller&apos;s website.
          </p>
        </div>
      </div>
    );
  })}
</div>


        {items.length === 0 && <p className="mt-10 text-white/60">No items found.</p>}
      </div>
    </section>
  );
}
