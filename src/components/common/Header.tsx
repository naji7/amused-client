import { useState } from "react";
import { Bell } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";

const Header = () => {
  const { lowStockAlerts } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-blue-600 text-white p-6 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold">Amused Product Management</h1>

      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative p-2 rounded-full hover:bg-blue-500 transition"
        >
          <Bell size={24} />
          {lowStockAlerts.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {lowStockAlerts.length}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 shadow-lg rounded-lg z-50 overflow-hidden">
            <div className="p-3 border-b font-semibold">Low Stock Alerts</div>
            <ul className="max-h-64 overflow-y-auto">
              {lowStockAlerts.length === 0 ? (
                <li className="p-3 text-gray-500">No alerts</li>
              ) : (
                lowStockAlerts.map((alert, index) => (
                  <li key={index} className="p-3 border-b hover:bg-gray-100">
                    {` Product ${alert.productName}(${alert.productId}) is low (${alert.quantity}/
                    ${alert.threshold})`}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
