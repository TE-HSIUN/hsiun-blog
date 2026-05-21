---
title: "Git 的一些常用指令"
description: "持續記錄 Git 的一些常用指令"
pubDate: 2026-05-22
category: "Git"
---

### 檢查 Git 的版本，可以但電腦是否有安裝 Git。

```zsh
git --version
git -v # 縮寫
```

### 查看 Git 目前生效的設定值

```zsh
git config --list
```

### 設定 user.name 和 user.email

```zsh
# 設定全域使用者名稱
git config --global user.name "username"

# 設定全域使用者信箱
git config --global user.email "email@example.com"

#有加 --global 代表全域設定。
```

### 初始化專案

```zsh
# 初始化專案，會新增.git資料夾，通常為隱藏資料夾
git init

# 查看專案狀態
git status

# 查看未暫存的修改
git diff

# 查看已暫存的修改
git diff --staged
```

### 暫存區操作

```zsh
# 把目前資料夾底下所有變更加入暫存區
git add .

# 新增單一檔案或資料夾到暫存區
git add "檔案名稱或資料夾名稱"

# 第一次 commit 前，取消新檔案暫存
git rm --cached "檔案名稱或資料夾名稱"

# 已經有 commit 紀錄後，取消暫存
git restore --staged "檔案名稱或資料夾名稱"
```

### Commit 版本紀錄

```zsh
# 建立一筆版本紀錄
git commit -m "這次修改內容"

# 修改最後一次 commit 的訊息
git commit --amend -m "新的訊息"

# 把這次修改合併進上一個 commit，不修改原本訊息
git commit --amend --no-edit

# 自動暫存已追蹤檔案的修改並提交，不包含新檔案
git commit -a -m "這次修改內容"

# 也可以合在一起寫
git commit -am "這次修改內容"

#git commit -am 只會處理已經被 Git 追蹤過的檔案，不包含全新檔案。
```

### 查看 Commit 相關資訊

```zsh
# 查看 commit 歷史
git log

# 單行顯示 commit
git log --oneline

# 限制顯示幾個 commit
git log -n "數量"

# 查看本機 HEAD 移動紀錄，常用來找回誤刪、reset 後消失的 commit
git reflog

# 查看特定人的 commit
git log --oneline --author= "使用者名稱"

# 查看 commit 訊息包含特定文字的紀錄
git log --oneline --grep= "哈囉"

# 查看特定時間區間的 commit
git log --oneline --since="2026-03-29 10:22pm" --until="10:30pm"

# 查看每一行程式碼是誰寫的
git blame "檔名"
```
