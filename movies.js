'use strict';

let personalMovieDB = {
   count: 0,
   movies: {},
   actors: {},
   genres: [],
   privat: false,
   start() {
      this.count = +prompt('Скільки фільмів ви вже переглянули?', '');
      while (this.count === '' || isNaN(this.count) || this.count <= 0) {
         this.count = +prompt('Скільки фільмів ви вже переглянули?', '');
      }
      return this
   },
   detectPersonalLevel() {
      if (this.count <= 0) {
         alert("Произошла ошибка");
      } else if (this.count < 10) {
         alert('Переглянуто досить мало фільмів');
      } else if (this.count >= 10 && this.count <= 30) {
         alert('Ви класичний глядач');
      } else if (this.count > 30) {
         alert('Ви кіноман');
      }
      return this
   },
   rememberMyFilms() {
      for (let i = 0; i < 2; i++) {
         let lastOfFilm = prompt('Один з останніх переглянутих фільмів?', '');

         while (lastOfFilm === '' || lastOfFilm.length > 50 || /^\d+$/.test(lastOfFilm)) {
            lastOfFilm = prompt('Назва фільма повинна містити літери і не перевищувати 50 символів. Будь ласка, повторіть введення:');
         }

         let ratingOfFilm = +prompt('На скільки оціните його?', '');
         while (ratingOfFilm < 0 || ratingOfFilm > 10 || isNaN(ratingOfFilm)) {
            ratingOfFilm = prompt('Оцінка фільму повинна бути числом від 0 до 10. Будь ласка, повторіть введення:');
            break;
         }
         this.movies[lastOfFilm] = ratingOfFilm;
      }
      return this
   },
   showMyDB(hidden) {
      if (!hidden) {
         alert(JSON.stringify(this))
      }
      return this
   },
   writeYourGenres() {
      for (let i = 1; i <= 3; i++) {
         let genre = prompt(`Ваш улюблений жанр під номером ${i}`);

         if (genre === null || genre.trim() === '' || (!/^[a-zA-Z]+$/.test(genre) && !/^[а-яА-ЯёЁ]+$/.test(genre))) {
            alert('Ви повинні ввести жанр. Будь ласка, спробуйте знову.');
            i--;
            continue;
         }

         this.genres.push(genre);
      }

      this.genres.forEach((genre, index) => {
         console.log(`Улюблений жанр #${index + 1} - це ${genre}`);
      });
      return this
   },
   toggleVisibleMyDB() {
      this.privat = !this.privat;
      return this
   }
};

personalMovieDB.start().detectPersonalLevel().rememberMyFilms().showMyDB(this.privat).writeYourGenres().toggleVisibleMyDB();

console.log(personalMovieDB);

// personalMovieDB.start();
// personalMovieDB.detectPersonalLevel();
// personalMovieDB.rememberMyFilms();
// personalMovieDB.showMyDB(personalMovieDB.privat);
// personalMovieDB.writeYourGenres();
// personalMovieDB.toggleVisibleMyDB();




