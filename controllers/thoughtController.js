const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // must add thought to user model
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thought: thought._id} },
        { new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Post created, but found no user with that ID' });
      }
      res.json('Created the post 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
  
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id" });
      }
      
      // must delete thought from user
      const user = await User.findOneAndUpdate(
        { thought: req.params.id },
        { $pull: { thought: req.params.id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json({ message: "deleted" });
    } 
    catch (err) {
      res.json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction
  async createReaction(req, res) {
    try {
      // grabbing the thought model and adding a reaction to the set 
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $addToSet: { reactions: req.body }  },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $pull: { reactions: { reactionid: req.body.reactionid }}},
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(thought);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },
};
