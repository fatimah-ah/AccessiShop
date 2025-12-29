import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({
    title: String,
    image: String
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

async function verify() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://fatimah:fatimah123@cluster0.fawev10.mongodb.net/accessishop?retryWrites=true&w=majority';
        await mongoose.connect(mongoUri);
        const count = await Product.countDocuments();
        const products = await Product.find().select('title image');
        console.log(`Total products: ${count}`);
        products.forEach(p => {
            console.log(`- ${p.title}: ${p.image ? 'IMAGE_PRESENT' : 'MISSING_IMAGE'}`);
        });
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
verify();
