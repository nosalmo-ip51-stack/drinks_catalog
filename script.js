// Практична робота №9. Варіант 15: Каталог рецептів напоїв (API)
const API_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"; //[cite: 17]

// Отримуємо посилання на елементи DOM
const listContainer = document.querySelector("#drinks-list");
const refreshButton = document.querySelector("#refresh-btn");
const errorContainer = document.querySelector("#error-message");
const loadingIndicator = document.querySelector("#loading-indicator");

// Крок 7. Функція управління станом завантаження
function showLoading(isLoading) {
  if (loadingIndicator) {
    loadingIndicator.style.display = isLoading ? "block" : "none";
  }
  if (refreshButton) {
    refreshButton.disabled = isLoading; // Блокуємо кнопку під час запиту
  }
}

// Крок 8. Виведення повідомлення про помилку
function showError(message) {
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
  }
}

// Очищення повідомлення про помилку
function clearError() {
  if (errorContainer) {
    errorContainer.textContent = "";
    errorContainer.style.display = "none";
  }
}

// Крок 6. Функція рендеру списку карток (адаптована під поля API TheCocktailDB)
function renderDrinks(drinks) {
  if (!listContainer) return;
  listContainer.innerHTML = "";

  drinks.forEach((drink) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("card-image");

    const badge = document.createElement("span");
    badge.classList.add("badge", "badge-cocktail");
    badge.textContent = "Коктейль";

    // Беремо картинку з API
    const img = document.createElement("img");
    img.setAttribute("src", drink.strDrinkThumb); //[cite: 17]
    img.setAttribute("alt", drink.strDrink);

    imgContainer.append(badge, img);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("card-content");

    // Беремо назву з API
    const title = document.createElement("h3");
    title.textContent = drink.strDrink; //[cite: 17]

    const desc = document.createElement("p");
    // Беремо інструкцію з API та обрізаємо її, щоб картки були акуратними
    const instructions = drink.strInstructions || "Опис відсутній."; //[cite: 17]
    desc.textContent =
      instructions.length > 150
        ? instructions.substring(0, 150) + "..."
        : instructions;

    contentContainer.append(title, desc);
    card.append(imgContainer, contentContainer);
    listContainer.append(card);
  });
}

// Крок 2. Створення async-функції запиту
async function loadData() {
  clearError();
  listContainer.innerHTML = "";

  // Крок 7. Увімкнення видимої ознаки завантаження перед fetch
  showLoading(true); //[cite: 14]

  try {
    // Крок 3. Виконати fetch і дочекатися відповіді
    const response = await fetch(API_URL); //[cite: 13, 14]

    // Крок 4. Перевірити HTTP-статус
    if (!response.ok) {
      throw new Error(`Сервер відповів кодом ${response.status}`); //[cite: 14]
    }

    // Крок 5. Розібрати JSON
    const data = await response.json(); //[cite: 14]
    console.log("Отримані дані від API:", data); // Виводимо в консоль для перевірки

    // Крок 6 (Особливість Варіанта 15): Перевірка на відсутність результатів
    // Якщо коктейлів не знайдено, API повертає об'єкт, де drinks дорівнює null
    if (!data.drinks) {
      throw new Error("Рецептів за такою назвою не знайдено"); //[cite: 17]
    }

    // Вивести дані в DOM
    renderDrinks(data.drinks);
  } catch (error) {
    // Крок 8. Обробити помилку та вивести повідомлення
    console.error("Деталі помилки для розробника:", error); //[cite: 14]

    // Крок 9. Перевірка сценарію offline (відсутність з'єднання)
    if (!navigator.onLine || error.message.includes("Failed to fetch")) {
      showError("Не вдалося завантажити дані. Спробуйте пізніше."); //[cite: 14]
    } else {
      // Виведення специфічного тексту помилки (наприклад, коли нічого не знайдено)
      showError(error.message);
    }
  } finally {
    // Крок 7. Вимкнути ознаку завантаження незалежно від результату
    showLoading(false); //[cite: 14]
  }
}

// Крок 10. Додати кнопку «Оновити»
if (refreshButton) {
  refreshButton.addEventListener("click", loadData); //[cite: 15]
}

// Автоматичний запуск функції при завантаженні сторінки
loadData();
