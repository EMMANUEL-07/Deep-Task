const app = require('./app');
const config = require('./config');

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Metric-logging Analytic Server started on port ${PORT}`);
});