# Hypertube

Hypertube is ecole42's web project that uses the torrent protocol to downloads and streams videos at the same time.

|         home         |         login         |
| :------------------: | :-------------------: |
| ![](./demo/home.png) | ![](./demo/login.png) |

|         register         |         profile         |
| :----------------------: | :---------------------: |
| ![](./demo/register.png) | ![](./demo/profile.png) |

|         movie         |         video         |
| :-------------------: | :-------------------: |
| ![](./demo/movie.png) | ![](./demo/video.png) |

## Stack

- MySQL
- NestJS
- Nuxt

## Features

- Infinite scroll
- Cronjob to remove movies if not watched more than a month
- Oauth2 login (42, google, github)
- TMDB, YTS external api Resources
- Movie subtitles with FR/EN by using open subtitles api
- Support 2 languages FR/EN

## Installation

```bash
source alias.sh

# dev
## First execution
dev-up-build

## After build docker image
dev-up

## Install package
front-dev pnpm i some-package
back-dev pnpm i some-package
```

# Bonus

- Dockerize all services
- Additional Oauth2 strategies
- Different resolution of video
- API Documentation with swagger
- Subtitle sync button

## Resources

- [Video buffering and streaming in NodeJS](https://www.youtube.com/watch?v=cuLawu_m0_Y)
