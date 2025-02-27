import dbConnect from '../../../lib/db/mongodb';
import Property from '../../../models/Property';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { 
    query: { id },
    method
  } = req;

  // Check if ID is provided
  if (!id) {
    return res.status(400).json({ 
      success: false, 
      error: 'Property ID is required' 
    });
  }

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid MongoDB ObjectId format: ${id}`);
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid property ID format' 
    });
  }

  try {
    await dbConnect();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'MongoDB connection failed. Please check your connection string and ensure MongoDB is running.' 
    });
  }
  
  switch (method) {
    case 'GET':
      try {
        console.log(`Fetching property with ID: ${id}`);
        const property = await Property.findById(id);
        
        if (!property) {
          console.log(`Property not found with ID: ${id}`);
          return res.status(404).json({ 
            success: false, 
            error: 'Property not found' 
          });
        }
        
        console.log(`Successfully retrieved property: ${property.name}`);
        res.status(200).json({ success: true, data: property });
      } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const updateData = req.body;
        console.log(`Updating property with ID: ${id}`);
        console.log('Received update data:', updateData);
        console.log('Financial fields:');
        console.log('- projectedAnnualDeal:', updateData.projectedAnnualDeal, typeof updateData.projectedAnnualDeal);
        console.log('- dealTermLength:', updateData.dealTermLength, typeof updateData.dealTermLength);
        console.log('- actualAnnualDeal:', updateData.actualAnnualDeal, typeof updateData.actualAnnualDeal);
        console.log('Contact fields:');
        console.log('- contacts:', updateData.contacts);
        
        // Get the property before update for comparison
        const propertyBeforeUpdate = await Property.findById(id);
        if (!propertyBeforeUpdate) {
          return res.status(404).json({ success: false, error: 'Property not found' });
        }
        
        console.log('Property before update:', propertyBeforeUpdate);
        console.log('Financial fields before update:');
        console.log('- projectedAnnualDeal:', propertyBeforeUpdate.projectedAnnualDeal, typeof propertyBeforeUpdate.projectedAnnualDeal);
        console.log('- dealTermLength:', propertyBeforeUpdate.dealTermLength, typeof propertyBeforeUpdate.dealTermLength);
        console.log('- actualAnnualDeal:', propertyBeforeUpdate.actualAnnualDeal, typeof propertyBeforeUpdate.actualAnnualDeal);
        
        // Ensure the contacts field is properly initialized
        const updatePayload = {
          ...updateData,
          contacts: updateData.contacts || []
        };
        
        // Log the data we're about to save
        console.log('Update payload with contacts:', JSON.stringify(updatePayload.contacts, null, 2));
        
        // Update the property with the new data
        const updatedProperty = await Property.findByIdAndUpdate(
          id, 
          updatePayload,
          {
            new: true, // Return the updated document
            runValidators: true, // Run model validators
            upsert: false, // Don't create if it doesn't exist
          }
        );
        
        if (!updatedProperty) {
          console.log(`Property not found for update with ID: ${id}`);
          return res.status(404).json({ success: false, error: 'Property not found' });
        }
        
        console.log(`Successfully updated property: ${updatedProperty.name}`);
        console.log('Updated property data:', updatedProperty);
        console.log('Financial fields after update:');
        console.log('- projectedAnnualDeal:', updatedProperty.projectedAnnualDeal, typeof updatedProperty.projectedAnnualDeal);
        console.log('- dealTermLength:', updatedProperty.dealTermLength, typeof updatedProperty.dealTermLength);
        console.log('- actualAnnualDeal:', updatedProperty.actualAnnualDeal, typeof updatedProperty.actualAnnualDeal);
        console.log('Contact fields after update:');
        console.log('- contacts array:', updatedProperty.contacts);
        
        res.status(200).json({ success: true, data: updatedProperty });
      } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        console.log(`Deleting property with ID: ${id}`);
        const deletedProperty = await Property.findByIdAndDelete(id);
        
        if (!deletedProperty) {
          console.log(`Property not found for deletion with ID: ${id}`);
          return res.status(404).json({ success: false, error: 'Property not found' });
        }
        
        console.log(`Successfully deleted property with ID: ${id}`);
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, error: `Method ${method} Not Allowed` });
      break;
  }
} 