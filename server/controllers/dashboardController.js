import Petition from '../models/Petition.js';
import Poll from '../models/Poll.js';
import Report from '../models/Report.js';
import Admin from '../models/Admin.js';

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user-specific data
    const myPetitions = await Petition.find({ createdBy: userId })
      .sort({ createdAt: -1 });

    const myPolls = await Poll.find({ createdBy: userId })
      .sort({ createdAt: -1 });

    // Get successful petitions (achieved status) where user either created OR signed
    const successfulPetitions = await Petition.find({
      status: 'achieved',
      $or: [
        { createdBy: userId },
        { 'signatures.user': userId }
      ]
    }).populate('createdBy', 'name');

    res.json({
      stats: {
        myPetitions: myPetitions.length,
        myPolls: myPolls.length,
        successfulPetitions: successfulPetitions.length
      },
      myPetitions,
      myPolls,
      successfulPetitions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const now = new Date();
    
    // Total counts
    const totalPetitions = await Petition.countDocuments();
    const totalPolls = await Poll.countDocuments();
    
    // Count all signatures across all petitions
    const allPetitions = await Petition.find();
    const totalSignedPetitions = allPetitions.reduce((sum, petition) => sum + petition.signatures.length, 0);

    // Petition status breakdown including expired
    const activePetitions = await Petition.countDocuments({ 
      status: 'active',
      endDate: { $gte: now }
    });
    const achievedPetitions = await Petition.countDocuments({ status: 'achieved' });
    const closedPetitions = await Petition.countDocuments({ status: 'closed' });
    const expiredPetitions = await Petition.countDocuments({
      status: 'active',
      endDate: { $lt: now }
    });

    const petitionStatusData = [
      { name: 'Active', value: activePetitions },
      { name: 'Achieved', value: achievedPetitions },
      { name: 'Closed', value: closedPetitions },
      { name: 'Expired', value: expiredPetitions }
    ].filter(item => item.value > 0);

    // Poll status breakdown including expired
    const activePolls = await Poll.countDocuments({ 
      status: 'active',
      endDate: { $gte: now }
    });
    const closedPolls = await Poll.countDocuments({ status: 'closed' });
    const expiredPolls = await Poll.countDocuments({
      status: 'active',
      endDate: { $lt: now }
    });

    const pollStatusData = [
      { name: 'Active', value: activePolls },
      { name: 'Closed', value: closedPolls },
      { name: 'Expired', value: expiredPolls }
    ].filter(item => item.value > 0);

    res.json({
      totalPetitions,
      totalPolls,
      totalSignedPetitions,
      petitionStatusData,
      pollStatusData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
