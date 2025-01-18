import {Schema} from 'mongoose';

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user"},
    approved: {type: Boolean, default: false},
    article: {
        type: Schema.Types.ObjectId,
        ref: "article",
        default: undefined,
    },
    comment: {type: String, required: true},
}, {timestamps: true, toJSON: {virtuals: true}, collection: "comment"})

export {schema};
