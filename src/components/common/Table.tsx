import React from "react";

export type Column<T> = {
  key?: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
};

const Table = <T extends object>({
  data,
  columns,
  className,
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto shadow-md rounded-lg ${className || ""}`}>
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-800 text-white">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="text-left py-3 px-4 font-semibold text-sm uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`hover:bg-gray-50`}>
              {columns.map((col) => (
                <td key={col.key as string} className="py-4 px-4 text-gray-700">
                  {col.render
                    ? col.render(row)
                    : col.key
                    ? String(row[col.key])
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
