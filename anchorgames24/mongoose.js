const mongoose = require('mongoose');

// Set strictQuery to true to suppress the warning
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/anchor-games', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
