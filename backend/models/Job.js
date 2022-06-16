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
    },
    posted_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Job', JobSchema)