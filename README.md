# Hypertube

hypertube

## Installation

## TODOS

<!-- Design reference https://github.com/DianaMukaliyeva/hypertube -->

1. /

- Non Authenticated + Authenticated

2. /auth/login/

- Non Authenticated

- 42, google, github login (Omniauth?)
- Validation: email, password, username, last name, first name,
- forget password button

3. /auth/register/

- Non Authenticated

4. /auth/forget-password/

- Non Authenticated
- Email field
- Email Validation
- Send email (No error message though email not exists)

4. /auth/reset-password/?token=...

- Non Authenticated
- Check if token is expired (10mins)
- Two password fields (password, confirm password)
- Click "reset" bring user to /auth/login/

4. /profile

Authenticated

- Modify email address (Don't change email in DB until email confirmed)
- Modify profile picture
- Modify user name, first name, last name
- Modify Preferred language
- Show my comments

5. /users, /users/:id

Authenticated

- Show username, profile image
- Show comments
- Show watched list

6. /movies?filter...

- show list of movies
- Search field

  - Search engine will query at least TWO external sources

- Pagination with infinite scroll
- cover image thumbnails
- If search has been done, display by name
- If no search was done, display most popular video from the external sources sorted by our choice (downloads, peers, seeders)
- differentiate watched and unwatched movie
- Possible to filter (name, genre, imdb grade, production year etc.)

- Watch video

  - check server has video

    - if yes: play
    - if no: download torrent and play at the same time

  - downloaded movie will be removed if unwatched for a month
  - English subtitle available => download and show it.
  - User preferred language's subtitle available? => selectable
  - If browser doesn't support video format, change `fly` to acceptable format. At minimun mkv support is required.

7. /movies/:id

- show movie info (imdb api)

  - movie name
  - movie id
  - casitng (producer, director, main cast etc.)
  - cover image
  - imdb mark
  - production year
  - length(duration)
  - available subtitles
  - number of comments

- CRUD comments with stars ?

8. ETC & Bonus

- User must be logout with one click in any page
- multi language
- additional omniauth strategies
- Stream video via the Media Stream
- More API routes to add, delete movies.
- backend api documentation (https://docs.nestjs.com/openapi/introduction)
- different resolution of video
- Stream video with Media Stream API
- dark / light theme

## Something not clear

1. Search engine at least two external sources
2. How to get movie thumbnail image?
