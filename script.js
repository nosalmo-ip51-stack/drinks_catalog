// Крок 1. Вибір фреймворку: Обрано Vue 3, оскільки його простіше підключити через один тег CDN і він має зручний та інтуїтивно зрозумілий синтаксис шаблонів.

// Крок 4. Створення окремого компонента DrinkCard
const DrinkCard = {
  props: ["name", "type", "timeMinutes", "alcohol", "image"],

  template: `
        <article class="recipe-card" :style="{ opacity: alcohol ? 0.9 : 1, border: alcohol ? '1px solid #ffcccc' : '1px solid #ccffcc' }">
            <div class="card-image">
                <span class="badge" :class="type === 'Коктейлі' ? 'badge-cocktail' : 'badge-hot'">
                    {{ type }}
                </span>
                <img :src="image" :alt="name" style="width:100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0;" />
            </div>
            <div class="card-content" style="padding: 15px;">
                <h3 style="margin-top: 0; margin-bottom: 10px; color: #333;">{{ name }}</h3>
                <p style="margin: 5px 0; color: #666;">
                    🕒 Час: <strong>{{ timeMinutes }} хв.</strong>
                </p>
                <p style="margin: 5px 0; color: #666;">
                    🍸 Статус: <strong>{{ alcohol ? 'Містить алкоголь' : 'Безалкогольний' }}</strong>
                </p>
            </div>
        </article>
    `,
};

// Створення головного додатку Vue
const app = Vue.createApp({
  components: {
    "drink-card": DrinkCard,
  },

  // Крок 3. Реактивний стан додатку (дані)
  data() {
    return {
      showOnlyNonAlcoholic: false,

      // Усі 6 напоїв мають унікальні шляхи до зображень
      drinks: [
        {
          id: 1,
          name: "Латте Макіато",
          type: "Гарячі напої",
          timeMinutes: 15,
          alcohol: false,
          image: "assets/img/latte.jpg",
        },
        {
          id: 2,
          name: "Мохіто класичний",
          type: "Коктейлі",
          timeMinutes: 10,
          alcohol: true,
          image: "assets/img/mojito.jpg",
        },
        {
          id: 3,
          name: "Експрес-чай з м'ятою",
          type: "Гарячі напої",
          timeMinutes: 5,
          alcohol: false,
          image: "assets/img/tea.jpg",
        },
        {
          id: 4,
          name: "Маргарита",
          type: "Коктейлі",
          timeMinutes: 7,
          alcohol: true,
          image: "assets/img/margarita.jpg",
        },
        {
          id: 5,
          name: "Безалкогольний Мохіто",
          type: "Коктейлі",
          timeMinutes: 10,
          alcohol: false,
          image: "assets/img/virgin_mojito.jpg",
        },
        {
          id: 6,
          name: "Глінтвейн",
          type: "Гарячі напої",
          timeMinutes: 20,
          alcohol: true,
          image: "assets/img/glintwein.jpg",
        },
      ],
    };
  },

  // Крок 6 та 8. Похідні значення
  computed: {
    filteredDrinks() {
      if (this.showOnlyNonAlcoholic) {
        return this.drinks.filter((drink) => drink.alcohol === false);
      }
      return this.drinks;
    },
  },
});

// Запуск додатку
app.mount("#app");
