// Крок 3. Перевірка підключення
console.log("script.js підключено");

// Крок 4. Оголосити дані свого варіанта (Варіант 15)
// Масив рецептів напоїв
const recipes = [
  { name: "Латте Макіато", alcohol: false, timeMinutes: 15 },
  { name: "Глінтвейн класичний", alcohol: true, timeMinutes: 20 },
  { name: "Мохіто безалкогольний", alcohol: false, timeMinutes: 10 },
  { name: "Експрес-чай з м'ятою", alcohol: false, timeMinutes: 3 },
];

// Крок 5 та 6. Обробити дані циклом та додати умовну класифікацію
console.log("--- Тільки безалкогольні рецепти ---");
for (const recipe of recipes) {
  // Умова: if перевіряє поле alcohol
  if (recipe.alcohol === false) {
    console.log(`Напій: ${recipe.name} (Час: ${recipe.timeMinutes} хв)`);
  }
}

// Крок 7. Написати стрілкову функцію
// Функція перевіряє, чи готується напій за 5 хвилин або швидше
const isQuick = (time) => time <= 5;

console.log("--- Перевірка швидкості приготування ---");
console.log(`Чи швидкий "Латте Макіато" (15 хв)? - ${isQuick(15)}`);
console.log(`Чи швидкий "Експрес-чай" (3 хв)? - ${isQuick(3)}`);
