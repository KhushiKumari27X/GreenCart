import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const ProductDetails = () => {

    const {
        products,
        navigate,
        currency,
        addToCart,
        axios,
    } = useAppContext();

    const { id } = useParams();

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    // REVIEW STATES
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const product = products.find(
        (item) => item._id === id
    );

    // RELATED PRODUCTS
    useEffect(() => {

        if (products.length > 0 && product) {

            let productsCopy = products.slice();

            productsCopy = productsCopy.filter(
                (item) =>
                    product.category === item.category
            );

            setRelatedProducts(
                productsCopy.slice(0, 5)
            );

        }

    }, [products, product]);

    // THUMBNAIL
    useEffect(() => {

        if (product) {

            setThumbnail(
                product.image[0]
                    ? product.image[0]
                    : null
            );

        }

    }, [product]);

    // SUBMIT REVIEW
    const submitReview = async () => {

        try {

            // VALIDATION
            if (!rating) {

                return toast.error(
                    "Please select rating"
                );

            }

            if (!comment.trim()) {

                return toast.error(
                    "Please write review"
                );

            }

            // API CALL
            const { data } = await axios.post(

                `/api/product/review/${product._id}`,

                {
                    rating,
                    comment,
                },

                {
                    withCredentials: true,
                }

            );

            // SUCCESS
            if (data.success) {

                toast.success(
                    data.message
                );

                setRating(0);

                setComment("");

                window.location.reload();

            } else {

                toast.error(
                    data.message
                );

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );

        }

    };

    // SAFETY
    if (!product) {

        return (

            <p className="mt-10 text-center">
                Loading...
            </p>

        );

    }

    return (

        <div className="mt-12">

            {/* BREADCRUMB */}
            <p>

                <Link to="/">
                    Home
                </Link>

                {" / "}

                <Link to="/products">
                    Products
                </Link>

                {" / "}

                <Link
                    to={`/products/${product.category.toLowerCase()}`}
                >
                    {product.category}
                </Link>

                {" / "}

                <span className="text-primary">
                    {product.name}
                </span>

            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">

                {/* IMAGES */}
                <div className="flex gap-3">

                    <div className="flex flex-col gap-3">

                        {product.image.map((image, index) => (

                            <div
                                key={index}
                                onClick={() =>
                                    setThumbnail(image)
                                }
                                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                            >

                                <img
                                    src={image}
                                    alt=""
                                />

                            </div>

                        ))}

                    </div>

                    <div className="border border-gray-500/30 max-w-[500px] rounded overflow-hidden">

                        <img
                            src={thumbnail}
                            alt="product"
                            className="w-full h-full object-cover"
                        />

                    </div>

                </div>

                {/* PRODUCT DETAILS */}
                <div className="text-sm w-full md:w-1/2">

                    {/* NAME */}
                    <h1 className="text-3xl font-medium">

                        {product.name}

                    </h1>

                    {/* QUANTITY */}
                    <p className="text-lg text-gray-500 mt-2">

                        {product.quantity}

                    </p>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mt-2">

                        {Array(5).fill("").map((_, i) => (

                            <img
                                key={i}
                                src={
                                    i < Math.round(product.rating || 0)
                                        ? assets.star_icon
                                        : assets.star_dull_icon
                                }
                                alt=""
                                className="md:w-4 w-3.5"
                            />

                        ))}

                        <p className="text-base ml-2">

                            ({product.numReviews || 0})

                        </p>

                    </div>

                    {/* PRICE */}
                    <div className="mt-6">

                        <p className="text-gray-500/70 line-through">

                            MRP: {currency}{product.price}

                        </p>

                        <p className="text-2xl font-medium">

                            {currency}{product.offerPrice}

                        </p>

                        <span className="text-gray-500/70">

                            inclusive of all taxes

                        </span>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-6">

                        <p className="text-base font-medium">

                            About Product

                        </p>

                        <p className="text-gray-500/70 mt-2">

                            {product.description}

                        </p>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center mt-10 gap-4 text-base">

                        <button
                            onClick={() =>
                                addToCart(product._id)
                            }
                            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                        >

                            Add to Cart

                        </button>

                        <button
                            onClick={() => {

                                addToCart(product._id);

                                navigate("/cart");

                            }}
                            className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                        >

                            Buy now

                        </button>

                    </div>

                </div>

            </div>

            {/* REVIEW SECTION */}
            <div className="mt-16">

                <h2 className="text-3xl font-semibold mb-8">

                    Customer Reviews

                </h2>

                {/* REVIEW FORM */}
                <div className="border rounded-2xl p-5 bg-white mb-10 max-w-xl shadow-sm">

                    <h3 className="text-xl font-semibold mb-4">

                        Write a Review

                    </h3>

                    {/* STARS */}
                    <div className="flex gap-1 mb-4">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <button
                                key={star}
                                type="button"
                                onClick={() =>
                                    setRating(star)
                                }
                                className={`text-3xl transition ${
                                    star <= rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            >

                                ★

                            </button>

                        ))}

                    </div>

                    {/* TEXTAREA */}
                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Write your review..."
                        rows="3"
                        className="w-full border border-gray-300 rounded-xl p-4 outline-none resize-none"
                    />

                    {/* SUBMIT */}
                    <button
                        onClick={submitReview}
                        className="mt-4 bg-primary hover:bg-primary-dull text-white px-7 py-2.5 rounded-xl font-medium transition"
                    >

                        Submit Review

                    </button>

                </div>

                {/* REVIEW LIST */}
                <div className="space-y-5">

                    {product?.reviews?.length > 0 ? (

                        product.reviews.map((item, index) => (

                            <div
                                key={index}
                                className="border rounded-2xl p-5 bg-white"
                            >

                                <div className="flex items-center gap-3 mb-2">

                                    <h3 className="font-semibold">

                                        {item.name || "User"}

                                    </h3>

                                    <span className="text-yellow-400">

                                        {"★".repeat(item.rating || 0)}

                                    </span>

                                </div>

                                <p className="text-gray-600">

                                    {item.comment}

                                </p>

                            </div>

                        ))

                    ) : (

                        <p className="text-gray-500">

                            No reviews yet.

                        </p>

                    )}

                </div>

            </div>

            {/* RELATED PRODUCTS */}
            <div className="flex flex-col items-center mt-20">

                <div className="flex flex-col items-center w-max">

                    <p className="text-3xl font-medium">

                        Related Products

                    </p>

                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">

                    {relatedProducts
                        .filter((product) => product.inStock)
                        .map((product, index) => (

                            <ProductCard
                                key={index}
                                product={product}
                            />

                        ))}

                </div>

                <button
                    onClick={() => {

                        navigate("/products");

                        scrollTo(0, 0);

                    }}
                    className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
                >

                    See more

                </button>

            </div>

        </div>

    );

};

export default ProductDetails;