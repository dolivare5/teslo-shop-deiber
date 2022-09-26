export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'development',
    postgresDB: process.env.POSTGRES_DB,
    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresPort: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    portServer: parseInt(process.env.PORT_SERVER, 10) || 3002,
    defaultLimit: parseInt(process.env.DEFAULT_LIMIT, 10) || 7,
})