import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from 'react-toastify';


const SellerLayout = () => {

    const { axios, navigate } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
  try {

    const { data } = await axios.get(
      'https://greencart-backend-85xnosoo6-khushikumari27xs-projects.vercel.app//api/seller/logout',
      { withCredentials: true }
    );

    if (data.success) {
      toast.success(data.message);
      navigate('/');
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};

    return (
        <>
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="cursor-pointer w-32 md:w-36" />
                </Link>

                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className="border rounded-full text-sm px-4 py-1">
                        Logout
                    </button>
                </div>
            </div>

            {/* Layout */}
            <div className="flex">

                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                    {sidebarLinks.map((item, index) => (
    <NavLink
        to={item.path}
        key={index}
        end={item.path === "/seller"}
        className={({ isActive }) =>
            `flex items-center py-3 px-4 gap-3 ${
                isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                    : "hover:bg-gray-100 border-white text-gray-700"
            }`
        }
    >
        <img src={item.icon} alt="" className="w-5 h-5" />
        <p className="md:block hidden">{item.name}</p>
    </NavLink>
))}
                    

                </div>

                {/* Main Content */}
                <div className="flex-1 p-4">
                    <Outlet />
                </div>

            </div>
        </>
    );
};

export default SellerLayout;