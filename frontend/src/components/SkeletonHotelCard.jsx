import { motion } from "framer-motion";

const SkeletonHotelCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="animate-pulse bg-white rounded-xl shadow-md p-4 mb-4"
    >
      <div className="h-48 bg-gray-300 rounded-xl mb-4" />
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </motion.div>
  );
};

export default SkeletonHotelCard;
