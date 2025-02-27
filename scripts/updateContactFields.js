import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from '../models/Property.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Initialize environment variables
dotenv.config();

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

async function updateContactFields() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Find all properties
    const properties = await Property.find({});
    console.log(`Found ${properties.length} properties to update`);

    // Update each property to ensure contact fields exist
    for (const property of properties) {
      const updates = {};
      
      // Check if each field needs to be initialized
      if (!property.alumniContacts) updates.alumniContacts = [];
      if (!property.campusContacts) updates.campusContacts = [];
      if (!property.mmrContacts) updates.mmrContacts = [];
      if (!property.athleticsContacts) updates.athleticsContacts = [];

      // Only update if there are fields to update
      if (Object.keys(updates).length > 0) {
        console.log(`Updating property ${property.name} (${property._id}) with fields:`, updates);
        
        // Update the property
        await Property.findByIdAndUpdate(property._id, { $set: updates });
        console.log(`Updated property ${property.name}`);
      } else {
        console.log(`Property ${property.name} already has all contact fields`);
      }
    }

    console.log('All properties have been updated successfully');
    
  } catch (error) {
    console.error('Error updating properties:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB Disconnected');
  }
}

// Run the update function
updateContactFields(); 