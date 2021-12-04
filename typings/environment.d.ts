import { DsnLike } from "@sentry/types";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URI: string;
			NODE_ENV: "development" | "production" | "lockdown";
			DISCORD_TOKEN: string;
			SENTRY_DSN: string;
		}
	}
}

export {};
