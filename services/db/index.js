const { models: { Email, EmailAutoResponse, ScheduledEmail } } = require('./schema')
const util = require('util')

class DB {
    constructor({ userId }) {
        this._userId = userId
    }
    _createEmail({ subject, text, html }) {
        const email = new Email({
            userId: this._userId,
            subject,
            text,
            html
        })
        return email.save()
    }
    findEmailById(emailId) {
        return Email.findOne({ emailId }).exec()
    }
    findEmailAutoResponse(emailListAddress) {
        return EmailAutoResponse.findOne({ emailListAddress, userId: this._userId }).exec()
    }
    async createEmailAutoResponse(emailListAddress, emailInput) {
        const email = await this._createEmail(emailInput)
        let emailAutoResponse = new EmailAutoResponse({
            userId: this._userId,
            emailId: email.emailId,
            emailListAddress
        })
        emailAutoResponse = await emailAutoResponse.save()
        return { email, emailAutoResponse }
    }
    async createScheduledEmail({ when, emailListAddress }, emailInput) {
        const email = await this._createEmail(emailInput)
        let scheduledEmail = new ScheduledEmail({
            userId: this._userId,
            emailId: email.emailId,
            emailListAddress,
            when
        })
        scheduledEmail = await scheduledEmail.save()
        return { email, scheduledEmail }
    }
    findScheduledEmail(when, emailListAddress) {
        return ScheduledEmail.findOne({ when, emailListAddress })
    }
}

// console.log('starting')
// const db = new DB({ userId: 5 });
// db.findEmailAutoResponse('steph@gmail.com')
// // db.createEmailAutoResponse('steph@gmail.com', { subject: 'test', text: 'text' })
// .then(res => {
//     console.log('res', util.inspect(res));
// })
// .catch(error => {
//     console.log('error', error);
// });
// console.log('sent')

module.exports = DB