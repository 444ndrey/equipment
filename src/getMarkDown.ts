export default function getMarkDown() {
  return markdownString;
}

const markdownString = `
# Как работает форма

Изменения в форме слева автоматически отображаются в редакторе справа. Каждое изменение в форме полностью переписывает весь JSON справа.

Изменения в редакторе слева *НЕ* отражаются на форме, если нужно внести изменения из редактора в форму, то нажимаем: **"Заполнить форму"**.

Зеленая кнопка **"Скопировать JSON из формы"** формирует его из формы слева и добавляет в буфер обмена, чтобы скопировать JSON из редактора, нажимаем кнопку **"Копировать"** справа под редактором, JSON скопируется сразу в минифицированном виде.

С копированием значений из редактора нужно быть *осторожным*, редактор не проверяет JSON на наши правила заполнения оборудования, а только на правила синтаксиса JSON.

Тип обордования не обязательно выбирать из списка, можно ввести свой, просто начав вводить название в поле и нажать добавить.
#
# Как заполняется оборудование

- **name*** - название оборудования (например \`"name": "D-link 802"\`);
- **type*** - тип оборудования (например \`"type": "Роутер"\`);
- **description** - описание оборудования (например \`"description": "Двухдиапозонный гигабитный роутер"\`);
- **mandatory** - обязательное оборудование, если указано значение "1", иначе просто не указываем это поле. (например \`"mandatory": "1"\`);
- **rent**:
  - **price*** - цена аренды оборудования (например \`"price": "100"\`);
  - **comment** - комментарий к аренде оборудования (например \`"comment": "Аренда доступна только гражданам РФ"\`);
- **sale**:
  - **price*** - цена продажи оборудования (например \`"price": "5000"\`);
  - **comment** - комментарий к продаже оборудования (например \`"comment": "Цена по скидке"\`);
- **credit**:
  - **price*** - цена рассрочки на оборудование (например \`"price": "200"\`);
  - **time*** - срок рассрочки на оборудование (например \`"time": "12"\`);
  - **fp** - первоначальный платеж по рассрочке на оборудование (например \`"fp": "5000"\`).

.* - обязательно указываем во всех случаях.

Оборудование нужно указывать в массиве. То есть в \`[]\`, даже если оборудование всего одно.

Если аренды, описания или что-либо другое нет в оборудовании, то просто не указываем их, за исключением обязательных (помеченных звездочкой).
Например, если в JSON есть оборудование, то обязательно указываем "price", пишем "rent": {
    "price": "99"
}, "comment" - указывать не обязательно.



Пример заполнения JSON объекта:
\`\`\`json
[
  {
    "type": "Роутер",
    "name": "D-Link DIR-842/SMTS",
    "description": "Двухдиапазонный гигабитный Wi-Fi роутер (модель зависит от наличия на складе D-Link DIR-842 / ТР-Link Archer C5 Pro / Arcadyan WG430223)",
    "rent": {
      "price": "99"
    },
    "sale": {
      "price": "3600"
    },
    "credit": [
      {
        "price": "295",
        "time": "12"
      }
    ]
  },
  {
    "type": "Роутер",
    "name": "TP-Link EX220/D-Link-DIR-X1510",
    "description": "Роутер с поддержкой WiFi 6",
    "sale": {
      "price": "5400"
    },
    "rent": {
      "price": "250"
    },
    "credit": [
      {
        "price": "450",
        "time": "12"
      }
    ]
  }
]
\`\`\`
`;
