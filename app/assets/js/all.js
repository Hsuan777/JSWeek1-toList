let inputTask = document.querySelector('#inputTask');
let submitBtn = document.querySelector('#submitBtn');
let toList    = document.querySelector('#toList');
let numTask   = document.querySelector('#numTask');
let cleanTask = document.querySelector('#cleanTask');

/* 資料先定義出來 */
let arrayTask = [
  {
    title: `渲染畫面`
  }
];

/* click 加入資料到 arrayTask */
const addTaskFn = () => {
  let addTask = {
    title: ``
  };
  if (inputTask.value === ``) {
    alert(`還沒輸入任務喔 !`);
  } else {
    addTask.title = inputTask.value;
    arrayTask.push(addTask);
    inputTask.value = ``;

    // 執行 渲染畫面 Fn
    updateTaskFn();
  }
}

/* keydown 加入資料到 arrayTask */
const addTaskBtn =(event) =>{
  let addTask = {
    title: ``
  };
  if(event.keyCode === 13 && inputTask.value === ``){
    alert(`還沒輸入任務喔 !`); 
  } else if(event.keyCode === 13 ){
    addTask.title = inputTask.value;
    arrayTask.push(addTask);
    inputTask.value = ``;

    // 執行 渲染畫面 Fn
    updateTaskFn();
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
  console.log(event.target.dataset.index);
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
        <label for="listItem${index}" class="checkbox__label mb-0">${item.title}</label>
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





inputTask.addEventListener('keydown', addTaskBtn);
submitBtn.addEventListener('click', addTaskFn);
cleanTask.addEventListener('click', cleanTaskFn);
