const { orgAdminAccessResolver } = require('../authentication/resolvers')
const { createError, isInstance } = require('apollo-errors')

const ExposedError = createError('ExposedError', {
    message: 'An unknown error has occurred with emails'
});

const QueryError = createError('QueryError', {
    message: 'There was a problem when making a query'
})

function createQueryError(error, options) {
    return new QueryError({ data: { error, options } })
}

const allEmailLists = orgAdminAccessResolver.createResolver(
    (root, args, { models: { User } }) => {
        return User.emailService.getEmailLists()
        .catch(error => { throw createQueryError(error) })
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const emailList = orgAdminAccessResolver.createResolver(
    (root, { emailListAddress }, { models: { User }}) => {
        return User.emailService.getEmailList(emailListAddress)
        .catch(error => { throw createQueryError(error, { emailListAddress }) })
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const member = orgAdminAccessResolver.createResolver(
    (root, { emailListAddress, memberAddress }, { models: { User }}) => {
        return User.emailService.getEmailListMember(emailListAddress, memberAddress)
        .catch(error => { throw createQueryError(error, { emailListAddress, memberAddress }) })
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const EmailList = {
    members(list, _, { models: { User }}) {
        return User.emailService.getEmailListAllMembers(list.address)
        .catch(error => { throw createQueryError(error, { emailListAddress: list.address }) })
    }
}

// Mutations
const EmailListChangeError = createError('EmailListChangeError', {
    message: 'problem when changing an email list'
});

function createEmailListChangeError(emailListAddress, error, options) {
    return new EmailListChangeError({ data: { emailListAddress, error, options }})
}

const addMembersToEmailList = orgAdminAccessResolver.createResolver(
    async (root, { input: { emailListAddress, members, subscribed } }, { models: { User }}) => {
        try {
            return await User.emailService.addMembersToEmailList(emailListAddress, members, subscribed)
        } catch(error) {
            throw createEmailListChangeError(emailListAddress, error, { members, subscribed })
        }
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

const removeMemberFromEmailList = orgAdminAccessResolver.createResolver(
    async (root, { input: { emailListAddress, memberAddress } }, { models: { User }}) => {
        try {
            return await User.emailService.removeMemberFromEmailList(emailListAddress, memberAddress)
        } catch(error) {
            throw createEmailListChangeError(emailListAddress, error, { memberAddress })
        }
    },
    (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
)

// const sendEmail = orgAdminAccessResolver.createResolver(
//     async (root, { input: { email: { from, to, cc, bcc, subject, text, html } } }, { models: { User }}) => {
//         const emailList = await User.emailServicegetEmailList(from);
//         if(!emailList) throw new ExposedError({ message: 'The from field should be an email list on your account.' });
//         const attributes = { from, to: to.join(','), cc, bcc, subject, text, html };
//         return User.emailService.sendEmail(attributes)
//     },
//     (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
// )

// should be send campaign in future
// const sendEmailToEmailListMembers = orgAdminAccessResolver.createResolver(
//     async (root, { input: { email: { from, to, cc, bcc, subject, text, html } } }, { models: { User }}) => {
//         const emailList = await User.emailServicegetEmailList(from);
//         if(!emailList) throw new ExposedError({ message: 'The from field should be an email list on your account.' });
//         const members = await User.emailService.getEmailListAllMembers(emailList.address)
//         const toMembers = members.map(member => member.address).join(',')
//         const attributes = { from, to: toMembers, cc, bcc, subject, text, html };
//         return User.emailService.sendEmail(attributes)
//     },
//     (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
// )

// const createAutoResponse = orgAdminAccessResolver.createResolver(
//     async (root, { input: { emailListAddress, emailMessage } }, { models: { User }}) => {
//         const resp = await User.db.createEmailAutoResponse(emailListAddress, emailMessage)
//         // future - implement payload responses instead
//         return resp.email
//     },
//     (root, args, context, error) => isInstance(error) ? error : new ExposedError({ message: error.message })
// )

module.exports = {
    Query: {
        allEmailLists,
        emailList,
        member
    },
    EmailList,
    Mutation: {
        addMembersToEmailList,
        removeMemberFromEmailList
    }
}
