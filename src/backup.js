import { MongoClient } from "mongodb";
import fs from "fs-extra";
import path from "path";
import dayjs from "dayjs";
import { fileURLToPath } from 'url';

// === CONFIG ===
const MONGO_URI = "mongodb://localhost:27017";
const DATABASE_NAME = "realx";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_DIR = path.join(__dirname, "..", "backups");

async function backupDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collections = await db.collections();

    const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
    const backupPath = path.join(BACKUP_DIR, timestamp);
    await fs.ensureDir(backupPath);

    console.log(`🔄 Starting backup of ${collections.length} collections...`);

    for (const collection of collections) {
      const collectionName = collection.collectionName;
      const data = await collection.find({}).toArray();
      const filePath = path.join(backupPath, `${collectionName}.json`);
      await fs.writeJson(filePath, data, { spaces: 2 });

      console.log(`✅ Backed up '${collectionName}' (${data.length} documents)`);
    }

    console.log(`🎉 Backup completed at ${backupPath}`);
  } catch (err) {
    console.error("❌ Error during backup:", err);
  } finally {
    await client.close();
  }
}

backupDatabase();
