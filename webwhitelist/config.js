const config = {
    db: { // ���ݿ�����
        host: '192.168.1.53',
        user: 'webwhitelist',
        password: 't64tkzXcFAwss2Sb',
        database: 'webwhitelist'
    },
    registerLimit: 9999,  // ÿ��IP��ַ�����ע������
    emailLimit: 9999,     // ÿ�������ַ�����ע������
    sessionSecret: 'webwhitelist', // session������Կ
};

module.exports = config;
