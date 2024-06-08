const config = {
    db: { // 数据库配置
        host: 'hostname',
        user: 'webwhitelist',
        password: 't64tkzXcFAwss2Sb',
        database: 'webwhitelist'
    },
    registerLimit: 1, // 每个IP地址的最大注册数量
    emailLimit: 1,   // 每个邮箱地址的最大注册数量
    sessionSecret: 'webwhitelist', // session加密密钥
    secondSend: 60, // 两次发送验证码时间间隔（秒）(未完善)
};

module.exports = config;
