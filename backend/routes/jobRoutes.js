const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')
const fetchUser = require('../middleware/fetchUser')

router.get('/:id', jobController.getJobById)
router.get('/', fetchUser, jobController.getJobByCompany)
router.post('/', fetchUser, jobController.postJob)
router.post('/apply/:id', fetchUser, jobController.applyForJob)
router.put('/:id', fetchUser, jobController.updateJob)
router.delete('/:id', fetchUser, jobController.deleteJob)

module.exports = router