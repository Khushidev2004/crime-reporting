import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  People,
  Security,
  ReportProblem,
  Group,
  Event,
  Sms,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";

function NeighborhoodWatch() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleJoinClick = () => {
    alert("Thank you for your interest! You've been added to the neighborhood watch group.");
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 6 },
        maxWidth: 900,
        mx: "auto",
        mt: 5,
        bgcolor: theme.palette.mode === "dark" ? "#0f172a" : "#eef6fb",
        borderRadius: 4,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 18px 50px rgba(21, 101, 192, 0.2)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#1565c0",
            margin: "0 auto",
            mb: 2,
            boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
          }}
        >
          <Group fontSize="large" />
        </Avatar>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.mode === "dark" ? "#9fcfff" : "#1565c0",
            letterSpacing: "-0.5px",
          }}
        >
          Neighborhood Watch
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.15rem",
            color: theme.palette.mode === "dark" ? "#cbd5e1" : "#333",
            maxWidth: "700px",
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          Build stronger bonds with your neighbors and work together to keep your community safe.
          Stay alert, stay connected, and help prevent crime before it happens.
        </Typography>
      </Box>

      {/* Feature Cards in List */}
      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: theme.palette.mode === "dark" ? "#1e293b" : "white",
          border: `1px solid ${theme.palette.mode === "dark" ? "#334155" : "#e0e7ff"}`,
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
      >
        <List disablePadding>
          {[
            {
              icon: <People color="primary" />,
              primary: "Community Meetings",
              secondary: "Regular gatherings with neighbors and local police to discuss safety updates and concerns.",
            },
            {
              icon: <Security color="secondary" />,
              primary: "Safety Patrols",
              secondary: "Volunteer-led patrols that deter suspicious behavior and increase visibility.",
            },
            {
              icon: <ReportProblem color="error" />,
              primary: "Suspicious Activity Reporting",
              secondary: "Quick reporting system for any unusual or concerning incidents in your area.",
            },
            {
              icon: <LocationOn color="action" />,
              primary: "Local Alerts",
              secondary: "Real-time notifications about safety issues specific to your neighborhood.",
            },
            {
              icon: <Group color="primary" />,
              primary: "Neighborhood Social Network",
              secondary: "Private online groups to share alerts, events, and build trust with neighbors.",
            },
            {
              icon: <Event color="secondary" />,
              primary: "Safety Workshops",
              secondary: "Free training sessions on self-defense, emergency preparedness, and home security.",
            },
            {
              icon: <Sms color="primary" />,
              primary: "Instant Messaging Alerts",
              secondary: "SMS or app-based instant alerts from coordinators during emergencies.",
            },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 2.5,
                  px: 3,
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#2d3748" : "#f0f8ff",
                    transition: "background-color 0.2s",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 50,
                    fontSize: 36,
                    animation: "fadeInUp 0.6s ease-out",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.mode === "dark" ? "#f1f5f9" : "#1e293b",
                      }}
                    >
                      {item.primary}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        color: theme.palette.mode === "dark" ? "#cbd5e1" : "#475569",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.secondary}
                    </Typography>
                  }
                />
              </ListItem>
              {index < 6 && <Divider component="li" sx={{ mx: 3 }} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* CTA Section */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          textAlign: "center",
          borderRadius: 3,
          bgcolor: theme.palette.mode === "dark" ? "#334155" : "#e3f2fd",
          border: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#bbdefb"}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.mode === "dark" ? "#f8fafc" : "#0d47a1",
            fontWeight: 600,
          }}
        >
          Ready to Join Your Community?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.mode === "dark" ? "#e2e8f0" : "#475569",
            mb: 2,
          }}
        >
          Become a part of the movement to make your neighborhood safer and more connected.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={handleJoinClick}
          size="large"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.2,
            borderRadius: 50,
            boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 16px rgba(21,101,192,0.4)",
            },
          }}
        >
          Join Now
        </Button>
      </Box>

      {/* Footer Note */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 3,
          textAlign: "center",
          color: theme.palette.mode === "dark" ? "#64748b" : "#607d8b",
        }}
      >
        Together, we can build a safer, stronger, and more connected community.
      </Typography>

      {/* Optional Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}

export default NeighborhoodWatch;
