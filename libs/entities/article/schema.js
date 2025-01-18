import {Schema} from 'mongoose';

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String, required: true},
    body: {type: String, required: true}
}, {timestamps: true, collection: "article"})

schema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "article"
})
export {schema};
