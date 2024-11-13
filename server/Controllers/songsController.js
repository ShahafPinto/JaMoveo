const fs = require("fs");
const path = require("path");

const searchSongs = (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const queryLowerCase = query.toLowerCase();

  const dirPath = path.join(__dirname, "../assets");
  const files = fs.readdirSync(dirPath);

  let results = [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const song = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    song.forEach((line) => {
      line.forEach((part) => {
        if (part?.lyrics) {
          if (part.lyrics.toLowerCase().includes(queryLowerCase)) {
            results.push({
              file,
              song,
            });
          }
        }
      });
    });
  });
  console.log(results);
  res.json(results);
};

module.exports = { searchSongs };
