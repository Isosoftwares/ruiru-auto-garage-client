import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaWhatsapp,
  FaComment,
  FaShare,
  FaMapMarkerAlt,
  FaEye,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaTag,
  FaInfo,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import ProductCard from "./components/ProductCard";
import { productsData } from "./data/dummyData";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function ProductDetails() {
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Dummy product with multiple images
  const dummyProduct = {
    _id: "prod_detail_1",
    title: "iPhone 14 Pro Max - 256GB Deep Purple",
    slug: "iphone-14-pro-max-256gb-deep-purple",
    description:
      "Brand new iPhone 14 Pro Max with 256GB storage in stunning Deep Purple color. Features the powerful A16 Bionic chip, Pro camera system with 48MP main camera, and Dynamic Island. This device comes with all original accessories including Lightning to USB-C cable, documentation, and original box. The phone has never been used and is in pristine condition. Perfect for photography enthusiasts and professionals who need the latest iPhone technology.",
    shortDescription:
      "Brand new iPhone 14 Pro Max, 256GB, Deep Purple, unopened box",
    type: "product",
    condition: "new",
    seller: {
      _id: "seller_detail_1",
      name: "TechHub Kenya",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4.8,
      reviewCount: 156,
      memberSince: "2020-03-15",
      verified: true,
      responseTime: "Usually responds within 1 hour",
      location: "Nairobi, Kenya",
    },
    primaryCategory: "cat_1_1",
    secondaryCategories: ["cat_1"],
    pricing: {
      basePrice: 145000,
      currency: "KES",
      priceType: "negotiable",
      discountPercentage: 8,
      originalPrice: 157609,
    },
    media: {
      images: [
        {
          url:
            "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=600",
          alt: "iPhone 14 Pro Max - Front view",
          isPrimary: true,
          order: 0,
        },
        {
          url:
            "https://www.apple.com/v/iphone/home/cc/images/meta/iphone__kqge21l9n26q_og.png",
          alt: "iPhone 14 Pro Max - Back view",
          isPrimary: false,
          order: 1,
        },
        {
          url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrdfke78aFtQDqyXLm7iGdWfF8MKWq8g5sn1fjScikBL1DEPUdZNSaPkiiy5DNW-kFi8&usqp=CAU",
          alt: "iPhone 14 Pro Max - Side view",
          isPrimary: false,
          order: 2,
        },
        {
          url:
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600",
          alt: "iPhone 14 Pro Max - Camera detail",
          isPrimary: false,
          order: 3,
        },
        {
          url:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
          alt: "iPhone 14 Pro Max - Box contents",
          isPrimary: false,
          order: 4,
        },
      ],
    },
    location: {
      county: "Nairobi",
      subcounty: "Westlands",
      ward: "Parklands",
      specificLocation: "Westgate Mall",
      coordinates: {
        type: "Point",
        coordinates: [36.8065, -1.2676],
      },
      deliveryAvailable: true,
      pickupAvailable: true,
    },
    inventory: {
      quantity: 2,
      inStock: true,
    },
    specifications: [
      { label: "Storage", value: "256GB" },
      { label: "Color", value: "Deep Purple" },
      { label: "Display", value: "6.7-inch Super Retina XDR" },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Camera", value: "48MP Pro camera system" },
      { label: "Battery", value: "Up to 29 hours video playback" },
      { label: "5G", value: "Yes" },
      { label: "Warranty", value: "1 year Apple warranty" },
    ],
    features: [
      "Dynamic Island",
      "Always-On display",
      "ProRAW and ProRes recording",
      "Crash Detection",
      "Emergency SOS via satellite",
      "Face ID",
      "Water resistance (IP68)",
      "MagSafe and wireless charging",
    ],
    status: "active",
    visibility: "public",
    isFeatured: true,
    stats: {
      views: 342,
      inquiries: 28,
      favorites: 15,
    },
    ratings: {
      average: 4.9,
      count: 12,
    },
    postedDate: "2024-12-10T10:30:00Z",
    lastUpdated: "2024-12-15T14:22:00Z",
  };

  // Related products (from existing dummy data)
  const relatedProducts = productsData.slice(0, 4);

  // Format price with commas
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-KE").format(amount);
  };

  const savings =
    dummyProduct.pricing.originalPrice - dummyProduct.pricing.basePrice;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === dummyProduct.media.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? dummyProduct.media.images.length - 1 : prev - 1
    );
  };

  const handleWhatsAppContact = () => {
    const message = `Hi, I'm interested in "${dummyProduct.title}" listed for ${
      dummyProduct.pricing.currency
    } ${formatPrice(dummyProduct.pricing.basePrice)} on MyJuakali.`;
    window.open(
      `https://wa.me/254700000000?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dummyProduct.title,
        text: dummyProduct.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Simulate view increment
  useEffect(() => {
    // In real app, this would be an API call to increment views
    console.log("Product viewed:", dummyProduct._id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-[80px] sm:pt-[90px] lg:pt-[90px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb */}
          <nav className="mb-4 sm:mb-6">
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
              <Link to="/" className="hover:text-primary whitespace-nowrap">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                to="/products"
                className="hover:text-primary whitespace-nowrap"
              >
                Products
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                to="/categories/electronics"
                className="hover:text-primary whitespace-nowrap"
              >
                Electronics
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium truncate">
                iPhone 14 Pro Max
              </span>
            </div>
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
            {/* Product Images - Mobile First, Desktop Left Column */}
            <div className="xl:col-span-7">
              <div className="bg-light rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
                {/* Main Image Carousel */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={dummyProduct.media.images[currentImageIndex].url}
                    alt={dummyProduct.media.images[currentImageIndex].alt}
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation Arrows - Hidden on very small screens */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 text-light rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaChevronLeft className="text-sm sm:text-base" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 text-light rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaChevronRight className="text-sm sm:text-base" />
                  </button>

                  {/* Expand Button */}
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 text-light rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaExpand className="text-xs sm:text-sm" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-60 text-light px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {currentImageIndex + 1} / {dummyProduct.media.images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="p-3 sm:p-4">
                  <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                    {dummyProduct.media.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          currentImageIndex === index
                            ? "border-primary"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info - Mobile Second, Desktop Right Column */}
            <div className="xl:col-span-5 space-y-4 sm:space-y-6">
              {/* Product Header */}
              <div className="bg-light rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                {/* Title and Actions */}
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark flex-1 mr-3 sm:mr-4 leading-tight">
                    {dummyProduct.title}
                  </h1>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-300"
                    >
                      {isFavorited ? (
                        <FaHeart className="text-red-500 text-sm sm:text-base" />
                      ) : (
                        <FaRegHeart className="text-gray-600 text-sm sm:text-base" />
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                    >
                      <FaShare className="text-gray-600 text-sm sm:text-base" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-dark">
                      {dummyProduct.pricing.currency}{" "}
                      {formatPrice(dummyProduct.pricing.basePrice)}
                    </span>
                    {dummyProduct.pricing.originalPrice && (
                      <span className="text-base sm:text-lg text-gray-500 line-through">
                        {dummyProduct.pricing.currency}{" "}
                        {formatPrice(dummyProduct.pricing.originalPrice)}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                        Save {dummyProduct.pricing.currency}{" "}
                        {formatPrice(savings)}
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full">
                        {dummyProduct.pricing.discountPercentage}% OFF
                      </span>
                    </div>
                  )}
                  {dummyProduct.pricing.priceType === "negotiable" && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      💬 Price is negotiable
                    </p>
                  )}
                </div>

                {/* Condition & Type */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                  <div className="flex items-center space-x-1">
                    <FaTag className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Condition:
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-green-600 capitalize">
                      {dummyProduct.condition}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaInfo className="text-gray-400 text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Type:
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-primary capitalize">
                      {dummyProduct.type}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-2 mb-4">
                  <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600 leading-tight">
                    {dummyProduct.location.specificLocation},{" "}
                    {dummyProduct.location.subcounty},{" "}
                    {dummyProduct.location.county}
                  </span>
                </div>

                {/* Views and Stats */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <FaEye className="text-gray-400" />
                    <span>{dummyProduct.stats.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaHeart className="text-gray-400" />
                    <span>{dummyProduct.stats.favorites} favorites</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaComment className="text-gray-400" />
                    <span>{dummyProduct.stats.inquiries} inquiries</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-500 text-light py-3 sm:py-4 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <FaWhatsapp className="text-lg sm:text-xl" />
                    <span>Contact via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-primary text-light py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <FaComment className="text-lg sm:text-xl" />
                    <span>Start Chat with Seller</span>
                  </button>
                </div>

                {/* Safety Notice */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <FaShieldAlt className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-medium text-yellow-800">Safety Tips</p>
                      <p className="text-yellow-700 leading-tight">
                        Meet in a public place. Check the item before payment.
                        Avoid advance payments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="bg-light rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-dark mb-4">
                  Seller Information
                </h3>

                <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                  <img
                    src={dummyProduct.seller.profileImage}
                    alt={dummyProduct.seller.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <h4 className="font-semibold text-dark text-sm sm:text-base truncate">
                        {dummyProduct.seller.name}
                      </h4>
                      {dummyProduct.seller.verified && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap mt-1 sm:mt-0 self-start">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs sm:text-sm ${
                            i < Math.floor(dummyProduct.seller.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">
                        {dummyProduct.seller.rating} (
                        {dummyProduct.seller.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">
                      {dummyProduct.seller.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
                    <span>Member since March 2020</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaComment className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">
                      {dummyProduct.seller.responseTime}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to={`/seller/${dummyProduct.seller._id}`}
                    className="text-primary hover:text-blue-700 font-medium text-xs sm:text-sm"
                  >
                    View seller's other items →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-light rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
              {/* Description Section */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">
                  Product Description
                </h3>
                <div className="prose max-w-none text-gray-700 text-sm sm:text-base">
                  <p className="leading-relaxed">{dummyProduct.description}</p>
                </div>
              </div>

              {/* Specifications */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {dummyProduct.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-700 text-sm sm:text-base">
                        {spec.label}
                      </span>
                      <span className="text-gray-600 text-sm sm:text-base text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {dummyProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-8 sm:mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">
              Related Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-4xl max-h-[95vh] w-full h-full flex items-center justify-center">
            <img
              src={dummyProduct.media.images[currentImageIndex].url}
              alt={dummyProduct.media.images[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-black bg-opacity-50 text-light rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
            >
              <FaTimes className="text-sm sm:text-base" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 text-light rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
            >
              <FaChevronLeft className="text-sm sm:text-base" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 text-light rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
            >
              <FaChevronRight className="text-sm sm:text-base" />
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-light rounded-xl sm:rounded-2xl max-w-sm w-full p-4 sm:p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-dark">
                Contact Seller
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FaTimes className="text-sm sm:text-base" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-500 text-light py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </button>
              <button className="w-full bg-primary text-light py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                <FaPhone />
                <span>Call Seller</span>
              </button>
              <button className="w-full bg-gray-600 text-light py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                <FaEnvelope />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetails;
