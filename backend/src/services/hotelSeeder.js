import  Hotel from '../models/hotelModels.js';

const cities = ['Berlin', 'Paris', 'Madrid', 'Rome', 'Vienna', 'Amsterdam', 'Lisbon', 'Prague', 'Budapest', 'Warsaw'];
const countries = ['Germany', 'France', 'Spain', 'Italy', 'Austria', 'Netherlands', 'Portugal', 'Czech Republic', 'Hungary', 'Poland'];
const hotelNames = ['Grand Palace', 'Cozy Inn', 'Sunrise Hotel', 'Royal Stay', 'Green Valley', 'Urban Lodge', 'Comfort Nest', 'Sea View', 'Mountain Retreat', 'City Light'];
const images =[
    'https://images.unsplash.com/photo-1612539662529-f518e5ad1451?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1708015347060-f16a31e70932?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

]

const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

async function seedHotels(count) {
    const createdHotels = [];

    for (let i = 0; i < count; i++) {
        const cityIndex = Math.floor(Math.random() * cities.length);

        const newHotel = new Hotel({
            name: getRandomElement(hotelNames),
            country: countries[cityIndex],
            city: cities[cityIndex],
            price: Math.floor(Math.random() * 200) + 50,
            rating: Math.floor(Math.random() * 5) + 1,
        });

        await newHotel.save();
        createdHotels.push(newHotel);
    }

    return createdHotels;
}

export default { seedHotels };
