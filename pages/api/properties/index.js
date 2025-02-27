import dbConnect from '../../../lib/db/mongodb';
import Property from '../../../models/Property';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'MongoDB connection failed. Please check your connection string and ensure MongoDB is running.' 
    });
  }

  switch (method) {
    case 'GET':
      try {
        const properties = await Property.find({}).sort({ name: 1 }); // Sort alphabetically by name
        res.status(200).json({ success: true, data: properties });
      } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;
      
    case 'POST':
      try {
        const property = await Property.create(req.body);
        res.status(201).json({ success: true, data: property });
      } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
} 