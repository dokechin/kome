#!/bin/bash
for F in ./data/2020*.jpg; do
  mv "$F" "./data/$(md5sum "$F" | cut -d' ' -f1).${F##*.}";
done
