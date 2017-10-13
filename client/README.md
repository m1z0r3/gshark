# How to develop client

gshark のフロントエンドの開発方法について説明します。

基本的に、作業は `client/` 以下で行います。また、 npm のパッケージマネージャーに `yarn` を使っています。

## Setup

```bash
$ yarn install
```

## Build

```bash
$ yarn run build
```

JavaScript のみ (CSS のみ) ビルドしたい場合には以下のようにします。

```bash
# JS のみビルド
$ yarn run build:js

# CSS のみビルド
$ yarn run build:css
```

## Watch

ファイルの変更を監視して、変更があった場合にビルドします。

```bash
$ yarn run watch
```

## Format

`prettier` を用いて JavaScript, SCSS のコードをフォーマットします。

```bash
$ yarn run format
```
