import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String
});

const linkSchema = new mongoose.Schema({
    title: String,
    url: String
});

const questionSchema = new mongoose.Schema({
    user: Object,
    question: String,
    questionReplies: [Object]
})

const courseDataSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    videoThumbnail: String,
    videoSection: String,
    description: String,
    videoLength: Number,
    videoPlayer: String,
    suggestions: String,
    link: [linkSchema],
    questions: [questionSchema]
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number
    },
    thumbnail: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benifits: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model('courses', courseSchema);