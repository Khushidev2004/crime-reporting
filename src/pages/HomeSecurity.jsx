import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MdSecurity, MdLock, MdVideoCameraFront, MdLight, MdNotifications, MdPhone } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";

function HomeSecurity() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEmergencyContact = () => {
    // You can replace this with actual phone call or redirect
    alert("Contacting local police station...");
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: isMobile ? 3 : 5,
        mt: 4,
        bgcolor: theme.palette.mode === "dark" ? "#1a202c" : "#f7fafd",
        borderRadius: 4,
        boxShadow: "0 10px 32px rgba(30,64,175,0.15)",
        border: `1px solid ${theme.palette.mode === "dark" ? "#334155" : "#e0e7ff"}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 15px 40px rgba(30,64,175,0.20)",
        },
      }}
    >
      {/* Title with Icon */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <MdSecurity
          style={{
            fontSize: isMobile ? 48 : 64,
            color: "#1565c0",
            marginRight: 12,
            animation: "pulse 2s infinite",
          }}
        />
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            fontWeight: 700,
            color: theme.palette.mode === "dark" ? "#9fcfff" : "#1565c0",
          }}
        >
          Home Security
        </Typography>
      </Box>

      {/* Intro Description */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          color: theme.palette.mode === "dark" ? "#cbd5e1" : "#455A64",
          mb: 3,
          lineHeight: 1.7,
        }}
      >
        Protecting your home and loved ones starts with simple, smart habits. Here are essential tips to keep your house safe from intrusions and emergencies.
      </Typography>

      {/* Security Tips List */}
      <List sx={{ mb: 3 }}>
        {[
          { text: "Always lock doors and windows, even for short periods.", icon: <MdLock /> },
          { text: "Install smart security cameras at entry points.", icon: <MdVideoCameraFront /> },
          { text: "Use motion-sensor lights around the perimeter.", icon: <MdLight /> },
          { text: "Enable smart alarms and mobile notifications.", icon: <MdNotifications /> },
          { text: "Don't share your home security codes publicly.", icon: <MdSecurity /> },
        ].map((item, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ color: "#1565c0" }}>
              {React.cloneElement(item.icon, { style: { fontSize: 24 } })}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                sx: {
                  fontSize: "1rem",
                  color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Call to Action: Emergency Contact */}
      <Box
        sx={{
          mt: 3,
          p: 3,
          bgcolor: theme.palette.mode === "dark" ? "#2d3748" : "#ebf4ff",
          borderRadius: 3,
          textAlign: "center",
          border: `1px dashed ${theme.palette.mode === "dark" ? "#64748b" : "#9fa8da"}`,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            color: theme.palette.mode === "dark" ? "#d0e0ff" : "#283593",
            mb: 2,
          }}
        >
          <FaRegHandshake style={{ fontSize: 20 }} /> Want a free home safety audit?
        </Typography>
        <Button
          variant="contained"
          startIcon={<MdPhone />}
          onClick={handleEmergencyContact}
          sx={{
            bgcolor: "#1565c0",
            "&:hover": { bgcolor: "#0d47a1", transform: "scale(1.05)" },
            transition: "all 0.2s",
            px: 3,
          }}
        >
          Contact Police Station
        </Button>
      </Box>

      {/* Footer Note */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 3,
          color: theme.palette.mode === "dark" ? "#718096" : "#78909c",
          textAlign: "center",
        }}
      >
        Stay alert. Stay safe. Your safety is in your hands.
      </Typography>

      {/* Optional: Add pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}

export default HomeSecurity;