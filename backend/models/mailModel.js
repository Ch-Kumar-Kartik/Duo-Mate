const { Schema, model } = require('mongoose');

const MailSchema = new Schema({
    to: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
    },
    from: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    event_title: {
        type: String,
    },
    date: {
        type: Date,  // Use Date type instead of String
        required: true,
    },
    time: {
        type: String, // Keep as String to handle custom time format (like "N/A")
    },
    urgency: {
        type: String,
    },
    keyword: {
        type: String,
    },
    reply_to: {
        type: String,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
    },
    reply_from: {
        type: String,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation
    },
    reply_subject: {
        type: String,
    },
    reply_body: {
        type: String,
    }
}, { timestamps: true });  // This will automatically add createdAt and updatedAt fields

const EmailModel = model('mails', MailSchema);
// console.log(EmailModel); // Debugging log to check the model
// console.log('EmailModel contents:', EmailModel.schema.paths); // Log the schema paths to inspect the model structure

module.exports = EmailModel;
