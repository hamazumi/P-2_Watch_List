const db = require('./models')

async function addToWatch() {
    try {
      // First, get a reference to a pet.
      const [user, userCreated] = await db.user.findOrCreate({
        where: {
          user: "Kenuser",
        }
      })
  
      // Second, get a reference to a toy.
      const [movie, movieCreated] = await db.movie.findOrCreate({
        where: { 
            title: "Test movie", 
            year: 1993
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
      const movie = await db.movie.findOne({
        where: { 
            title: "Test movie"
         }
      })
  
      const users = await movie.getUsers()
      console.log(`${users.length} added ${movie.title} to watchlist.`);
    } catch (error) {
      console.log(error)
    }
  }
  
  findUsers()

