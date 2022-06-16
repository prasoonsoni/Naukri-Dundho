const mongoose = require('mongoose')
const { Schema } = mongoose

const CompanySchema = new Schema({
    name: String,
    description: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    posted_jobs:{
        type:[Schema.Types.ObjectId],
        default:[]
    }
})

module.exports = mongoose.model('Company', CompanySchema)