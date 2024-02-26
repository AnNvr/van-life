import { useState, useEffect } from "react";

export default function Reviews() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        setReviews(generateMultipleReviews(5))
    }, [])
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function getRandomElement(array) {
        return array[getRandomInt(0, array.length - 1)];
    }
    
    function generateReview() {
        const adjectives = ["amazing", "decent", "great", "fantastic", "good", "okay", "bad", "horrible"];
        const verbs = ["loved", "enjoyed", "liked", "appreciated", "hated", "disliked", "detested"];
        const nouns = ["stay", "trip", "experience", "service", "accommodation"];
        const endings = [
            "Would definitely recommend!",
            "Could be better.",
            "I've seen worse.",
            "Not what I was expecting.",
            "I will come back again!",
            "This was disappointing.",
        ];
    
        // construct a random review
        const randomAdjective = getRandomElement(adjectives);
        const randomVerb = getRandomElement(verbs);
        const randomNoun = getRandomElement(nouns);
        const randomEnding = getRandomElement(endings);
    
        return `I ${randomVerb} my ${randomNoun}. It was ${randomAdjective}. ${randomEnding}`;
    }
    

    function generateMultipleReviews(count) {
        const reviews = [];
        for (let i = 0; i < count; i++) {
            reviews.push(generateReview());
        }
        return reviews;
    }
    
    // Convert the structure of your reviews to match what your component expects (author, date, rating, content, etc.)
    const formattedReviews = reviews.map((reviewContent, index) => ({
        id: index,
        author: `User ${index + 1}`,
        date: new Date().toLocaleDateString(),
        rating: getRandomInt(1, 5),
        content: reviewContent,
        badges: ["ease of use", "functionality"] 
    }));
    


    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
            <h3 className="text-lg font-semibold mb-4">Van Reviews</h3>
            <div className="space-y-4">
                {formattedReviews.map((review) => (
                    <div key={review.id} className="flex items-start space-x-4">
                        <div className="avatar flex-shrink-0">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-bold">{review.author}</p>
                            <p className="text-xs text-gray-500">
                                {review.date}
                            </p>
                            <div className="flex items-center mt-1">
                                <p className="ml-2 text-sm font-bold">
                                    {`${review.rating}/5`}
                                </p>
                            </div>
                            <p className="mt-2 text-sm">{review.content}</p>
                            <div className="mt-2 flex flex-wrap">
                                {review.badges.map((badge, badgeIndex) => (
                                    <span
                                        key={badgeIndex}
                                        className="text-xs font-semibold inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-orange-200 text-orange-700 rounded mr-2 mb-2"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <button className="text-sm text-blue-500 hover:underline">
                    See all
                </button>
            </div>
        </div>
    );
}
