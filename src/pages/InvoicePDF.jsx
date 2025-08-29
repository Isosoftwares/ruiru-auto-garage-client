import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import logo from "../assets/graphics/logo_1.jpg";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 0,
    paddingBottom: 30,
    paddingHorizontal: 0,
  },

  // Header Styles
  header: {
    backgroundColor: "#1f2937",
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoSection: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },

  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 10,
  },

  logoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  companyInfo: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  companyName: {
    color: "#d97706",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 3,
  },

  companyTagline: {
    color: "#d1d5db",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },

  businessText: {
    color: "#d1d5db",
    marginBottom: 3,
    fontSize: 9,
    textAlign: "center",
    fontFamily: "Helvetica",
  },

  invoiceTitle: {
    textAlign: "right",
  },

  invoiceTitleText: {
    color: "#d97706",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  invoiceDetails: {
    color: "#d1d5db",
    fontSize: 9,
    marginBottom: 2,
  },

  // Business Info Section
  businessSection: {
    backgroundColor: "#f9fafb",
    padding: 30,
    borderBottom: "1 solid #e5e7eb",
  },

  businessRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  businessColumn: {
    width: "45%",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
  },

  businessInfoText: {
    color: "#6b7280",
    marginBottom: 4,
    fontSize: 10,
  },

  businessBold: {
    color: "#1f2937",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 10,
  },

  vehicleBox: {
    backgroundColor: "#fef3c7",
    border: "1 solid #d97706",
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
  },

  vehicleText: {
    color: "#1f2937",
    fontWeight: "bold",
    fontSize: 10,
  },

  servedBySection: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: "1 solid #e5e7eb",
  },

  servedByText: {
    color: "#374151",
    fontSize: 10,
  },

  // Table Styles
  tableSection: {
    padding: 30,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    padding: 8,
    marginBottom: 0,
  },

  tableHeaderCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 9,
  },

  descriptionHeader: {
    width: "45%",
    textAlign: "left",
  },

  qtyHeader: {
    width: "15%",
    textAlign: "center",
  },

  priceHeader: {
    width: "20%",
    textAlign: "right",
  },

  totalHeader: {
    width: "20%",
    textAlign: "right",
  },

  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottom: "1 solid #e5e7eb",
  },

  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },

  tableCellText: {
    fontSize: 9,
    color: "#1f2937",
  },

  tableCellBold: {
    fontSize: 9,
    color: "#1f2937",
    fontWeight: "bold",
  },

  descriptionCell: {
    width: "45%",
    textAlign: "left",
  },

  qtyCell: {
    width: "15%",
    textAlign: "center",
  },

  priceCell: {
    width: "20%",
    textAlign: "right",
  },

  totalCell: {
    width: "20%",
    textAlign: "right",
  },

  // Totals Section
  totalsSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },

  totalsContainer: {
    width: "40%",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottom: "1 solid #e5e7eb",
  },

  totalLabel: {
    color: "#6b7280",
    fontSize: 10,
  },

  totalValue: {
    color: "#1f2937",
    fontWeight: "bold",
    fontSize: 10,
  },

  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTop: "2 solid #1f2937",
    marginTop: 5,
  },

  grandTotalLabel: {
    color: "#1f2937",
    fontSize: 14,
    fontWeight: "bold",
  },

  grandTotalValue: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 10,
  },

  footerTitle: {
    marginBottom: 5,
  },

  footerSubtext: {
    fontSize: 8,
    marginBottom: 15,
    fontWeight: "bold",
  },

  footerTagline: {
    color: "#d97706",
    fontWeight: "bold",
  },

  paymentInfo: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: "1 solid #6b7280",
    alignItems: "center",
  },

  paymentTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },

  paymentText: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 3,
    fontWeight: "bold",
  },

  paymentNote: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 8,
    fontStyle: "italic",
  },
});

// PDF Invoice Document Component
const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image style={styles.logoImage} src={logo} />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Ruiru Auto Garage</Text>
            <Text style={styles.companyTagline}>Ride With Pride</Text>
            <Text style={styles.businessText}>Mathigu Road, Ruiru Town</Text>
            <Text style={styles.businessText}>Kiambu County, Kenya</Text>
            <Text style={styles.businessText}>Phone: 0748 334 555</Text>
            <Text style={styles.businessText}>
              Email: ruiruautogarage@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.invoiceTitle}>
          <Text style={styles.invoiceTitleText}>INVOICE</Text>
          <Text style={styles.invoiceDetails}>
            #{invoiceData.invoiceNumber}
          </Text>
          <Text style={styles.invoiceDetails}>{invoiceData.invoiceDate}</Text>
        </View>
      </View>

      {/* Customer Info Section */}
      <View style={styles.businessSection}>
        <View style={styles.businessRow}>
          {/* Bill To Section */}
          <View style={styles.businessColumn}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            {invoiceData.customerInfo.name ? (
              <>
                <Text style={styles.businessBold}>
                  {invoiceData.customerInfo.name}
                </Text>
                {invoiceData.customerInfo.address && (
                  <Text style={styles.businessInfoText}>
                    {invoiceData.customerInfo.address}
                  </Text>
                )}
                {invoiceData.customerInfo.city && (
                  <Text style={styles.businessInfoText}>
                    {invoiceData.customerInfo.city}
                  </Text>
                )}
                {invoiceData.customerInfo.phone && (
                  <Text style={styles.businessInfoText}>
                    {invoiceData.customerInfo.phone}
                  </Text>
                )}
                {invoiceData.customerInfo.email && (
                  <Text style={styles.businessInfoText}>
                    {invoiceData.customerInfo.email}
                  </Text>
                )}
                {invoiceData.customerInfo.carPlate && (
                  <View style={styles.vehicleBox}>
                    <Text style={styles.vehicleText}>
                      Vehicle: {invoiceData.customerInfo.carPlate}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <Text style={styles.businessInfoText}>
                No customer information provided
              </Text>
            )}
          </View>

          {/* Served By Section */}
          <View style={styles.businessColumn}>
            <Text style={styles.sectionTitle}>Service Details:</Text>
            <Text style={styles.servedByText}>
              Served by: {invoiceData.servedBy}
            </Text>
            <Text style={styles.paymentText}></Text>
            <Text style={styles.paymentText}></Text>
            <Text style={styles.paymentText}>Mpesa Paybill: 880100</Text>
            <Text style={styles.paymentText}></Text>
            <Text style={styles.paymentText}>Account No: 114180</Text>
          </View>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.tableSection}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.descriptionHeader]}>
            Description
          </Text>
          <Text style={[styles.tableHeaderCell, styles.qtyHeader]}>Qty</Text>
          <Text style={[styles.tableHeaderCell, styles.priceHeader]}>
            Unit Price
          </Text>
          <Text style={[styles.tableHeaderCell, styles.totalHeader]}>
            Total
          </Text>
        </View>

        {/* Table Rows */}
        {invoiceData.items.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowAlt : null,
            ]}
          >
            <Text style={[styles.tableCellText, styles.descriptionCell]}>
              {item.description}
            </Text>
            <Text style={[styles.tableCellText, styles.qtyCell]}>
              {item.quantity}
            </Text>
            <Text style={[styles.tableCellText, styles.priceCell]}>
              KSh {item.price.toLocaleString()}
            </Text>
            <Text style={[styles.tableCellBold, styles.totalCell]}>
              KSh {(item.quantity * item.price).toLocaleString()}
            </Text>
          </View>
        ))}

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsContainer}>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Amount:</Text>
              <Text style={styles.grandTotalValue}>
                KSh {invoiceData.grandTotal.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>
          Thank you for choosing Ruiru Auto Garage!
        </Text>
        <Text style={styles.footerSubtext}>Ride With Pride.</Text>
        <Text style={styles.footerTagline}>
          Quality • Reliability • Excellence
        </Text>
      </View>
    </Page>
  </Document>
);

// PDF Generator Component with Download and Preview Options
const PDFInvoiceGenerator = ({ invoiceData, showPreview = false }) => {
  if (showPreview) {
    return (
      <div style={{ width: "100%", height: "600px" }}>
        <PDFViewer width="100%" height="100%">
          <InvoicePDF invoiceData={invoiceData} />
        </PDFViewer>
      </div>
    );
  }

  return (
    <PDFDownloadLink
      document={<InvoicePDF invoiceData={invoiceData} />}
      fileName={`Invoice_${invoiceData.invoiceNumber}.pdf`}
    >
      {({ blob, url, loading, error }) => (
        <button
          disabled={loading}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Professional PDF
            </>
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export { InvoicePDF, PDFInvoiceGenerator };
export default PDFInvoiceGenerator;
