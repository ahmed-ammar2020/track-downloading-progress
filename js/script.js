"use strict";

const MyURL =
  "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100";

async function trackDownloadProgress(url) {
  // make the request
  const response = await fetch(url);
  // get the reader
  const reader = response.body.getReader();
  // get the full bytes
  const totalLength = +response.headers.get("Content-Length");

  // read the data
  let recievedLength = 0;
  let chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    chunks.push(value);
    recievedLength += value.length;
  }

  // gather all chunks into one agian to be able to extract the data => no rereading code can be done
  let chunksAll = new Uint8Array(recievedLength);
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }

  let result = new TextDecoder("utf-8").decode(chunksAll);

  console.log(JSON.parse(result));
}

trackDownloadProgress(MyURL);
