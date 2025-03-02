import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const modelName = 'user';
const schema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    admin: {type: Boolean, default: 0},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
}, {timestamps: true, collection: modelName, toJSON: {virtuals: true}})

schema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }

})
schema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (e) {
        throw e
    }
}

schema.virtual("articles", {
    ref: "article",
    localField: "_id",
    foreignField: "user"
})

export default mongoose.model(modelName, schema)
