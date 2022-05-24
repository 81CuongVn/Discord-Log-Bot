# SimpleDiscordBotsJS GitConvention #

> In English

The purpose of the convention is to introduce simple, transparent and efficient rules for working with Git.

## Commits ##

**Fundamental rules:**

1. All commits must be in English.
2. It is forbidden to use the past tense.
3. The prefix must be used.
4. There should not be an extra punctuation mark at the end.
5. The length of any part must not exceed 100 characters.

**Structure:**

```
[Prefix] <Message>
```

| Prefix | Meaning | Example |
| ------- | -------- | ------ |
| **[FIX]** | Everything related to fixing bugs | [FIX] Bug with unsuccessful command usage |
| **[DOCS]** | Everything related to documentation | [DOCS] Documenting logger functions |
| **[FEATURE]** | Everything about new features | [FEATURE] Button handler added |
| **[STYLE]** | Everything about typos and formatting | [STYLE] Typos in ping command description |
| **[REFACTOR]** | Everything related to refactoring | [REFACTOR] Changing the logging system to a logger |
| **[TEST]** | Everything about testing | [TEST] Test button added |
| **[ANY]** | Everything that does not fit the previous one. | [ANY] Connect Travis CI |

---

> На русском

Цель конвенции — внедрить простые, прозрачные и эффективные правила работы с Git.

## Коммиты ##

**Основные правила:**

1. Все коммиты должны быть на английском языке.
2. Запрещено использовать прошедшее время.
3. Обязательно должен быть использован префикс.
4. В конце не должно быть лишнего знака препинания.
5. Длина любой части не должна превышать 100 символов.

**Структура:**

```
[Префикс] <Сообщение>                             
```

| Префикс | Значение | Пример |
| ------- | -------- | ------ |
| **[FIX]** | Всё, что касается исправления багов | [FIX] Баг с неудачным использованием команды |
| **[DOCS]** | Всё, что касается документации | [DOCS] Документирование функций логгера |
| **[FEATURE]** | Всё, что касается новых возможностей | [FEATURE] Добавлен обработчик кнопок |
| **[STYLE]** | Всё, что касается опечаток и форматирования | [STYLE] Опечатки в описании команды ping |
| **[REFACTOR]** | Всё, что касается рефакторинга | [REFACTOR] Смена системы логирования на логгер |
| **[TEST]** | Всё, что касается тестирования | [TEST] Добавлена тестовая кнопка |
| **[ANY]** | Всё, что не подходит к предыдущему. | [ANY] Подключение Travis CI | 
