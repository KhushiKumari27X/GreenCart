const Contact = () => {
  return (
    <div className="bg-[#f5f7f6] px-6 md:px-16 lg:px-24 py-10">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Get In Touch
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          Have questions about our products or services?
          We’re here to help.
        </p>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {/* Left Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold mb-3">
            Customer Support
          </h2>

          <p className="text-gray-500 mb-8">
            Our support team is available 24/7.
          </p>

          <div className="space-y-6">

            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-500">
                support@greencart.com
              </p>
            </div>

            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-500">
                +91 9876543210
              </p>
            </div>

            <div>
              <p className="font-semibold">Address</p>
              <p className="text-gray-500">
                Bhubaneswar, Odisha
              </p>
            </div>

          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Send Message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
            />

            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
            ></textarea>

            <button className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-lg transition">
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact