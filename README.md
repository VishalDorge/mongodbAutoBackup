# 🗄️ MongoDB Auto Backup Script

A simple Node.js script to export all collections from a MongoDB database and save them as JSON files locally.  
It creates a new timestamped folder for each backup and is perfect for automating backups using a cron job — without needing to pay for MongoDB Atlas backup features.

---

## ✨ Features

- Connects to MongoDB using a connection string
- Exports **all collections** from the specified database
- Saves each collection as a `.json` file
- Creates a new folder with the current date-time inside a `backup/` folder
- Easy to schedule as a cron job for automatic backups

---

## 🛠️ Requirements

- Node.js (v14 or above)
- A valid MongoDB connection string (MongoDB Atlas or local)

---

## 🚀 Getting Started

1. **Clone the repo**
2. install node modules
3. npm start

📌 Why I Built This
MongoDB Atlas free tier doesn't support automatic backups unless you upgrade. I used to export my production data manually every week — collection by collection. Now, with this tiny script and a bit of AI help, it's fully automated.
Read more in my LinkedIn post.
