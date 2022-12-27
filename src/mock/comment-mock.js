import {EMOTION} from '../const.js';

const mockComments = [
  {
    id: '0',
    author: 'Иван Иванов',
    comment: 'Первый комментарий к фильму Великий Фламарион',
    date: new Date('2019-05-12T16:12:32'),
    emotion: EMOTION.SMILE
  },
  {
    id: '1',
    author: 'Семен Семенов',
    comment: 'Первый комментарий к фильму Танец жизни',
    date: new Date('2019-02-05T16:12:32'),
    emotion: EMOTION.SLEEPING
  },
  {
    id: '2',
    author: 'Сергей Иванов',
    comment: 'Первый комментарий к фильму Полынная тропа',
    date: new Date('2019-10-25T16:12:32'),
    emotion: EMOTION.PUKE
  },
  {
    id: '3',
    author: 'Константин Семин',
    comment: 'Первый комментарий к фильму Человек c золотой рукой',
    date: new Date('2019-05-17T16:12:32'),
    emotion: EMOTION.SLEEPING
  },
  {
    id: '4',
    author: 'Петр Соколов',
    comment: 'Первый комментарий к фильму Моряк Попай встречает моряка Синдбада',
    date: new Date('2019-04-15T16:12:32'),
    emotion: EMOTION.PUKE
  },
  {
    id: '5',
    author: 'Иван Петров',
    comment: 'Второй комментарий к фильму Великий Фламарион',
    date: new Date('2019-05-13T16:12:32'),
    emotion: EMOTION.SLEEPING
  },
  {
    id: '6',
    author: 'Иван Орлов',
    comment: 'Второй комментарий к фильму Танец жизни',
    date: new Date('2019-11-25T16:12:32'),
    emotion: EMOTION.ANGRY
  },
  {
    id: '7',
    author: 'Олег Фролов',
    comment: 'Второй комментарий к фильму Полынная тропа',
    date: new Date('2019-11-14T16:12:32'),
    emotion: EMOTION.SLEEPING
  },
  {
    id: '8',
    author: 'Илья Жуков',
    comment: 'Второй комментарий к фильму Человек c золотой рукой',
    date: new Date('2019-09-01T16:12:32'),
    emotion: EMOTION.ANGRY
  },
  {
    id: '9',
    author: 'Петр Иванов',
    comment: 'Третий комментарий к фильму Великий Фламарион',
    date: new Date('2019-06-14T16:12:32'),
    emotion: EMOTION.PUKE
  },
  {
    id: '10',
    author: 'Иван Фомин',
    comment: 'Третий комментарий к фильму Полынная тропа',
    date: new Date('2019-10-25T16:12:32'),
    emotion: EMOTION.ANGRY
  },
  {
    id: '11',
    author: 'Мария Ивановна',
    comment: 'Третий комментарий к фильму Человек c золотой рукой',
    date: new Date('2019-08-08T16:12:32'),
    emotion: EMOTION.ANGRY
  },
  {
    id: '12',
    author: 'Сидор Сидоров',
    comment: 'Четверный комментарий к фильму Великий Фламарион',
    date: new Date('2019-12-15T16:12:32'),
    emotion: EMOTION.ANGRY
  },
  {
    id: '13',
    author: 'Зинаида Иванова',
    comment: 'Четвертый комментарий к фильму Полынная тропа',
    date: new Date('2019-06-15T16:12:32'),
    emotion: EMOTION.SMILE
  },
  {
    id: '14',
    author: 'Наталья Петрова',
    comment: 'Пятый комментарий к фильму Полынная тропа',
    date: new Date('2019-10-07T16:12:32'),
    emotion: EMOTION.SLEEPING
  },
];

function getmockComments() {
  return mockComments;
}

export {getmockComments};
