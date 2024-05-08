#!/bin/bash

# Read about Quarto redirects:
#   - https://github.com/quarto-dev/quarto-cli/discussions/2953
#   - https://quarto.org/docs/websites/website-navigation.html#redirects

rg --vimgrep "title:" --glob "*.qmd" --files-with-matches | while read -r FILE; do
  # echo $FILE
  FILE_PATH="$(dirname $FILE)"
  echo $FILE_PATH
  sed -i "s+\(title: .*\)+\1\naliases:\n  - /ereefs-aims/$FILE_PATH+g" $FILE
done
