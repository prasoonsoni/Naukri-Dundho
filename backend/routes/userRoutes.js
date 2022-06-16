const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/company/:id', userController.getCompany)
router.get('/applicant/:id', userController.getApplicant)

module.exports = router