const config = require('./config');

const AverageValues = [];

const MetricValues = [];

let activeWindow = false;

const Interval = +config.WINDOWTIME;

const windowLogic = () => {

  activeWindow = true;

  setTimeout(() => {
    AverageValues.push(Math.floor(MetricValues.reduce((a, b) => (a + b)) / MetricValues.length));
    activeWindow = false;
    MetricValues.length = 0;
  }, Interval);
};

exports.postMetric = (req, res, next) => {
  let metricVal = req.params.metric;

  if (!+metricVal) {
    metricVal = 0;
  }

  if (activeWindow) {
    MetricValues.push(+metricVal);
  }
  else {
    windowLogic();
    MetricValues.push(+metricVal);
  }

  /* return res.status(204).json({"message": 'Metric Added Successfully'}); */
  return res.status(201).end();

};

exports.getMetric = (req, res, next) => {

  AverageValues.sort((a, b) => a - b);

  let arrlength = AverageValues.length;

  if (arrlength == 0) {

    return res.status(200).json({ "median": "No average values yet" });
  }
  else if ((arrlength % 2) == 0) {
    let c = arrlength / 2;
    let d = [AverageValues[c - 1], AverageValues[c]];
    return res.status(200).json({ "median": d.sort((x, y) => x - y)[0] });
  }
  else {
    let ind = Math.floor(arrlength / 2);
    return res.status(200).json({ "median": AverageValues[ind] });
  }

};

exports.deleteMetric = (req, res, next) => {
  AverageValues.length = 0;

  /* return res.status(204).json({"message": 'Deleted Successfully', "Median": AverageValues }); */
  return res.status(204).end();
};