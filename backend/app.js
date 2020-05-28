const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use(require('./routes/autenticacion'));
app.use(require('./routes/mantenimientos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/motos'));
app.use(require('./routes/mantenimientos'));
app.use(require('./routes/datos'));

app.listen(4000);
console.log('Server on port 4000');
