"use strict";

var inputTask = document.querySelector('#inputTask');
var submitBtn = document.querySelector('#submitBtn');
var toList = document.querySelector('#toList');
var numTask = document.querySelector('#numTask');
var cleanTask = document.querySelector('#cleanTask');
/* 資料先定義出來 */

var arrayTask = [{
  title: "\u8CC7\u6599\u5148\u5B9A\u7FA9\u51FA\u4F86"
}, {
  title: "\u8CC7\u6599\u8207\u6E32\u67D3\u756B\u9762\u5206\u958B"
}, {
  title: "\u6E32\u67D3\u756B\u9762"
}];
/* 加入資料到 arrayTask */

var addTaskFn = function addTaskFn() {
  var addTask = {
    title: ""
  };

  if (inputTask.value === "") {
    alert("\u9084\u6C92\u8F38\u5165\u4EFB\u52D9\u5594 !");
  } else {
    addTask.title = inputTask.value;
    arrayTask.push(addTask);
    inputTask.value = ""; // 執行 渲染畫面 Fn

    updateTaskFn();
  }
};
/* 刪除單筆任務 */


var delTaskFn = function delTaskFn(event) {
  // 取得索引值，參數.對象.自定義資料.自定義資料-名稱
  var delIndex = event.target.dataset.index; // 刪除陣列單筆資料，使用 splice(索引, 刪除幾筆)

  arrayTask.splice(delIndex, 1); // 預計要刪除 li元素，但是重新執行渲染畫面去更新畫面後就不用了
  // 執行 渲染畫面 Fn

  updateTaskFn();
  console.log(event.target.dataset.index);
};

var cleanTaskFn = function cleanTaskFn() {
  arrayTask = [];
  updateTaskFn();
};
/* 渲染畫面 Fn */


var updateTaskFn = function updateTaskFn() {
  // 撈出陣列資料組成 li字串
  var liTask = "";
  arrayTask.forEach(function (item, index) {
    liTask += "\n    <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n      <div class=\"form-check pl-0\">\n        <input type=\"checkbox\" id=\"listItem".concat(index, "\">\n        <label for=\"listItem").concat(index, "\" class=\"mb-0\">").concat(item.title, "</label>\n      </div>\n      <button type=\"button\" class=\"close d-flex\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\" data-index=\"").concat(index, "\">&times;</span>\n      </button>\n    </li>\n    ");
  }); // 更新 li資料

  toList.innerHTML = liTask; // 更新 刪除監聽事件

  var delTask = document.querySelectorAll('.close');
  delTask.forEach(function (item) {
    item.addEventListener('click', delTaskFn);
  }); // 更新 任務筆數

  numTask.textContent = "\u5171 ".concat(arrayTask.length, " \u7B46\u4EFB\u52D9");
  console.log(arrayTask);
};

submitBtn.addEventListener('click', addTaskFn);
cleanTask.addEventListener('click', cleanTaskFn);
//# sourceMappingURL=all.js.map
