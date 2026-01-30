src/
  routes/                           # TanStack Start routes (тонкие)
    __root.tsx                      # подключаем main.css, layout shell
    index.tsx                       # редирект/лендинг
    (auth)/
      login.tsx
    (app)/
      feed.tsx                      # свайпы (главный экран)
      matches.tsx                   # мэтчи
      chat.$chatId.tsx              # чат
      profile.tsx                   # профиль
      settings.tsx                  # настройки

  app/
    providers/
      AppProviders.tsx              # QueryClient, theme init, etc
    layout/
      AppShell.tsx
      AppShell.module.css           # layout styles (CSS Modules)
      TopBar.tsx
      TopBar.module.css
      BottomNav.tsx
      BottomNav.module.css

  pages/                            # композиции экранов (собирают widgets/features)
    feed/
      FeedPage.tsx
      FeedPage.module.css
    matches/
      MatchesPage.tsx
      MatchesPage.module.css
    chat/
      ChatPage.tsx
      ChatPage.module.css
    profile/
      ProfilePage.tsx
      ProfilePage.module.css
    settings/
      SettingsPage.tsx
      SettingsPage.module.css
    auth/
      LoginPage.tsx
      LoginPage.module.css

  widgets/                          # крупные блоки
    deck/
      SwipeDeck.tsx
      SwipeDeck.module.css
    card/
      ProfileCard.tsx
      ProfileCard.module.css
    chat/
      ChatList.tsx
      ChatList.module.css
      MessageBubble.tsx
      MessageBubble.module.css
    filters/
      FiltersPanel.tsx
      FiltersPanel.module.css

  features/                         # пользовательские сценарии
    swipe/
      ui/SwipeActions.tsx
      ui/SwipeActions.module.css
      model/useSwipe.ts
      api/swipe.ts
      index.ts
    match/
      ui/ItsAMatchModal.tsx
      ui/ItsAMatchModal.module.css
      model/useMatch.ts
      index.ts
    auth/
      login/
        ui/LoginForm.tsx
        ui/LoginForm.module.css
        model/useLogin.ts
        api/login.ts
        index.ts
    profile/
      edit-profile/
        ui/EditProfileForm.tsx
        ui/EditProfileForm.module.css
        model/useEditProfile.ts
        api/updateProfile.ts
        index.ts

  entities/                         # доменные сущности
    user/
      model/types.ts
      api/queries.ts
      ui/UserAvatar.tsx
      ui/UserAvatar.module.css
      index.ts
    profile/
      model/types.ts
      ui/ProfilePreview.tsx
      ui/ProfilePreview.module.css
      index.ts
    chat/
      model/types.ts
      api/queries.ts
      index.ts

  shared/
    styles/                         # ВАЖНО: глобальные токены и базовые стили
      main.css                      # ✅ tokens + themes + reset + base typography
      themes.css                    # (опционально) отдельные темы, если хочешь
      media.css                     # (опционально) брейкпоинты/утилиты
    ui/                             # атомарные компоненты (CSS Modules)
      button/
        Button.tsx
        Button.module.css
      input/
        Input.tsx
        Input.module.css
      modal/
        Modal.tsx
        Modal.module.css
      icon/
        Icon.tsx
        Icon.module.css
    lib/
      cn.ts                         # (опц.) helper для className
      formatters.ts
    api/
      http.ts                       # ky/axios instance с интерсепторами
    types/
    constants/