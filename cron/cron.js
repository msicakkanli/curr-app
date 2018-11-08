
var cron = require('cron')
console.log('Before job instantiation');
const job = cron.job('*/10 * * * * *', function() {
	const d = new Date();
	console.log('Every Tenth Seconds:', d);
});
console.log('After job instantiation');
job.start();

module.exports = cron