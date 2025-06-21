import mongoose from 'mongoose';

const searchedHotelSchema = new mongoose.Schema({
    chainCode: {
        type: String,
        required: true
    },
    iataCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hotelId: {
        type: String,
        required: true,
        unique: true
    },
    geoCode: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    address: {
        countryCode: {
            type: String,
            required: false
        }
    }
}, {
    timestamps: true
});

export default mongoose.model('SearchedHotel', searchedHotelSchema);
