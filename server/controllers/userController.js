const express = require('express');
const User = require('../models/userModel.js');
const Track = require('../models/trackModel.js');

const userController = {};

// get all of user's faved tracks
userController.getTracks = async (req, res, next) => {
    const { user_id } = req.params;
    try {
      const user = await User.findOne({user_id: user_id}).exec();
      if (!user) return next({log: 'user doens\'t exist'});
      
      const userTracks = [];
      for (let i = 0 ; i < user.tracks.length; i++) {
        const track = await Track.findById(user.tracks[i]._id).exec();
        userTracks.push(track);
      }
      res.locals.tracks = userTracks;
      return next();
    } catch (error) {
        return next ({
            log: `Error in userController.getTracks. ERROR: ${error}`,
            message: 'Error in userController.getTracks'
        })
    };
};

// create a new track to that user's DB
userController.createTrack = async (req, res, next) => {
    console.log("Entered the middleware");

    const { user_id } = req.params;
    const track = req.body;

    console.log('user id', user_id)
    console.log('body', req.body)
    try {
      const newTrack = await Track.create({
        spotify_id: track.id,
        genre: track.genre,
        image: track.album.images[0].url,
        title: track.name,
        artist: track.artists[0].name,
        albumName: track.album.name,
        preview: track.preview_url
      });
      const updatedUser = await User.findOneAndUpdate({ user_id: user_id }, { $push: { tracks: newTrack._id } }, { new: true });
      res.locals.updatedUser = updatedUser;
      return next();
    } catch (error) {
        return next ({
            log: `Error in userController.createTracks. ERROR: ${error}`,
            message: 'Error in userController.createTracks'
        })
    };
};

module.exports = userController;