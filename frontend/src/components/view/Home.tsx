import React from "react";
import { DataRow } from "../../types";
import { UploadForm } from "../common/UploadForm";
import { DataTable } from "../common/DataTable";
import { ChangeEvent, FormEvent } from "react";

interface Upload {
  file: File | null;
  patternDescription: string;
  data: DataRow[];
  error: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setPatternDescription: (e: string) => void;
}

export const FileUpload: React.FC<Upload> = ({
  patternDescription,
  data,
  error,
  handleFileChange,
  handleSubmit,
  setPatternDescription,
}) => {
  return (
    <div className="h-[calc(100vh-136px)] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex justify-center items-center p-8">
      <div className="max-w-6xl w-full flex space-x-8">
        {/* Upload Form */}
        <UploadForm
          patternDescription={patternDescription}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          setPatternDescription={setPatternDescription}
          error={error}
        />

        {/* Data Table */}
        <div className="w-2/3 p-2 bg-gray-900 rounded-2xl shadow-2xl overflow-x-auto">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};
