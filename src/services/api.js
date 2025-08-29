import  useAxiosPrivate  from '../hooks/useAxiosPrivate';

const createDashboardAPI = (api) => ({
  getOverview: (params) => api.get('/dashboard/overview', { params }),
  getQuickStats: (params) => api.get('/dashboard/quick-stats', { params }),
  getRecentActivities: (params) => api.get('/dashboard/recent-activities', { params }),
});

const createReportsAPI = (api) => ({
  getRevenue: (params) => api.get('/reports/revenue', { params }),
  getOccupancy: (params) => api.get('/reports/occupancy', { params }),
  getCustomers: (params) => api.get('/reports/customers', { params }),
  getProperties: (params) => api.get('/reports/properties', { params }),
  getFinancial: (params) => api.get('/reports/financial', { params }),
  getReviews: (params) => api.get('/reports/reviews', { params }),
});

const createAnalyticsAPI = (api) => ({
  getRevenueTrends: (params) => api.get('/analytics/revenue-trends', { params }),
  getBookingPatterns: (params) => api.get('/analytics/booking-patterns', { params }),
  getPerformanceMetrics: (params) => api.get('/analytics/performance-metrics', { params }),
  getHeatMap: (params) => api.get('/analytics/heatmap', { params }),
  getComparativeAnalysis: (params) => api.get('/analytics/comparative-analysis', { params }),
});


export const useApi = () => {
  const api = useAxiosPrivate();

  return {
    dashboard: createDashboardAPI(api),
    reports: createReportsAPI(api),
    analytics: createAnalyticsAPI(api),
  };
};
