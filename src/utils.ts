import moment from 'moment';

export const formatDate = (date: string): string =>
  moment(date).format('MMMM Do, YYYY');
