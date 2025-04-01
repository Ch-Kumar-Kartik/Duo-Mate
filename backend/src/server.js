const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./db'); // Import the connectDB function
const mails = require('../routes/mails'); // Import the mails route
const users = require('../routes/users'); // Import the users route
const cors = require('cors');

app.use(express.json());
dotenv.config();

const port = process.env.PORT;

//body parser
app.use(express.json());
//connect to database
connectDB(); // Call the connectDB function

app.use('/api', mails); // Use the mails route
app.use('/api', users); // Use the users route

app.get('/', (req,res) => {
    res.send('Inside home page route handler');
    console.log('Inside home page route handler');
});

// app.get('/emails', (req, res) => {
//     const mockEmails = [
//         {
//           id: "1",
//           sender: "Sarah Johnson",
//           title: "Project Update: Q3 Marketing Plan",
//           body: "Hi there, I've attached the latest draft of our Q3 marketing plan for your review. Looking forward to your feedback during our meeting tomorrow.",
//           time: "10:30 AM",
//           isRead: false,
//           isStarred: true,
//           category: "work",
//           reply_body: "Thanks for sharing the Q3 marketing plan draft. I'll review it before our meeting tomorrow and come prepared with feedback. Looking forward to discussing the strategy!"
//         },
//         {
//           id: "2",
//           sender: "Tech Updates",
//           title: "Your Weekly Technology Digest",
//           body: "This week in tech: AI breakthroughs, new smartphone releases, and cybersecurity alerts that you should be aware of.",
//           time: "Yesterday",
//           isRead: true,
//           isStarred: false,
//           category: "newsletter",
//           reply_body: "Thanks for sharing the Q3 marketing plan draft. I'll review it before our meeting tomorrow and come prepared with feedback. Looking forward to discussing the strategy!"
//         },
//         {
//           id: "3",
//           sender: "Michael Chen",
//           title: "RE: Product Development Timeline",
//           body: "Thanks for the update. I think we should schedule a meeting to discuss the delays in the production timeline. Are you available tomorrow afternoon?",
//           time: "Yesterday",
//           isRead: true,
//           isStarred: false,
//           category: "work",
//           reply_body: "Thanks for sharing the Q3 marketing plan draft. I'll review it before our meeting tomorrow and come prepared with feedback. Looking forward to discussing the strategy!"
//         },
//         {
//           id: "4",
//           sender: "Jessica Williams",
//           title: "Dinner next week?",
//           body: "Hey there! Hope you're doing well. I was wondering if you'd like to grab dinner next week? It's been too long since we caught up!",
//           time: "Mar 15",
//           isRead: true,
//           isStarred: true,
//           category: "personal",
//           reply_body: "Great to hear from you! I'd love to grab dinner next week. How about Wednesday or Thursday evening? There's a new restaurant downtown I've been wanting to try!"
//         },
//         {
//           id: "5",
//           sender: "Webinar Invitation",
//           title: "Exclusive AI in Business Webinar: You're Invited",
//           body: "Join us for an exclusive webinar on how AI is transforming business operations. Limited spots available!",
//           time: "Mar 14",
//           isRead: true,
//           isStarred: false,
//           category: "promotion",
//           reply_body: "Thanks for sharing the Q3 marketing plan draft. I'll review it before our meeting tomorrow and come prepared with feedback. Looking forward to discussing the strategy!"
//         },
//         ];
//     res.json(mockEmails);
//     console.log('Fetched all emails:', mockEmails);
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});