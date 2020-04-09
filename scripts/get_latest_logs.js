/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const https = require('https'),
      fs   = require('fs'),
      path = require('path');

const dataPath = path.join(__dirname, '..', 'data');

const logSources = [
  {
    name: "apple",
    url: "https://valid.apple.com/ct/log_list/current_log_list.json",
    tempfile: "apple_current_logs.json",

  },
  {
    name: "google",
    url: "https://www.gstatic.com/ct/log_list/v2/all_logs_list.json",
    tempfile: "google_current_logs.json",
  }
];

function download(urlString, filename="", log=true) {
  if(filename==="") {
    const downloadUrl = new URL(urlString);
    const urlFile = downloadUrl.pathname.substring(downloadUrl.pathname.lastIndexOf('/')+1);

    filename = path.join(dataPath, urlFile);
  }
  const file = fs.createWriteStream(filename);

  https.get(urlString, (response) => {
    if(log) {
      console.log(`Downloading ${urlString} to ${filename}`);
    }
    response.pipe(file);
  });
}

logSources.forEach(source => {
  const outputPath = path.join(dataPath, source.tempfile);
  download(source.url, outputPath);
});
