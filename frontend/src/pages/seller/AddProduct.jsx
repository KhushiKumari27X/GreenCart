import React, { useEffect, useState } from 'react'
import { categories, assets } from '../../assets/assets'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
import { useLocation } from 'react-router-dom'

const AddProduct = () => {

  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const editId = searchParams.get("id")

  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')

  const [rating, setRating] = useState(4)
  const [reviews, setReviews] = useState(1)

  const { axios, navigate, fetchProducts } = useAppContext()

  // FETCH PRODUCT FOR EDIT
  const fetchProduct = async () => {

    try {

      const { data } = await axios.get(
        `/api/product/${editId}`
      )

      if (data.success) {

        const product = data.product

        setName(product.name)
        setDescription(product.description)
        setQuantity(product.quantity)
        setCategory(product.category)
        setPrice(product.price)
        setOfferPrice(product.offerPrice)
        setRating(product.rating || 4)
        setReviews(product.numReviews || 1)

      }

    } catch (error) {

      toast.error(error.message)

    }

  }

  useEffect(() => {

    if (editId) {

      fetchProduct()

    }

  }, [editId])

  // SUBMIT
  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {

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

      // EDIT PRODUCT
      if (editId) {

        const { data } = await axios.put(
          `/api/product/update/${editId}`,
          productData,
          {
            withCredentials: true
          }
        )

        if (data.success) {

          toast.success("Product Updated")

          fetchProducts()

          navigate('/seller/product-list')

        } else {

          toast.error(data.message)

        }

        return

      }

      // ADD PRODUCT
      if (files.length === 0) {
        return toast.error("Please upload product image")
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
        {!editId && (

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

        )}

        {/* PRODUCT NAME */}
        <div className="flex flex-col gap-1 max-w-md">

          <label className="text-base font-medium">
            Product Name
          </label>

          <input
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

          <label className="text-base font-medium">
            Product Description
          </label>

          <textarea
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

          <label className="text-base font-medium">
            Quantity
          </label>

          <input
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

          <label className="text-base font-medium">
            Category
          </label>

          <select
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

          <div className="flex-1 flex flex-col gap-1 w-32">

            <label className="text-base font-medium">
              Product Price
            </label>

            <input
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

          </div>

          <div className="flex-1 flex flex-col gap-1 w-32">

            <label className="text-base font-medium">
              Offer Price
            </label>

            <input
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer"
        >
          {editId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
        </button>

      </form>

    </div>

  )
}

export default AddProduct