# CLIMA APP

Este proyecto de React creato con Vite para obtener el clima de una ciudad.

## Dependencias

| Dependencia | Versión |
|-------------|---------|
| Axios            | ^1.7.2   |
| Bootstrap        | ^5.3.3   |
| gh-pages         | ^6.1.1   |
| firebase         | ^9.8.1   |
| emotion/react    | ^11.11.4 |
| emotion/styled   | ^11.11.5 |
| react-redux      | ^^9.1.2  |
| react-router-dom |     6    |

## API

| API            | URL                                       |
|----------------|-------------------------------------------|
| OpenWeather    | [https://home.openweathermap.org/](https://home.openweathermap.org/) |
| restcountries  | [https://restcountries.com/](https://restcountries.com/) |

## Para despliegue en local

### Repositorios

[Github](https://github.com/Rokralio/Web-Clima)
[Docker](https://hub.docker.com/r/rokralio/mi-web-clima)

### GIT
| git                 | Descripción                                                   |
|----------------------|---------------------------------------------------------------|
| Clonar el Repositorio | `git clone https://github.com/Rokralio/Web-Clima.git`          |
| Instalar Dependencias | `yarn`                                                        |
| Iniciar Servidor      | `yarn dev`                                                    |

### Docker
| docker                  | Descripción                                                   |
|-----------------------|---------------------------------------------------------------|
| Pull de la Imagen     | `docker pull rokralio/mi-web-clima:latest`                     |
| Correr la Imagen      | `docker run -d -p 80:80 rokralio/mi-web-clima:latest`          |
| Verificación del Estado| `docker ps`                                                   |

## Link de la App desplegada

[climaapp](https://rokralio.github.io/climaapp/)


## Filtrado de la data

### obtener tipos de clima únicos desde `data.json`

```javascript
import dataClima from './data.json' assert { type: 'json' };

const clima = new Set();

dataClima.forEach(item => {
    const description = item.weather[0].description;
    clima.add( description );
});

const climaArray = Array.from(clima);

console.log('Tipos de clima únicos:');
climaArray.forEach((clima, i) => {
    console.log(`${i + 1}. ${clima}`);
});
