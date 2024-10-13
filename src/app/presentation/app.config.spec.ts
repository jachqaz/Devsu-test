import {routes} from './app.routes';
import {appConfig} from './app.config';
import {provideRouter} from '@angular/router'; // Assuming AppComponent is the root component

describe('appConfig', () => {
  it('should provide zone change detection, router, and HTTP client', () => {
    const config = appConfig;
    expect(config.providers).toContainEqual(provideRouter(routes));
  });


});
