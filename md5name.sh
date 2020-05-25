#!/bin/bash
for F in ./data/image_*.jpg; do
  mv "$F" "./data/$(md5sum "$F" | cut -d' ' -f1).${F##*.}";
done
