import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from '@xpdo/core/hmr';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
if (!environment.production) {
  hmrBootstrap(module, bootstrap);
} else {
  enableProdMode();
  bootstrap();
}
  