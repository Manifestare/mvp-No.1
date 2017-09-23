const types = `
# email list type.
type EmailList {
    address: String!
    name: String
    members: [Member]
    created_at: String
    access_level: String
    description: String
    members_count: Int
}

# basic set of vars for members. this should be extended for different types of lists
interface BasicMemberVars {
    gender: String
    age: String
}

type MemberVars implements BasicMemberVars {
    gender: String
    age: String
}

# member/recipient of an email list
type Member {
    name: String
    address: String!
    subscribed: Boolean
    vars: MemberVars
}

type Query {
    # get all email lists
    allEmailLists: [EmailList!]!

    # get one email list by a address
    emailList(emailListAddress: String!): EmailList!

    # get a member from an email list
    member(emailListAddress: String!, memberAddress: String!): Member!
}

type Email {
    # Email address for From header
    from: String!

    # Email address of the recipient(s). Sepearated by commas
    to: String!

    cc: String
    bcc: String
    subject: String!

    # Body of the message. (text version)
    text: String!

    # Body of the message. (HTML version)
    html: String!
}

input MemberInput {
    name: String
    address: String!
    subscribed: Boolean
}

input addMembersToEmailListInput {
    emailListAddress: String!
    members: [MemberInput]
    subscribed: Boolean
}

input EmailInput {
    # Email address for From header
    from: String!

    # Email address of the recipient(s). Sepearated by commas
    to: [String]!

    cc: String
    bcc: String
    subject: String!

    # Body of the message. (text version)
    text: String!

    # Body of the message. (HTML version)
    html: String!
}

input removeMemberFromEmailListInput {
    emailListAddress: String!
    memberAddress: String!
}

input SendEmailInput {
    # From should be an email list on your account.
    email: EmailInput!
}

input SendEmailToEmailListMembersInput {
    # From should be an email list on your account.
    email: EmailInput!
}

type EmailMessage {
    subject: String!
    text: String
    html: String
}

input EmailMessageInput {
  subject: String!
  text: String
  html: String
}

type AutoResponseEmail {
    email: EmailMessage!
    emailListAddress: String!
    emailId: Int!
    email: EmailMessage!
}

type ScheduledEmail {
    when: String!
    end: String!
    emailId: Int!
    email: EmailMessage!
}

input createAutoResponseInput {
    emailListAddress: String!
    emailMessage: EmailMessageInput!
}

type Mutation {
    addMembersToEmailList(input: addMembersToEmailListInput!): EmailList!
    removeMemberFromEmailList(input: removeMemberFromEmailListInput!): Member!
#    sendEmail(input: SendEmailInput!): Email!
#    sendEmailToEmailListMembers(input: SendEmailToEmailListMembersInput!): Email!
#    createAutoResponse(input: createAutoResponseInput!): AutoResponseEmail!
#    scheduleTimedEmail(input: scheduleTimedEMailInput!): ScheduledEmail!
}
`

module.exports = [types]
