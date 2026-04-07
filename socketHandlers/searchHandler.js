import Resource from '../models/Resource.js';

export const handleSearchResources = (socket) => {
  socket.on('searchResources', async (query) => {
    try {
      const resources = await Resource.find({
        availability: true,
        name: { $regex: query, $options: 'i' },
      }).limit(10);

      socket.emit('searchResults', resources);
    } catch (error) {
      console.error('Error searching resources:', error);
      socket.emit('searchError', { message: 'Something went wrong' });
    }
  });
};
