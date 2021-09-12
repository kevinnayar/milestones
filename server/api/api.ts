import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import config from '../serverConfig';

process.on('unhandledRejection', (e) => {
  // @ts-ignore
  const message = 'message' in e ? e.message : null;
  // @ts-ignore
  const stack = 'stack' in e ? e.stack : null;
  console.error(message, stack);
});

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [config.app.baseUrl],
    credentials: true,
  }),
);

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(
  session({
    secret: config.auth.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24,
    },
  }),
);

export default app;


// import redis from 'redis';
// import serverConfig from '../serverConfig';

// const defaultConfig = {
//   host: serverConfig.redis.host,
//   port: serverConfig.redis.port,
// };

// const factory = (c = {}) => {
//   const client = redis.createClient({
//     ...defaultConfig,
//     ...c,
//   });

//   return client;
// };

// export const createClient = factory;

// // Export Global redis client
// export default factory();


// ----

// import session from 'express-session';

// const redisClient = createClient({
//   retry_strategy: ({ error }) => redisClient.emit('error', error),  // TODO: figure out if this is really needed.
// });

// redisClient.on('error', (error) => {
//   console.error(error);
//   if (error.message && error.stack) {
//     console.error(error.message, error.stack);
//   }
//   throw new Error(error);
// });

// const RedisStore = require('connect-redis')(session);

// const minutes = process.env.NODE_ENV === 'development' ? 480 : 15;
// const maxAgeMilliseconds: number = minutes * 60 * 1000;
// const sessionStore = new RedisStore({
//   client: redisClient,
// });
// const mySession = session({
//   saveUninitialized: false,
//   secret: 'shave the yak dot commmmmm',
//   cookie: { maxAge: maxAgeMilliseconds },
//   store: sessionStore,
//   rolling: true,
// });
// app.use(mySession);


