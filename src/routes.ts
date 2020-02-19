import Todos from './scenes/Todos';
import Welcome from './scenes/Welcome';
import Map from './scenes/Map';
import Overview from './scenes/Overview';
import Analysis from './scenes/Analysis';

export default [
  {
    id: 1,
    path: '/map',
    children: Map,
    useWith: ['header'],
  },
  {
    id: 11,
    path: '/',
    children: Overview,
    useWith: ['header'],
  },
  {
    id: 12,
    path: '/analysis',
    children: Analysis,
    useWith: ['header'],
  },
  {
    id: 12,
    path: '/analysis/:id',
    children: Analysis,
    useWith: ['header'],
  },
  {
    id: 2,
    path: '/todos',
    title: 'Todo`s List',
    children: Todos,
    useWith: ['sidebar'],
  },
];
