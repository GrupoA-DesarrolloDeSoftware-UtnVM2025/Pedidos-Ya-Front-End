export const config = {
  urls: {
    //JWT endpoints
    /*URLs para autenticarse:
    logIn: para iniciar sesión
    register: para crear una cuenta nueva
    refreshAccessToken: para renovar el token de acceso (autenticación JWT)
    */
    logIn: 'http://localhost:3001/login',
    register: 'http://localhost:3001/register',
    refreshAccessToken: 'http://localhost:3001/refresh-token',
    //Delivery endpoints
    /*URLs para la API de entregas:
      getDelivery: obtener todas las entregas
      getDeliveryById: función que recibe un id y devuelve la URL para obtener una entrega específica
      createDelivery: crear una nueva entrega
      deleteDelivery: función que recibe un id y devuelve la URL para borrar una entrega específica
      updateLocation: función que recibe un id para actualizar la ubicación de una entrega
      updateStatus: función que recibe un id para actualizar el estado de una entrega
      */
    getDelivery: 'http://localhost:3000/delivery',
    getDeliveryById: (id: number) => `http://localhost:3000/delivery/${id}`,
    createDelivery: 'http://localhost:3000/delivery',
    deleteDelivery: (id:number) =>`http://localhost:3000/delivery/${id}`,
    updateLocation: (id: number) => `http://localhost:3000/delivery/${id}/location`,
    updateStatus: (id: number) => `http://localhost:3000/delivery/${id}/status`,
  },
};
