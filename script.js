const recipes = [
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
    image: "assets/img/glintwein.jpg", // ИСПРАВЛЕНО ТУТ
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
    image: "assets/img/tea.jpg", // ИСПРАВЛЕНО ТУТ
  },
];

const listContainer = document.querySelector("#drinks-list");

const placeholder = document.querySelector(".static-placeholder");
if (placeholder) {
  placeholder.remove();
}

function renderDrinks(drinks) {
  listContainer.innerHTML = "";
  let nonAlcoholicCount = 0;

  drinks.forEach((drink) => {
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
    badge.classList.add("badge", drink.badgeClass);
    badge.textContent = drink.type;

    const img = document.createElement("img");
    img.setAttribute("src", drink.image);
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
    diffSpan.textContent = `⭐ ${drink.difficulty}`;

    metaContainer.append(timeSpan, diffSpan);

    const desc = document.createElement("p");
    desc.textContent = drink.description;

    contentContainer.append(title, metaContainer, desc);

    card.append(imgContainer, contentContainer);
    listContainer.append(card);
  });

  const countElement = document.querySelector("#drinks-count");
  if (countElement) {
    countElement.textContent = `Кількість безалкогольних рецептів: ${nonAlcoholicCount}`;
  }
}

renderDrinks(recipes);
