const db = require('./models')

async function addToWatch() {
    try {
      // First, get a reference to a pet.
      const [user, userCreated] = await db.user.findOrCreate({
        where: {
          user: "Ken",
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
  
  addToWatch()