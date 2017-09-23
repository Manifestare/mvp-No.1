const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mytestdb', { useMongoClient: true })

const EmailSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    subject: { type: String, required: true },
    text: String,
    html: String
})

const EmailAutoResponseSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    emailListAddress: { type: String, required: true, unique: true, lowercase: true },
    emailId: { type: Number, required: true }
})

const ScheduledEmailSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    when: { type: Date, required: true },
    emailId: { type: Number, required: true },
    emailListAddress: { type: String, required: true, lowercase: true }
})

const Email = mongoose.model('Email', EmailSchema)

const EmailAutoResponse = mongoose.model('EmailAutoResponse', EmailAutoResponseSchema)

const ScheduledEmail = mongoose.model('ScheduledEmail', ScheduledEmailSchema)

module.exports = {
    models: {
        Email,
        EmailAutoResponse,
        ScheduledEmail
    }
}