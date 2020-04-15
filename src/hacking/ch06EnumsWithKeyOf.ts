const TimeUnitValues = {
  MILLIS: 1,
  SECONDS: 1000,
  MINUTES: 60_000,
};

type TimeUnit = keyof typeof TimeUnitValues;

function toMillis(n: number, unit: TimeUnit): number {
  return n * TimeUnitValues[unit];
}

const EnvConfigs = {
  // TODO: How can we make sure all entries conform to a specific shape?
  PROD: {
    baseUrl: "https://integration.example.com",
    timeout: [10, "SECONDS"],
  },
  LOCAL: {
    baseUrl: "http://localhost:3000",
    timeout: [1, "MINUTES"],
  },
} as const;

export type Env = keyof typeof EnvConfigs;

export function invokeEndpoint(env: Env, path: string): string {
  const cfg = EnvConfigs[env];
  const url = cfg.baseUrl + path;
  const timeout = toMillis(cfg.timeout[0], cfg.timeout[1]);
  return `Calling ${url} with a timeout of ${timeout} ms`;
}
