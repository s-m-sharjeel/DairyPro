import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "../../services/api";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalMilk: 0,
    averageQuality: 0,
    topFeed: "N/A",
    healthAlerts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data concurrently
        const totalMilkResponse = await axios.get("http://localhost:3001/api/dashboard/totalMilk");
        const averageQualityResponse = await axios.get("http://localhost:3001/api/dashboard/averageQuality");
        const topFeedResponse = await axios.get("http://localhost:3001/api/dashboard/topFeed");
        const healthAlertsResponse = await axios.get("http://localhost:3001/api/dashboard/healthAlerts");

        // Update the dashboard data with API responses
        setDashboardData({
          totalMilk: totalMilkResponse.data.totalMilk || 0, // Access the first object in the array
          averageQuality: averageQualityResponse.data.averageQuality || 0,
          topFeed: topFeedResponse.data.topFeed || "N/A",
          healthAlerts: healthAlertsResponse.data.healthAlerts || 0,
        });
        // console.log("Error fetching dashboard data:", dashboardData.totalMilk);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // console.log("totalMilk: ", dashboardData.totalMilk);
  }, []); // Empty dependency array ensures it runs only once on component mount

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        {/* Total Milk Produced */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Milk Produced
              </Typography>
              <Typography variant="h5">{dashboardData.totalMilk}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Average Milk Quality */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Average Milk Quality
              </Typography>
              <Typography variant="h5">{dashboardData.averageQuality}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Health Alerts */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Top Feed
              </Typography>
              <Typography variant="h5">{dashboardData.topFeed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Feed Inventory Status */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Health Alerts
              </Typography>
              <Typography variant="h5">{dashboardData.healthAlerts}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
