import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://green.bcj-media.com/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});