const sessionModel = require("../Models/sessionModel");

const createRehearsalSession = async (req, res) => {
    const { _id } = req.body;

    if (!_id) return res.status(400).json({ message: "User ID is required" });

    res.status(200).json({ message: `User ${_id} added to rehearsal room` });
};

module.exports = { createRehearsalSession };

const findUserSession = async (req, res) => {
    const userId = req.params._id;

    try{
        const session = await sessionModel.findOne({members: {$in: [userId]}});
        res.status(200).json(session);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = { createRehearsalSession , findUserSession };