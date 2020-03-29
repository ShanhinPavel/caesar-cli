# Caesar cipher

This util encodes and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

CLI accept 4 options (short alias and full name):
1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

### Run:
npm install

**Usage example:**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
