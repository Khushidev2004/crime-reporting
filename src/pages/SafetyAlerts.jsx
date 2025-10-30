import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Alert,
  AlertTitle,
  Button,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  IconButton,
  Grid as MuiGrid // MUI Grid v2 ke liye
} from "@mui/material";
import {
  NotificationsActive,
  Info,
  Warning,
  Search,
  LocationOn,
  CheckCircle,
  Error,
  Close,
  Notifications,
  NotificationsOff,
  ReportProblem,
  LocalPolice,
  Call // Phone icon ke badle Call icon use karenge
} from "@mui/icons-material";

function SafetyAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "crime",
      title: "Recent Theft Reported",
      description: "A theft incident reported near Sector 15 market at 3:45 PM today. Be cautious in the area.",
      time: "2 hours ago",
      location: "Sector 15 Market",
      severity: "high",
      read: false
    },
    {
      id: 2,
      type: "safety",
      title: "Road Construction Alert",
      description: "Main road near Civil Lines will be closed for construction from 9 AM to 5 PM for the next 3 days.",
      time: "5 hours ago",
      location: "Civil Lines",
      severity: "medium",
      read: true
    },
    {
      id: 3,
      type: "emergency",
      title: "Medical Emergency",
      description: "Ambulance required near Railway Station. Please give way to emergency vehicles.",
      time: "1 day ago",
      location: "Railway Station",
      severity: "critical",
      read: true
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || alert.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleMarkAsRead = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? {...alert, read: true} : alert
    ));
    setSnackbarMessage("Alert marked as read");
    setSnackbarOpen(true);
  };

  const fetchNewAlerts = () => {
    setLoading(true);
    setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        type: "crime",
        title: "Suspicious Activity",
        description: "Suspicious person seen near the community park. Police have been notified.",
        time: "Just now",
        location: "Community Park",
        severity: "high",
        read: false
      };
      setAlerts([newAlert, ...alerts]);
      setLoading(false);
      setSnackbarMessage("New alerts fetched successfully");
      setSnackbarOpen(true);
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "critical": return "#d32f2f";
      case "high": return "#f57c00";
      case "medium": return "#1976d2";
      default: return "#689f38";
    }
  };

  return (
    <Box sx={{
      p: { xs: 2, md: 4 },
      maxWidth: 1000,
      mx: "auto",
      bgcolor: "#f8f9fa",
      minHeight: "100vh"
    }}>
      {/* Header Section */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4
      }}>
        <Typography variant="h3" component="h1" sx={{
          color: "#1565c0",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}>
          <NotificationsActive sx={{ fontSize: 40 }} /> Safety Alerts
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              color="primary"
            />
          }
          label={notificationsEnabled ? "Notifications ON" : "Notifications OFF"}
          labelPlacement="start"
        />
      </Box>

      {/* Description */}
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <AlertTitle>Stay Informed</AlertTitle>
        Get real-time safety alerts and notifications for your area to stay protected.
      </Alert>

      {/* Search and Filter */}
      <Paper elevation={3} sx={{
        p: 3,
        mb: 4,
        bgcolor: "white",
        borderRadius: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="All"
            color={filter === "all" ? "primary" : "default"}
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "filled" : "outlined"}
          />
          <Chip
            label="Crime"
            color={filter === "crime" ? "primary" : "default"}
            onClick={() => setFilter("crime")}
            variant={filter === "crime" ? "filled" : "outlined"}
            icon={<ReportProblem />}
          />
          <Chip
            label="Safety"
            color={filter === "safety" ? "primary" : "default"}
            onClick={() => setFilter("safety")}
            variant={filter === "safety" ? "filled" : "outlined"}
            icon={<Info />}
          />
          <Chip
            label="Emergency"
            color={filter === "emergency" ? "primary" : "default"}
            onClick={() => setFilter("emergency")}
            variant={filter === "emergency" ? "filled" : "outlined"}
            icon={<Warning color="warning" />}
          />
        </Box>
      </Paper>

      {/* Refresh Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <Notifications />}
          onClick={fetchNewAlerts}
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          {loading ? "Checking..." : "Check for New Alerts"}
        </Button>
      </Box>

      {/* Alerts List */}
      <Paper elevation={3} sx={{ bgcolor: "white", borderRadius: 2, overflow: "hidden" }}>
        <List>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <React.Fragment key={alert.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    p: 2,
                    borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
                    backgroundColor: alert.read ? "inherit" : "rgba(21, 101, 192, 0.05)",
                    '&:hover': { backgroundColor: "action.hover" }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    {alert.type === "crime" ? (
                      <ReportProblem color="error" />
                    ) : alert.type === "safety" ? (
                      <Info color="info" />
                    ) : (
                      <Warning color="warning" />
                    )}
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {alert.title}
                        </Typography>
                        <Chip
                          label={alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: getSeverityColor(alert.severity),
                            color: "white",
                            fontWeight: "bold"
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary" sx={{ display: "block", mb: 1 }}>
                          {alert.description}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="caption" color="text.secondary">
                            <LocationOn sx={{ fontSize: 14, verticalAlign: "middle", mr: 0.5 }} />
                            {alert.location} • {alert.time}
                          </Typography>

                          {!alert.read && (
                            <Button
                              size="small"
                              onClick={() => handleMarkAsRead(alert.id)}
                              startIcon={<CheckCircle sx={{ fontSize: 16 }} />}
                              sx={{ fontSize: 12 }}
                            >
                              Mark as read
                            </Button>
                          )}
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
              <Error sx={{ fontSize: 60, color: "action.disabled", mb: 2 }} />
              <Typography variant="h6">No alerts found</Typography>
              <Typography variant="body2">
                {searchTerm ? "No alerts match your search" : "No alerts in this category"}
              </Typography>
            </Box>
          )}
        </List>
      </Paper>

      {/* Safety Tips Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{
          color: "#1565c0",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2
        }}>
          <Info color="info" /> Safety Tips
        </Typography>

        <MuiGrid container spacing={2}>
          {[
            {
              title: "Home Safety",
              tips: [
                "Always lock doors and windows when leaving home",
                "Install security cameras at entry points",
                "Use timer lights when away for extended periods"
              ]
            },
            {
              title: "Street Safety",
              tips: [
                "Avoid walking alone at night in poorly lit areas",
                "Keep your phone and valuables secure",
                "Be aware of your surroundings"
              ]
            },
            {
              title: "Digital Safety",
              tips: [
                "Use strong, unique passwords for all accounts",
                "Enable two-factor authentication where possible",
                "Be cautious of phishing attempts and suspicious links"
              ]
            }
          ].map((category, index) => (
            <MuiGrid item xs={12} md={4} key={index}>
              <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}>
                  {category.title}
                </Typography>
                <List dense>
                  {category.tips.map((tip, tipIndex) => (
                    <ListItem key={tipIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 24, color: "#4caf50" }}>
                        <CheckCircle sx={{ fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </MuiGrid>
          ))}
        </MuiGrid>
      </Box>

      {/* Emergency Contacts */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{
          color: "#1565c0",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2
        }}>
          <Call color="error" /> Emergency Contacts
        </Typography>

        <MuiGrid container spacing={2}>
          {[
            { name: "Police", number: "100", icon: <LocalPolice color="primary" /> },
            { name: "Fire", number: "101", icon: <Warning color="error" /> },
            { name: "Ambulance", number: "102", icon: <NotificationsActive color="error" /> },
            { name: "Women Helpline", number: "1091", icon: <Info color="secondary" /> },
            { name: "Child Helpline", number: "1098", icon: <CheckCircle color="success" /> },
            { name: "Disaster Management", number: "108", icon: <Warning color="warning" /> }
          ].map((contact, index) => (
            <MuiGrid item xs={6} sm={4} md={2} key={index}>
              <Paper elevation={2} sx={{
                p: 2,
                textAlign: "center",
                height: "100%",
                backgroundColor: index % 2 === 0 ? "#f0f7ff" : "#fff8f0",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3
                }
              }}>
                {contact.icon}
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                  {contact.name}
                </Typography>
                <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>
                  <a href={`tel:${contact.number}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {contact.number}
                  </a>
                </Typography>
              </Paper>
            </MuiGrid>
          ))}
        </MuiGrid>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

export default SafetyAlerts;