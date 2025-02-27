import dbConnect from '../../../lib/db/mongodb';
import Property from '../../../models/Property';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    await dbConnect();
    
    // Get all properties
    const properties = await Property.find({});
    
    let updatedCount = 0;
    let totalPropertyCount = properties.length;
    let migratedProperties = [];
    
    // Process each property
    for (const property of properties) {
      const propertyObj = property.toObject();
      const newContacts = [];
      let wasUpdated = false;
      
      // Migrate alumni contacts if they exist
      if (propertyObj.alumniContacts && propertyObj.alumniContacts.length > 0) {
        for (const contact of propertyObj.alumniContacts) {
          newContacts.push({ name: contact, category: 'alumni' });
        }
        wasUpdated = true;
      }
      
      // Migrate campus contacts if they exist
      if (propertyObj.campusContacts && propertyObj.campusContacts.length > 0) {
        for (const contact of propertyObj.campusContacts) {
          newContacts.push({ name: contact, category: 'campus' });
        }
        wasUpdated = true;
      }
      
      // Migrate MMR contacts if they exist
      if (propertyObj.mmrContacts && propertyObj.mmrContacts.length > 0) {
        for (const contact of propertyObj.mmrContacts) {
          newContacts.push({ name: contact, category: 'mmr' });
        }
        wasUpdated = true;
      }
      
      // Migrate athletics contacts if they exist
      if (propertyObj.athleticsContacts && propertyObj.athleticsContacts.length > 0) {
        for (const contact of propertyObj.athleticsContacts) {
          newContacts.push({ name: contact, category: 'athletics' });
        }
        wasUpdated = true;
      }
      
      // Update the property if we added any contacts
      if (wasUpdated) {
        // Merge with any existing contacts in the new format
        const existingContacts = propertyObj.contacts || [];
        const mergedContacts = [...existingContacts, ...newContacts];
        
        // Update the property
        property.contacts = mergedContacts;
        await property.save();
        
        updatedCount++;
        migratedProperties.push({
          id: property._id,
          name: property.name,
          contactCount: mergedContacts.length
        });
      }
    }
    
    return res.status(200).json({
      success: true,
      message: `Migration complete. Updated ${updatedCount} of ${totalPropertyCount} properties.`,
      migratedProperties
    });
  } catch (error) {
    console.error('Migration error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error during contact migration',
      details: error.message
    });
  }
} 