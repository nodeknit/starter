 # Интеграция shadcn-ui

 Этот документ описывает, как установить и настроить библиотеку компонентов `shadcn-ui` в проекте AppBase.

 ## Установка

 Установите пакет:
 ```bash
 npm install shadcn-ui
 ```

 ## Конфигурация Tailwind CSS

 Откройте `tailwind.config.cjs` и добавьте плагин `shadcn-ui/tailwind`:
 ```js
 // tailwind.config.cjs
 module.exports = {
   // ...
   plugins: [
     require('shadcn-ui/tailwind'),
     // другие плагины...
   ],
 }
 ```

 ## Использование компонентов

 В ваших React-компонентах импортируйте и используйте компоненты:
 ```tsx
 import './tailwind.css';
 import { useState, useEffect } from 'react';
 import {
   Button,
   Input,
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem
 } from 'shadcn-ui';

 export default function MyComponent() {
   const [value, setValue] = useState('');
   // ...
   return (
     <div className="p-4">
       <Input value={value} onChange={e => setValue(e.target.value)} />
       <Select value={value} onValueChange={setValue}>
         <SelectTrigger>
           <SelectValue placeholder="Выберите" />
         </SelectTrigger>
         <SelectContent>
           <SelectItem value="item1">Item 1</SelectItem>
           <SelectItem value="item2">Item 2</SelectItem>
         </SelectContent>
       </Select>
       <Button onClick={() => alert('Нажато!')}>Нажми меня</Button>
     </div>
   );
 }
 ```
