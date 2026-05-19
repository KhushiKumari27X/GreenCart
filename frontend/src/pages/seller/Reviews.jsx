import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Reviews = () => {

  const { axios } = useAppContext();

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {

    try {

      const { data } = await axios.get("/api/product/reviews");

      if (data.success) {

        setReviews(data.reviews);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }

  };

  useEffect(() => {

    fetchReviews();

  }, []);

  return (

    <div className="flex-1 h-[95vh] overflow-y-auto p-6 md:p-10 bg-gray-50">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Customer Reviews
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all product reviews from customers
        </p>

      </div>

      {
        reviews.length === 0 ? (

          <div className="bg-white rounded-xl shadow-sm border p-10 text-center">

            <h2 className="text-xl font-semibold text-gray-700">
              No Reviews Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Customer reviews will appear here.
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {
              reviews.map((review, index) => (

                <div
                  key={index}
                  className="bg-white border rounded-2xl p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between flex-wrap gap-4">

                    <div>

                      <h2 className="text-xl font-semibold text-gray-800">
                        {review.productName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        By {review.name}
                      </p>

                    </div>

                    <div className="flex items-center gap-1">

                      {
                        [...Array(5)].map((_, i) => (

                          <span
                            key={i}
                            className={`text-xl ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>

                        ))
                      }

                    </div>

                  </div>

                  <div className="mt-4">

                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>

                  </div>

                  <div className="mt-4 text-sm text-gray-400">

                    {
                      new Date(review.createdAt).toLocaleString()
                    }

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );

};

export default Reviews;