import React from "react";

const PriceSummary: React.FC = () => {
  return (
    <div >
      <h2 className="text-lg font-semibold mb-2 ml-3">Price Summary</h2>
      <div className="bg-white px-4 py-2 sm:p-6 w-full h-50 border-t border-b md:border md:rounded-lg border-gray-300">

        <div className="space-y-3">
          <p className="flex justify-between">
            <span className="font-medium">Standard King Room</span> N70,000
          </p>
          <p className="text-gray-500 text-sm">1 Room * 7 Nights</p>
          <p className="flex justify-between">
            <span className="font-medium">Taxes (15%)</span> N10,000
          </p>
          <hr className="my-2 border-gray-300" />
          <p className="flex justify-between text-lg font-semibold">
            <span>Total</span> <span className="text-[#023E8A]">N80,000</span>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default PriceSummary;
