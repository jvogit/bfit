# BFit
Calorie counter example app

## Run build
1. Run `gradlew bootRun` to launch app
2. Find app at `localhost:8080`

## Dev workflow
Before starting to develop run `gradlew bootJar`
1. In one terminal `gradlew bootRun -PskipNpm`
2. In second terminal go into the `frontend` directory then run `npm start`

Find the app at `localhost:3000` and frontend changes there

## Extra
- [baseweb](https://baseweb.design/)
- [redux](https://www.youtube.com/watch?v=FqSabub_yNI)
- [react redux saga](https://www.youtube.com/watch?v=1K26DIKt3w8)

## Environment variables used in production deployment
Environment needed during deployment such as heroku
- `JDBC_DATABASE_URL`
- `JDBC_DATABASE_USERNAME`
- `JDBC_DATABASE_PASSWORD`

Note: Above three automatically set by heroku by adding postgresql addon

- `JWT_SECRET` (secret used for JWT validation. HS512 at least 512 bits)
- `JWT_EXPIRE_MS` (amount of time in milliseconds when an auth token expires)
- `buildType` (buildType usually `prod` for deployment)

Note: `prod` must be set when running jar (see `Procfile`)
- `java -Dspring.profiles.active=prod -jar build/libs/jarFile.jar`

## Extra parameters
1. `gradlew bootRun -PskipNpm` - Skips frontend build
2. `gradlew bootRun -PbuildType=dev` - buildType: `prod` or `dev` (default)

## gradle cmds
- `gradlew help` - help
- `gradlew tasks` - view tasks
- `gradlew <task>` - run a task
