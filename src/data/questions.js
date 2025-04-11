// src/data/questions.js

export const questions = [
  {
    id: 1,
    question: "Какие из перечисленных товаров вы продаёте чаще всего?",
    options: [
      { type: "text", value: "Шоколад" },
      { type: "text", value: "Печенье" },
      { type: "text", value: "Газировка" },
      { type: "text", value: "Чипсы" }
    ],
    allowCustomAnswer: true
  },
  {
    id: 2,
    question: "Какая из этих выкладок кажется вам более привлекательной?",
    options: [
      { type: "image", value: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Выкладка+1" },
      { type: "image", value: "https://via.placeholder.com/150/00FF00/000000?text=Выкладка+2" }
    ],
    allowCustomAnswer: false
  },
  {
    id: 3,
    question: "Какие бренды предпочитают ваши покупатели?",
    options: [
      { type: "text", value: "Coca-Cola" },
      { type: "text", value: "Pepsi" },
      { type: "text", value: "Rich" }
    ],
    allowCustomAnswer: true
  },
  {
    id: 4,
    question: "Вы удовлетворены условиями поставки?",
    options: [
      { type: "text", value: "Да" },
      { type: "text", value: "Нет" }
    ],
    allowCustomAnswer: false
  },
  {
    id: 5,
    question: "Какая из этих рекламных конструкций наиболее эффективна?",
    options: [
      { type: "image", value: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Реклама+1" },
      { type: "image", value: "https://via.placeholder.com/150/FFFF00/000000?text=Реклама+2" },
      { type: "text", value: "Ни одна из представленных" }
    ],
    allowCustomAnswer: true
  }
];



// {
//   id: 1,
//   question: "Ваш вопрос здесь",
//   options: [
//     { type: "text", value: "Вариант А" },
//     { type: "image", value: "https://example.com/image1.jpg" }
//   ],
//   allowCustomAnswer: true
// }
