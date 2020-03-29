const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const through2 = require('through2');
const { pipeline } = require('stream');

const {
  getDecodedPos,
  getEncodedPos,
  applyCeaserCipher,
} = require('./apply-caesar-cipher');
through2;

const caesarCli = async () => {
  const shift = argv['shift'] || argv['s'];
  const action = argv['action'] || argv['a'];
  const input = argv['input'] || argv['i'];
  const output = argv['output'] || argv['o'];

  if (
    !shift ||
    typeof shift === 'boolean' ||
    !action ||
    typeof action === 'boolean'
  ) {
    console.log('Field argument "action" and "shift" are mandatory fields !!!');
    return;
  }

  const transform = through2(function (chunk, enc, callback) {
    const transformedText = applyCeaserCipher(
      chunk.toString(),
      shift,
      action === 'decode' ? getDecodedPos : getEncodedPos,
    );

    this.push(transformedText);

    callback();
  });

  const run = (transformFunc) => (readStream, writeStream) =>
    pipeline(readStream, transformFunc, writeStream, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log(`File with path ${input} do not exist.`);
        } else {
          console.error(err.message);
        }
      } else {
        console.log('Cipher is succeeded.');
      }
    });

  const running = run(transform);

  if (!input || typeof input === 'boolean') {
    running(process.stdin, fs.createWriteStream(output));
    return;
  }

  if (!output || typeof output === 'boolean') {
    running(fs.createReadStream(input), process.stdout);
    return;
  }

  running(fs.createReadStream(input), fs.createWriteStream(output));
};

module.exports = caesarCli();
