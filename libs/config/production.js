import TokenGenerator from '../modules/tokenGenerator.js'

const tokenGenerator = new TokenGenerator(64, true, true, true, false)
process.env.ACCESS_TOKEN_SECRET = tokenGenerator.newToken()
process.env.REFRESH_TOKEN_SECRET = tokenGenerator.newToken()

export default {
    database: process.env.DB_CONFIG,
    environment: 'development',
    port: process.env.PORT || 3300,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpireTime: "2h",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpireTime: "1d",
};
