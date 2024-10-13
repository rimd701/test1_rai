import React, { ChangeEvent, FormEvent } from "react";

interface UploadFormProps {
  patternDescription: string;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setPatternDescription: (e: string) => void;
  error: string | null;
}

export const UploadForm: React.FC<UploadFormProps> = ({
  patternDescription,
  handleFileChange,
  handleSubmit,
  setPatternDescription,
  error,
}) => {
  return (
    <div className="w-1/3 p-8 bg-gray-900 rounded-2xl shadow-2xl space-y-8">
      <h1 className="text-4xl font-serif text-gold-300 text-center mb-12 tracking-wider">
        Upload File
      </h1>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center text-lg font-semibold">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        {/* File Input */}
        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500  
                       file:mr-4 file:py-3 file:px-5  
                       file:rounded-lg file:border-0  
                       file:text-sm file:font-semibold  
                       file:bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900  
                       file:text-gold-400  
                       hover:file:bg-gray-700 cursor-pointer transition-all duration-300"
          />
        </div>

        {/* Pattern Description */}
        <div className="space-y-4">
          <textarea
            placeholder="Describe the pattern"
            value={patternDescription}
            onChange={(e) => setPatternDescription(e.target.value)}
            className="w-full bg-gray-900 text-white rounded-lg p-5 focus:ring-4 focus:ring-gold-400 focus:outline-none transition-all duration-300"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black text-lg font-bold rounded-full shadow-lg  
                       hover:from-gold-600 hover:to-gold-700 hover:text-white transition-all duration-300"
          >
            Upload & Process
          </button>
        </div>
      </form>
    </div>
  );
};
