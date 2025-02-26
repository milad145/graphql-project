import mongoose, {Schema} from 'mongoose';

const modelName = 'user';
const schema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    admin: {type: Boolean, default: 0},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
}, {timestamps: true, collection: modelName, toJSON: {virtuals: true}})

schema.virtual("articles", {
    ref: "article",
    localField: "_id",
    foreignField: "user"
})

export default mongoose.model(modelName, schema)
