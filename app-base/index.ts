import { AbstractApp, AppManager, Collection } from "@nodeknit/app-manager";
import { AddToCollection } from '@nodeknit/app-manager/lib/decorators/appUtils';
import { Book } from "./models/Book";
import { Booking } from "./models/Booking";
import { GlobalSettingsController } from "./controllers/GlobalSettingsController";
import { globalSettingsMiddleware } from './adminizer/settings/global';

export class AppBase extends AbstractApp {
    appId: string = "base";
    name: string = "Book Exchange Base";

    @Collection
    models: any[] = [
        Book,
        Booking
    ];

    @Collection
    controllers: any[] = [
        GlobalSettingsController,
        // UserController, BookController (будут добавлены)
    ];

    @AddToCollection('adminizerMiddlewares')
    customMiddlewares = [
        globalSettingsMiddleware,
        // сюда можно добавить другие кастомные middlewares
    ];

    async mount(): Promise<void> {
        // bootstrap logic (будет добавлено)
    }
    async unmount(): Promise<void> {
        throw new Error("Is system module");
    }
}
