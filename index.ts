import { Sequelize } from "sequelize-typescript";
import { AppManager } from "@nodeknit/app-manager";
import { SystemApp } from "@nodeknit/app-manager";
// import { AppNodeRed } from "@nodeknit/app-nodered";
import { DBconfig } from "./config/sequelize.js";
import { AppBase } from "./app-base/index";
import { AppAdminizer } from "@nodeknit/app-adminizer";
import { adminizerConfig } from "./config/adminizer";
import { setDevENV } from "./devtools/environments";

process.env.SECRET = "secret";
process.env.INIT_APPS_TO_ENABLE = "example";
process.env.NODERED_NODES_DIRS = `${process.cwd()}\app-base\nodered-nodes;${process.cwd()}/data/nodered/node_modules/`

export const sequelize = new Sequelize(DBconfig);

if(!process.env.NODE_ENV) {
  setDevENV()
}

process.env.NODE_ENV = 'production'
process.env.CSRF_COOKIE_INSECURE = "1"

try {
  await sequelize.authenticate();
  AppManager.log.info("Connected to database");

  await sequelize.sync({ force: process.env.NODE_ENV !== 'production' });
  AppManager.log.info("Sequelize ORM initialized!");

  // Initializing App Manager
  const appManager = new AppManager(sequelize);
 
  await appManager.init({
    appsPath: process.env.APPS_PATH ? process.env.APPS_PATH : `${import.meta.dirname}/apps`
  });

  // Defining System App
  const systemApp = new SystemApp(appManager);
  await systemApp._mount();

  // Перемещено выше adminizer
  const App = new AppBase(appManager);
  await App._mount();

  // Run Node-Red
  // const appNodeRed = new AppNodeRed(appManager);
  // await appNodeRed._mount();
  // Run adminizer
  const _AppAdminizer = new AppAdminizer(appManager, adminizerConfig);
  await _AppAdminizer._mount();


  console.log(
    'Зарегистрированные модели:',
    sequelize.modelManager.models.map(m => m.name)
  );


  const config = structuredClone(_AppAdminizer.adminizer.config)
  delete _AppAdminizer.adminizer.config
  _AppAdminizer.adminizer.init(config)
  // await seedDatabase(sequelize.models, 40);
  const PORT = 3700;
  appManager.lift(PORT)

} catch (err) {
  AppManager.log.error("Error starting App Manager:", err, err.stack);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
