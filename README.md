# keyboard-configurator

[tenstad.github.io/keyboard-configurator](https://tenstad.github.io/keyboard-configurator/)

![img](https://i.imgur.com/abNzMBz.png)

## Developing

Install dependencies with `npm install` (or `pnpm install` or `yarn`).
Then start a development server:

```bash
npm run dev
```

## Debug Keyboard/Layout

Following code can be used to create a test keyboard (with lots of keys) and layout that combines all used keycodes in qmk_firmware.

```bash
echo '{"layouts":{"debug":{"layout":[' "$(for y in $(seq 0 186); do for x in $(seq 0 28); do echo "{\"matrix\": [$x, $y], \"x\": $x, \"y\": $y}",; done done)" "]" | sed "s/, \]/\]\}\}\}/" | jq -c
```

```bash
for kbd in $(find keyboards/ -name keymap.c | sed "s/keyboards\///;s/\/keymaps\//|/;s/\/keymap.c//"); do qmk c2json -kb $(echo $kbd | cut -d"|" -f1)  -km $(echo $kbd | cut -d"|" -f2); done > f
# some manuall fixes in f

echo "$(cat $(find . -name keymap.json) | jq -r .layers[][])" "$(cat f | jq -r .layers[][])" "$(cat $(find . -name 'keymap.c') | sed "s|//.*||;/\/\*/,/\*\//d" | tr -d " " | sed "s/$/XNLX/;s/[[:space:]]//g" | tr -d "\n" | sed "s/\[[A-Z0-9_]\+\]=LAYOUT[^(]*(/\n/g" | awk ' NR>1{n=1;for(i=1;i<=length($0);i++){c=substr($0,i,1);if(c=="(")n++;if(c==")")n--;if(n==0){printf "%s,",substr($0,0,i-1);break}}}' | sed "s/XNLX//g" | awk '{p=1;n=0;for(i=1;i<length($0);i++){c=substr($0,i,1);if(c=="(")n++;if(c==")")n--;if(c==","&&n==0){printf "%s\n",substr($0,p,i-p); p=i+1;}}}' | sed "s/^_*//;s/_*$//;")" | sort -u | sed 's/^/"/;s/$/",/' | tr "\n" " " | sed 's/^/\{"layers"\: \[\[/;s/, $/\]\]\}/' | jq -c
```
