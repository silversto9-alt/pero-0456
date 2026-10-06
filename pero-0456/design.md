# Перо Измерений — Design

> Starter design brief. Replace this content with the app you're building before writing any UI.
> Keep it short and concrete — it's the single source of truth for palette, typography, pages,
> screens, and flows across web, mobile, and desktop.

One-line description of the app, the platforms it ships on, the visual direction (style, feel), and the core job it does for the user.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.

# Перо Измерений — design direction

## Reference and assets
Approved reference: trioz.ru, dark immersive fantasy artwork, green magic, cream serif headings, minimal thin separators. Use original game box, world map, faction shields, combat cards and fantasy illustrations extracted from v2. Use v3 copy and corrected army counts (8 units + 3 guards). Use official TrioZ emblem and feather artwork as brand context, not as replacement for the product images.

## Visual system
Background #090f0d; panels #101a15; text #f1ede1; muted #9ba79d; emerald #86cda6; gold #b7a179; borders rgba(183,201,186,.16). Headings Georgia serif (Cyrillic supported); body Segoe UI/system sans-serif. Hero heading 88px desktop / 48px mobile, section headings 48/34px. Uppercase tracked micro-labels, tabular section numbers, quiet forest-green CTA.

## Layout and motion
Maximum content width 1240px; 64px desktop side gutters, 22px mobile. Editorial asymmetric hero with product box to right and official feather artwork in atmospheric background. Art-led map, full-bleed creature interludes, interactive faction selector rather than a wall of cards. Generous 100px section spacing, rectangular panels with subtle corners. Minimal scroll reveals, gentle floating product image; respect reduced motion.

## Обновление: индивидуальные иллюстрации
Сохранить исходную визуальную систему. Для каждой из десяти фракций — отдельный живописный фэнтези-фон 16:9 по одобренному образцу Дворфов: герой справа, спокойные тёмные области слева, акценты цвета фракции. Исходные щиты остаются неизменными. Кнопка «Наверх» глобальная и постоянно доступная на десктопе и мобильном экране. Форма: 1, 2, 3, 4, 5 экземпляров; от 6 — «Оптом».

## UX and implementation
Sticky navigation; mobile menu. Order CTA anchors to form. Map opens in accessible zoom dialog; card flip with keyboard and touch. Factions reveal lore and correct shields. Rules scans expandable and zoomable. Links to trioz.ru and library open new tabs. Form validates name/email/quantity/consent; API returns configured automatic-email availability. Without secrets, form opens an explicitly described mailto draft and never claims delivery. No pricing or lead times invented.
## Обновление: пролог и пантеон богов
Добавлены две части, не меняющие исходную визуальную систему.

**Пролог (секция `#origin`, номер 00, перед «Мир игры»).** Короткое вступление о происхождении мира: шесть сжатых абзацев слева и панель «Хроника начала» справа (нумерованный список из пяти вех: Пустота, Боги, Антегриз, Шент’Ар, Вельд’Эран). Фон — радиальный изумрудный градиент на #0b120f, разделённый тонкими hairline-линиями. Весь лор мира живёт здесь; в карточки богов вынесены только короткие персональные справки.

**Пантеон богов (секция `#gods`).** Сетка 5×2 на десктопе, 2 колонки на планшете и мобильном: круглый портрет 96px (84px / 70px / 58px на меньших ширинах), под ним микро-подпись «Кубики · N» и имя. Раскрытие карточки (`details`) показывает краткую историю божества (muted) и блок «Способность» с золотым микро-заголовком. Портреты — исходные вырезанные изображения из архива; Шент’Ар вырезан по кругу из исходного портрета на троне. Значения кубиков и тексты способностей не изменены.

**Свободный выбор.** Сумма 12 больше не отдельная карточка бога: это пунктирная строка-примечание под сеткой с крупной цифрой 12 и пояснением, что игрок сам выбирает любого бога из списка.

## Обновление: навигация
В главное меню добавлен пункт «Боги» (`#gods`), всего пять ссылок: Мир игры, Фракции, Как играть, Боги, Правила.

## Обновление: арты фракций и геральдика
**Новые иллюстрации.** Три фракции перерисованы в стиле одобренного образца Дворфов (живописный тёмный фэнтези-арт 16:9, герой в правой трети, спокойная левая треть под текст, акцентный цвет фракции):

- **Союз Древних** — Вальгалл в рогатом шлеме и тяжёлой броне с мехом и Авалл в золотых церемониальных доспехах с золотым топором и копьём; каменное кольцо и горная крепость позади.
- **Тролли** — серо-зелёный длинноносый тролль с костяными и перьевыми украшениями и черепом на поясе, топор, затопленные руины в зелёной дымке.
- **Суббгары** — рыжий бородатый гигант в рогатом шлеме с секирой, полная луна, летящая фиолетовая тропа между городами на скалах. Кадр пересобран с запасом: рога и сапоги целиком внутри рамки, обрезки по краям панели нет.

**Разведение геральдики.** Орёл больше не повторяется на знамёнах — у каждой фракции своя эмблема:

| Фракция | Эмблема на знамени |
|---|---|
| Империя | золотая пятизубцовая корона |
| Республика | золотые весы |
| Дворфы | чёрные молот и наковальня (и на знамени, и на табарде) |
| Серебряный мятеж | серебряная разорванная цепь |

Цветные щиты фракций (мелкие ассеты `v2-*.png`) не менялись.

**Футер.** Ссылка «Вернуться наверх» из футера удалена — навигация наверх остаётся за глобальной фиксированной кнопкой «Наверх» (`components/back-to-top.tsx`).
