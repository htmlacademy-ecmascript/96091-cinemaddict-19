import {getRandomArrayElement} from '../utils.js';

const mockCards = [
  {
    id: '0',
    comments: [
      '0', '5', '9', '12'
    ],
    filmInfo: {
      title: 'Великий Фламарион',
      alternativeTitle: 'Лень которая продала себя',
      totalRating: 8.9,
      poster: './images/posters/the-great-flamarion.jpg',
      ageRating: '18+',
      director: 'Энтони Манн',
      writers: [
        'Энн Вигтон', 'Хайнц Геральд', 'Ричард Вейл'
      ],
      actors: [
        'Эрих фон Штрогейм', 'Мэри Бет Хьюз', 'Дэн Дьюри'
      ],
      release: {
        date: new Date('1945-03-30'),
        releaseCountry: 'США'
      },
      duration: '1h 18m',
      genres: [
        'Драматический', 'фильм-нуар', 'Тайна'
      ],
      description: 'Великий Фламарион sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
    },
    userDetails: {
      isInwatchlist: false,
      isWatched: true,
      watchingDate: new Date('2022-03-30'),
      isFavorite: false
    }
  },
  {
    id: '1',
    comments: [
      '1', '6'
    ],
    filmInfo: {
      title: 'Танец жизни',
      alternativeTitle: 'Тот самый танец',
      totalRating: 8.3,
      poster: '/public/images/posters/the-dance-of-life.jpg',
      ageRating: '16+',
      director: 'Никита Михалков',
      writers: [
        'Автор-1', 'Автор-2', 'Автор-3'
      ],
      actors: [
        'Юрий Никулин', 'Григорий Лепс', 'Неточка Незванова'
      ],
      release: {
        date: new Date('1929-10-07'),
        releaseCountry: 'СССР'
      },
      duration: '1h 55m',
      genres: [
        'Мюзикл', 'Коммедия'
      ],
      description: 'Танец жизни sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
    },
    userDetails: {
      isInwatchlist: true,
      isWatched: true,
      watchingDate: new Date('2022-03-30'),
      isFavorite: true
    }
  },
  {
    id: '2',
    comments: [
      '2', '7', '10', '13', '14'
    ],
    filmInfo: {
      title: 'Полынная тропа',
      alternativeTitle: 'Полынный газон',
      totalRating: 3.2,
      poster: './public/images/posters/sagebrush-trail.jpg',
      ageRating: '0+',
      director: 'Вася Петров',
      writers: [
        'Первый Автор', 'Еще Автор'
      ],
      actors: [
        'Павел Воля', 'Гарик Хорламов', 'Ляйсан Утяшева'
      ],
      release: {
        date: new Date('1933-01-02'),
        releaseCountry: 'Северная Карей'
      },
      duration: '54m',
      genres: [
        'Коммедия', 'Приключения','Фентези'
      ],
      description: 'Полынная тропа sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
    },
    userDetails: {
      isInwatchlist: false,
      isWatched: false,
      watchingDate: null,
      isFavorite: false
    }
  },
  {
    id: '3',
    comments: [
      '3', '8', '11'
    ],
    filmInfo: {
      title: 'Человек c золотой рукой',
      alternativeTitle: 'Брилиантовая рука',
      totalRating: 9.0,
      poster: './images/posters/the-man-with-the-golden-arm.jpg',
      ageRating: '6+',
      director: 'Брэмм Стокер',
      writers: [
        'Граф Дракула', 'Энтони Хопкинс', 'Бритни Спирс'
      ],
      actors: [
        'Вампир', 'Серийный Убийца', 'Бездарная Певица'
      ],
      release: {
        date: new Date('1955-11-12'),
        releaseCountry: 'СССР'
      },
      duration: '1h 59m',
      genres: [
        'Ужасы', 'Триллер','Фантастика'
      ],
      description: 'Человек c золотой рукой sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
    },
    userDetails: {
      isInwatchlist: true,
      isWatched: true,
      watchingDate: new Date('2020-08-25'),
      isFavorite: true
    }
  },
  {
    id: '4',
    comments: [],
    filmInfo: {
      title: 'Санта-Клаус побеждает марсиан',
      alternativeTitle: 'Космические войны с Сантой',
      totalRating: 2.0,
      poster: './images/posters/santa-claus-conquers-the-martians.jpg',
      ageRating: '0+',
      director: 'Гарри Поттер',
      writers: [
        'Геднальф Великий', 'Сириус Снейк', 'Плакса Миртл'
      ],
      actors: [
        'Узник Аскабана', 'Повелитель Змей'
      ],
      release: {
        date: new Date('1964-01-01'),
        releaseCountry: 'США'
      },
      duration: '1h 21m',
      genres: [
        'Сказка', 'Фентези','Приключения'
      ],
      description: 'Санта-Клаус побеждает марсиан sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
    },
    userDetails: {
      isInwatchlist: true,
      isWatched: false,
      watchingDate: null,
      isFavorite: true
    }
  },
  {
    id: '5',
    'comments': [
      '4'
    ],
    filmInfo: {
      title: 'Моряк Попай встречает моряка Синдбада',
      alternativeTitle: 'Драка двух моряков',
      totalRating: 6.4,
      poster: './images/posters/popeye-meets-sinbad.png',
      ageRating: '18+',
      director: 'Стивен Сигал',
      writers: [
        'Арнольд Шварцнегер', 'Брюс Ли',
      ],
      actors: [
        'Ван Дам', 'Киборг Убийца', 'Джеки Чан'
      ],
      release: {
        date: new Date('1936-09-01'),
        releaseCountry: 'США'
      },
      duration: '16m',
      genres: [
        'Боевик', 'Коммедия'
      ],
      description: 'Моряк Попай встречает моряка Синдбада sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
    },
    userDetails: {
      isInwatchlist: false,
      isWatched: false,
      watchingDate: null,
      isFavorite: false
    }
  },
];

function getRandomMockCard() {
  return getRandomArrayElement(mockCards);
}

export {getRandomMockCard};
