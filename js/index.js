/*** ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ***/
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let minWeight = null; // инициализация минимального веса
let maxWeight = null; // инициализация максимального веса
let previousArr = []; // инициализация массива для предыдцщего порядка
let currentArr = []; // инициализация массива для нового порядка
let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
sortKindLabel.textContent = sortKind; // инициализация текущего значения сортировки
sortTimeLabel.textContent = sortTime; // инициализация текущего значения времени

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "className": "violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "className": "green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "className": "carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "className": "yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "className": "lightbrown"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// полчуение имени класса для фрукта
function classGenerator(value) {
  const className = fruits[value].className;
  return className;
};

// получение индекса фрукта
function indexGenerator(value) {
  const index = value;
  return index;
};

// получение сорта фрукта
function kindGenerator(value) {
  const kind = fruits[value].kind;
  return kind;
};

// получение цвета фрукта
function colorGenerator(value) {
  const color = fruits[value].color;
  return color;
};

// получение веса фрукта
function weightGenerator(value) {
  const weight = fruits[value].weight;
  return weight;
};

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // очистка fruitsList от вложенных элементов
  while (fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild);
  }
  // создание вложенных элементов внутри fruitsList
  for (let i = 0; i < fruits.length; i++) {
    // создание элемента списка (одного фрукта)
    let newFruitLi = document.createElement("li");
    newFruitLi.className = `fruit__item ` + `fruit_${classGenerator(i)}`;
    fruitsList.appendChild(newFruitLi);
    // создание блочного элемента внтури элемента списка
    let newFruitDiv = document.createElement("div");
    newFruitDiv.className = "fruit__info";
    newFruitLi.appendChild(newFruitDiv);
    // создание блочного элемента для индекса
    let indexDiv = document.createElement("div");
    indexDiv.innerHTML = `index: ` + indexGenerator(i);
    newFruitDiv.appendChild(indexDiv);
    // создание блочного элемента для сорта
    let kindDiv = document.createElement("div");
    kindDiv.innerHTML = `kind: ` + kindGenerator(i);
    newFruitDiv.appendChild(kindDiv);
    // создание блочного элемента для цвета
    let colorDiv = document.createElement("div");
    colorDiv.innerHTML = `color: ` + colorGenerator(i);
    newFruitDiv.appendChild(colorDiv);
    // создание блочного элемента для веса
    let weightDiv = document.createElement("div");
    weightDiv.innerHTML = `weight (кг): ` + weightGenerator(i);
    newFruitDiv.appendChild(weightDiv);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  previousArr = []; // обнуление массива
  previousArr = previousArr.concat(fruits); // сохранение порядка до перемешивания

  let result = []; // инициализация сортировочного массива

  while (fruits.length > 0) {
    const randomValue = getRandomInt(0, fruits.length - 1);
    const currentFruit = fruits[randomValue]; // получение случайного элемента
    result.push(currentFruit); // добавление полученного элемента в result
    fruits.splice(randomValue, 1); // удаление полученного элемента из fruits
  }

  currentArr = result; // сохранение порядка после перемешивания
  fruits = result;
};

// сравнение с предыдущим порядком
const comparation = (previous, current) => {
  let counter = 0; // инициализация счетчика различий

  // поэлементное сравнение массивов
  for (let i = 0; i < previous.length; i++) {
    if (previous[i] === current[i]) {
      counter += 1;
    }
  }

  if (counter == previous.length) {
    alert('Порядок не изменился!')
  }
};

// действие по кнопке "Перемешать"
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
  comparation(previousArr, currentArr);
});

/*** ФИЛЬТРАЦИЯ ***/

// обработка введенного веса
const weightProcessing = () => {
  // получение введенных значений
  minWeight = parseInt(document.querySelector('.minweight__input').value);
  maxWeight = parseInt(document.querySelector('.maxweight__input').value);

  // обработка нецифровых значений
  if (isNaN(minWeight)) {
    minWeight = 0;
  }

  if (isNaN(maxWeight)) {
    maxWeight = Infinity;
  }

  // замена значений, если минимальное больше максимального
  if (minWeight > maxWeight) {
    [minWeight, maxWeight] = [maxWeight, minWeight];
  }
};

// фильтрация массива
const filterFruits = (minWeight, maxWeight) => {
  fruits = fruits.filter((item) => {
    const weight = item.weight; // вес отдельного элемента
    return (weight >= minWeight) && (weight <= maxWeight);
  })
  return fruits;
};

// действие по кнопке "Фильтровать"
filterButton.addEventListener('click', () => {
  weightProcessing();
  filterFruits(minWeight, maxWeight);
  display();
});

/*** СОРТИРОВКА ***/

// сравнение двух элементов по цвету
const comparationColor = (item1, item2) => {
  const priority = ['carmazin', 'yellow', 'green', 'violet', 'lightbrown', 'black'];
  const priority1 = priority.indexOf(item1.className);
  const priority2 = priority.indexOf(item2.className);
  return (priority1 > priority2) ? true : false;
};

const sortAPI = {
  // сортировка пузырьком
  bubbleSort(arr, comparation) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  },

  // сыстрая сортировка
  quickSort(arr, comparation) {
    // функция обмена элементов
    function swap(arr, firstIndex, secondIndex) {
      [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    }

    // функция разделитель
    function partition(arr, comparation, left, right) {
      let pivot = arr[Math.floor((right + left) / 2)],
        i = left,
        j = right;
      while (i <= j) {
        while (comparation(pivot, arr[i])) {
          i++;
        }
        while (comparation(arr[j], pivot)) {
          j--;
        }
        if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
        }
      }
      return i;
    }

    // алгоритм быстрой сортировки
    function quickSortAlg(arr, comparation, left = 0, right = arr.length - 1) {
      let index;
      if (arr.length > 1) {
        index = partition(arr, comparation, left, right);
        if (left < index - 1) {
          quickSortAlg(arr, comparation, left, index - 1);
        }
        if (index < right) {
          quickSortAlg(arr, comparation, index, right);
        }
      }
      return arr;
    }

    // запуск быстрой сортировки
    quickSortAlg(arr, comparation);
  },

  // выполнение сортировки и замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// действие по кнопке "Сменить алгоритм сортировки"
sortChangeButton.addEventListener('click', () => {
  if (sortKind == 'bubbleSort') {
    sortKindLabel.textContent = 'quickSort';
    sortKind = 'quickSort';
  } else {
    sortKindLabel.textContent = 'bubbleSort';
    sortKind = 'bubbleSort';
  }
});

// действие по кнопке "Сортировать"
sortActionButton.addEventListener('click', () => {
  // вывод сообщения о процессе сортировки
  sortTimeLabel.textContent = 'sorting...';

  // вызов сортировки и отрисовки
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();

  // вывод времени сортировки
  sortTimeLabel.textContent = sortTime;
  // очистка поля времени сортировки с задержкой
  setTimeout(() => {
    sortTimeLabel.textContent = '-';
  }, 3000);
});

/*** ДОБАВИТЬ ФРУКТ ***/

// действие по кнопке "Добавить фрукт"
addActionButton.addEventListener('click', () => {
  // получение введенных значений
  newFruitKind = kindInput.value;
  newFruitColor = colorInput.value;
  newFruitWeight = weightInput.value;

  if ((newFruitKind === '') || (newFruitColor === '') || (newFruitWeight === '')) {
    // предупреждение, если одно из значений не введено
    alert('Данные для добавления фрукта введены не полностью!')
  } else {
    let newItem = { // создание массива для нового фрукта
      kind: newFruitKind,
      color: newFruitColor,
      weight: newFruitWeight,
      className: "black"
    };
    fruits.push(newItem); // добавление в общий массив
    display();
  }
});