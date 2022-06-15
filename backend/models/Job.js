const mongoose = require('mongoose')
const { Schema } = mongoose

const JobSchema = new Schema({
    title: String,
    description: String,
    salary: Number,
    posted_by: Schema.Types.ObjectId,
    applicants: {
        type: [Schema.Types.ObjectId],
        default: []
    }
})

module.exports = mongoose.model('Job', JobSchema)