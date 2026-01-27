import Poll from '../models/Poll.js';

export const createPoll = async (req, res) => {
  try {
    const { question, description, category, location, endDate, options, expiresAt } = req.body;

    const poll = await Poll.create({
      question,
      description,
      category,
      location,
      endDate,
      options: options.map(opt => ({ text: opt, votes: [] })),
      expiresAt,
      createdBy: req.user._id
    });

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPolls = async (req, res) => {
  try {
    const { search, category, status, location, createdBy } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
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
    
    // CreatedBy filter (for My Polls tab)
    if (createdBy) {
      query.createdBy = createdBy;
    }
    
    const polls = await Poll.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const votePoll = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (poll.status === 'closed') {
      return res.status(400).json({ message: 'Poll is closed' });
    }

    const alreadyVoted = poll.options.some(option =>
      option.votes.some(vote => vote.user.toString() === req.user._id.toString())
    );

    if (alreadyVoted) {
      return res.status(400).json({ message: 'Already voted in this poll' });
    }

    poll.options[optionIndex].votes.push({ user: req.user._id });
    await poll.save();
    
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
