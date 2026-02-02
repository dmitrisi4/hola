
Актуальная схема (TanStack Start + Atomic Design)

src/
  routes/                           # file-driven маршруты TanStack Start (тонкие)
    __root.tsx                      # layout shell, импорт shared/styles/main.css
    index.tsx                       # landing/redirect
    (auth)/login.tsx                # сегмент авторизации
    (app)/                          # основной стек после login
      feed.tsx
      matches.tsx
      chat.$chatId.tsx
      profile.tsx
      settings.tsx
    routeTree.gen.ts                # автоген, не редактируем

  app/                              # инфраструктура приложения
    providers/                      # QueryClient, theme, i18n, auth guard
    layout/                         # AppShell/TopBar/BottomNav
    router.tsx                      # createRouter + routeTree.gen, suspense boundary

  processes/                        # сквозные процессы (онбординг, платеж), опционально

  pages/                            # экранные композиции (используют widgets/features)
    feed/FeedPage.tsx
    matches/MatchesPage.tsx
    chat/ChatPage.tsx
    profile/ProfilePage.tsx
    settings/SettingsPage.tsx
    auth/LoginPage.tsx

  widgets/                          # организмы (layout-heavy UI без бизнес-логики)
    deck/SwipeDeck.tsx
    chat/ChatList.tsx
    filters/FiltersPanel.tsx
    card/ProfileCard.tsx

  features/                         # пользовательские сценарии (use cases)
    swipe/ { ui/, model/, api/ }
    match/ { ui/, model/ }
    auth/login/ { ui/, model/, api/ }
    profile/edit-profile/ { ui/, model/, api/ }

  entities/                         # доменные модели и UI
    user/ { model/types.ts, api/queries.ts, ui/UserAvatar.tsx }
    profile/ { model/types.ts, ui/ProfilePreview.tsx }
    chat/ { model/types.ts, api/queries.ts }

  shared/                           # дизайн-система и базовые утилиты
    ui/
      atoms/                       # кнопки, инпуты, иконки, badge, loader
      molecules/                   # связки атомов: InputField, AvatarWithBadge
      organisms/                   # чистые UI-блоки без бизнес-логики: AppHeader, ModalShell
    styles/ { main.css, themes.css, media.css }
    lib/ { cn.ts, formatters.ts }
    api/ { http.ts }
    config/                        # env, constants
    types/
