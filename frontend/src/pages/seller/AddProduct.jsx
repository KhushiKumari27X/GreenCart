import React, { useState } from 'react'
import { categories, assets } from '../../assets/assets'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const AddProduct = () => {

  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')

  const [rating, setRating] = useState(4)
  const [reviews, setReviews] = useState(1)

  const { axios } = useAppContext()

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {

      // CHECK IMAGE
      if (files.length === 0) {
        return toast.error("Please upload product image")
      }

      const productData = {
        name,
        description,
        quantity,
        category,
        price,
        offerPrice,
        rating,
        reviews
      }

      const formData = new FormData()

      formData.append('productData', JSON.stringify(productData))

      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i])
      }

      const { data } = await axios.post(
        '/api/product/add',
        formData,
        {
          withCredentials: true
        }
      )

      if (data.success) {

        toast.success(data.message)

        setName('')
        setDescription('')
        setQuantity('')
        setCategory('')
        setPrice('')
        setOfferPrice('')
        setRating(4)
        setReviews(1)
        setFiles([])

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }
  }

  return (

    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">

      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >

        {/* IMAGE */}
        <div>

          <p className="text-base font-medium">
            Product Image
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">

            {Array(4).fill('').map((_, index) => (

              <label key={index} htmlFor={`image${index}`}>

                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {

                    const updatedFiles = [...files]

                    updatedFiles[index] = e.target.files[0]

                    setFiles(updatedFiles)

                  }}
                />

                <img
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="upload"
                  width={100}
                  height={100}
                />

              </label>

            ))}

          </div>

        </div>

        {/* PRODUCT NAME */}
        <div className="flex flex-col gap-1 max-w-md">

          <label
            className="text-base font-medium"
            htmlFor="product-name"
          >
            Product Name
          </label>

          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1 max-w-md">

          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>

          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

        </div>

        {/* QUANTITY */}
        <div className="flex flex-col gap-1 max-w-md">

          <label
            className="text-base font-medium"
            htmlFor="product-quantity"
          >
            Quantity
          </label>

          <input
            id="product-quantity"
            type="text"
            placeholder="1 Kg / 500 ml"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

        </div>

        {/* CATEGORY */}
        <div className="w-full flex flex-col gap-1">

          <label
            className="text-base font-medium"
            htmlFor="category"
          >
            Category
          </label>

          <select
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >

            <option value="">
              Select Category
            </option>

            {categories.map((item, index) => (

              <option key={index} value={item.path}>
                {item.path}
              </option>

            ))}

          </select>

        </div>

        {/* PRICE */}
        <div className="flex items-center gap-5 flex-wrap">

          {/* PRODUCT PRICE */}
          <div className="flex-1 flex flex-col gap-1 w-32">

            <label
              className="text-base font-medium"
              htmlFor="product-price"
            >
              Product Price
            </label>

            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

          </div>

          {/* OFFER PRICE */}
          <div className="flex-1 flex flex-col gap-1 w-32">

            <label
              className="text-base font-medium"
              htmlFor="offer-price"
            >
              Offer Price
            </label>

            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />

          </div>

        </div>

        {/* RATING & REVIEWS */}
        <div className="flex items-center gap-5 flex-wrap">

          {/* RATING */}
          <div className="flex-1 flex flex-col gap-1 w-32">

            <label className="text-base font-medium">
              Rating
            </label>

            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />

          </div>

          {/* REVIEWS */}
          <div className="flex-1 flex flex-col gap-1 w-32">

            <label className="text-base font-medium">
              Reviews
            </label>

            <input
              type="number"
              min="1"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer"
        >
          ADD
        </button>

      </form>

    </div>

  )
}

export default AddProduct