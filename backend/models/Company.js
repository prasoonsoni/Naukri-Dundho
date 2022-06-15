const mongoose = require('mongoose')
const { Schema } = mongoose

const CompanySchema = new Schema({
    name: String,
    description: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

module.exports = mongoose.model('Company', CompanySchema)