const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI;

mongoose
	.connect(dbURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));
