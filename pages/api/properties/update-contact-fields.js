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
    console.log(`Found ${properties.length} properties to update`);

    // Count how many we updated
    let updatedCount = 0;
    
    // Update each property
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
        updatedCount++;
      } else {
        console.log(`Property ${property.name} already has all contact fields`);
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: `Updated ${updatedCount} out of ${properties.length} properties` 
    });
    
  } catch (error) {
    console.error('Error updating properties:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
} 