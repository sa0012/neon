#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m '添加文档'

git push -f git@github.com:ryanschen/docs-mui-vue.git master:master

cd -