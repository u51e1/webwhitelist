const config = {
    db: { // ���ݿ�����
        host: '192.168.1.53',
        user: 'webwhitelist',
        password: 't64tkzXcFAwss2Sb',
        database: 'webwhitelist'
    },
    registerLimit: 1, // ÿ��IP��ַ�����ע������
    emailLimit: 1,   // ÿ�������ַ�����ע������
    sessionSecret: 'webwhitelist', // session������Կ
    secondSend: 60, // ���η�����֤��ʱ�������룩
};

module.exports = config;
