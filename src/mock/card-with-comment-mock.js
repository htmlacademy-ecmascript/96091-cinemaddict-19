import {mockCards} from './card-mock.js';
import {mockComments} from './comment-mock.js';
import {getRandomArrayElement} from '../utils.js';

// function getRandomCardWithComments() {
//   const card = getRandomArrayElement(mockCards);
//   card.comments = card.comments.map((commentId) => mockComments[commentId]);
//   return card;
// }

// export {getRandomCardWithComments};

function getRandomCardWithComments() {
  const cards = [
    {
      id: '0',
      comments: [
        {
          id: '0',
          author: 'Иван Иванов',
          comment: 'Первый комментарий к фильму Великий Фламарион',
          date: new Date('2019-05-12T16:12:32'),
          emotion: 'smile'
        },
        {
          id: '5',
          author: 'Иван Петров',
          comment: 'Второй комментарий к фильму Великий Фламарион',
          date: new Date('2019-05-13T16:12:32'),
          emotion: 'sleeping'
        },
        {
          id: '9',
          author: 'Петр Иванов',
          comment: 'Третий комментарий к фильму Великий Фламарион',
          date: new Date('2019-06-14T16:12:32'),
          emotion: 'puke'
        },
        {
          id: '12',
          author: 'Сидор Сидоров',
          comment: 'Четверный комментарий к фильму Великий Фламарион',
          date: new Date('2019-12-15T16:12:32'),
          emotion: 'angry'
        }
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
          'Драматический', 'Артхаус', 'Тайна'
        ],
        description: 'Великий Фламарион sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      },
      userDetails: {
        isInWatchlist: false,
        isWatched: true,
        watchingDate: new Date('2022-03-30'),
        isFavorite: false
      }
    },
    {
      id: '1',
      comments: [
        {
          id: '1',
          author: 'Семен Семенов',
          comment: 'Первый комментарий к фильму Танец жизни',
          date: new Date('2019-02-05T16:12:32'),
          emotion: 'sleeping'
        },
        {
          id: '6',
          author: 'Иван Орлов',
          comment: 'Второй комментарий к фильму Танец жизни',
          date: new Date('2019-11-25T16:12:32'),
          emotion: 'angry'
        }
      ],
      filmInfo: {
        title: 'Танец жизни',
        alternativeTitle: 'Тот самый танец',
        totalRating: 8.3,
        poster: './images/posters/the-dance-of-life.jpg',
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
        isInWatchlist: true,
        isWatched: true,
        watchingDate: new Date('2022-03-30'),
        isFavorite: true
      }
    },
    {
      id: '2',
      comments: [
        {
          id: '2',
          author: 'Сергей Иванов',
          comment: 'Первый комментарий к фильму Полынная тропа',
          date: new Date('2019-10-25T16:12:32'),
          emotion: 'puke'
        },
        {
          id: '7',
          author: 'Олег Фролов',
          comment: 'Второй комментарий к фильму Полынная тропа',
          date: new Date('2019-11-14T16:12:32'),
          emotion: 'sleeping'
        },
        {
          id: '10',
          author: 'Иван Фомин',
          comment: 'Третий комментарий к фильму Полынная тропа',
          date: new Date('2019-10-25T16:12:32'),
          emotion: 'angry'
        },
        {
          id: '13',
          author: 'Зинаида Иванова',
          comment: 'Четвертый комментарий к фильму Полынная тропа',
          date: new Date('2019-06-15T16:12:32'),
          emotion: 'smile'
        },
        {
          id: '14',
          author: 'Наталья Петрова',
          comment: 'Пятый комментарий к фильму Полынная тропа',
          date: new Date('2019-10-07T16:12:32'),
          emotion: 'sleeping'
        }
      ],
      filmInfo: {
        title: 'Полынная тропа',
        alternativeTitle: 'Полынный газон',
        totalRating: 3.2,
        poster: './images/posters/sagebrush-trail.jpg',
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
          releaseCountry: 'Северная Корея'
        },
        duration: '54m',
        genres: [
          'Коммедия', 'Приключения','Фентези'
        ],
        description: 'Полынная тропа sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      },
      userDetails: {
        isInWatchlist: false,
        isWatched: false,
        watchingDate: null,
        isFavorite: false
      }
    },
    {
      id: '3',
      comments: [
        {
          id: '3',
          author: 'Константин Семин',
          comment: 'Первый комментарий к фильму Человек c золотой рукой',
          date: new Date('2019-05-17T16:12:32'),
          emotion: 'sleeping'
        },
        {
          id: '8',
          author: 'Илья Жуков',
          comment: 'Второй комментарий к фильму Человек c золотой рукой',
          date: new Date('2019-09-01T16:12:32'),
          emotion: 'angry'
        },
        {
          id: '11',
          author: 'Мария Ивановна',
          comment: 'Третий комментарий к фильму Человек c золотой рукой',
          date: new Date('2019-08-08T16:12:32'),
          emotion: 'angry'
        }
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
          'Ужасы'
        ],
        description: 'Человек c золотой рукой sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      },
      userDetails: {
        isInWatchlist: true,
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
          'Сказка', 'Фентези'
        ],
        description: 'Санта-Клаус побеждает марсиан sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      },
      userDetails: {
        isInWatchlist: true,
        isWatched: false,
        watchingDate: null,
        isFavorite: true
      }
    },
    {
      id: '5',
      'comments': [
        {
          id: '4',
          author: 'Петр Соколов',
          comment: 'Первый комментарий к фильму Моряк Попай встречает моряка Синдбада',
          date: new Date('2019-04-15T16:12:32'),
          emotion: 'puke'
        }
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
          'Боевик'
        ],
        description: 'Моряк Попай встречает моряка Синдбада sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      },
      userDetails: {
        isInWatchlist: false,
        isWatched: false,
        watchingDate: null,
        isFavorite: false
      }
    }
  ];
  const card = getRandomArrayElement(cards);
  return card;
}

export {getRandomCardWithComments, mockCards, mockComments};
