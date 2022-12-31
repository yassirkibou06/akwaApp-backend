import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    productId: String,
    name: String,
    brandName: String,
    redPrice: String,
    whitePrice: String,
    discount: String,
    imageUrl: String,
    imageSecond: String
});

const PostData = mongoose.model('PostData',postSchema);

export default PostData;