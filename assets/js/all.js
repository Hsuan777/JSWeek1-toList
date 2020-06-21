"use strict";

var inputTask = document.querySelector('#inputTask');
var submitBtn = document.querySelector('#submitBtn');
var toList = document.querySelector('#toList');
var numTask = document.querySelector('#numTask');
var cleanTask = document.querySelector('#cleanTask');
var dropdownText = document.querySelector('.dropdown-toggle');
var dropdownMenu = document.querySelector('.dropdown-menu');
/* 資料先定義出來 */

var arrayTask = [{
  title: "\u5168\u90E8\u5B8C\u6210\u7D66\u81EA\u5DF1\u9F13\u52F5\u5427! %%%%%",
  level: "text-warning"
}];
/* click 加入資料到 arrayTask */

var addTaskFn = function addTaskFn() {
  var addTask = {
    title: "",
    level: ""
  };

  if (inputTask.value === "") {
    alert("\u9084\u6C92\u8F38\u5165\u4EFB\u52D9\u5594 !");
  } else {
    addTask.title = inputTask.value;

    switch (dropdownText.textContent) {
      case "\u7DCA\u6025":
        addTask.level = "text-danger";
        break;

      case "\u91CD\u8981":
        addTask.level = "text-warning";
        break;
    }

    arrayTask.push(addTask);
    inputTask.value = ""; // 執行/更新 渲染畫面 Fn

    updateTaskFn();
    console.log();
  }
};
/* keydown 加入資料到 arrayTask */


var addTaskBtn = function addTaskBtn(event) {
  if (event.keyCode === 13) {
    addTaskFn();
  }
};
/* 刪除單筆任務 */


var delTaskFn = function delTaskFn(event) {
  // 取得索引值，參數.對象.自定義資料.自定義資料-名稱
  var delIndex = event.target.dataset.index; // 刪除陣列單筆資料，使用 splice(索引, 刪除幾筆)

  arrayTask.splice(delIndex, 1); // 預計要刪除 li元素，但是重新執行渲染畫面去更新畫面後就不用了
  // 執行 渲染畫面 Fn

  updateTaskFn();
};
/* 清空任務  */


var cleanTaskFn = function cleanTaskFn() {
  arrayTask = [];
  updateTaskFn();
};
/* 渲染畫面 Fn */


var updateTaskFn = function updateTaskFn() {
  // 撈出陣列資料組成 li字串
  var liTask = "";
  arrayTask.forEach(function (item, index) {
    liTask += "\n    <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n      <div class=\"form-check pl-0\">\n        <input type=\"checkbox\" id=\"listItem".concat(index, "\" class=\"checkbox\">\n        <label for=\"listItem").concat(index, "\" class=\"checkbox__label ").concat(item.level, " mb-0\">").concat(item.title, "</label>\n      </div>\n      <button type=\"button\" class=\"close d-flex\" aria-label=\"delete\">\n          <span aria-hidden=\"true\" data-index=\"").concat(index, "\">&times;</span>\n      </button>\n    </li>\n    ");
  }); // 更新 li資料

  toList.innerHTML = liTask; // 更新 刪除監聽事件

  var delTask = document.querySelectorAll('.close');
  delTask.forEach(function (item) {
    item.addEventListener('click', delTaskFn);
  }); // 更新 任務筆數

  numTask.textContent = "\u5171 ".concat(arrayTask.length, " \u7B46\u4EFB\u52D9");
  console.log(arrayTask);
};
/* 判斷文字並上色 */


var textFn = function textFn(event) {
  console.log(event.target.textContent);

  switch (event.target.textContent) {
    case "\u7DCA\u6025":
      dropdownText.textContent = event.target.textContent;
      inputTask.classList.add('input__danger');
      inputTask.classList.remove('input__warning');
      break;

    case "\u91CD\u8981":
      dropdownText.textContent = event.target.textContent;
      inputTask.classList.add('input__warning');
      inputTask.classList.remove('input__danger');
      break;

    case "\u666E\u901A":
      dropdownText.textContent = event.target.textContent;
      inputTask.classList.remove('input__warning', 'input__danger');
      break;
  }
};

inputTask.addEventListener('keydown', addTaskBtn);
submitBtn.addEventListener('click', addTaskFn);
cleanTask.addEventListener('click', cleanTaskFn);
dropdownMenu.addEventListener('click', textFn);
//# sourceMappingURL=all.js.map
