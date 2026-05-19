import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {

    const { currency, axios } = useAppContext()

    const [orders, setOrders] = useState([])

    // FETCH ORDERS
    const fetchOrders = async () => {

        try {

            const { data } = await axios.get(
                '/api/order/seller'
            )

            if (data.success) {

                setOrders(data.orders)

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            toast.error(error.message)

        }

    }

    // UPDATE STATUS
    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            const { data } = await axios.post(
                '/api/order/status',
                {
                    orderId,
                    status,
                },
                {
                    withCredentials: true,
                }
            )

            if (data.success) {

                toast.success(data.message)

                fetchOrders()

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            toast.error(error.message)

        }

    }

    useEffect(() => {

        fetchOrders()

    }, [])

    return (

        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">

            <div className="md:p-10 p-4 space-y-4">

                <h2 className="text-lg font-medium">
                    Orders List
                </h2>

                {orders.map((order, index) => (

                    <div
                        key={index}
                        className="flex flex-col md:flex-row gap-5 justify-between p-5 rounded-xl border border-gray-300 bg-white"
                    >

                        {/* PRODUCT SECTION */}
                        <div className="flex gap-5 max-w-80">

                            <img
                                className="w-12 h-12 object-cover"
                                src={assets.box_icon}
                                alt="boxIcon"
                            />

                            <div>

                                {order.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex flex-col"
                                    >

                                        <p className="font-medium">

                                            {item.product?.name || "Product"}

                                            <span className="text-primary">
                                                {" "}x {item.quantity}
                                            </span>

                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* ADDRESS */}
                        <div className="text-sm md:text-base text-black/60">

                            <p className='text-black/80 font-medium'>

                                {order.address?.firstName || "Customer"}{" "}
                                {order.address?.lastName || ""}

                            </p>

                            <p>

                                {order.address?.street || ""},{" "}
                                {order.address?.city || ""}

                            </p>

                            <p>

                                {order.address?.state || ""},{" "}
                                {order.address?.zipcode || ""},{" "}
                                {order.address?.country || ""}

                            </p>

                            <p>

                                {order.address?.phone || "No Phone"}

                            </p>

                        </div>

                        {/* AMOUNT */}
                        <div className="flex flex-col gap-1">

                            <p className="font-semibold text-lg">

                                {currency}{order.amount}

                            </p>

                            <p className="text-sm text-gray-500">

                                Method: {order.paymentType || "COD"}

                            </p>

                            <p className="text-sm text-gray-500">

                                {
                                    order.createdAt
                                        ? new Date(order.createdAt).toLocaleString()
                                        : "No Date"
                                }

                            </p>

                        </div>

                        {/* STATUS */}
                        <div className="flex flex-col gap-3">

                            <select
                                value={order.status || "Processing"}
                                onChange={(e) =>
                                    updateStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                                className="border rounded-lg px-3 py-2 outline-none"
                            >

                                <option value="Processing">
                                    Processing
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                            <p
                                className={`text-sm font-medium ${
                                    order.isPaid
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}
                            >

                                {
                                    order.isPaid
                                        ? "Paid"
                                        : "Pending"
                                }

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )

}

export default Orders