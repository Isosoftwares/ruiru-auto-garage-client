import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaFilter,
  FaSort,
  FaTh,
  FaList,
  FaChevronDown,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
  FaAdjust,
} from "react-icons/fa";
import Categories from "./components/Categories"; // Adjust path as needed
import ProductCard from "./components/ProductCard"; // Adjust path as needed
import { productsData, categoriesData } from "./data/dummyData"; // Adjust path as needed
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Products() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Counties in Kenya for location filter
  const kenyanCounties = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Malindi",
    "Kitale",
    "Garissa",
    "Kakamega",
    "Machakos",
    "Meru",
    "Nyeri",
    "Kericho",
  ];

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = [...productsData];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product?.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product?.primaryCategory === filterCategory ||
          product?.secondaryCategories?.includes(filterCategory)
      );
    }

    // Location filter
    if (filterLocation) {
      filtered = filtered.filter(
        (product) => product?.location?.county === filterLocation
      );
    }

    // Condition filter
    if (filterCondition) {
      filtered = filtered.filter(
        (product) => product?.condition === filterCondition
      );
    }

    // Type filter (product vs service)
    if (filterType !== "all") {
      filtered = filtered.filter((product) => product?.type === filterType);
    }

    // Price range filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((product) => {
        const price = product?.pricing?.basePrice || 0;
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) => (a?.pricing?.basePrice || 0) - (b?.pricing?.basePrice || 0)
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) => (b?.pricing?.basePrice || 0) - (a?.pricing?.basePrice || 0)
        );
        break;
      case "rating":
        filtered.sort(
          (a, b) => (b?.ratings?.average || 0) - (a?.ratings?.average || 0)
        );
        break;
      case "popular":
        filtered.sort(
          (a, b) => (b?.stats?.views || 0) - (a?.stats?.views || 0)
        );
        break;
      case "alphabetical":
        filtered.sort((a, b) => (a?.title || "").localeCompare(b?.title || ""));
        break;
      case "newest":
      default:
        // Assuming newest first (you might want to add createdAt to dummy data)
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  const clearAllFilters = () => {
    setFilterCategory("all");
    setFilterLocation("");
    setFilterCondition("");
    setFilterType("all");
    setPriceRange({ min: "", max: "" });
    setSearchQuery("");
    setSortBy("newest");
    setVisibleProducts(12);
    navigate("/products"); // Clear URL params
  };

  const activeFiltersCount = [
    filterCategory !== "all",
    filterLocation,
    filterCondition,
    filterType !== "all",
    priceRange.min,
    priceRange.max,
    searchQuery,
  ].filter(Boolean).length;

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
    { value: "alphabetical", label: "A to Z" },
  ];

  return (
    <div>
      <NavBar />

      <div className="min-h-screen bg-gray-50 pt-[60px]">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar - Left Column */}
            <div className="lg:col-span-1">
              <Categories />
            </div>

            {/* Products Main Content - Right Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Page Header */}
              <div className="bg-light rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-dark">
                      All Products
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {searchQuery
                        ? `Search results for "${searchQuery}"`
                        : "Browse our complete marketplace"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    Showing {displayedProducts.length} of{" "}
                    {filteredProducts.length} products
                  </div>
                </div>
              </div>

              {/* Filters & Controls Bar */}
              <div className="bg-light rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Controls */}
                  <div className="flex items-center space-x-4">
                    {/* Mobile Filter Toggle */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-primary text-light rounded-lg font-medium"
                    >
                      <FaAdjust className="text-sm" />
                      <span>Filters</span>
                      {activeFiltersCount > 0 && (
                        <span className="bg-red-500 text-light text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {activeFiltersCount}
                        </span>
                      )}
                    </button>

                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-light  rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === "grid"
                            ? "bg-light text-primary shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <FaTh className="text-sm" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === "list"
                            ? "bg-light text-primary shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <FaList className="text-sm" />
                      </button>
                    </div>

                    {/* Active Filters Count - Desktop */}
                    {activeFiltersCount > 0 && (
                      <div className="hidden lg:flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {activeFiltersCount} filters active
                        </span>
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-primary hover:text-blue-700 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center space-x-4">
                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-light border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Expandable Filters - Desktop */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    showFilters
                      ? "max-h-96 mt-6 pt-6 border-t border-gray-100"
                      : "max-h-0"
                  } lg:max-h-none lg:mt-6 lg:pt-6 lg:border-t lg:border-gray-100`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Products
                      </label>
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <FaTimes className="text-sm" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="all">All Categories</option>
                        {categoriesData.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <select
                          value={filterLocation}
                          onChange={(e) => setFilterLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none"
                        >
                          <option value="">All Counties</option>
                          {kenyanCounties.map((county) => (
                            <option key={county} value={county}>
                              {county}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="all">All Types</option>
                        <option value="product">Products</option>
                        <option value="service">Services</option>
                      </select>
                    </div>

                    {/* Condition Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condition
                      </label>
                      <select
                        value={filterCondition}
                        onChange={(e) => setFilterCondition(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="">Any Condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="refurbished">Refurbished</option>
                      </select>
                    </div>

                    {/* Price Range */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range (KES)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              min: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="flex items-end">
                      <button
                        onClick={clearAllFilters}
                        className="w-full bg-gray-500 text-light py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {displayedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* No Products Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-light rounded-xl">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-primary text-light px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Load More Button */}
              {visibleProducts < filteredProducts.length && (
                <div className="text-center">
                  <button
                    onClick={loadMoreProducts}
                    className="bg-light border border-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-light  transition-colors font-medium"
                  >
                    Load More Products (
                    {filteredProducts.length - visibleProducts} remaining)
                  </button>
                </div>
              )}

              {/* Back to Top */}
              {displayedProducts.length > 12 && (
                <div className="text-center">
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-primary hover:text-blue-700 font-medium"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
