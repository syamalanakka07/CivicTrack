const Issue = require('../models/Issue');

// Create new issue
const createIssue = async (req, res) => {
    const { title, description, category, location } = req.body;

    if (!title || !description || !category || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const issue = new Issue({
            title,
            description,
            category,
            location,
            user: req.user._id
        });

        const savedIssue = await issue.save();
        res.status(201).json(savedIssue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all issues
const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate('user', 'name email');
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's issues
const getMyIssues = async (req, res) => {
    try {
        const issues = await Issue.find({ user: req.user._id });
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get issue by ID
const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (issue) {
            res.json(issue);
        } else {
            res.status(404).json({ message: 'Issue not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createIssue, getAllIssues, getMyIssues, getIssueById };
