// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const TagButton = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pinnedTags, setPinnedTags] = useState([]);
  const filteredMealNames = ["Pizza", "Burger", "Salad"]; // Sample data

  const handleSearchIconClick = () => {
    setShowSearch(true);
  };

  const handleSearch = () => {
    // Filter the meal names based on the search term
    const filteredNames = filteredMealNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the pinned tags with the filtered names (limit to 3)
    setPinnedTags(filteredNames.slice(0, 3));

    // Reset search term after search
    setSearchTerm("");
    setShowSearch(false); // Hide the search input after search
  };

  const handleCancel = () => {
    setShowSearch(false);
    // Reset search term on cancel
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col w-full mt-5 items-center">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">
          <button
            className="ml-2 px-2 py-1 text-blue-500 hover:underline"
            onClick={() => {
              // Handle "View All" click
              console.log("View All clicked");
            }}
          >
            All
          </button>
          {filteredMealNames.map((name) => (
            <span
              key={name}
              className={`inline-block px-2 py-1 mr-2 ${
                pinnedTags.includes(name)
                  ? "bg-yellow-200" // Highlight pinned tags
                  : name.toLowerCase().includes(searchTerm.toLowerCase())
                  ? "bg-yellow-200" // Highlight matching results
                  : "bg-gray-200"
              } rounded-md`}
            >
              {name}
            </span>
          ))}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={handleSearchIconClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      {showSearch && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black w-40"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hidden"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="ml-2 px-2 py-1 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagButton;
