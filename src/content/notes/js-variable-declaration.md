---
title: "JS-基礎變數宣告"
description: "var, let, const 變數宣告和差異"
pubDate: 2026-05-19
updatedDate: 2026-05-20
category: "JavaScript"
---

## JavaScript 常見的變數宣告方式有三種：

- `var`
- `let`
- `const`

現代在實務上會優先使用 `let` 和 `const`，盡量避免使用 `var`。
後面會講解不同變數宣告方式的差異。

### `var` 的歷史

`var` 是 JavaScript 在1995年誕生時唯一的變數宣告關鍵字，當初設計為了靈活性與容錯率，`var`的設計較為寬鬆，隨著網頁的發展，`var`的缺陷也越來越明顯。直到2015年ES6語法的出現 `let` 和 `const` 用來解決 `var` 的問題。

## `var`, `let`, `const` 的不同特性

### `var`

`var` 只有 函式作用域 (Function Scope)，所以 `var  a = 1` 不會被 `{}` 限制作用域，這樣 `console.log(a)` 才能印出 1

```js
if (true) {
  var a = 1;
}

console.log(a); // 輸出 1
```

`var`可以重新賦值也可以重複宣告：

```js
//重新賦值
var b = 2;
b = 2;
console.log(b); // 輸出 2

//重複宣告
var c = 3;
var c = 4;
console.log(c); // 輸出 4
```

### `let`

`let` 是 區塊作用域(Block scope)，所以 `let c = 3` 會被 `{}` 限制作用域，這樣 `console.log(c)` 就會報錯，如果在區塊外 `console.log(c)`， 結果會是 `c` 沒有被定義的錯誤。

```js
if (true) {
  let c = 3;
}

console.log(c); // ReferenceError: c is not defined
```

`let` 可以重新賦值但是不可以重複宣告，如果重複宣告會語法錯誤

```js
let c = 2;
c = 3;
console.log(c); // 輸出 3
//可以重新賦值

let d = 4;
let d = 5;
console.log(d); // SyntaxError: Identifier 'd' has already been declared
//結果會語法錯誤 因為 d 己經被宣告過了
```

### `const`

`const`也是 區塊作用域(Block Scope)，他跟let最大的差別是就是不能重新賦值，如果重新賦值
結果會是，類型錯誤：分配給常數變數。

```js
const e = 6;
e = 7;
console.log(e); // TypeError: Assignment to constant variable.
```

# `let` vs `const` 特性比較

| 宣告方式 | 可重新賦值 | 可重複宣告 | 作用域     | 建議           |
| -------- | ---------- | ---------- | ---------- | -------------- |
| `var`    | 可以       | 可以       | 函式作用域 | 盡量避免       |
| `let`    | 可以       | 不可以     | 區塊作用域 | 需要改值時使用 |
| `const`  | 不可以     | 不可以     | 區塊作用域 | 預設優先使用   |
