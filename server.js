const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    queryType: { type: String, required: true },
    subDomain: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    availability: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'open' },
    date: { type: Date, default: Date.now }
});

const Form = mongoose.model('Form', formSchema);

// API to submit the form
app.post('/api/forms', async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).send('Form submitted successfully');
    } catch (error) {
        res.status(400).send('Error submitting form: ' + error.message);
    }
});

// API to get all forms
app.get('/api/forms', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send('Error fetching forms: ' + error.message);
    }
});

// API to update the status of a form
app.put('/api/forms/:id', async (req, res) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updatedForm) {
            return res.status(404).send('Form not found');
        }
        res.status(200).send('Status updated successfully');
    } catch (error) {
        res.status(500).send('Error updating status: ' + error.message);
    }
});

// API to delete a form
app.delete('/api/forms/:id', async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.id);
        if (!deletedForm) {
            return res.status(404).send('Form not found');
        }
        res.status(200).send('Form deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting form: ' + error.message);
    }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve user form at root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user', 'user.html'));
});

// Serve admin panel at /admin path
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});

app.get('/adminlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user', 'adminlogin', 'adminlogin.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
