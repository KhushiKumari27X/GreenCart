import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

    const {
        setShowUserLogin,
        setUser,
        axios,
        navigate
    } = useAppContext();

    const [state, setState] = useState("login");

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    // SUBMIT HANDLER
    const onSubmitHandler = async (event) => {

        event.preventDefault();

        try {

            const { data } = await axios.post(

                `/api/user/${state}`,

                {
                    name,
                    email,
                    password
                }

            );

            console.log(data);

            // SUCCESS
            if (data.success) {

                toast.success(

                    state === "login"
                        ? "Login Successful"
                        : "Account Created Successfully"

                );

                setUser(data.user);

                setShowUserLogin(false);

                navigate("/");

            }

            // FAILED
            else {

                toast.error(data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );

        }

    };

    return (

        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center bg-black/50"
        >

            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 w-80 sm:w-[350px] bg-white p-8 py-10 rounded-lg shadow-xl text-gray-600"
            >

                <p className="text-2xl font-medium text-center">

                    <span className="text-primary">
                        User
                    </span>{" "}

                    {state === "login"
                        ? "Login"
                        : "Sign Up"}

                </p>

                {/* NAME */}
                {state === "register" && (

                    <div className="w-full">

                        <p>Name</p>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>

                )}

                {/* EMAIL */}
                <div className="w-full">

                    <p>Email</p>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                </div>

                {/* PASSWORD */}
                <div className="w-full">

                    <p>Password</p>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                </div>

                {/* TOGGLE LOGIN / REGISTER */}
                {state === "register" ? (

                    <p className="text-sm">

                        Already have an account?{" "}

                        <span
                            onClick={() => setState("login")}
                            className="text-primary cursor-pointer"
                        >
                            Click here
                        </span>

                    </p>

                ) : (

                    <p className="text-sm">

                        Create an account?{" "}

                        <span
                            onClick={() => setState("register")}
                            className="text-primary cursor-pointer"
                        >
                            Click here
                        </span>

                    </p>

                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
                >

                    {state === "register"
                        ? "Create Account"
                        : "Login"}

                </button>

            </form>

        </div>

    );

};

export default Login;