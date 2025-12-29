import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    simpleDescription: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    keywords: [String],
    stock: { type: Number, default: 100 }
}, { timestamps: true, collection: 'products' });

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
    {
        title: "Premium Wireless Headphones",
        description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
        simpleDescription: "High-quality wireless headphones with noise cancellation and long battery life.",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        keywords: ["headphones", "wireless", "audio", "electronics"],
        stock: 50
    },
    {
        title: "Classic Leather Sneakers",
        description: "Step out in style with these handcrafted leather sneakers. Made from premium full-grain leather with a cushioned insole for all-day comfort.",
        simpleDescription: "Comfortable leather sneakers with classic design.",
        price: 89.99,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        keywords: ["shoes", "sneakers", "leather", "footwear"],
        stock: 75
    },
    {
        title: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, and sleep analysis.",
        simpleDescription: "Feature-rich smartwatch for fitness tracking and notifications.",
        price: 249.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1544117518-30dd0f7358a2?auto=format&fit=crop&q=80&w=800",
        keywords: ["watch", "smartwatch", "fitness", "electronics"],
        stock: 40
    },
    {
        title: "Minimalist Backpack",
        description: "Carry your essentials in style with this sleek minimalist backpack. Features a padded laptop compartment and water-resistant fabric.",
        simpleDescription: "Stylish and functional backpack with laptop compartment.",
        price: 69.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        keywords: ["backpack", "bag", "accessories", "laptop"],
        stock: 60
    },
    {
        title: "Organic Cotton T-Shirt",
        description: "Soft, breathable, and eco-friendly. This organic cotton t-shirt is perfect for everyday wear.",
        simpleDescription: "Comfortable organic cotton t-shirt for everyday wear.",
        price: 29.99,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        keywords: ["tshirt", "clothing", "organic", "cotton"],
        stock: 100
    },
    {
        title: "Stainless Steel Water Bottle",
        description: "Stay hydrated with this premium insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
        simpleDescription: "Insulated water bottle that keeps drinks hot or cold.",
        price: 34.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
        keywords: ["bottle", "water", "accessories", "insulated"],
        stock: 80
    },
    {
        title: "Mechanical Gaming Keyboard",
        description: "Elevate your gaming experience with this responsive mechanical keyboard. Featuring RGB lighting and tactile switches.",
        simpleDescription: "Fast and durable mechanical keyboard with RGB lighting.",
        price: 129.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
        keywords: ["keyboard", "gaming", "mechanical", "electronics"],
        stock: 30
    },
    {
        title: "Ergonomic Office Chair",
        description: "Work in comfort with this ergonomic office chair. Features adjustable height, lumbar support, and breathable mesh back.",
        simpleDescription: "Comfortable office chair with adjustable support.",
        price: 199.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?auto=format&fit=crop&q=80&w=800",
        keywords: ["chair", "office", "ergonomic", "home"],
        stock: 20
    },
    {
        title: "Pro Running Shoes",
        description: "Engineered for performance with responsive cushioning and breathable mesh upper.",
        simpleDescription: "Lightweight running shoes with excellent cushioning.",
        price: 119.99,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        keywords: ["shoes", "running", "sports", "footwear"],
        stock: 55
    },
    {
        title: "Polarized Sunglasses",
        description: "Protect your eyes in style with these polarized sunglasses. Features UV400 protection.",
        simpleDescription: "Stylish polarized sunglasses with UV protection.",
        price: 49.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
        keywords: ["sunglasses", "accessories", "eyewear", "polarized"],
        stock: 70
    },
    {
        title: "Professional Yoga Mat",
        description: "Extra thick non-slip yoga mat for maximum comfort and stability during your practice.",
        simpleDescription: "Non-slip yoga mat with premium cushioning.",
        price: 45.00,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1592432676522-5316f2f9b8c3?auto=format&fit=crop&q=80&w=800",
        keywords: ["yoga", "fitness", "mat", "sports"],
        stock: 100
    },
    {
        title: "Ceramic Coffee Mug",
        description: "Handcrafted ceramic mug with a comfortable handle and a beautiful matte finish.",
        simpleDescription: "Stylish ceramic mug for your favorite beverages.",
        price: 15.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=800",
        keywords: ["mug", "coffee", "home", "kitchen"],
        stock: 150
    },
    {
        title: "LED Desk Lamp",
        description: "Modern LED desk lamp with adjustable brightness and touch-sensitive controls.",
        simpleDescription: "Energy-efficient desk lamp with adjustable arm.",
        price: 39.50,
        category: "Home",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
        keywords: ["lamp", "desk", "led", "home", "lighting"],
        stock: 45
    },
    {
        title: "Decorative Potted Plant",
        description: "Low-maintenance indoor plant in a stylish ceramic pot. Perfect for brightening up any room.",
        simpleDescription: "Beautiful indoor plant for home or office.",
        price: 24.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
        keywords: ["plant", "home", "decor", "indoor"],
        stock: 30
    },
    {
        title: "Smart Home Speaker",
        description: "Voice-controlled smart speaker with high-fidelity sound and integrated assistant.",
        simpleDescription: "High-quality smart speaker for your modern home.",
        price: 99.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800",
        keywords: ["speaker", "smart home", "electronics", "audio"],
        stock: 25
    },
    {
        title: "Slim Portable Power Bank",
        description: "High-capacity portable charger with fast charging technology. Sleek and lightweight design.",
        simpleDescription: "Powerful and portable charger for your mobile devices.",
        price: 49.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800",
        keywords: ["power bank", "charger", "electronics", "mobile"],
        stock: 60
    },
    {
        title: "Genuine Leather Wallet",
        description: "Handmade genuine leather wallet with RFID blocking technology and multiple card slots.",
        simpleDescription: "Durable and stylish leather wallet.",
        price: 55.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
        keywords: ["wallet", "leather", "accessories", "men"],
        stock: 40
    },
    {
        title: "Lavender Scented Candle",
        description: "Long-lasting scented candle made from natural soy wax. Infused with calming lavender oils.",
        simpleDescription: "Relaxing lavender scented candle for a peaceful atmosphere.",
        price: 18.50,
        category: "Home",
        image: "https://images.unsplash.com/photo-1603006375271-7f3b904ebc52?auto=format&fit=crop&q=80&w=800",
        keywords: ["candle", "home", "scented", "aromatherapy"],
        stock: 80
    },
    {
        title: "Luxury Fountain Pen",
        description: "Exquisite fountain pen with a gold-plated nib and a balanced weight for smooth writing.",
        simpleDescription: "Elegant fountain pen for a premium writing experience.",
        price: 125.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800",
        keywords: ["pen", "luxury", "stationery", "accessories"],
        stock: 15
    },
    {
        title: "Modern Wall Clock",
        description: "Minimalist wall clock with a silent sweep movement. Fits perfectly in modern interiors.",
        simpleDescription: "Sleek and silent wall clock for modern homes.",
        price: 45.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800",
        keywords: ["clock", "home", "decor", "wall clock"],
        stock: 20
    }
];

async function seedProducts() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://fatimah:fatimah123@cluster0.fawev10.mongodb.net/accessishop?retryWrites=true&w=majority';
        console.log('Connecting to:', mongoUri.split('@')[1] || 'Local DB');
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        const result = await Product.insertMany(sampleProducts);
        console.log(`Successfully inserted ${result.length} products`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
