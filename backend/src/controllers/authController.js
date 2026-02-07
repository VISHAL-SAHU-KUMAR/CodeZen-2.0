const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName, phone, location } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Create user
    const user = new User({
      username,
      email,
      password,
      fullName,
      phone,
      location
    });

    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
        stats: user.stats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
        location: user.location,
        stats: user.stats,
        achievements: user.achievements
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -verificationToken -resetPasswordToken')
      .populate('followers', 'username fullName avatar')
      .populate('following', 'username fullName avatar');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['fullName', 'bio', 'phone', 'location', 'farmDetails', 'avatar', 'language'];

    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user by ID (public profile)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('username fullName avatar bio location experience stats achievements role expertise rating reviews followers following farmDetails.crops')
      .populate('followers', 'username fullName avatar')
      .populate('following', 'username fullName avatar');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Follow/Unfollow user
exports.toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ success: false, message: 'Cannot follow yourself' });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      success: true,
      isFollowing: !isFollowing,
      message: isFollowing ? 'Unfollowed successfully' : 'Following successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get experts list
exports.getExperts = async (req, res) => {
  try {
    const { expertise, status, sortBy } = req.query;

    const query = { role: 'expert' };
    if (expertise) query.expertise = expertise;
    if (status) query['availability.status'] = status;

    let sort = { rating: -1 };
    if (sortBy === 'rate') sort = { rate: 1 };
    if (sortBy === 'reviews') sort = { reviews: -1 };

    const experts = await User.find(query)
      .select('fullName avatar expertise rating reviews rate availability bio')
      .sort(sort)
      .limit(20);

    res.json({ success: true, experts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add achievement
exports.addAchievement = async (req, res) => {
  try {
    const { id, title, icon, description } = req.body;

    const user = await User.findById(req.user.id);

    const existingAchievement = user.achievements.find(a => a.id === id);
    if (existingAchievement) {
      return res.status(400).json({ success: false, message: 'Achievement already unlocked' });
    }

    user.achievements.push({
      id,
      title,
      icon,
      description,
      unlockedAt: new Date()
    });

    user.stats.points += 100;
    await user.save();

    res.json({ success: true, achievement: user.achievements[user.achievements.length - 1] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
