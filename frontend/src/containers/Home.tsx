import { FileUpload } from "../components/view";
// import { useFileUpload } from "../hooks";
import { useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
import { DataRow } from "../types";
import { fetchData } from "../utils";
export const HomeContainer: React.FC = () => {
  const [patternDescription, setPatternDescription] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<DataRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !patternDescription) {
      setError("Please select a file and provide a pattern description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pattern_description", patternDescription);

    try {
      // const response = await axios.post(
      //   "http://localhost:8000/api/upload/",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const data = await fetchData(formData);
      setData([...data]);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };
  return (
    <FileUpload
      file={file}
      patternDescription={patternDescription}
      data={data}
      error={error}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      setPatternDescription={setPatternDescription}
    />
  );
};
