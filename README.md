# ENDO deep learning

## Preparing Darknet training

### Save image files
Save Image file to data directory

### Making annotation datas
Using Microsoft Annotation tool VOTT v2.1
Cutting out objects from images and labeling.
Export data using Tensorflow Pascal VOC format. 

### Convert txt format
run node index.js
Change VOC format to darknet txt format.

## Train using Google Colab

### Install darknet
```
%%bash
cd /content
rm -rf darknet
git clone https://github.com/pjreddie/darknet
cd  darknet
sed -i 's/GPU=0/GPU=1/g' Makefile
make
```

### Mount google drive
```
from google.colab import drive
drive.mount('/content/gdrive')
%cd /content
!ln -s /content/gdrive/My\ Drive/ Drive
```

### Checkout learning data and train
```
%%bash
pwd
ls -la
cd /content/darknet
rm -rf endo_kun
git clone https://github.com/dokechin/endo_kun
mkdir endo_kun/backup
./darknet detector train endo_kun/data.txt endo_kun/yolov3-tiny-train.cfg
```
