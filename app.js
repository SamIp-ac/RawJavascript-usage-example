import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const osmd = require('opensheetmusicdisplay');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, API!');
  });

app.post('/upload', (req, res) => {
  const dataUrl = req.body.dataUrl;
  const buffer = Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const reader = new osmd.FileStream(buffer);
  const loader = new osmd.MusicXmlParser();
  const score = loader.load(reader);
  const osmd = new osmd.OpenSheetMusicDisplay('osmdCanvas');
  osmd.setSheetMusic(score);
  const svg = osmd.renderToSVG();
  res.json({ svg });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
