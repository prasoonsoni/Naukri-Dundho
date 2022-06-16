require('dotenv').config()
const Applicant = require('../models/Applicant')
const Company = require('../models/Company')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')

const registerUser = async (req, res) => {
    try {
        const { name, description, email, password, type } = req.body

        if (type === "applicant") {
            const userEmail = await Applicant.findOne({ email: email });
            if (userEmail) {
                return res.json({ success: false, message: "E-Mail already exists!!" });
            }
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(password, salt);
            const account = await Applicant.create({
                name: name,
                description: description,
                email: email,
                password: securedPassword
            })
            if (!account) {
                return res.json({ success: false, message: "Error creating account. Try Again!!" })
            }
            return res.json({ success: true, message: "Account created successfully" })
        } else if (type === "company") {
            const userEmail = await Company.findOne({ email: email });
            if (userEmail) {
                return res.json({ success: false, message: "E-Mail already exists!!" });
            }
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(password, salt);
            const account = await Company.create({
                name: name,
                description: description,
                email: email,
                password: securedPassword
            })
            if (!account) {
                return res.json({ success: false, message: "Error creating account. Try Again!!" })
            }
            return res.json({ success: true, message: "Account created successfully" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password, type } = req.body
        if (type === "applicant") {
            const user = await Applicant.findOne({ email })
            if (!user) {
                return res.json({ success: false, message: "User doesn't exists!!" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.json({ success: false, message: "Invalid password!!" });
            }
            const data = {
                user: {
                    id: user._id
                }
            }
            const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);
            return res.status(201).json({ success: true, token: authtoken });
        } else if (type === "company") {
            const user = await Company.findOne({ email })
            if (!user) {
                return res.json({ success: false, message: "User doesn't exists!!" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.json({ success: false, message: "Invalid password!!" });
            }
            const data = {
                user: {
                    id: user._id
                }
            }
            const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);
            return res.status(201).json({ success: true, token: authtoken });
        }

    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const getApplicant = async (req, res) => {
    try {
        const user_id = new ObjectId(req.params.id)
        const user = await Applicant.findOne({ _id: user_id }).select('-password')
        if (!user) {
            return res.json({ success: false, message: "User not found." })
        }
        res.json({ success: true, data: user })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const getCompany = async (req, res) => {
    try {
        const user_id = new ObjectId(req.params.id)
        const user = await Company.findOne({ _id: user_id }).select('-password')
        if (!user) {
            return res.json({ success: false, message: "User not found." })
        }
        res.json({ success: true, data: user })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

module.exports = { registerUser, loginUser, getApplicant, getCompany }