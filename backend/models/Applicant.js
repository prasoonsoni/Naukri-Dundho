const mongoose = require('mongoose')
const { Schema } = mongoose

const ApplicantSchema = new Schema({
    name: String,
    description: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    applied_for:{
        type:[Schema.Types.ObjectId],
        default:[]
    }
})

module.exports = mongoose.model('Applicant', ApplicantSchema)