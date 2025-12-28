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
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
    {
        title: "Premium Wireless Headphones",
        description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals who demand the best sound quality.",
        simpleDescription: "High-quality wireless headphones with noise cancellation and long battery life.",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        keywords: ["headphones", "wireless", "audio", "electronics"],
        stock: 50
    },
    {
        title: "Classic Leather Sneakers",
        description: "Step out in style with these handcrafted leather sneakers. Made from premium full-grain leather with a cushioned insole for all-day comfort. The timeless design pairs perfectly with any casual outfit.",
        simpleDescription: "Comfortable leather sneakers with classic design.",
        price: 89.99,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        keywords: ["shoes", "sneakers", "leather", "footwear"],
        stock: 75
    },
    {
        title: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and smartphone notifications. Water-resistant up to 50 meters with 7-day battery life.",
        simpleDescription: "Feature-rich smartwatch for fitness tracking and notifications.",
        price: 249.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1544117518-30dd0f7358a2?auto=format&fit=crop&q=80&w=800",
        keywords: ["watch", "smartwatch", "fitness", "electronics"],
        stock: 40
    },
    {
        title: "Minimalist Backpack",
        description: "Carry your essentials in style with this sleek minimalist backpack. Features a padded laptop compartment (fits up to 15 inches), multiple organizational pockets, and water-resistant fabric. Perfect for work, school, or travel.",
        simpleDescription: "Stylish and functional backpack with laptop compartment.",
        price: 69.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        keywords: ["backpack", "bag", "accessories", "laptop"],
        stock: 60
    },
    {
        title: "Organic Cotton T-Shirt",
        description: "Soft, breathable, and eco-friendly. This organic cotton t-shirt is perfect for everyday wear. Made from 100% certified organic cotton with a comfortable regular fit. Available in multiple colors.",
        simpleDescription: "Comfortable organic cotton t-shirt for everyday wear.",
        price: 29.99,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        keywords: ["tshirt", "clothing", "organic", "cotton"],
        stock: 100
    },
    {
        title: "Stainless Steel Water Bottle",
        description: "Stay hydrated with this premium insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Made from food-grade stainless steel with a leak-proof lid. BPA-free and eco-friendly.",
        simpleDescription: "Insulated water bottle that keeps drinks hot or cold.",
        price: 34.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
        keywords: ["bottle", "water", "accessories", "insulated"],
        stock: 80
    },
    {
        title: "Wireless Bluetooth Speaker",
        description: "Enjoy powerful 360-degree sound with this portable Bluetooth speaker. Features 12-hour battery life, IPX7 waterproof rating, and built-in microphone for hands-free calls. Perfect for outdoor adventures.",
        simpleDescription: "Portable waterproof speaker with great sound quality.",
        price: 79.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
        keywords: ["speaker", "bluetooth", "audio", "electronics"],
        stock: 45
    },
    {
        title: "Pro Running Shoes",
        description: "Engineered for performance with responsive cushioning and breathable mesh upper. These running shoes provide excellent support and comfort for long-distance runs. Lightweight design with durable rubber outsole.",
        simpleDescription: "Lightweight running shoes with excellent cushioning.",
        price: 119.99,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        keywords: ["shoes", "running", "sports", "footwear"],
        stock: 55
    },
    {
        title: "Sunglasses - Polarized",
        description: "Protect your eyes in style with these polarized sunglasses. Features UV400 protection, scratch-resistant lenses, and a lightweight frame. Perfect for driving, sports, or beach days.",
        simpleDescription: "Stylish polarized sunglasses with UV protection.",
        price: 49.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
        keywords: ["sunglasses", "accessories", "eyewear", "polarized"],
        stock: 70
    },
    {
        title: "Yoga Mat - Premium",
        description: "Practice in comfort with this premium non-slip yoga mat. Extra thick cushioning protects your joints while the textured surface provides excellent grip. Includes carrying strap. Eco-friendly and easy to clean.",
        simpleDescription: "Non-slip yoga mat with extra cushioning.",
        price: 44.99,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800",
        keywords: ["yoga", "mat", "fitness", "sports"],
        stock: 65
    },
    {
        title: "Desk Lamp - LED",
        description: "Illuminate your workspace with this modern LED desk lamp. Features adjustable brightness levels, flexible arm, and energy-efficient LED bulbs. USB charging port included. Perfect for studying or working.",
        simpleDescription: "Adjustable LED desk lamp with USB charging port.",
        price: 39.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
        keywords: ["lamp", "desk", "led", "home"],
        stock: 50
    },
    {
        title: "Coffee Maker - French Press",
        description: "Brew the perfect cup of coffee with this classic French press. Made from heat-resistant borosilicate glass with a stainless steel frame. Makes 4 cups of rich, flavorful coffee. Easy to use and clean.",
        simpleDescription: "Classic French press coffee maker for rich coffee.",
        price: 29.99,
        category: "Home",
        image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=800",
        keywords: ["coffee", "maker", "french press", "home"],
        stock: 40
    }
];


async function seedProducts() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/accessishop';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB:', mongoUri.startsWith('mongodb+srv') ? 'Atlas Cluster' : 'Local Container');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        const result = await Product.insertMany(sampleProducts);
        console.log(`Successfully inserted ${result.length} products`);

        // Display the products
        const products = await Product.find();
        console.log('\nProducts in database:');
        products.forEach(p => {
            console.log(`- ${p.title} ($${p.price}) - ${p.category}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
