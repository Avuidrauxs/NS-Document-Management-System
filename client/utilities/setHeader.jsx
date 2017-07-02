import axios from 'axios';


/**
* Set and use a token for every ajax call
*
* @param {Object} token
* @returns {null} returns nothing
*/
export default function setHeader(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
