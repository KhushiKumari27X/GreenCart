import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// INPUT FIELD COMPONENT
const InputField = ({
    type,
    placeholder,
    name,
    handleChange,
    address
}) => {

    return (

        <input
            className='w-full px-3 py-2.5 border border-gray-300 rounded outline-none text-gray-600 focus:border-primary transition'
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />

    );

};

const AddAddress = () => {

    const {
        axios,
        user,
        navigate
    } = useAppContext();

    // ADDRESS STATE
    const [address, setAddress] = useState({

        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',

    });

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        const { name, value } = e.target;

        setAddress((prevAddress) => ({

            ...prevAddress,
            [name]: value

        }));

    };

    // SUBMIT ADDRESS
    const onSubmitHandler = async (e) => {

        e.preventDefault();

        try {

            const { data } = await axios.post(
                '/api/address/add',
                { address }
            );

            if (data.success) {

                toast.success(data.message);

                navigate('/cart');

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error(error.message);

        }

    };

    // CHECK USER LOGIN
    useEffect(() => {

        if (!user) {

            navigate('/cart');

        }

    }, [user]);

    return (

        <div className='mt-16 pb-16'>

            <p className='text-2xl md:text-3xl text-gray-600'>

                Add Shipping
                <span className='font-semibold text-primary'>
                    {" "}Address
                </span>

            </p>

            <div className='flex flex-col-reverse md:flex-row justify-between mt-10 gap-10'>

                {/* FORM */}
                <div className='flex-1 max-w-md'>

                    <form
                        onSubmit={onSubmitHandler}
                        className='space-y-4 mt-6 text-sm'
                    >

                        {/* FIRST + LAST NAME */}
                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='firstName'
                                type='text'
                                placeholder='First Name'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='lastName'
                                type='text'
                                placeholder='Last Name'
                            />

                        </div>

                        {/* EMAIL */}
                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='email'
                            type='email'
                            placeholder='Email Address'
                        />

                        {/* STREET */}
                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='street'
                            type='text'
                            placeholder='Street'
                        />

                        {/* CITY + STATE */}
                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='city'
                                type='text'
                                placeholder='City'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='state'
                                type='text'
                                placeholder='State'
                            />

                        </div>

                        {/* ZIP + COUNTRY */}
                        <div className='grid grid-cols-2 gap-4'>

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='zipcode'
                                type='text'
                                placeholder='Zip Code'
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='country'
                                type='text'
                                placeholder='Country'
                            />

                        </div>

                        {/* PHONE */}
                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='phone'
                            type='text'
                            placeholder='Phone Number'
                        />

                        {/* BUTTON */}
                        <button
                            type='submit'
                            className='w-full mt-4 bg-primary text-white py-3 rounded hover:bg-primary-dull transition cursor-pointer uppercase'
                        >

                            Save Address

                        </button>

                    </form>

                </div>

                {/* IMAGE */}
                <div className='flex justify-center'>

                    <img
                        className='max-w-[400px] w-full'
                        src={assets.add_address_image}
                        alt='Add Address'
                    />

                </div>

            </div>

        </div>

    );

};

export default AddAddress;