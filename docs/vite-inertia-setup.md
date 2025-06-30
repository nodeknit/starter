 # Настройка сборки Vite для контроллеров и компонентов Inertia

 В этом проекте фронтенд на React/Inertia и бэкенд на Node.js (Express) написаны на TypeScript. Мы используем Vite для упаковки двух частей:
 1) Клиентских Inertia-модулей (React-компонентов `.tsx`), которые будут загружаться в браузере как ES-модули.
 2) Серверных контроллеров и точек входа (файлы `.ts`), которые должны быть скомпилированы для выполнения в Node.js.

 ## 1. Установка зависимостей

 ```bash
 npm install --save-dev vite @vitejs/plugin-react vite-plugin-externals
 ```

 ## 2. Структура проекта

 - `index.ts` — главный серверный вход.
 - `app-base/adminizer/modules/*.tsx` — Inertia-компоненты.
 - `app-base/adminizer/settings/*/index.ts` — middleware-контроллеры.
 - `tailwind.config.cjs` — стили.

 ## 3. Конфигурация Vite (`vite.config.ts`)

 ```ts
 import { defineConfig } from 'vite';
 import react from '@vitejs/plugin-react';
 import { viteExternalsPlugin } from 'vite-plugin-externals';
 import path from 'path';

 export default defineConfig({
   // Общая настройка для сборки модулей и SSR
   build: {
     // Директория для выходных файлов
     outDir: 'dist',
     emptyOutDir: true,
     rollupOptions: {
       // Два набора точек входа
       input: {
         // Клиентские модули (будут в dist/modules)
         GlobalSettings: path.resolve(__dirname, 'app-base/adminizer/modules/GlobalSettings.tsx'),
         DateTimeSettings: path.resolve(__dirname, 'app-base/adminizer/modules/DateTimeSettings.tsx'),
         // ... другие Inertia-файлы
         // Серверный вход (будет в dist/server)
         server: path.resolve(__dirname, 'index.ts'),
       },
       // Не бандлить внешние зависимости для сервера и React для клиента
       external: [
         'react', 'react-dom', '@inertiajs/react',
         // Node.js built-ins и настройки ORM, фреймворков
         'express', 'sequelize', 'path', 'fs', /* и т.д. */
       ],
       output: {
         // Переопределяем формат и имена
         entryFileNames: chunk => {
           return chunk.name === 'server'
             ? 'server/[name].js'
             : 'modules/[name].js';
         },
         // Клиент — ES-модули, сервер — CommonJS или ESM (по потребности)
         format: chunk => (chunk.name === 'server' ? 'cjs' : 'es'),
       },
     },
   },
   plugins: [
     react(),
     viteExternalsPlugin({
       react: 'React',
       'react-dom': 'ReactDOM',
     }),
   ],
   define: {
     // Polyfill process.env for browser code and replace NODE_ENV
     'process.env': {},
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
   },
 });
 ```

 ## 4. Скрипты в `package.json`

 ```jsonc
 {
   "scripts": {
     // Сборка обоих таргетов
     "build": "vite build",
     // Для разработки сервера можно использовать tsx или ts-node
     "dev": "tsx watch index.ts",
     // Запуск продакшен-сервера
     "start": "NODE_ENV=production node dist/server/server.js"
   }
 }
 ```

 ## 5. Подключение в сервере (Express)

 В `index.ts` после создания `Express`-приложения:
 ```ts
 import express from 'express';
 import path from 'path';

 const app = express();
 const routePrefix = '/adminizer';  // совпадает с adminizerConfig.routePrefix

 // Статика для модулей
 app.use(
   `${routePrefix}/modules`,
   express.static(path.join(__dirname, 'modules'))
 );

 // Подключаем middleware-контроллеры Inertia
 // (они импортируются из dist/server/server.js при сборке)
 const { globalSettingsMiddleware, datetimeSettingsMiddleware } = require('./server/index.js');
 app.get(globalSettingsMiddleware.route, globalSettingsMiddleware.handler);
 app.get(datetimeSettingsMiddleware.route, datetimeSettingsMiddleware.handler);

 // Запуск
 const PORT = process.env.PORT || 17280;
 app.listen(PORT);
 ```

 ## Регистрация middleware в Adminizer

 Вместо ручного подключения маршрутов можно зарегистрировать Inertia middleware в коллекцию Adminizer. Для этого в своём приложении (например, в классе `AppBase`) используйте декоратор `@AddToCollection('adminizerMiddlewares')`. Пример:

 ```ts
 // app-base/index.ts
 import { AbstractApp } from '@nodeknit/app-manager';
 import { AddToCollection } from '@nodeknit/app-manager/lib/decorators/appUtils';
 import { globalSettingsMiddleware } from './adminizer/settings/global';
 import { datetimeSettingsMiddleware } from './adminizer/settings/datetime';

 export class AppBase extends AbstractApp {
   public appId = 'app-base-base';
   public name = 'AppBase Base';

   @AddToCollection('adminizerMiddlewares')
   customMiddlewares = [
     globalSettingsMiddleware,
     datetimeSettingsMiddleware,
   ];

   async mount() {
     // остальной код монтирования
   }
 }
 ```

 После инициализации `AppAdminizer` ваши middleware автоматически попадут в маршрутную цепочку и будут вызываться при совпадении пути и метода.

 ## Пример динамической загрузки модуля (module wrapper)

 На клиенте Inertia использует компонент `module` как обёртку для динамической загрузки нужного React-модуля. Чтобы переопределить поведение или протестировать его, можно создать свой `ModuleWrapper.tsx`:

 ```tsx
 // app-base/adminizer/modules/ModuleWrapper.tsx
 import React, { lazy, Suspense } from 'react';
 import './tailwind.css';

 export interface ModuleWrapperProps {
   moduleComponent: string;
   moduleComponentCSS?: string;
 }

 export default function ModuleWrapper({ moduleComponent, moduleComponentCSS }: ModuleWrapperProps) {
   // Динамический импорт по URL, переданному сервером
   const Component = lazy(() => import(/* @vite-ignore */ moduleComponent));

   return (
     <>
       {moduleComponentCSS && <link rel="stylesheet" href={moduleComponentCSS} />}
       <Suspense fallback={<div>Загрузка...</div>}>
         <Component />
       </Suspense>
     </>
   );
 }
 ```

 При этом сервер может возвращать:
 ```js
 req.Inertia.render({
   component: 'module',
   props: {
     moduleComponent: '/adminizer/modules/GlobalSettings.js',
     moduleComponentCSS: '/adminizer/modules/button.css'
   }
 });
 ```
 и на клиенте React динамически загрузит и отрисует `GlobalSettings`.

 ## Принцип работы (абстракт)

 1. Во время `vite build`:
    - Клиентские `.tsx` модули собираются в папку `dist/modules/*.js` (ESM).
    - Серверный вход `index.ts` и контроллеры бандлятся в `dist/server/server.js` (CJS/ESM).
 2. Express-приложение на проде запускается из `dist/server/server.js`.
 3. Статика `dist/modules` отдаётся браузеру по пути `/adminizer/modules`,
     а Inertia middleware генерирует HTML с `<script type="module" src="...">` на эти файлы.
 4. В окружении разработки (`npm run dev`) используется `tsx` и напрямую разворачивается код из исходников с `import.meta.url` и Hot Reload.

 Таким образом Vite управляет и фронтендом, и серверной частью единым конфигом —
 упрощая настройку и обеспечивая быстрые пересборки и оптимизированные бандлы. 
