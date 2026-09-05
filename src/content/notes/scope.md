---
title: "JS-Scope 作用域"
description: "來釐清不同作用域的差別"
pubDate: 2026-05-21
category: "JavaScript"
---

## 作用域 Scope 是什麼

> 作用域是變數、函式、常數可以被存取的範圍，在哪裡宣告就會影響它能在哪裡被使用。

### JavaScript 裡會遇到三種作用域：

- 函式作用域 (function scope)
- 區塊作用域 (block scope)
- 全域作用域 (global scope)

---

#### 全域作用域 (global scope)

沒有被包在函式或區塊裡的變數，也稱為全域變數(global variable)。

```js
const scopeType = "global";

function test() {
  console.log(scopeType);
}
test(); // 印出 global

if (true) {
  console.log(scopeType); // 印出 global
}
```

原本在 function 和 block 裡面都沒有 `scopeType` 變數，所以會往外層找。
找到全域作用域裡有 `scopeType` 變數，所以才可以印出來。  
如果一路找到全域作用域都找不到，就會出現 `ReferenceError: scopeType is not defined`。

---

#### 函式作用域 (function scope)

宣告在函式裡的變數

```js
function test() {
  const scopeType = "function";
  console.log(scopeType);
}

test(); // 印出 function
console.log(scopeType); // 印出 ReferenceError: scopeType is not defined
```

執行到 `test()` 時在函式裡宣告了 `scopeType` 變數，所以函式裡的 `console.log(scopeType)` 可以印出來  
`scopeType` 只有在函式裡才有作用，所以最後的 `console.log(scopeType)` 會找不到 `scopeType` 變數。

---

#### 區塊作用域 (block scope)

區塊作用域是由一組 {} 建立的範圍，例如 if、for、while 或單純的 {}。

```js
if (true) {
  let age = 18;
  const name = "Amy";

  console.log(age); // 18
  console.log(name); // Amy
}

console.log(age); // ReferenceError: age is not defined
console.log(name); // ReferenceError: name is not defined
```

在區塊裡宣告的變數只有在區塊裡有作用，所以最後的 `console.log(age)` 和 `console.log(name)` 會找不到 `age` 和 `name` 變數。

---

## 作用域鏈 Scope Chain

當 JavaScript 找變數時，會先從目前的作用域開始找。如果找不到，就會往外層找，直到全域作用域：

```js
const globalText = "global";

function outer() {
  // 2. 進入 outer
  const outerText = "outer";

  function inner() {
    // 4. 進入 inner
    const innerText = "inner";

    console.log(innerText); // inner
    console.log(outerText); // outer
    console.log(globalText); // global
  }

  inner(); // 3. 呼叫 inner
}

outer(); // 1. 呼叫 outer
```

這裡的呼叫流程會一層一層往內執行，先呼叫 `outer()`，再進入 `outer()` 裡呼叫 `inner()`。當執行到 `inner()` 裡的 `console.log` 時，如果目前作用域找不到變數，就會沿著作用域鏈往外層找。

作用域鏈不會主動往下一層去找，只有在找不到變數時才會往外層找：

```js
function outer() {
  const outerValue = "outside";

  function inner() {
    const innerValue = "inside";
    console.log(outerValue); // outside
  }

  inner();
  console.log(innerValue); // ReferenceError
}

outer();
```

`console.log(innerValue);` 在 `outer()` 裡執行時，只會從 `outer` 作用域往外找，不會往內層的 `inner` 作用域找，所以會報錯。

---

#### 變數查找的順序變數查找是從目前作用域開始，找不到才會往外層作用域找，不會往內層作用域找。

#### 不同的宣告方式有不同作用域的規則，可以搭配這篇文章一起看：[JS-基礎變數宣告](../js-variable-declaration/)
