import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Eye } from "lucide-react";
import PDFInvoiceGenerator from "./InvoicePDF";
import logo from "../assets/graphics/logo_1.jpg";

const InvoiceReceipt = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPDFViewOpen, setIsPDFViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItems, setNewItems] = useState([
    { id: Date.now(), description: "", quantity: 1, price: 0 }
  ]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    carPlate: "",
  });
  const [servedBy, setServedBy] = useState("Ruiru Auto Garage");
  const [invoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [invoiceDate] = useState(new Date().toLocaleDateString());

  const handleAuth = (e) => {
    e.preventDefault();
    if (authCode === "Redplum2017") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid access code. Please try again.");
      setAuthCode("");
    }
  };

  const addNewItemRow = () => {
    setNewItems([
      ...newItems,
      { id: Date.now() + Math.random(), description: "", quantity: 1, price: 0 }
    ]);
  };

  const updateNewItem = (id, field, value) => {
    setNewItems(newItems.map(item => 
      item.id === id 
        ? { ...item, [field]: field === 'quantity' ? parseInt(value) || 1 : field === 'price' ? parseFloat(value) || 0 : value }
        : item
    ));
  };

  const removeNewItemRow = (id) => {
    if (newItems.length > 1) {
      setNewItems(newItems.filter(item => item.id !== id));
    }
  };

  const saveAllItems = () => {
    const validItems = newItems.filter(item => item.description.trim() && item.price > 0);
    if (validItems.length > 0) {
      const itemsWithFinalIds = validItems.map(item => ({
        ...item,
        id: Date.now() + Math.random()
      }));
      setItems([...items, ...itemsWithFinalIds]);
      setNewItems([{ id: Date.now(), description: "", quantity: 1, price: 0 }]);
      setIsModalOpen(false);
    }
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const updateExistingItem = (field, value) => {
    setItems(items.map(item => 
      item.id === editingId 
        ? { ...item, [field]: field === 'quantity' ? parseInt(value) || 1 : field === 'price' ? parseFloat(value) || 0 : value }
        : item
    ));
  };

  const saveEditedItem = () => {
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    // Extract VAT from subtotal (subtotal includes 16% VAT)
    // If subtotal is 116% of base amount, then VAT = subtotal * (16/116)
    return subtotal * (16 / 116);
  };

  const calculateBaseAmount = () => {
    const subtotal = calculateSubtotal();
    // Base amount without VAT = subtotal * (100/116)
    return subtotal * (100 / 116);
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal(); // Subtotal is already the grand total
  };

  const openModal = () => {
    if (!isEditing) {
      setNewItems([{ id: Date.now(), description: "", quantity: 1, price: 0 }]);
    }
    setIsModalOpen(true);
  };

  const clearCustomerInfo = () => {
    setCustomerInfo({
      name: "",
      address: "",
      city: "",
      phone: "",
      email: "",
      carPlate: "",
    });
  };

  const clearAllInvoiceData = () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to clear all invoice data? This will remove all items and customer information."
    );
    
    if (confirmed) {
      // Reset all invoice data
      setItems([]);
      setCustomerInfo({
        name: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        carPlate: "",
      });
      setServedBy("Ruiru Auto Garage");
      setNewItems([{ id: Date.now(), description: "", quantity: 1, price: 0 }]);
      
      // Close any open modals
      setIsModalOpen(false);
      setIsCustomerModalOpen(false);
      setIsPDFViewOpen(false);
      setIsEditing(false);
      setEditingId(null);
    }
  };

  const prepareInvoiceData = () => {
    return {
      invoiceNumber,
      invoiceDate,
      items,
      customerInfo,
      servedBy,
      baseAmount: calculateBaseAmount(),
      tax: calculateTax(),
      grandTotal: calculateGrandTotal(),
    };
  };

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border-4 border-yellow-400">
                <img src={logo} alt="Ruiru Auto Garage" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Ruiru Auto Garage</h1>
              <p className="text-yellow-600 font-semibold">Invoice Management System</p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-center text-lg font-mono"
                  placeholder="Enter access code"
                  required
                />
                {authError && (
                  <p className="mt-2 text-sm text-red-600">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Access System
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-gray-500">
              <p>Authorized personnel only</p>
              <p className="mt-1">Ride With Pride</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Invoice Management
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Create and manage professional invoices for Ruiru Auto Garage
                  </p>
                </div>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
                  title="Logout"
                >
                  <X size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              <button
                onClick={() => setIsCustomerModalOpen(true)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base min-w-0 flex-shrink-0"
              >
                <Edit2 size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Customer Info</span>
                <span className="sm:hidden">Customer</span>
              </button>

              <button
                onClick={openModal}
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base min-w-0 flex-shrink-0"
              >
                <Plus size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Item</span>
                <span className="sm:hidden">Add</span>
              </button>

              <button
                onClick={clearAllInvoiceData}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base min-w-0 flex-shrink-0"
              >
                <Trash2 size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </button>

              <button
                onClick={() => setIsPDFViewOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base min-w-0 flex-shrink-0"
              >
                <Eye size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Preview PDF</span>
                <span className="sm:hidden">Preview</span>
              </button>

              <div className="flex-shrink-0">
                <PDFInvoiceGenerator invoiceData={prepareInvoiceData()} />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
              {/* Company Info Section - Centered */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden mb-4 shadow-2xl border-4 border-yellow-400">
                  <img
                    src={logo}
                    alt="Ruiru Auto Garage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">
                    Ruiru Auto Garage
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base font-semibold">
                    Ride With Pride
                  </p>
                  <div className="text-gray-300 text-xs sm:text-sm space-y-1 mt-3">
                    <p>Mathigu Road, Ruiru Town</p>
                    <p>Kiambu County, Kenya</p>
                    <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-1 mt-2">
                      <p>📞 0748 333 555</p>
                      <p>✉️ Ruiruautogarage@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Info Section */}
              <div className="text-center lg:text-right flex-shrink-0 lg:self-start">
                <div className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-bold">INVOICE</h2>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-gray-300 text-sm sm:text-base">
                    <span className="font-medium">Invoice #:</span>{" "}
                    {invoiceNumber}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base">
                    <span className="font-medium">Date:</span> {invoiceDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Bill To:
                </h3>
                <div className="text-gray-600">
                  {customerInfo.name ? (
                    <>
                      <p className="font-semibold text-gray-800">
                        {customerInfo.name}
                      </p>
                      {customerInfo.address && <p>{customerInfo.address}</p>}
                      {customerInfo.city && <p>{customerInfo.city}</p>}
                      {customerInfo.phone && <p>{customerInfo.phone}</p>}
                      {customerInfo.email && <p>{customerInfo.email}</p>}
                      {customerInfo.carPlate && (
                        <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded">
                          <p className="font-medium text-gray-800">
                            Vehicle: {customerInfo.carPlate}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-400 italic">
                      <p>No customer information</p>
                      <p className="text-sm mt-1">
                        Click "Customer Info" to add details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Mobile Cards View */}
            <div className="block lg:hidden space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm flex-1 pr-2">
                      {item.description}
                    </h4>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => editItem(item)}
                        className="text-yellow-600 hover:text-yellow-800 p-1.5 rounded-lg hover:bg-yellow-50 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Qty:</span>
                      <p className="font-medium text-gray-900">
                        {item.quantity}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Unit Price:</span>
                      <p className="font-medium text-gray-900">
                        KSh {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total:</span>
                      <p className="font-bold text-gray-900">
                        KSh {(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-900">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">
                      Qty
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">
                      Unit Price
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-gray-25" : "bg-white"
                      }`}
                    >
                      <td className="py-4 px-4 text-gray-800">
                        {item.description}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-800">
                        KSh {item.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">
                        KSh {(item.quantity * item.price).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => editItem(item)}
                            className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Method Section - Prominent */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
                  📱 Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="bg-white border border-green-300 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Mpesa Paybill</p>
                      <p className="text-2xl font-bold text-green-700">880100</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white border border-green-300 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Account No</p>
                      <p className="text-2xl font-bold text-green-700">114180</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 sm:mt-8">
              <div className="flex justify-center sm:justify-end">
                <div className="w-full max-w-xs sm:max-w-sm bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between py-4">
                      <span className="text-xl font-bold text-gray-900">
                        Total Amount:
                      </span>
                      <span className="text-xl font-bold text-red-600">
                        KSh {calculateGrandTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 text-center text-gray-600">
              <p className="mb-2 text-sm sm:text-base font-medium">
                Thank you for choosing Ruiru Auto Garage!
              </p>
              <p className="font-bold sm:text-sm mb-4">Ride With Pride.</p>
              <div className="flex justify-center items-center mb-6">
                <span className="text-yellow-600 font-semibold text-xs sm:text-sm px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200">
                  Quality • Reliability • Excellence
                </span>
              </div>
              
              {/* Service Details - Small */}
              <div className="mt-4 mb-4">
                <div className="max-w-xs mx-auto bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-2">Service Details</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Served by:</span>
                    <input
                      type="text"
                      value={servedBy}
                      onChange={(e) => setServedBy(e.target.value)}
                      className="flex-1 bg-transparent border-b border-gray-300 focus:border-yellow-500 outline-none text-gray-700 text-xs px-1 py-1"
                      placeholder="Service rep"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Edit Item" : "Add Items"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setEditingId(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                // Edit single item
                <div className="space-y-4">
                  {(() => {
                    const item = items.find(i => i.id === editingId);
                    return (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={item?.description || ''}
                            onChange={(e) => updateExistingItem('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter item description"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={item?.quantity || 1}
                              onChange={(e) => updateExistingItem('quantity', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit Price (KSh)
                            </label>
                            <input
                              type="number"
                              value={item?.price || 0}
                              onChange={(e) => updateExistingItem('price', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-600">
                            Total:{" "}
                            <span className="font-semibold text-gray-900">
                              KSh {((item?.quantity || 1) * (item?.price || 0)).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                // Add multiple items
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Add Multiple Items</h3>
                    <p className="text-sm text-gray-600 mt-1">Fill in the details for each item. Click "Add Row" after the last item to add more.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {newItems.map((item, index) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                          <div className="flex items-center gap-2">
                            {index === newItems.length - 1 && (
                              <button
                                onClick={addNewItemRow}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
                                title="Add another item"
                              >
                                <Plus size={14} />
                                Add Row
                              </button>
                            )}
                            {newItems.length > 1 && (
                              <button
                                onClick={() => removeNewItemRow(item.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Remove this item"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updateNewItem(item.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              placeholder="Enter item description"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateNewItem(item.id, 'quantity', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Qty"
                                min="1"
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                value={item.price}
                                onChange={(e) => updateNewItem(item.id, 'price', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Price (KSh)"
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-700">
                                KSh {(item.quantity * item.price).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total for all items:</span>
                      <span className="text-xl font-bold text-blue-600">
                        KSh {newItems.reduce((total, item) => total + (item.quantity * item.price), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? saveEditedItem : saveAllItems}
                className="flex items-center gap-2 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors font-medium"
              >
                <Save size={16} />
                {isEditing ? "Update Item" : "Save All Items"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Info Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Information
              </h2>
              <button
                onClick={() => setIsCustomerModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Make/Model
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter Make/Model"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City, County
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter city and county"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Number Plate
                  </label>
                  <input
                    type="text"
                    value={customerInfo.carPlate}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        carPlate: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g., KAA 123A"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-6 border-t border-gray-200">
              <button
                onClick={clearCustomerInfo}
                className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  <Save size={16} />
                  Save Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {isPDFViewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] sm:h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                PDF Preview & Generator
              </h2>
              <button
                onClick={() => setIsPDFViewOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-2 sm:p-4 flex-1 overflow-hidden">
              <PDFInvoiceGenerator
                invoiceData={prepareInvoiceData()}
                showPreview={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceReceipt;
