export * from './auth.service';
import { AuthService } from './auth.service';
export * from './eventos.service';
import { EventosService } from './eventos.service';
export * from './usuario.service';
import { UsuarioService } from './usuario.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [AuthService, EventosService, UsuarioService, WeatherForecastService];
