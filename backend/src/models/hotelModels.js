//const mongoose = require('mongoose');
import mongoose from 'mongoose';

// const hotelSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     land: {
//         type: String,
//         required: true,
//     },
//     cityCode: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//     }
// }, { timestamps: true }
// );

// const hotelModel = mongoose.model("Hotel", hotelSchema)
// module.exports = mongoose.model('Hotel', hotelSchema);
// export default hotelModel;

const hotelSchemaAmadeus = new mongoose.Schema(
    {
        data: [
            {
                type: { type: String },
                hotel: {
                    type: String,
                    hotelId: String,
                    chainCode: String,
                    dupeId: String,
                    name: String,
                    cityCode: String,
                    latitude: Number,
                    longitude: Number

                },
                available: Boolean,
                offers: [
                    {
                        id: String,
                        checkInDate: String,
                        checkOutDate: String,
                        rateCode: String,
                        rateFamilyEstimated: {
                            code: String,
                            type: String
                        },
                        room: {
                            type: String,
                            typeEstimated: {
                                category: String
                            },
                            description: {
                                text: String,
                                lang: String
                            }
                        },
                        guests: {
                            adults: { type: Number, required: true },
                            children: { type: Number, required: false, default: 0 }
                        },
                        price: {
                            currency: String,
                            base: String,
                            total: String,
                            variations: {
                                average: {
                                    base: String
                                },
                                changes: [
                                    {
                                        startDate: String,
                                        endDate: String,
                                        base: String
                                    }
                                ]
                            }
                        },
                        policies: {
                            cancellations: [
                                {
                                    description: {
                                        text: String
                                    },
                                    policyType: String
                                }
                            ],
                            paymentType: String,
                            refundable: {
                                cancellationRefund: String
                            }
                        },
                        self: String,
                        roomInformation: {
                            description: String,
                            type: String,
                            typeEstimated: {
                                category: String
                            }
                        }
                    }
                ],
                self: String
            }
        ]
    }
);



const hotelModel = mongoose.model("Hotel", hotelSchemaAmadeus);

export default hotelModel; 
