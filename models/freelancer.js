const mongoose = require('mongoose');
const BusinessSchema = new mongoose.Schema({
  freelancerName: String,
  category: String,
  profilePhoto: String,
  freelancerDescription: String,
  phoneNumber: String,
  emailAddress: String,
  operatingHours: String,
  userID: String,
  socialMedia: [{ facebook: String, twitter: String, instagram: String, Other: String }]
});
module.exports = mongoose.model('Freelancers', FreelancerSchema);
