# gshark フロントエンド開発方法

gshark のフロントエンドの開発方法について説明します。

`script/client` コマンドを利用することで、システムの環境を汚さずに gshark に閉じた開発環境を作ることができます。  
Node のインストールに `nodenv` 、 npm のパッケージマネージャーに `yarn` を使っています。

## Setup

以下のコマンドで、自動で Node と必要なパッケージをインストールできるようになっています。  

```bash
$ script/client setup
```

## Build

```bash
$ script/client build

# もしくは下記でも同様
$ script/client exec yarn run build
```

JavaScript のみ (CSS のみ) ビルドしたい場合には以下のようにします。

```bash
# JS のみビルド
$ script/client exec yarn run build:js

# CSS のみビルド
$ script/client exec yarn run build:css
```

## Watch

ファイルの変更を監視して、変更があった場合にビルドします。

```bash
$ script/client watch

# もしくは下記でも同様
$ script/client exec yarn run watch
```

## Lint

[TSLint](https://palantir.github.io/tslint/) を用いて TypeScript の静的検証を行います。

```bash
$ script/client lint

# もしくは下記でも同様
$ script/client exec yarn run lint
```

## Format

[Prettier](https://prettier.io/) を用いて TypeScript, SCSS のコードをフォーマットします。

```bash
$ script/client format

# もしくは下記でも同様
$ script/client exec yarn run format
```
