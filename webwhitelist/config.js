const config = {
    db: { // 数据库配置
        host: '192.168.1.53',
        user: 'webwhitelist',
        password: 't64tkzXcFAwss2Sb',
        database: 'webwhitelist'
    },
    registerLimit: 9999,  // 每个IP地址的最大注册数量
    emailLimit: 9999,     // 每个邮箱地址的最大注册数量
    sessionSecret: 'webwhitelist', // session加密密钥
};

module.exports = config;
