import mongoose, {Schema} from 'mongoose';

const modelName = 'article';
const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String, required: true},
    body: {type: String, required: true}
}, {timestamps: true, collection: modelName, toJSON: {virtuals: true}})

schema.virtual("comments", {
    ref: "comment",
    localField: "_id",
    foreignField: "article"
})

export default mongoose.model(modelName, schema)
