import { AdminizerConfig } from "@nodeknit/app-adminizer"
import path from "path"
import { readFileSync } from 'fs';

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

export const adminizerConfig: AdminizerConfig = {
    showVersion: packageJson.version,
    routePrefix: "/adminizer",
    welcome: {
        title: "AppBase",
        text: "Сделано в Узбекистане с любовью",
    },
    auth: {
        enable: true,
        captcha: false
    },
    navbar: {
        additionalLinks: [
            {
                link: "/adminizer/settings/global",
                title: "Global settings",
                type: "self",
                id: "settings-global",
                icon: "umbrella",
                accessRightsToken: 'settings-global-link',
                section: 'System',
            }
        ]
    },
    /** Path to custom inertia modules for overriding default views */
    modulesViewsPath: path.resolve(process.cwd(), "app-base/adminizer/modules"),
    models: {
        Book: {
            model: "Book",
            title: "Книги",
            icon: "book",
        },
        Booking: {
            model: "Booking",
            title: "Бронирования",
            icon: "event",
        },
        // Пример: подключение кастомного контроллера для глобальных настроек
        // GlobalSettings: {
        //     model: null, // если нет связанной модели
        //     title: "Глобальные настройки",
        //     icon: "settings",
        //     controller: path.resolve(process.cwd(), "app-base/controllers/GlobalSettingsController.ts")
        // }
    },

    brand: {
        link: "/",
        title: "AppBase"
    }
}
