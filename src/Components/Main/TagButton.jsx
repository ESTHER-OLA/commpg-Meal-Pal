import React, { useState } from "react";

const TagButton = () => {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMealNames = ["Pizza", "Burger", "Salad"]; // Replace with your actual data

  const handleSearchIconClick = () => {
    setShowInput(true);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search clicked");
  };

  const handleCancel = () => {
    setShowInput(false);
  };
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-row justify-between py-4 w-full">
        {" "}
        <div className="relative">
          <button
            onClick={handleSearchIconClick}
            className="p-2 bg-[#f4f4f4] rounded-full absolute top-0 right-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        {showInput && (
          <div className="fixed inset-0 flex flex-col align-text-top items-center justify-center bg-black bg-opacity-10">
            <div className="w-full max-w-md bg-black bg-transparent p-4 rounded-md">
              <input
                type="text"
                placeholder="Search for trending post..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black w-full"
              />
              <button
                onClick={handleSearch}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md w-25 hidden"
              >
                Search
              </button>
              <button
                onClick={handleCancel}
                className="mt-2 px-2 py-1 text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Display filtered meal names */}
        {showInput && (
          <div className="mt-4">
            <p>Search results ({filteredMealNames.length} found):</p>
            {filteredMealNames.map((name) => (
              <span
                key={name}
                className={`inline-block px-2 py-1 mr-2 ${
                  name.toLowerCase().includes(searchTerm.toLowerCase())
                    ? "bg-yellow-200" // Highlight matching results
                    : "bg-gray-200"
                } rounded-md`}
              >
                {name}
              </span>
            ))}
            {filteredMealNames.length > 3 && (
              <button
                className="ml-2 px-2 py-1 text-blue-500 hover:underline"
                onClick={() => {
                  // Handle "View All" click
                  console.log("View All clicked");
                }}
              >
                View All
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagButton;
