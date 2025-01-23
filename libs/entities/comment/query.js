import mongoose from 'mongoose';
import {schema} from './schema.js'

export default class Comment {
    constructor() {
        this.model = mongoose.model('comment', schema)
    }

    create(params) {
        const object = new this.model(params);
        return object.save();
    }


    find(query, project, options) {
        if (typeof options !== "object") options = {};
        if (typeof options.sort === "undefined") options.sort = {'_id': -1}
        if (typeof options.limit === "undefined") options.limit = 30
        if (typeof options.skip === "undefined") options.skip = 0
        return this.model.find(query, project)
            .sort(options.sort).limit(parseInt(options.limit)).skip(parseInt(options.skip))
    }

    aggregate(pipline) {
        !_.isUndefined(pipline) ? true : pipline = [];
        return this.model.aggregate(pipline)
    }

    count(query) {
        return this.model.countDocuments(query)
    }

    get(id, project, options = {}) {
        return this.model.findOne({_id: id}, project, options)
    }

    getByQuery(query = {}, project = {}, options = {}) {
        return this.model.findOne(query, project, options)
    }

    update(query = {}, update = {}, options = {}) {
        update.modifiedAt = new Date();
        if (options.multi) {
            return this.model.updateMany(query, update, options)
        } else {
            return this.model.findOneAndUpdate(query, update, options)
        }
    }
}
