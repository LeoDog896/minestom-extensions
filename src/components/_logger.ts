import winston from 'winston';

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
	level: 'silly',
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
		winston.format.errors({
			stack: true
		}),
		winston.format.colorize({ all: true }),
		winston.format.splat(),
		winston.format.printf(info => {
			return `[Minestom] ${info.timestamp} [${info.level}]: ${info.message}`;
		})
	),
	transports
});

export default logger;