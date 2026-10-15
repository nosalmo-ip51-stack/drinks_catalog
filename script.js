let recipes = [
  {
    name: "Латте Макіато",
    alcohol: false,
    timeMinutes: 15,
    type: "Гарячі напої",
    badgeClass: "badge-hot",
    difficulty: "Середня",
    description:
      "Класичний кавовий напій на основі еспресо та ніжно збитої молочної пінки.",
    image: "assets/img/latte.jpg",
  },
  {
    name: "Глінтвейн класичний",
    alcohol: true,
    timeMinutes: 20,
    type: "Гарячі напої",
    badgeClass: "badge-hot",
    difficulty: "Середня",
    description: "Зігріваючий зимовий напій з прянощами для холодних вечорів.",
    image: "assets/img/glintwein.jpg",
  },
  {
    name: "Мохіто безалкогольний",
    alcohol: false,
    timeMinutes: 10,
    type: "Коктейлі",
    badgeClass: "badge-cocktail",
    difficulty: "Легка",
    description:
      "Ідеальний літній коктейль із льодом, свіжою м'ятою та соком лайма.",
    image: "assets/img/mojito.jpg",
  },
  {
    name: "Експрес-чай з м'ятою",
    alcohol: false,
    timeMinutes: 3,
    type: "Гарячі напої",
    badgeClass: "badge-hot",
    difficulty: "Легка",
    description: "Швидкий і освіжаючий чай для бадьорості.",
    image: "assets/img/tea.jpg",
  },
];

const listContainer = document.querySelector("#drinks-list");
const form = document.querySelector("#add-recipe-form");
const timeInput = document.querySelector("#recipe-time");
const filterCheckbox = document.querySelector("#filter-non-alcoholic");

// Видаляємо статичну заглушку
const placeholder = document.querySelector(".static-placeholder");
if (placeholder) {
  placeholder.remove();
}

function renderDrinks(drinksToRender) {
  listContainer.innerHTML = "";
  let nonAlcoholicCount = 0;

  drinksToRender.forEach((drink) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card");
    card.dataset.time = drink.timeMinutes;

    if (!drink.alcohol) {
      card.classList.add("non-alcoholic");
      nonAlcoholicCount++;
    }

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("card-image");

    const badge = document.createElement("span");
    badge.classList.add("badge", drink.badgeClass || "badge-hot");
    badge.textContent = drink.type;

    const img = document.createElement("img");
    img.setAttribute("src", drink.image || "assets/img/latte.jpg");
    img.setAttribute("alt", drink.name);

    imgContainer.append(badge, img);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("card-content");

    const title = document.createElement("h3");
    title.textContent = drink.name;

    const metaContainer = document.createElement("div");
    metaContainer.classList.add("recipe-meta");

    const timeSpan = document.createElement("span");
    timeSpan.textContent = `⏱ ${drink.timeMinutes} хв`;

    const diffSpan = document.createElement("span");
    diffSpan.textContent = `⭐ ${drink.difficulty || "Легка"}`;

    metaContainer.append(timeSpan, diffSpan);

    const desc = document.createElement("p");
    desc.textContent =
      drink.description || "Свіжоприготований домашній рецепт.";

    contentContainer.append(title, metaContainer, desc);

    card.append(imgContainer, contentContainer);
    listContainer.append(card);
  });

  const countElement = document.querySelector("#drinks-count");
  if (countElement) {
    countElement.textContent = `Кількість безалкогольних рецептів: ${nonAlcoholicCount}`;
  }
}

// Додаткова валідація часу приготування
if (timeInput) {
  timeInput.addEventListener("input", () => {
    const val = Number(timeInput.value);
    if (val <= 0) {
      timeInput.setCustomValidity(
        "Час приготування має бути більшим за 0 хвилин",
      );
    } else {
      timeInput.setCustomValidity("");
    }
  });
}

// Обробка форми без перезавантаження
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameValue = document.querySelector("#recipe-name").value.trim();
    const typeValue = document.querySelector("#recipe-type").value;
    const timeValue = Number(timeInput.value);
    const alcoholChecked = document.querySelector("#recipe-alcohol").checked;

    const newRecipe = {
      name: nameValue,
      alcohol: alcoholChecked,
      timeMinutes: timeValue,
      type: typeValue,
      badgeClass: typeValue === "Коктейлі" ? "badge-cocktail" : "badge-hot",
      difficulty: "Легка",
      description: "Новий рецепт, доданий користувачем через форму.",
      image: "assets/img/latte.jpg",
    };

    recipes.push(newRecipe);
    applyFilter();
    form.reset();
  });
}

// Фільтрація списку
function applyFilter() {
  if (filterCheckbox && filterCheckbox.checked) {
    const filtered = recipes.filter((r) => !r.alcohol);
    renderDrinks(filtered);
  } else {
    renderDrinks(recipes);
  }
}

if (filterCheckbox) {
  filterCheckbox.addEventListener("change", applyFilter);
}

// Початковий рендер сторінки
renderDrinks(recipes);
