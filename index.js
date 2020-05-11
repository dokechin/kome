const fs = require('fs');
var path = require('path');

// アノテーションデータに含まれる全てのタグ（この順番にタグ番号を付与する）
const tags = ['rice', 'broken rice'];
const repo_name = 'kome';

let counter = 0;
const trainLists = [];
const testLists = [];
var lines = [];
const files = fs.readdirSync(__dirname);
let j=0;
for (let i = 0; i < files.length; i++) {
  // カレントディレクトリに存在する全ての JSON ファイルを取得する
  if (!files[i].match(/\.json$/)) continue;
  if (files[i].match('package.json')) continue;
  if (files[i].match('package-lock.json')) continue;
  console.log(files[i]);
  const data = JSON.parse(fs.readFileSync(files[i], 'utf8'));
  console.log(data.asset.name);
  data.regions.forEach((region) => {
    var columns = [];
    columns.push(...[
      tags.findIndex(tag => tag === region.tags[0]), // タグ番号
      (((region.points[0].x + region.points[1].x) / 2 ) / data.asset.size.width).toFixed(6), // 中心のx座標
      (((region.points[0].y + region.points[2].y) / 2 ) / data.asset.size.height).toFixed(6), // 中心のy座標
      ((region.boundingBox.width) / data.asset.size.width).toFixed(6), // Obj幅
      ((region.boundingBox.height) / data.asset.size.height).toFixed(6), // Obj高さ
    ]);
    lines.push(columns.join(' '));
  });
  const txt = './data/' + path.basename(data.asset.name, path.extname(data.asset.name)) + '.txt';
  console.log(txt);
  fs.writeFileSync(txt, lines.join('\n'));
  if ((j++ % 10) == 0) {
    testLists.push ( repo_name + '/data/' + data.asset.name);
  } else {
    trainLists.push ( repo_name + '/data/' + data.asset.name);
  }
  lines = [];
}

fs.writeFileSync('./train.txt', trainLists.join('\n'));
fs.writeFileSync('./test.txt', testLists.join('\n'));
