const express = require('express');
const app = express();
const mysql = require('mysql');
const config = require('./config');
const session = require('express-session');
const { sendVerificationEmail } = require('./mailer');


// ʹ�������ļ��е���Ϣ���������ݿ�����
const db = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

app.post('/send-code', (req, res) => {
    const email = req.body.email;
    const code = Math.floor(100000 + Math.random() * 900000);  // ����6λ�������֤��

    // ����֤��洢��session�У����ں�����֤
    req.session.code = code;
    req.session.email = email;

    sendVerificationEmail(email, code)
        .then(() => {
            res.send('Verification code sent to your email.');
        })
        .catch(err => {
            res.status(500).send('Failed to send email.');
        });
});

app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (req.session.code == code) {
        res.send('Email verified successfully.');
    } else {
        res.status(400).send('Incorrect code.');
    }
});

// ���ӵ����ݿ�
db.connect((err) => {
    if (err) {
        return console.error('error connecting: ' + err.stack);
    }
    console.log('connected as id ' + db.threadID);
    // �������ݱ�
    const createTableQuery = `
        CREATE TABLE if not exists users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        ip_address VARCHAR(255),
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Table 'users' ensured to exist or created successfully.");
    });
});
// ����EJSΪ��ͼ����
app.set('view engine', 'ejs');

// ����һ��·������ȾEJSҳ��
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, email } = req.body;
    const ip_address = req.ip;

    if (req.session.verificationCode !== code) {
        return res.status(400).send('Invalid verification code.');
    }
    // ����û����Ƿ��Ѵ���
    const usernameCheckQuery = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
    db.query(usernameCheckQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).send('Database error during username check.');
        }
        if (results[0].count > 0) {
            return res.status(409).send('Username already exists.');
        }
        // ���������Ƿ��Ѵﵽע������
        const checkEmailQuery = 'SELECT COUNT(*) AS count FROM users WHERE ' + email + ' = ?';
        db.query(checkEmailQuery, [email], (err, results) => {
            if (err) return res.status(500).send('Database error.');

            if (results[0].count >= config.emailLimit) {
                return res.status(400).send('This email has reached its registration limit.');
            }
            const query = 'SELECT COUNT(*) AS count FROM users WHERE ' + ip_address + ' = ?';
            db.query(query, [ip_address], (err, results) => {
                if (err) {
                    return res.status(500).send('Database error.');
                }
                if (results[0].count >= config.registerLimit) {
                    return res.status(400).send('Registration limit reached for this IP address.');
                }
            
            // �������û�
            const insertQuery = 'INSERT INTO users ('+ username + ',' + ip_address + ',' + email+ ') VALUES (?, ?, ?)';
                db.query(insertQuery, [username, ip_response_address, email], (err, result) => {
                    if (err) return res.status(500).send('Error registering user.');
                    res.send('User registered successfully.');
                });
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});