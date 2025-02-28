import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  sunsetName: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    default: '/images/default-property.png'
  },
  coverPhoto: {
    type: String
  },
  contractExpiration: {
    type: Date
  },
  contract: {
    type: String,
    trim: true
  },
  commission: {
    type: String
  },
  charitableContribution: {
    type: String
  },
  carveOuts: {
    type: String
  },
  contractStartDate: {
    type: Date
  },
  mmrHolder: {
    type: String
  },
  financialTerms: {
    type: String
  },
  projectedAnnualDeal: {
    type: Number,
    default: 0
  },
  dealTermLength: {
    type: Number,
    default: 1
  },
  actualAnnualDeal: {
    type: Number,
    default: 0
  },
  prohibitedCategories: {
    type: [String],
    default: []
  },
  // Updated unified contacts array with position and email fields
  contacts: {
    type: [{
      name: { type: String, required: true },
      position: { type: String },
      email: { type: String },
      category: { 
        type: String, 
        required: true,
        enum: ['alumni', 'campus', 'mmr', 'athletics'] 
      }
    }],
    default: []
  },
  // Keep these fields for backwards compatibility during transition
  alumniContacts: {
    type: [String],
    default: []
  },
  campusContacts: {
    type: [String],
    default: []
  },
  mmrContacts: {
    type: [String],
    default: []
  },
  athleticsContacts: {
    type: [String],
    default: []
  },
  teReimbursements: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.Property || mongoose.model('Property', PropertySchema); 