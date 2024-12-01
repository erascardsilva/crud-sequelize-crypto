/* Crud com Mysql bcrypt e jwt treinando  */

const Express = require('express');
const app = Express();
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/routes');
const PORTA = process.env.PORT || 3000

app.use(Express.json());
app.use(cors());

app.use('/users', router);

app.listen(PORTA, () => {
console.log(`Servidor rodando na porta ${PORTA}`);
});