import { memo } from 'react';

interface PriceRangeModalContentProps {
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  onConfirm: () => void;
}

// Component for Minimum Price Input
const MinPriceInput = memo(({ priceMin, setPriceMin }: { priceMin: string; setPriceMin: (value: string) => void }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price</label>
      <input
        type="number"
        min="0"
        step="1"
        placeholder="Enter your price"
        className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        value={priceMin}
        onChange={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          setPriceMin(e.target.value);
        }}
      />
    </div>
  );
});

// Component for Maximum Price Input
const MaxPriceInput = memo(({ priceMax, setPriceMax }: { priceMax: string; setPriceMax: (value: string) => void }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price</label>
      <input
        type="number"
        min="0"
        step="1"
        placeholder="Enter your price"
        className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        value={priceMax}
        onChange={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          setPriceMax(e.target.value);
        }}
      />
    </div>
  );
});

// Main Price Range Modal Content
function PriceRangeModalContent({
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  onConfirm,
}: PriceRangeModalContentProps) {
  return (
    <>
      <MinPriceInput priceMin={priceMin} setPriceMin={setPriceMin} />
      <MaxPriceInput priceMax={priceMax} setPriceMax={setPriceMax} />
      <button
        className="w-full bg-[#023E8A] text-white py-2 rounded-md"
        onClick={onConfirm}
      >
        Done
      </button>
    </>
  );
}

export default PriceRangeModalContent;