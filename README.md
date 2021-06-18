# 概要

GAS での Slack 関連開発を楽にするための API ヘルパー。

## 利用方法

1. Apps Script のライブラリ追加画面を開く
2. `1nw2y6FDoHCffvhXaa1Go7mTKpdQewyDtFv_P-mo9_Abaf5lvllaReEBj` で検索
3. 最新バージョンを指定して追加

## 開発環境構築

GAS を外部から管理するためには Google Apps Script API を「オン」にしておく必要があります。
https://script.google.com/home/usersettings

```sh
npm init -y
npm install -D @google/clasp
npm install -S @types/google-apps-script
clasp clone "1nw2y6FDoHCffvhXaa1Go7mTKpdQewyDtFv_P-mo9_Abaf5lvllaReEBj"
```
