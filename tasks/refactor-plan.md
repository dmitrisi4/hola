# План рефакторинга фронта

## Цели
- Подключить REST‑авторизацию и WS‑RPC сессию.
- Заменить моковые данные на реальные источники.
- Подготовить фронт к P2P‑части (presence, signaling, inbox).

## Шаги
1. Конфиги окружения
   - Добавить `VITE_API_HTTP` и `VITE_API_WS` (dev/prod).
   - Настроить Vite proxy для dev, чтобы cookie работали без CORS.
2. Слой API
   - REST‑клиент: `auth.login`, `auth.refresh`, `auth.logout`, `auth.signup`.
   - WS‑клиент (Metacom): загрузка юнитов, `auth.attach`, `devices`, `presence`, `signal`, `inbox`.
3. Auth‑состояние
   - Провайдер/хук для access‑токена в памяти.
   - `refresh` на старте и при 401.
   - `auth.attach` при открытии WS и после реконнекта.
4. Данные домена
   - Заменить моковые профили/чаты на реальные модели.
   - Типы взять из `backend/types/api.d.ts` (или сгенерировать).
5. Экраны
   - `LoginPage`: REST‑логин, обработка ошибок, лоадер.
   - `FeedPage`: загрузка профилей (или P2P discovery), лайки в очередь.
   - `Matches/Chats`: подписка на `inbox`/events, рендер диалогов.
6. P2P‑подготовка
   - Генерация device key‑pair (WebCrypto/libsodium).
   - `devices.register`, `presence.announce` в фоне (таймер 30–60с).
   - Заложить WebRTC signaling через `signal.offer/answer/ice`.
7. UX/Стабильность
   - Глобальная обработка 401/429.
   - Скелетоны/empty‑state, offline‑индикатор.
   - Логи в dev (network + ws events).
8. Тесты
   - Unit для auth‑хуков.
   - Интеграция: login → attach → presence.

## Риски/вопросы
- Cookie‑refresh требует правильного CORS/прокси в dev.
- Нужно подтвердить протокол E2E‑шифрования до внедрения чатов.
