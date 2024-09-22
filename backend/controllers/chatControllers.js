const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// Create or fetch One to One Chat
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Validate userId
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.status(400).json({ message: "User ID not provided" });
  }

  // Check if chat already exists
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (chat) {
    res.json(chat);
  } else {
    const chatData = {
      chatName: "sender", // Placeholder, could be improved
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findById(createdChat._id).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// Fetch all chats for a user
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).json(populatedChats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create New Group Chat
const createGroupChat = asyncHandler(async (req, res) => {
  const { users: usersJson, name } = req.body;

  if (!usersJson || !name) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  let users;
  try {
    users = JSON.parse(usersJson); // Parse users from JSON
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  users.push(req.user._id); // Add the requesting user to the group

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rename Group
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName: chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).json({ message: "Chat Not Found" });
  }

  res.json(updatedChat);
});

// Remove user from Group
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat || !chat.groupAdmin.equals(req.user._id)) {
    return res.status(403).json({ message: "Only admins can remove users." });
  }

  const removedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedChat) {
    return res.status(404).json({ message: "Chat Not Found" });
  }

  res.json(removedChat);
});

// Add user to Group
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat || !chat.groupAdmin.equals(req.user._id)) {
    return res.status(403).json({ message: "Only admins can add users." });
  }

  const addedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedChat) {
    return res.status(404).json({ message: "Chat Not Found" });
  }

  res.json(addedChat);
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
