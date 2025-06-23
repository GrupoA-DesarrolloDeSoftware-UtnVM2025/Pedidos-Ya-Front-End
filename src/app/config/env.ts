export const config = {
  urls: {
    //JWT endpoints
    logIn: 'http://localhost:3001/login',
    register: 'http://localhost:3001/register',
    refreshAccessToken: 'http://localhost:3001/refresh-token',

    //Delivery endpoints
    getDelivery: 'http://localhost:3000/delivery',
    getDeliveryById: (id: number) => `http://localhost:3000/delivery/${id}`,
    createDelivery: 'http://localhost:3000/delivery',
    deleteDelivery: (id:number) =>`http://localhost:3000/delivery/${id}`,
    updateLocation: (id: number) => `http://localhost:3000/delivery/${id}/location`,
    updateStatus: (id: number) => `http://localhost:3000/delivery/${id}/status`,
  },
};
