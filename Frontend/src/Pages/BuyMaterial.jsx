import React, { useEffect, useState } from "react";
import { FaSort, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import UserTopNavbar from "../components/UserTopNavbar";
import AgriStoreHeader from "../components/AgriStoreHeader";
import MaterialDetailsModal from "../components/MaterialDetailsModal";
import Cart from "../components/Cart";
import API_BASE_URL from "../config/api";

const BuyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("materialName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [cart, setCart] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materialDetails, setMaterialDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios
      .get(`${API_BASE_URL}/materials`)
      .then((response) => {
        if (!isMounted) return;
        setMaterials(response.data?.data || []);
        setError("");
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error loading materials:", err);
        setError("Failed to load materials. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleQuantityChange = (materialId, change) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[materialId] || 0) + change;
      if (newQuantity <= 0) {
        const { [materialId]: _removed, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [materialId]: newQuantity };
    });
  };

  const openMaterialDetails = (materialId) => {
    setLoadingDetails(true);
    setSelectedMaterial(materialId);

    axios
      .get(`${API_BASE_URL}/materials/${materialId}`)
      .then((response) => {
        setMaterialDetails(response.data);
      })
      .catch((err) => {
        console.error("Error fetching material details:", err);
      })
      .finally(() => {
        setLoadingDetails(false);
      });
  };

  const closeMaterialDetails = () => {
    setSelectedMaterial(null);
    setMaterialDetails(null);
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  const getTotalPrice = () =>
    Object.entries(cart).reduce((total, [materialId, quantity]) => {
      const material = materials.find((m) => m._id === materialId);
      return total + (material ? material.pricePerUnit * quantity : 0);
    }, 0);

  const getTotalItems = () =>
    Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const handleCheckout = (customerInfo) => {
    console.log("Order submitted:", { customerInfo, cart });
    setCart({});
    setShowCart(false);
    alert("Your order has been placed successfully!");
  };

  const filteredAndSortedMaterials = materials
    .filter((material) => {
      const matchesSearch = material.materialName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "" || material.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <UserTopNavbar />
      <AgriStoreHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSort("materialName")}
                className="flex items-center rounded-md bg-gray-200 p-2 text-sm text-gray-700 transition-colors hover:bg-gray-300"
              >
                <FaSort className="mr-1" />
                Name
              </button>
              <button
                onClick={() => handleSort("pricePerUnit")}
                className="flex items-center rounded-md bg-gray-200 p-2 text-sm text-gray-700 transition-colors hover:bg-gray-300"
              >
                <FaSort className="mr-1" />
                Price
              </button>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">All Categories</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Pesticide">Pesticide</option>
                <option value="Herbicide">Herbicide</option>
              </select>
            </div>

            <div className="relative w-full lg:max-w-md">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-2 border-green-400 p-2 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <MdSearch className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
            </div>

            <button
              onClick={toggleCart}
              className="flex items-center rounded-full bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              <FaShoppingCart className="mr-2" />
              <span>Cart ({getTotalItems()})</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredAndSortedMaterials.map((material) => (
              <div
                key={material._id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >
                <div className="relative h-56">
                  {material.image ? (
                    <img
                      src={material.image}
                      alt={material.materialName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h2 className="mt-2 truncate text-sm font-semibold text-gray-800">
                    {material.materialName}
                  </h2>
                  <p className="mt-1 text-xs text-gray-600">{material.category}</p>
                  <p className="mt-2 text-sm font-bold text-green-600">
                    Rs.{material.pricePerUnit}/{material.unitType}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(material._id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-sm font-semibold">
                        {cart[material._id] || 0}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(material._id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => handleQuantityChange(material._id, 1)}
                      className="rounded-full bg-green-600 px-2 py-1 text-xs text-white transition-colors hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>

                  <button
                    onClick={() => openMaterialDetails(material._id)}
                    className="mt-4 block w-full text-center text-sm text-green-600 transition-colors hover:text-green-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredAndSortedMaterials.length === 0 && (
          <div className="rounded-lg bg-white py-8 text-center shadow-md">
            <p className="text-xl text-gray-600">No materials found.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMaterial && (
          <MaterialDetailsModal
            selectedMaterial={selectedMaterial}
            materialDetails={materialDetails}
            loadingDetails={loadingDetails}
            closeMaterialDetails={closeMaterialDetails}
            handleQuantityChange={handleQuantityChange}
            cart={cart}
          />
        )}
      </AnimatePresence>

      <Cart
        showCart={showCart}
        toggleCart={toggleCart}
        cart={cart}
        materials={materials}
        handleQuantityChange={handleQuantityChange}
        getTotalPrice={getTotalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default BuyMaterial;

