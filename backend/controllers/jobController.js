require('dotenv').config()
const { ObjectId } = require('mongodb')
const Applicant = require('../models/Applicant')
const Company = require('../models/Company')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({})
        if (!jobs) {
            return res.json({ success: false, message: "No Jobs Available" })
        }
        res.json({ success: true, data: jobs })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}
const postJob = async (req, res) => {
    try {
        const company_id = new ObjectId(req.user.id)
        const { title, description, salary } = req.body
        const job = await Job.create({
            title: title,
            description: description,
            salary: salary,
            posted_by: company_id
        })
        const updateCompany = await Company.updateOne({ _id: company_id }, { $push: { posted_jobs: job._id } })
        if (!job) {
            return res.json({ success: false, message: "Error creating job." })
        }
        res.json({ success: true, message: "Job created successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const updateJob = async (req, res) => {
    try {
        const job_id = new ObjectId(req.params.id)
        const company_id = new ObjectId(req.user.id)
        const { title, description, salary } = req.body
        const updatedJob = await Job.updateOne({ posted_by: company_id, _id: job_id }, { $set: { title: title, description: description, salary: salary } })
        if (!updatedJob.acknowledged) {
            return res.json({ success: false, message: "Error updating job." })
        }
        res.json({ success: true, message: "Job Updated Successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const deleteJob = async (req, res) => {
    try {
        const job_id = new ObjectId(req.params.id)
        const company_id = new ObjectId(req.user.id)
        const job = await Job.findOne({ _id: job_id, posted_by: company_id })
        const jobApplicants = job.applicants
        const deleteForCompany = await Company.updateOne({ _id: company_id }, { $pull: { posted_jobs: job_id } })
        for (let i = 0; i < jobApplicants.length; i++) {
            const applicant_id = jobApplicants[i]
            const deleteForApplicant = await Applicant.updateOne({ _id: applicant_id }, { $pull: { applied_for: job_id } })
            if (!deleteForApplicant.acknowledged) {
                return res.json({ success: false, message: "Error deleted job." })
            }
        }
        const deleteJob = await Job.deleteOne({ _id: job_id, posted_by: company_id })
        if (!deleteForCompany.acknowledged || !deleteJob.acknowledged) {
            return res.json({ success: false, message: "Error deleted job." })
        }
        res.json({ success: true, message: "Job deleted successfully." })

    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const getJobById = async (req, res) => {
    try {
        const job_id = new ObjectId(req.params.id)
        const job = await Job.findOne({ _id: job_id })
        if (!job) {
            return res.json({ success: false, message: "No job found." })
        }
        res.json({ success: true, data: job })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const getJobByCompany = async (req, res) => {
    try {
        const company_id = new ObjectId(req.user.id)
        const job = await Job.find({ posted_by: company_id })
        if (!job) {
            return res.json({ success: false, message: "No job found." })
        }
        res.json({ success: true, data: job })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const applyForJob = async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.id)
        const job_id = new ObjectId(req.params.id)
        const alreadyApplied = await Applicant.findOne({ _id: user_id, applied_for: { $in: [job_id] } })
        if (alreadyApplied) {
            return res.json({ success: false, message: "You have already applied for the job." })
        }
        const addToJob = await Job.updateOne({ _id: job_id }, { $push: { applicants: user_id } })
        const addToApplicant = await Applicant.updateOne({ _id: user_id }, { $push: { applied_for: job_id } })
        if (!addToJob.acknowledged || !addToApplicant.acknowledged) {
            return res.json({ success: false, message: "Error applying to job." })
        }
        res.json({ success: true, message: "Applied for job successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

const getApplicants = async (req, res) => {
    try {
        const job_id = new ObjectId(req.params.id)
        const job = await Job.findOne({ _id: job_id })
        const applicants = job.applicants
        const applicantsData = []
        for (let i = 0; i < applicants.length; i++) {
            const applicant_id = applicants[i];
            const applicant = await Applicant.findOne({ _id: applicant_id }).select('-password').select('-applied_for')
            applicantsData.push(applicant)
        }
        res.json({ success: true, data: applicantsData })
    } catch (error) {
        console.log(error.message)
        res.json({ status: "error", message: "Some internal server error occured." })
    }
}

module.exports = { postJob, getJobById, getJobByCompany, updateJob, deleteJob, applyForJob, getAllJobs, getApplicants }