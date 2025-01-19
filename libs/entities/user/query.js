import mongoose from 'mongoose';
import {schema} from './schema.js'

const model = mongoose.model('user', schema)

export default class User {
    create(params) {
        const object = new model(params);
        return object.save();
    }


    find(query, project, options) {
        if (typeof options !== "object") options = {};
        if (typeof options.sort === "undefined") options.sort = {'_id': -1}
        if (typeof options.limit === "undefined") options.limit = 30
        if (typeof options.skip === "undefined") options.skip = 0
        if (options.populate)
            return model.find(query, project)
                .sort(options.sort).limit(parseInt(options.limit)).skip(parseInt(options.skip))
        else
            return model.find(query, project)
                .sort(options.sort).limit(parseInt(options.limit)).skip(parseInt(options.skip))
    }

    aggregate(pipline) {
        !_.isUndefined(pipline) ? true : pipline = [];
        return model.aggregate(pipline)
    }

    count(query) {
        return model.countDocuments(query)
    }

    get(id, project, options) {
        if (options.populate)
            return model.findOne({_id: id}, project)
        else
            return model.findOne({_id: id}, project)
    }

    getByQuery(query, project, options) {
        return model.findOne(query, project)
    }

    update(query, update, options) {
        update.modifiedAt = new Date();
        if (options.multi) {
            return model.updateMany(query, update, options)
        } else {
            return model.findOneAndUpdate(query, update, options)
        }
    }
}
