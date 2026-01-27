import Petition from '../models/Petition.js';

export const createPetition = async (req, res) => {
  try {
    const { title, description, category, location, endDate, targetSignatures } = req.body;

    const petition = await Petition.create({
      title,
      description,
      category,
      location,
      endDate,
      targetSignatures,
      createdBy: req.user._id
    });

    res.status(201).json(petition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPetitions = async (req, res) => {
  try {
    const { search, category, status, location, createdBy } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }
    
    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }
    
    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // CreatedBy filter (for My Petitions tab)
    if (createdBy) {
      query.createdBy = createdBy;
    }
    
    const petitions = await Petition.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(petitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPetitionById = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('signatures.user', 'name email');
    
    if (!petition) {
      return res.status(404).json({ message: 'Petition not found' });
    }
    
    res.json(petition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: 'Petition not found' });
    }

    // Check if already signed
    const alreadySigned = petition.signatures.some(
      sig => sig.user.toString() === req.user._id.toString()
    );

    if (alreadySigned) {
      return res.status(400).json({ message: 'Already signed this petition' });
    }

    // Add signature
    petition.signatures.push({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email
    });

    // Check if target reached
    if (petition.signatures.length >= petition.targetSignatures) {
      petition.status = 'achieved';
    }

    await petition.save();
    res.json(petition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSignedPetitions = async (req, res) => {
  try {
    const petitions = await Petition.find({
      'signatures.user': req.user._id
    }).populate('createdBy', 'name email');
    
    res.json(petitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
