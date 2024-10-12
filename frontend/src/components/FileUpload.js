import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [patternDescription, setPatternDescription] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation to ensure a file and description are provided
    if (!file || !patternDescription) {
      setError("Please select a file and provide a pattern description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pattern_description", patternDescription);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct Content-Type for file upload
          },
        }
      );
      setData(response.data); // Set the processed data
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error uploading file", error);
      setError("An error occurred during file upload. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex justify-center items-center p-8">
      <div className="max-w-4xl w-full bg-gray-900 rounded-lg shadow-xl p-10">
        <h1 className="text-4xl font-serif text-gold-500 text-center mb-10">
          File Uploader
        </h1>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-gray-800 file:text-gold-500
                                       hover:file:bg-gray-700 cursor-pointer"
            />
          </div>
          <div>
            <textarea
              placeholder="Describe the pattern and replacement (e.g., Find email addresses and replace them with 'REDACTED')."
              value={patternDescription}
              onChange={(e) => setPatternDescription(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg p-4 focus:ring-2 focus:ring-gold-500"
              rows="4"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-gold-500 text-black text-lg font-bold rounded-lg transition-all
                                       hover:bg-gold-600 hover:text-white"
            >
              Upload & Process
            </button>
          </div>
        </form>

        {/* Table to display data if available */}
        {data.length > 0 && (
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  {Object.keys(data[0]).map((key, index) => (
                    <th
                      key={index}
                      className="py-3 px-6 font-semibold text-left"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    {Object.values(row).map((val, colIndex) => (
                      <td key={colIndex} className="py-3 px-6">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
