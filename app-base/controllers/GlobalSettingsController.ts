import { Request, Response } from 'express';

// Временное хранилище, заменить на работу с БД
let globalSettings = {
  maxBooks: 3,
};

export const GlobalSettingsController = {
  getSettings: (req: Request, res: Response) => {
    res.json(globalSettings);
  },

  updateSettings: (req: Request, res: Response) => {
    const { maxBooks } = req.body;
    if (typeof maxBooks === 'number' && maxBooks > 0) {
      globalSettings.maxBooks = maxBooks;
      res.json({ success: true, maxBooks });
    } else {
      res.status(400).json({ success: false, error: 'Invalid maxBooks value' });
    }
  },
}; 