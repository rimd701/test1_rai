import React from "react";
import { DataRow } from "../../types";

interface DataTableProps {
  data: DataRow[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <table className="min-w-full bg-gray-800 text-white text-sm rounded-lg overflow-hidden shadow-md">
      <thead>
        <tr className="bg-gray-700">
          {Object.keys(data[0]).map((key, index) => (
            <th
              key={index}
              className="py-4 px-6 text-left font-semibold text-gold-400 uppercase"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-700 transition-all">
            {Object.values(row).map((val, colIndex) => (
              <td key={colIndex} className="py-4 px-6">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
