import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';  // Importa ToastrModule
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../app/interceptors/jwt.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(
        withInterceptorsFromDi(),
    ),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
    },
    ToastrModule,
  ],
  
};
export const API_CONFIG = {
  rootUrl: 'https://localhost:7196',  // Aquí defines la URL base de tu API
};
