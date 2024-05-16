
// initialize database connection
const mongoose = require('mongoose')
const  connectionString  = 'mongodb://127.0.0.1:27017/anchor-games'

// Check for connection string
if(!connectionString) {
  console.error('MongoDB connection string missing!')
  process.exit(1)
}

//Connect with to MongoDB connection string
mongoose.connect(connectionString, { useNewUrlParser: true })
const db = mongoose.connection

//Verify connection
db.on('error', err => {
  console.error('MongoDB error: ' + err.message)
  process.exit(1)
})
db.once('open', () => console.log('MongoDB connection established'))

// seed data for Trading Card
const TradingCard = require('./tradingcard.js')

TradingCard.find((err, items) => {
  if(err) return console.error(err)
  if(items.length) return

  new TradingCard({ 
    name: 'MLB Rookie Card Pack', 
    price: 5.99 
  }).save();

  new TradingCard({ 
    name: 'NBA Rookie Card Pack', 
    price: 6.99 
  }).save();

  new TradingCard({ 
    name: 'Yu-Gi-Oh Card Pack', 
    price: 7.99 
  }).save();

  new TradingCard({ 
    name: 'Pokemon Card Pack', 
    price: 8.99 
  }).save();
})

// seed data for Board Game

const BoardGame = require('./boardGame.js')

BoardGame.find((err, items) => {
  if(err) return console.error(err)
  if(items.length) return

  new BoardGame({ 
    name: 'Monopoly', 
    price: 19.99 
  }).save();

  new BoardGame({ 
    name: 'Candyland', 
    price: 24.99 
  }).save();

  new BoardGame({ 
    name: 'Chess', 
    price: 20.99 
  }).save();

  new BoardGame({ 
    name: 'Risk', 
    price: 22.99 
  }).save();
})
// seed data for Video Game

const VideoGame = require('./videoGame.js');

VideoGame.find((err, items) => {
  if(err) return console.error(err);
  if(items.length) return;

  new VideoGame({
    name: 'Call of Duty',
    price: 49.99,
  }).save();

  new VideoGame({
    name: 'Madden 23',
    price: 39.99,
  }).save();

  new VideoGame({
    name: 'Fifa 23',
    price: 59.99,
  }).save();

  new VideoGame({
    name: 'Minecraft',
    price: 26.99,
  }).save();
});
//const VacationInSeasonListener = require('./models/vacationInSeasonListener')

module.exports = {
  getMovies: async (options = {}) => Movie.find(options),
//   addVacationInSeasonListener: async (email, sku) => {
//     await VacationInSeasonListener.updateOne(
//       { email },
//       { $push: { skus: sku } },
//       { upsert: true }
//     )
//   },
}