let inputTask = document.querySelector('#inputTask');
let submitBtn = document.querySelector('#submitBtn');
let toList = document.querySelector('#toList');
let numTask = document.querySelector('#numTask');
let cleanTask = document.querySelector('#cleanTask');
let dropdownText = document.querySelector('.dropdown-toggle');
let dropdownMenu = document.querySelector('.dropdown-menu');



/* 資料先定義出來 */
let arrayTask = [
  {
    title: `全部完成給自己鼓勵吧! %%%%%`,
    level: `text-warning`
  }
];

/* click 加入資料到 arrayTask */
const addTaskFn = () => {
  let addTask = {
    title: ``,
    level: ``
  };
  if (inputTask.value === ``) {
    alert(`還沒輸入任務喔 !`);
  } else {
    addTask.title = inputTask.value;
    switch (dropdownText.textContent) {
      case `緊急`:
        addTask.level = `text-danger`;
        break;
      case `重要`:
        addTask.level = `text-warning`;
        break;
    }

    arrayTask.push(addTask);
    inputTask.value = ``;

    // 執行/更新 渲染畫面 Fn
    updateTaskFn();
    console.log()
  }
}

/* keydown 加入資料到 arrayTask */
const addTaskBtn = (event) => {
  if (event.keyCode === 13) {
    addTaskFn();
  }
}

/* 刪除單筆任務 */
const delTaskFn = (event) => {
  // 取得索引值，參數.對象.自定義資料.自定義資料-名稱
  let delIndex = event.target.dataset.index;

  // 刪除陣列單筆資料，使用 splice(索引, 刪除幾筆)
  arrayTask.splice(delIndex, 1);
  // 預計要刪除 li元素，但是重新執行渲染畫面去更新畫面後就不用了

  // 執行 渲染畫面 Fn
  updateTaskFn();
}

/* 清空任務  */
const cleanTaskFn = () => {
  arrayTask = [];
  updateTaskFn();
}

/* 渲染畫面 Fn */
const updateTaskFn = () => {
  // 撈出陣列資料組成 li字串
  let liTask = ``;
  arrayTask.forEach(function (item, index) {
    liTask += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div class="form-check pl-0">
        <input type="checkbox" id="listItem${index}" class="checkbox">
        <label for="listItem${index}" class="checkbox__label ${item.level} mb-0">${item.title}</label>
      </div>
      <button type="button" class="close d-flex" aria-label="delete">
          <span aria-hidden="true" data-index="${index}">&times;</span>
      </button>
    </li>
    `
  });

  // 更新 li資料
  toList.innerHTML = liTask;

  // 更新 刪除監聽事件
  let delTask = document.querySelectorAll('.close');
  delTask.forEach(function (item) {
    item.addEventListener('click', delTaskFn);
  })

  // 更新 任務筆數
  numTask.textContent = `共 ${arrayTask.length} 筆任務`;
  console.log(arrayTask);
}

/* 判斷文字並上色 */
const textFn = (event) => {
  console.log(event.target.textContent)
  switch (event.target.textContent) {
    case `緊急`:
      dropdownText.textContent = event.target.textContent;
      inputTask.classList.add('input__danger');
      inputTask.classList.remove('input__warning');
      break;
    case `重要`:
      dropdownText.textContent = event.target.textContent;
      inputTask.classList.add('input__warning');
      inputTask.classList.remove('input__danger');
      break;
    case `普通`:
      dropdownText.textContent = event.target.textContent;
      inputTask.classList.remove('input__warning', 'input__danger');
      break;
  }
}



inputTask.addEventListener('keydown', addTaskBtn);
submitBtn.addEventListener('click', addTaskFn);
cleanTask.addEventListener('click', cleanTaskFn);

dropdownMenu.addEventListener('click', textFn);