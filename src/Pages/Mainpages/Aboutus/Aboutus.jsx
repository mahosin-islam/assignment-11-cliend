import { FaCheckCircle } from "react-icons/fa";
import Oursevice from "./Oursevice";
import { motion } from "framer-motion";
import { GrDeliver } from "react-icons/gr";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import StatsSection from "./StatsSection";
const Aboutus = () => {
  return (
    <div>
      <div className=" shadow-2xl m-10 my-10 min-h-100 rounded-2xl p-10">
        {/* title*/}
        <div>
          <h2 className="text-3xl font-semibold">
            About Our Garments Platform
          </h2>
          {/* sort-introduction */}
          <div>
            <p className="py-4 text-gray-500">
              We are a trusted garments order and product management platform,
              providing smooth and reliable services for buyers and suppliers.
            </p>
          </div>
          <hr className="border-dashed" />
        </div>
        {/*  our service*/}

        <div className="my-3">
          <Oursevice></Oursevice>
        </div>
        {/* Why Choose You */}
        <div>
          <section class=" my-2 px-4 md:px-10">
            <div class="max-w-6xl mx-auto text-center">
              <h2 class="text-3xl md:text-4xl font-bold  mb-4">
                Why Choose Us
              </h2>
              <p class="text-gray-600 mb-12 max-w-2xl mx-auto">
                We provide reliable garments ordering solutions with quality,
                transparency, and customer satisfaction at the core.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="p-6 border rounded-2xl hover:shadow-lg transition">
                  <div class="text-red-400 text-4xl mb-4">
                    <GrDeliver />
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Fast Delivery</h3>
                  <p class="text-gray-600 text-sm">
                    Quick and reliable delivery to ensure your orders arrive on
                    time.
                  </p>
                </div>

                <div class="p-6 border rounded-2xl hover:shadow-lg transition">
                  <div class="text-red-400 text-4xl mb-4">
                    <FaCheckCircle />
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Quality Assurance</h3>
                  <p class="text-gray-600 text-sm">
                    Strict quality checks to maintain premium garment standards.
                  </p>
                </div>

                <div class="p-6 border rounded-2xl hover:shadow-lg transition">
                  <div class="text-red-400 text-4xl mb-4">
                    <RiMoneyPoundCircleFill />
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Affordable Pricing</h3>
                  <p class="text-gray-600 text-sm">
                    Competitive pricing without compromising product quality.
                  </p>
                </div>

                <div class="p-6 border rounded-2xl hover:shadow-lg transition">
                  <div class="text-red-400 text-4xl mb-4">
                    <VscWorkspaceTrusted />
                  </div>
                  <h3 class="text-lg font-semibold mb-2">Trusted Suppliers</h3>
                  <p class="text-gray-600 text-sm">
                    We work with verified and reliable garment manufacturers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Achievements */}
        <div className="my-5">
          <StatsSection></StatsSection>
        </div>
        {/*conpany-environment*/}
        <div>


 
    <section className="py-4 bg-white px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-10"
        >
          Behind Our Quality & Trust
        </motion.h3>

        {/* Images */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Big Image */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="md:col-span-2 w-full overflow-hidden rounded-2xl shadow"
          >
            <img
              src="https://i.ibb.co.com/DgsWJCBj/image-processing20230623-2-scrik6.jpg"
            />
          </motion.div>

          {/* Small Images */}
          <div className="flex md:flex-col gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow"
            >
              <img
                src="https://i.ibb.co.com/FLhcZvgW/download.jpg"
                className="w-full h-48 object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow"
            >
              <img
                src="https://i.ibb.co.com/PzTrds9Y/workers-in-a-garments-factory-in-bangladesh-676x380-400x260.png"
                alt="Garments Team"
                className="w-full h-48 object-cover"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>




           
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
