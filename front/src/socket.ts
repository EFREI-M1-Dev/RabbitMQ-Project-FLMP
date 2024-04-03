import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
}); // Remplacez l'URL par l'URL de votre serveur Socket.IO

export default socket;
