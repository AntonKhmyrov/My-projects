'use strict'
// 1. В данном уроке я покажу вам реализацию игры "найди случайное число в таблице". Игровое поле представляет собой таблицу с числами, расположенными в случайном порядке.
//     Игрок должен находить числа в правильном порядке. После победы игровое поле расширяется на один ряд и одну колонку и игра продолжается далее.

// 1. Рендер таблицы (квадратов 4 штк)
// 2. Рендер квадратов 4 штк
// 3. Тасовка квадратов
// 4. Взаимодействие с пользователем

initGame(document.querySelector('#game1')); // container
// initGame(document.querySelector('#game2'))


// Инициализация игры
function initGame(container) {
   const field = createGameField(container);
   let size = 16; // 4 9 16 25 36 49 64 81 100 121 (как то автоматизировать)

   let arr = createArr(size)
   let sortingArr = sortArr(arr)

   arr = chunkArr(size, sortingArr)
   createGameCells(arr, field);


   console.log(arr);
}

// создание елемента таблица внутри container
function createGameField(container) {
   const table = document.createElement('table')
   container.append(table);

   return table;
}

// создание tr и td (елементов таблицы = <tr><td>...</td></tr>) с выведением значений в tableData
function createGameCells(arr, table) {
   for (let i = 0; i < arr.length; i++) {
      const tableRow = document.createElement('tr')
      for (let j = 0; j < arr.length; j++) {
         const tableData = document.createElement('td')
         tableData.classList.add('table-data', 'hidden')
         tableData.textContent = `${arr[i][j]}`
         tableRow.append(tableData)
      }
      table.append(tableRow)
   }
}

// получения рандомного числа
function getRandomNumber(min = 1, max = size) {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

// создаем масив для чанков length = size
function createArr(length) {
   let arr = []
   for (let num = 1; num <= length; num++) {
      arr.push(num)
   }
   return arr
}

// тосуем масив из createArr()
function sortArr(arr) {
   let result = arr.sort(() => 0.5 - Math.random());
   return result;
}

// создаем из входяещего масива чисел из sortArr() , масив внутри которого числа поделены на масивы в зависимости от size = ? (2, 3 ...more)
function chunkArr(size, arr) {
   let result = [];
   for (let i = 0; i < arr.length; i += (size / Math.sqrt(size))) {
      result.push(arr.slice(i, i + (size / Math.sqrt(size))));
   }
   return result;
}

const tableDataTogle = document.querySelectorAll('.table-data');

tableDataTogle.forEach((element) => {
   element.addEventListener('click', () => {
      element.classList.toggle('hidden')
      element.classList.toggle('visible')
   })
})










// функция для нахождения числе которые кратны своему корню(можно задать количество желаемых чисел)
// function findNumbers() {
//    let count = 0;

//    for (let number = 4; count < 10; number++) {
//       let squareRoot = Math.sqrt(number);

//       if (number % squareRoot === 0) {
//          console.log(number);
//          count++;
//       }
//    }
// }

// findNumbers();






















// И так :
// 1) В chunkArr() приходит наш size и arr из createArr() , в результате нам возвращаеться новый arr но уже в виде [[], [], []] <= arr чисто схематически .
// 2) В свою очередь , длина arr из chunkArr() так же берется из size тоесть arr.length == size

// 3) К size так же привязана creatGameCells() так как именно в нее в качестве параметров приходит arr от chunkArr() , (ну и field , но сейчас не о нем)

// function chunkArr(size, arr) {
//    let result = [];
//    for (let i = 0; i < arr.length; i += size) {
//       result.push(arr.slice(i, i + size));
//    }
//    return result;
// }

//  При таком выполнении функции мы сталкиваемся с тем что в size допустим заходит 9 , надеюсь логику создания верстки таблицы и tr td ты помнишь .

//  Так вот сейчас у нас зоходит: size = 9 , а теперь вернемся к пункту 1! (прочитал ?: именно , я тоже сначала подумал почему так вроде бы функция правильная , но мы же не будем туда
//  вечно все передавать ручками "нам нужна какая никакая но все же автоматизация") , так вот в arr тоже передаеться "size = 9" смотрим пункт 2! (получается что мы берем
//  масив из 9 елементов и делим его обратно на 9 : по выходу мы получаем такой же масив какой и вошел) но , у него длина не соотвествует size а она равна 1 и этот ленгз
//  попадает в creatGameCells() где параметр arr отвечает за количество tr td котороые мы отрендерим... и мы получаем (смотри первый скриншот) Один...назову его квадратик.


// Теперь , надеюсь ты посмотрел и почитал все что до этого было , теперь переходим к исправлению

// function chunkArr(size, arr) {
//    let result = [];
//    for (let i = 0; i < arr.length; i += (size / Math.sqrt(size))) {
//       result.push(arr.slice(i, i + (size / Math.sqrt(size))));
//    }
//    return result;
// }

// И так , к чему я пришел:
// 1) Что бы у меня получался нормальный масив (красиво и правильно делился на чанки) нужно его делить на корень этого числа ( в нашем члучае size задает длину масива)
// 2) Таким образом size / Math.sqrt(size) вот такое выражение делит нам наш масив на с [1, 2, ... 8, 9] на [[1, 2, 3] ... [7, 8, 9]]
// 3) Соотвественно коректно отрабатывает наш рендер так как длина масива приходит правильная , смотри скриншот 2!
