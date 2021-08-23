import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${cookies.get('ACESS_TOKEN')}`,
    'Content-Type': 'application/json',
  },
});

export default instance;