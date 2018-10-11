# gshark 開発環境構築方法

gshark のサーバサイド (Flask) の開発環境構築方法について説明します。

## セットアップ

`script/setup` コマンドで、自動で Python (3.5.4) と必要なパッケージをインストールできるようになっています。  
これらはすべて gshark の `tools/` ディレクトリ以下に置かれ、システムの環境を汚さずに gshark に閉じた環境を作ることができます。

```bash
$ git clone https://github.com/koki-sato/gshark.git
$ cd gshark
$ script/setup
```

## 起動

`script/start` コマンドで `tools/` に置いた pyenv 環境で Flask を立ち上げます。development モードで Flask サーバを立ち上げるには `-- dev` オプションを付けます。

```bash
# Flask サーバを立ち上げる
$ script/start
# もしくは下記でも同様
$ script/exec python app.py

# 開発用サーバを立ち上げる
$ script/start --dev
# もしくは下記でも同様
$ script/exec env FLASK_ENV=development python app.py
```

## その他

`script/exec` コマンドによって `tools/` に置いた pyenv 環境で任意のコマンドを実行することができます。

### Usage

```bash
$ script/exec <command> <args...>
```

### Example

```bash
# Python の対話モードを起動
$ script/exec python

# pip で新たなパッケージをインストール
$ script/exec pip install flask
# requirements.txt を更新
$ script/exec pip freeze -l > requirements.txt
```

## Lint

`flake8` により文法チェックを行うことができます。

```bash
# requirements-dev.txt をインストール
$ script/exec pip install -r requirements-dev.txt

# flake8 により文法チェック
$ script/exec flake8 --statistics

# autopep8 により自動フォーマット
$ script/exec autopep8 -ivr .
```
