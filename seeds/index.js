const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6295b7fcf85247e1d8783846',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolorum, nostrum qui natus voluptatibus velit minus a quidem modi, doloremque aliquam! Nihil, delectus! Nulla tempore quaerat voluptas consequatur culpa voluptatum.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dy7ofkzmz/image/upload/v1654160527/YelpCamp/download_jjofiw.jpg',
                    filename: 'YelpCamp/zbuk3jewv0amrcf4wmew',
                },
                {
                    url: 'https://res.cloudinary.com/dy7ofkzmz/image/upload/v1654160527/YelpCamp/download_jjofiw.jpg',
                    filename: 'YelpCamp/ziroahnzacvoq2oidbzz',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});