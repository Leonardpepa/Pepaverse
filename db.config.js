const Mongoose = require("mongoose");

const initdb = async () => {
    try {
        return await Mongoose.connect(process.env.MONGO_DB_URL, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
         });
    } catch (error) {
        console.log(error);
    }
};


module.exports = { initdb };
