import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GlobalSettings() {
  const [maxBooks, setMaxBooks] = useState<number | ''>('');

  const handleSave = () => {
    // TODO: implement save logic
    alert(`Сохранено: ${maxBooks}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md p-6 mx-auto rounded-xl bg-background text-foreground">
      <h2 className="font-bold text-xl">Глобальные настройки</h2>
      <div className="grid gap-4">
        <Label htmlFor="maxBooks">Количество сколько можно взять книг одновременно</Label>
        <Input
          id="maxBooks"
          type="number"
          value={maxBooks}
          onChange={e => setMaxBooks(e.target.value === '' ? '' : Number(e.target.value))}
          min={1}
        />
        <Button type="button" onClick={handleSave} disabled={maxBooks === ''}>
          Сохранить
        </Button>
      </div>
    </div>
  );
} 