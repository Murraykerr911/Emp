class Player {
  constructor() {
    this.level = 1;
    this.cash = 100;
    this.energy = 50;
    this.experience = 0;
    this.unlocks = { "Music Career": false, "Movie Star": false };
    this.movies = [];
    this.musicVideos = [];
    this.songs = [];
    this.productionCompany = null;
  }

  performAction() {
    if (this.energy >= 10) {
      this.energy -= 10;
      this.cash += 20;
      this.experience += 10;
      this.checkLevelUp();
    } else {
      alert("Not enough energy!");
    }
  }

  checkLevelUp() {
    if (this.experience >= 100 && !this.unlocks["Music Career"]) {
      this.unlocks["Music Career"] = true;
      alert("Music Career Unlocked!");
    }
    if (this.experience >= 200 && !this.unlocks["Movie Star"]) {
      this.unlocks["Movie Star"] = true;
      alert("Movie Star Unlocked!");
    }
  }

  createMovie(title, director, description) {
    const movie = new Movie(title, director, description);
    this.movies.push(movie);
  }

  createMusicVideo(title, artist, description) {
    const musicVideo = new MusicVideo(title, artist, description);
    this.musicVideos.push(musicVideo);
  }

  createSong(title, artist, description) {
    const song = new Song(title, artist, description);
    this.songs.push(song);
  }

  startProductionCompany() {
    if (this.level >= 25 && !this.productionCompany) {
      this.productionCompany = new ProductionCompany();
      alert("Production Company Started!");
      document.getElementById("productionCompanyDetails").style.display = 'block';
    } else {
      alert("Level 25 required to start a production company!");
    }
  }

  saveProductionCompany(name, description) {
    if (this.productionCompany) {
      this.productionCompany.setName(name);
      this.productionCompany.setDescription(description);
      alert("Production Company saved!");
    }
  }

  produceMovie(title, director) {
    if (this.productionCompany) {
      if (this.cash >= 500) {
        this.cash -= 500;
        const movie = new Movie(title, director, "A blockbuster movie");
        this.productionCompany.addProject(movie);
        alert(`Produced movie: ${title}`);
      } else {
        alert("Not enough cash to produce a movie!");
      }
    } else {
      alert("Start a production company first!");
    }
  }
}

class Actor {
  constructor(name, fame, actingSkill) {
    this.name = name;
    this.fame = fame;
    this.actingSkill = actingSkill;
  }
}

class Artist {
  constructor(name, fame, voice, charisma) {
    this.name = name;
    this.fame = fame;
    this.voice = voice;
    this.charisma = charisma;
  }
}

class Movie {
  constructor(title, director, description) {
    this.title = title;
    this.director = director;
    this.description = description;
    this.actors = [];
  }

  addActor(actor) {
    this.actors.push(actor);
  }
}

class MusicVideo {
  constructor(title, artist, description) {
    this.title = title;
    this.artist = artist;
    this.description = description;
    this.features = [];
  }

  addFeature(artist) {
    this.features.push(artist);
  }
}

class Song {
  constructor(title, artist, description) {
    this.title = title;
    this.artist = artist;
    this.description = description;
    this.features = [];
  }

  addFeature(artist) {
    this.features.push(artist);
  }
}

class ProductionCompany {
  constructor() {
    this.name = "Untitled Production Co.";
    this.description = "A small indie production company.";
    this.projects = [];
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  addProject(project) {
    this.projects.push(project);
  }
}

const player = new Player();

document.getElementById("performAction").addEventListener("click", () => {
  player.performAction();
  updateStatus();
});

document.getElementById("createMovie").addEventListener("click", () => {
  const title = prompt("Enter movie title:");
  const director = prompt("Enter director:");
  const description = prompt("Enter movie description:");
  player.createMovie(title, director, description);
});

document.getElementById("createMusicVideo").addEventListener("click", () => {
  const title = prompt("Enter music video title:");
  const artistName = prompt("Enter artist name:");
  const artist = new Artist(artistName, 90, 90, 85);
  const description = prompt("Enter video description:");
  player.createMusicVideo(title, artist, description);
});

document.getElementById("createSong").addEventListener("click", () => {
  const title = prompt("Enter song title:");
  const artistName = prompt("Enter artist name:");
  const artist = new Artist(artistName, 90, 85, 80);
  const description = prompt("Enter song description:");
  player.createSong(title, artist, description);
});

document.getElementById("startProductionCompany").addEventListener("click", () => {
  player.startProductionCompany();
});

document.getElementById("saveCompany").addEventListener("click", () => {
  const name = document.getElementById("companyName").value;
  const description = document.getElementById("companyDescription").value;
  player.saveProductionCompany(name, description);
});

document.getElementById("addActor").addEventListener("click", () => {
  const name = prompt("Enter actor name:");
  const fame = parseInt(prompt("Enter actor fame level:"));
  const actingSkill = parseInt(prompt("Enter actor acting skill:"));
  const actor = new Actor(name, fame, actingSkill);
  player.movies[0].addActor(actor);
});

document.getElementById("addMusicFeature").addEventListener("click", () => {
  const name = prompt("Enter featured artist name:");
  const artist = new Artist(name, 90, 85, 80);
  player.musicVideos[0].addFeature(artist);
});

document.getElementById("addSongFeature").addEventListener("click", () => {
  const name = prompt("Enter featured artist name:");
  const artist = new Artist(name, 90, 85, 80);
  player.songs[0].addFeature(artist);
});

document.getElementById("produceMovie").addEventListener("click", () => {
  const title = prompt("Enter movie title:");
  const director = prompt("Enter director:");
  player.produceMovie(title, director);
});

function updateStatus() {
  document.getElementById("level").textContent = player.level;
  document.getElementById("cash").textContent = player.cash;
  document.getElementById("energy").textContent = player.energy;
}
