import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {

  const {
    products,
    currency,
    axios,
    fetchProducts,
  } = useAppContext();

  // TOGGLE STOCK
  const toggleStock = async (id, inStock) => {

    try {

      const { data } = await axios.post(
        "https://greencart-backend-99mmu3j27-khushikumari27xs-projects.vercel.app/api/product/stock",
        { id, inStock },
        { withCredentials: true }
      );

      if (data.success) {

        await fetchProducts();

        toast.success(data.message);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">

      <div className="w-full md:p-10 p-4">

        <h2 className="pb-4 text-lg font-medium">
          All Products
        </h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">

          <table className="md:table-auto table-fixed w-full overflow-hidden">

            <thead className="text-gray-900 text-sm text-left bg-gray-100">

              <tr>

                <th className="px-4 py-3 font-semibold">
                  Product
                </th>

                <th className="px-4 py-3 font-semibold">
                  Category
                </th>

                <th className="px-4 py-3 font-semibold hidden md:table-cell">
                  Selling Price
                </th>

                <th className="px-4 py-3 font-semibold">
                  In Stock
                </th>

              </tr>

            </thead>

            <tbody className="text-sm text-gray-500">

              {products && products.length > 0 ? (

                products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-t border-gray-500/20"
                  >

                    {/* PRODUCT */}
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">

                      <div className="border border-gray-300 rounded overflow-hidden">

                        <img
                          src={product.image?.[0]}
                          alt="Product"
                          className="w-16 h-16 object-cover"
                        />

                      </div>

                      <span className="truncate max-sm:hidden">
                        {product.name}
                      </span>

                    </td>

                    {/* CATEGORY */}
                    <td className="px-4 py-3">
                      {product.category}
                    </td>

                    {/* PRICE */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      {currency}{product.offerPrice}
                    </td>

                    {/* STOCK */}
                    <td className="px-4 py-3">

                      <label className="relative inline-flex items-center cursor-pointer">

                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.inStock}
                          onChange={() =>
                            toggleStock(
                              product._id,
                              !product.inStock
                            )
                          }
                        />

                        <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>

                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>

                      </label>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400"
                  >
                    No Products Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ProductList;