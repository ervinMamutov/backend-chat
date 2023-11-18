import chalk from 'chalk';

const logger = (req, res, next) => {
  const timestamp = new Date().toUTCString();
  console.log(
    `${chalk.green(req.url)} --- ${chalk.blue(req.method)} --- ${chalk.yellow(
      res.statusCode
    )} --- ${chalk.pink(timestamp)}`
  );
  next();
};

export default logger;
