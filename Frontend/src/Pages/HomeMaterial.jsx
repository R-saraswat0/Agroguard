import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MdSearch } from "react-icons/md";
import { FaSort, FaEye, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import SupplierSidebar from "../components/SupplierSidebar";
import ShowMaterial from "./ShowMaterial";
import EditMaterial from "./EditMaterial";
import ManagerNavBar from "../components/ManagerNavBar";
import API_BASE_URL from "../config/api";

const HomeMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("materialName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/materials`);
      setMaterials(response.data?.data || []);
      setError("");
    } catch (err) {
      console.error("Error fetching materials:", err);
      setError("Failed to load materials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const openEditModal = (materialId) => setEditingMaterial(materialId);
  const closeEditModal = () => setEditingMaterial(null);

  const handleMaterialUpdate = () => {
    fetchMaterials();
    closeEditModal();
  };

  const openDeleteModal = (materialId) => {
    setMaterialToDelete(materialId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setMaterialToDelete(null);
  };

  const handleDelete = async () => {
    if (!materialToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/materials/${materialToDelete}`);
      setMaterials((prev) =>
        prev.filter((material) => material._id !== materialToDelete)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting material:", err);
      setError("Failed to delete material. Please try again.");
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getCategoryColor = (category = "") => {
    switch (category.toLowerCase()) {
      case "fertilizer":
        return "bg-blue-400 text-white";
      case "pesticide":
        return "bg-red-400 text-white";
      case "herbicide":
        return "bg-green-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const openMaterialDetails = (materialId) => setSelectedMaterial(materialId);
  const closeMaterialDetails = () => setSelectedMaterial(null);

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
      if (sortField === "pricePerUnit") {
        const aPrice = Number(a.pricePerUnit || 0);
        const bPrice = Number(b.pricePerUnit || 0);
        return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
      }

      const aValue = String(a[sortField] || "").toLowerCase();
      const bValue = String(b[sortField] || "").toLowerCase();
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="relative flex h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=2070&q=80')",
          backgroundColor: "rgba(243, 244, 246, 0.88)",
          backgroundBlendMode: "overlay",
        }}
      />

      <ManagerNavBar />
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <SupplierSidebar />
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Materials</h1>
              <Link
                to="/materials/create"
                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                <FaPlus className="mr-2" />
                Add Material
              </Link>
            </div>

            <div className="mb-8 rounded-lg bg-white/60 p-6 shadow-md backdrop-blur-sm">
              <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className="relative lg:col-span-2">
                  <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-full border-2 border-green-400 p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-gray-400" />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="rounded-md border border-green-300 bg-green-50 p-3 text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Pesticide">Pesticide</option>
                  <option value="Herbicide">Herbicide</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort("materialName")}
                    className="flex flex-1 items-center justify-center rounded-md bg-green-100 p-3 text-sm text-gray-700 transition hover:bg-green-500 hover:text-white"
                  >
                    <FaSort className="mr-2" />
                    Name
                  </button>
                  <button
                    onClick={() => handleSort("pricePerUnit")}
                    className="flex flex-1 items-center justify-center rounded-md bg-green-100 p-3 text-sm text-gray-700 transition hover:bg-green-500 hover:text-white"
                  >
                    <FaSort className="mr-2" />
                    Price
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {loading ? (
                <Spinner />
              ) : (
                <section className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredAndSortedMaterials.map((material) => (
                    <div
                      key={material._id}
                      className="relative w-72 rounded-xl bg-white/90 shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <img
                        src={
                          material.image ||
                          "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={material.materialName}
                        className="h-72 w-72 rounded-t-xl object-cover"
                      />
                      <div className="w-72 px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(
                            material.category
                          )}`}
                        >
                          {material.category || "Unknown"}
                        </span>
                        <h3 className="mt-2 block truncate text-base font-semibold capitalize text-gray-800">
                          {material.materialName}
                        </h3>
                        <p className="mt-3 mb-10 text-lg font-bold text-gray-800">
                          Rs.{Number(material.pricePerUnit || 0).toFixed(2)} /{" "}
                          <span className="text-sm font-normal text-gray-600">
                            {material.unitType || "unit"}
                          </span>
                        </p>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                        <button
                          onClick={() => openMaterialDetails(material._id)}
                          className="flex items-center rounded-full px-3 text-sm text-green-600 transition-colors hover:text-green-700"
                        >
                          <FaEye className="mr-1.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => openEditModal(material._id)}
                          className="flex items-center rounded-full px-3 text-sm text-blue-600 transition-colors hover:text-blue-700"
                        >
                          <FaEdit className="mr-1.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => openDeleteModal(material._id)}
                          className="flex items-center rounded-full px-3 text-sm text-red-600 transition-colors hover:text-red-700"
                        >
                          <FaTrash className="mr-1.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {!loading && !error && filteredAndSortedMaterials.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-xl text-gray-600">
                    No materials found. Try changing filters or add a new material.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {editingMaterial && (
          <EditMaterial
            id={editingMaterial}
            onClose={closeEditModal}
            onUpdate={handleMaterialUpdate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-8"
            >
              <ShowMaterial id={selectedMaterial} onClose={closeMaterialDetails} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="mx-4 w-full max-w-md rounded-lg bg-white p-8"
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Delete Confirmation
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this material? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="rounded-md bg-gray-200 px-6 py-2 text-gray-800 transition-colors hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HomeMaterial;

