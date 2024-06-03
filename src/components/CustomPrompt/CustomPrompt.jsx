// -React-
import React, { useState } from "react";

const CustomPrompt = ({ isOpen, onClose, onConfirm }) => {
  const [description, setDescription] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(description);
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-montserrat text-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full border-[1px] border-black">
        <h2 className="text-xl font-bold mb-4">Enter description:</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-red-800 hover:bg-gray-900 duration-300 ease-in-out text-white font-medium py-2 px-4 sm:mr-2 mb-2 sm:mb-0 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blueColor hover:bg-black duration-300 ease-in-out text-white font-medium py-2 px-4 sm:mr-2 mb-2 sm:mb-0 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPrompt;
