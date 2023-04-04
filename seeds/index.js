const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
    .connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected, my lord!!");
    })
    .catch((err) => {
        console.error(err);
    });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    //   Campground.createCollection();
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "63fc17ea872d0f60c32a829b",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur obcaecati tempore maxime quam perspiciatis assumenda ab quidem fugit? Libero quis minus impedit sit vel doloremque quisquam accusamus officiis beatae dicta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore similique error incidunt voluptate sequi asperiores sunt, blanditiis repellendus rerum optio modi maiores accusantium doloremque voluptatum amet, voluptas perspiciatis. Libero, voluptate.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dbzyryelq/image/upload/v1679442221/YelpCamp/i9qhbbpws5u6mo26sabp.jpg",
                    filename: "YelpCamp/i9qhbbpws5u6mo26sabp",
                },
                {
                    url: "https://res.cloudinary.com/dbzyryelq/image/upload/v1679442221/YelpCamp/jiogtwugagpn1v0whuuh.jpg",
                    filename: "YelpCamp/jiogtwugagpn1v0whuuh",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
