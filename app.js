const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://johnremy_mdb:J8X0R3NNjULasGFu@development.18xsvvq.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define a person schema and model
const personSchema = new mongoose.Schema({
  name: String,
  // Add more fields as needed
});

const Person = mongoose.model('Person', personSchema);

// Middleware to parse JSON requests
app.use(express.json());

// CREATE a new person by name (in URL parameter)
app.post('/api/:name', async (req, res) => {
  try {
    const { name, } = req.params;
    if (typeof name !== 'string') {
      res.status(400).json({ error: 'Name should be a string' });
      return;
    }

    const person = new Person({ name });
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    console.error('Error creating a person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE a new person by name (in request body)
app.post('/api', async (req, res) => {
  try {
    const { name } = req.body;
    if (typeof name !== 'string') {
      res.status(400).json({ error: 'Name should be a string' });
      return;
    }

    const person = new Person({ name });
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    console.error('Error creating a person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ details of a person by ID or Name
app.get('/api/:param', async (req, res) => {
  try {
    const { param } = req.params; // Use dynamic parameter from URL
    let person;

    // Determine if the parameter is a valid ObjectId (for ID lookup)
    if (mongoose.Types.ObjectId.isValid(param)) {
      person = await Person.findById(param);
    } else {
      person = await Person.findOne({ name: param }); // Use name for lookup
    }

    if (!person) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.json(person);
    }
  } catch (error) {
    console.error('Error retrieving a person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE details of an existing person by ID or Name
app.put('/api/:param', async (req, res) => {
  try {
    const { param } = req.params; // Use dynamic parameter from URL
    if (typeof param !== 'string') {
      res.status(400).json({ error: 'Parameter should be a string' });
      return;
    }

    // Field to update from the request body
    const { name: newName, } = req.body;

    // Determine if the parameter is a valid ObjectId (for ID lookup)
    let updatedPerson;
    if (mongoose.Types.ObjectId.isValid(param)) {
      updatedPerson = await Person.findByIdAndUpdate(param, { name: newName }, { new: true });
    } else {
      updatedPerson = await Person.findOneAndUpdate({ name: param }, { name: newName }, { new: true });
    }

    if (!updatedPerson) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.json(updatedPerson);
    }
  } catch (error) {
    console.error('Error updating a person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a person by ID or Name
app.delete('/api/:param', async (req, res) => {
  try {
    const { param } = req.params; // Use dynamic parameter from URL
    if (typeof param !== 'string') {
      res.status(400).json({ error: 'Parameter should be a string' });
      return;
    }

    // Determine if the parameter is a valid ObjectId (for ID lookup)
    let deletedPerson;
    if (mongoose.Types.ObjectId.isValid(param)) {
      deletedPerson = await Person.findByIdAndDelete(param);
    } else {
      deletedPerson = await Person.findOneAndDelete({ name: param });
    }

    if (!deletedPerson) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.json({ message: 'Person deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting a person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  // Send the HTML file as the response
  res.sendFile('welcome.html', { root: __dirname });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});