// Script to migrate endDate to contractStartDate for all properties
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

async function migrateEndDate() {
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
      // We don't need to define all fields, just the ones we're migrating
    });
    
    // Use the existing model if it's already registered, or create a new one
    Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

    // Find properties that need migration (have endDate but no contractStartDate)
    const propertiesNeedingMigration = await Property.find({
      endDate: { $exists: true, $ne: null },
      $or: [
        { contractStartDate: { $exists: false } },
        { contractStartDate: null }
      ]
    });
    
    console.log(`Found ${propertiesNeedingMigration.length} properties that need migration`);
    
    if (propertiesNeedingMigration.length === 0) {
      console.log('No properties need migration. Exiting...');
      return;
    }
    
    // Migrate each property
    console.log('\nStarting migration...');
    let migratedCount = 0;
    
    for (const property of propertiesNeedingMigration) {
      console.log(`Migrating property: ${property.name} (ID: ${property._id})`);
      console.log(`  - endDate: ${property.endDate.toISOString().split('T')[0]}`);
      
      // Copy endDate to contractStartDate
      property.contractStartDate = property.endDate;
      
      // Uncomment the following line if you want to remove the endDate field
      // property.endDate = undefined;
      
      // Save the updated property
      await property.save();
      
      console.log(`  - contractStartDate: ${property.contractStartDate.toISOString().split('T')[0]}`);
      console.log(`  ✓ Migration complete for ${property.name}`);
      
      migratedCount++;
    }
    
    console.log(`\nMigration complete! ${migratedCount} properties were updated.`);
    
    // Verify migration
    const remainingCount = await Property.countDocuments({
      endDate: { $exists: true, $ne: null },
      $or: [
        { contractStartDate: { $exists: false } },
        { contractStartDate: null }
      ]
    });
    
    if (remainingCount === 0) {
      console.log('Verification successful: All properties have been migrated.');
    } else {
      console.warn(`Warning: ${remainingCount} properties still need migration.`);
    }
    
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the migration
migrateEndDate(); 