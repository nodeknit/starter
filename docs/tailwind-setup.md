 # Подключение Tailwind CSS

 Этот документ описывает, как настроить и использовать Tailwind CSS в проекте AppBase.

 ## 1. Установка зависимостей

 Установите Tailwind CSS, PostCSS и Autoprefixer как dev-зависимости:

 ```bash
 npm install -D tailwindcss postcss autoprefixer
 ```

 ## 2. Создание конфигурации

 ### 2.1 tailwind.config.cjs

 В корне проекта уже есть `tailwind.config.cjs`:

 ```js
 /** @type {import('tailwindcss').Config} */
 module.exports = {
   content: [
     './app-base/adminizer/modules/**/*.{ts,tsx}',
     './app-base/adminizer/components/ui/**/*.{ts,tsx}',
     './docs/**/*.{md,mdx}',
   ],
   theme: {
     extend: {},
   },
   plugins: [],
 };
 ```

 Путь `content` указывает, где Tailwind будет искать классы для генерации CSS.

 ### 2.2 postcss.config.cjs

 В корне проекта уже есть `postcss.config.cjs`:

 ```js
 const tailwindcss = require('@tailwindcss/postcss');
 const autoprefixer = require('autoprefixer');

 module.exports = {
   plugins: [
     tailwindcss(),
     autoprefixer(),
   ],
 };
 ```

 PostCSS автоматически запускает плагины Tailwind и Autoprefixer при сборке.

 ## 3. Добавление файла с директивами Tailwind

 В каталоге `app-base/adminizer/modules` создайте (или убедитесь, что есть) файл `tailwind.css`:

 ```css
 @tailwind base;
 @tailwind components;
 @tailwind utilities;
 ```

 Этот файл импортируется в каждый Inertia-компонент:

 ```tsx
 import './tailwind.css';
 ```

 Благодаря Vite и PostCSS директивы будут трансформированы в итоговый CSS.

 ## 4. Настройка Vite

 Vite по умолчанию автоматически находит `postcss.config.cjs`. В `vite.config.ts` достаточно убедиться в наличии:

 ```ts
 export default defineConfig({
   plugins: [ react(), /* ... */ ],
   css: {
     // Когда нужно разделять CSS для каждого модуля
     codeSplit: true,
   },
   // ...
 });
 ```

 В нашем проекте в секции `build` уже указано `cssCodeSplit: true`, что создаёт отдельные CSS-файлы для каждого ES-бандла.

 ## 5. Использование классов Tailwind в компонентах

 После импорта `tailwind.css` во всех React-компонентах вы можете использовать утилиты Tailwind в `className`:

 ```tsx
 <div className="p-4 bg-white rounded shadow">...</div>
 ```

 Tailwind CSS будет включён в итоговые пакеты и доступен в приложении.

 ## 6. Горячая перезагрузка (HMR)

 При запуске сервера разработки (`npm run dev`) Vite обеспечивает HMR для React-компонентов и CSS, включая Tailwind. Изменения в файле `tailwind.config.cjs` потребуют перезапуска процесса сборки (`npm run dev`).

 ---
 **Готово!** Tailwind CSS интегрирован в проект и готов к использованию.
