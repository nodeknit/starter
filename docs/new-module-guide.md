# Полное руководство: Как создать новый модуль в Adminizer (app-base)

> **Важно:** Все действия выполняются только в папке `app-base`. Папка `donor` дана для примера и не используется для разработки.

## 1. Создание React-модуля

1. Перейдите в `app-base/adminizer/modules`.
2. Создайте новый файл, например, `MyModule.tsx`.
3. Используйте шаблон:

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MyModule() {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-6 max-w-md p-6 mx-auto rounded-xl bg-background text-foreground">
      <h2 className="font-bold text-xl">Название модуля</h2>
      <Label htmlFor="value">Значение</Label>
      <Input id="value" value={value} onChange={e => setValue(e.target.value)} />
      <Button>Сохранить</Button>
    </div>
  );
}
```
- Используйте UI-компоненты из `@/components/ui`.
- Следуйте [Module Style Guidelines](module-style-guidelines.md).

## 2. Добавление модуля в vite.config.ts

1. Откройте `vite.config.ts` в корне проекта.
2. В секции `lib.entry` добавьте ваш модуль:

```js
lib: {
  entry: {
    MyModule: path.resolve(__dirname, 'app-base/adminizer/modules/MyModule.tsx'),
    // ... другие модули
  },
  formats: ['es'],
},
```
3. Проверьте, что alias `@` указывает на `app-base/adminizer`.
4. После изменения vite.config.ts запустите сборку:
   ```bash
   npx vite build
   # или
   yarn vite build
   ```

## 3. Создание контроллера

1. Перейдите в `app-base/controllers`.
2. Создайте файл, например, `MyModuleController.ts`:

```ts
import { Request, Response } from 'express';

let myModuleSettings = { value: '' };

export const MyModuleController = {
  getSettings: (req: Request, res: Response) => {
    res.json(myModuleSettings);
  },
  updateSettings: (req: Request, res: Response) => {
    const { value } = req.body;
    myModuleSettings.value = value;
    res.json({ success: true, value });
  },
};
```
- Для production используйте работу с БД вместо in-memory.

## 4. Добавление контроллера в коллекцию controllers

1. Откройте файл `app-base/index.ts`.
2. Импортируйте ваш контроллер:
   ```ts
   import { MyModuleController } from './controllers/MyModuleController';
   ```
3. Добавьте его в массив `controllers` класса `AppBase`:
   ```ts
   @Collection
   controllers: any[] = [
       MyModuleController,
       // ... другие контроллеры
   ];
   ```
4. Пример:
   ```ts
   import { GlobalSettingsController } from './controllers/GlobalSettingsController';
   import { MyModuleController } from './controllers/MyModuleController';

   export class AppBase extends AbstractApp {
       // ...
       @Collection
       controllers: any[] = [
           GlobalSettingsController,
           MyModuleController,
           // ... другие контроллеры
       ];
       // ...
   }
   ```
5. После этого контроллер будет автоматически зарегистрирован в приложении.

## 5. Подключение контроллера к роуту

1. В вашем роутере (например, Express):

```ts
import { controllers } from './controllers';

app.get('/api/my-module', controllers.myModule.getSettings);
app.post('/api/my-module', controllers.myModule.updateSettings);
```

## 6. Документирование и фиксация изменений

- **Документация:**
  - Сразу после создания модуля и контроллера напишите подробную документацию в папке `docs` (например, `docs/my-module.md`).
  - Описывайте структуру, пример использования, API, UI, особенности интеграции.
- **История изменений:**
  - Каждую задачу и изменение фиксируйте в `HISTORY.md`.
  - Все изменения модулей фиксируйте в `package.json` (если добавляются зависимости или скрипты).

## 7. Сборка и тестирование

- После каждого шага запускайте сборку модулей:
  ```bash
  npx vite build
  # или
  yarn vite build
  ```
- Запускайте проект через TSX:
  ```bash
  npx tsx app-base/bootstrap.ts
  # или
  yarn tsx app-base/bootstrap.ts
  ```
- Проверяйте, что поля можно заполнить, и функционал работает как ожидается.

## 8. Общие рекомендации

- Всегда размышляйте с позиции пользователя: интерфейс должен быть удобным и рабочим.
- Все шаги подробно документируйте в папке `docs`, чтобы другие LLM и разработчики могли легко повторить процесс.
- Если нужен исходник adminizer — смотрите папку `adminizer-for-docs`.
- Не забывайте запускать сборку и тестировать модуль после каждого изменения.

---

**Пример структуры для нового модуля:**
```
app-base/
  adminizer/
    modules/
      MyModule.tsx
    settings/
      my-module/
        index.ts (middleware, если требуется)
  controllers/
    MyModuleController.ts
    index.ts (коллекция контроллеров)
  docs/
    my-module.md
```

---

**Если что-то не работает — проверьте, что все шаги выполнены, и обратитесь к HISTORY.md или документации.** 