export const config = {
  urls: {
    getFood: 'https://run.mocky.io/v3/0a5a1d85-ee02-455e-b53e-e3887acfbfaf',

    //JWT endpoints
    logIn: 'http://localhost:3001/login',
    register: 'http://localhost:3001/register',
    refreshAccessToken: 'http://localhost:3001/refresh-token',

    //Delivery endpoints
    getDelivery: 'http://localhost:3000/delivery',
    getDeliveryById: (id: number) => `http://localhost:3000/delivery/${id}`,
    createDelivery: 'http://localhost:3000/delivery',
    deleteDelivery: 'http://localhost:3000/delivery',
    updateLocation: (id: number) => `http://localhost:3000/delivery/${id}/location`,
    updateStatus: (id: number) => `http://localhost:3000/delivery/${id}/status`,
  },
};
