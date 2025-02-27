// Script to check the current state of properties in the database
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// We need to manually import the Property model since we're outside the Next.js context
let Property;

async function checkProperties() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Dynamically import the Property model
    const PropertySchema = new mongoose.Schema({
      name: String,
      endDate: Date,
      contractStartDate: Date,
      contractExpiration: Date
      // We don't need to define all fields, just the ones we're checking
    });
    
    // Use the existing model if it's already registered, or create a new one
    Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

    // Get all properties
    const properties = await Property.find({});
    console.log(`\nTotal properties: ${properties.length}`);
    
    // Count properties with endDate
    const propertiesWithEndDate = properties.filter(p => p.endDate);
    console.log(`Properties with endDate: ${propertiesWithEndDate.length}`);
    
    // Count properties with contractStartDate
    const propertiesWithContractStartDate = properties.filter(p => p.contractStartDate);
    console.log(`Properties with contractStartDate: ${propertiesWithContractStartDate.length}`);
    
    // Count properties with contractExpiration
    const propertiesWithContractExpiration = properties.filter(p => p.contractExpiration);
    console.log(`Properties with contractExpiration: ${propertiesWithContractExpiration.length}`);
    
    // Find properties that need migration (have endDate but no contractStartDate)
    const propertiesNeedingMigration = properties.filter(p => p.endDate && !p.contractStartDate);
    console.log(`\nProperties needing migration: ${propertiesNeedingMigration.length}`);
    
    if (propertiesNeedingMigration.length > 0) {
      console.log('\nProperties that need migration:');
      propertiesNeedingMigration.forEach(p => {
        console.log(`- ${p.name} (ID: ${p._id}): endDate = ${p.endDate.toISOString().split('T')[0]}`);
      });
    }
    
    // Find properties with both fields
    const propertiesWithBothFields = properties.filter(p => p.endDate && p.contractStartDate);
    console.log(`\nProperties with both endDate and contractStartDate: ${propertiesWithBothFields.length}`);
    
    if (propertiesWithBothFields.length > 0) {
      console.log('\nProperties with both fields:');
      propertiesWithBothFields.forEach(p => {
        console.log(`- ${p.name} (ID: ${p._id}): endDate = ${p.endDate.toISOString().split('T')[0]}, contractStartDate = ${p.contractStartDate.toISOString().split('T')[0]}`);
      });
    }
    
    console.log('\nCheck complete!');
  } catch (error) {
    console.error('Error checking properties:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the check
checkProperties(); 