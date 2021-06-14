const db = require('./models')

db.movie.sync({ alter: true })

async function addToWatch() {
    try {
      // First, get a reference to a user.
      const [user, userCreated] = await db.user.findOrCreate({
        where: {
          user: "Kenuser",
        }
      })
  
      // Second, get a reference to a movie.
      const [movie, movieCreated] = await db.movie.findOrCreate({
        where: { 
            title: "Different Test Movie", 
            year: 2000
         }
      })
  
      // Finally, use the "addModel" method to attach one model to another model.
      await user.addMovie(movie)
      console.log(`${movie.title} added to ${user.user}.`);
  
    } catch (error) {
      console.log(error)
    }
  }

  // addToWatch()

  //Get all users that added movie to watch list
  async function findUsers() {
    try {
      const user = await db.user.findOne({
        where: { 
            user: req.query.user
         }
      })
  
      const movies = await user.getMovies()

      movies.forEach(movie => {
        console.log(`${user.user} has ${movie.title} added to watchlist.`)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  findUsers()

