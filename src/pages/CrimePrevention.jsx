import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  useTheme,
  useMediaQuery,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  Security,
  Gavel,
  EmojiPeople,
  Lightbulb,
  Shield,
  Report,
  ArrowForward,
} from "@mui/icons-material";

function CrimePrevention() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tips = [
    {
      icon: <Lightbulb />,
      title: "Stay Alert",
      description: "Be aware of your surroundings, especially at night. Avoid distractions like phones in high-risk areas.",
      color: "warning",
    },
    {
      icon: <Shield />,
      title: "Secure Your Home",
      description: "Use deadbolts, security cameras, and motion-sensor lights to deter intruders.",
      color: "primary",
    },
    {
      icon: <EmojiPeople />,
      title: "Know Your Neighbors",
      description: "Strong community ties help in spotting and reporting suspicious behavior quickly.",
      color: "info",
    },
    {
      icon: <Gavel />,
      title: "Know Your Rights",
      description: "Understand local laws and how to interact with law enforcement during emergencies.",
      color: "success",
    },
    {
      icon: <Security />,
      title: "Use Technology",
      description: "Install smart locks, alarms, and mobile apps that alert authorities automatically.",
      color: "secondary",
    },
    {
      icon: <Report />,
      title: "Report Suspicious Activity",
      description: "Never hesitate to call local authorities if something feels wrong. It could prevent a crime.",
      color: "error",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4 },
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        bgcolor: theme.palette.mode === "dark" ? "#0f172a" : "#f8fafc",
        borderRadius: 4,
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#1565c0",
            margin: "0 auto",
            mb: 3,
            boxShadow: "0 8px 16px rgba(21,101,192,0.3)",
          }}
        >
          <Security fontSize="large" />
        </Avatar>
        <Typography
          variant={isMobile ? "h4" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #818cf8, #60a5fa)"
              : "linear-gradient(90deg, #1565c0, #0d47a1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.8px",
          }}
        >
          Crime Prevention Tips
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.mode === "dark" ? "#cbd5e1" : "#475569",
            maxWidth: "700px",
            mx: "auto",
            px: 2,
            lineHeight: 1.7,
          }}
        >
          Small actions can make a big difference. Stay informed, stay prepared, and help keep your community safe.
        </Typography>
      </Box>

      {/* Tips Grid */}
      <Grid container spacing={4}>
        {tips.map((tip, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 14px 28px rgba(21,101,192,0.18)",
                },
                bgcolor: theme.palette.mode === "dark" ? "#1e293b" : "white",
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flex: 1, pb: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: `${tip.color}.light`,
                      color: `${tip.color}.main`,
                      mb: 2,
                    }}
                  >
                    {tip.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: theme.palette.mode === "dark" ? "#f1f5f9" : "#1e293b",
                    }}
                  >
                    {tip.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#cbd5e1" : "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    {tip.description}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 3, pb: 3 }}>
                  <Chip
                    icon={<ArrowForward fontSize="small" />}
                    label="Learn More"
                    size="small"
                    color={tip.color}
                    sx={{ textTransform: "none" }}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA Section */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: theme.palette.mode === "dark" ? "#334155" : "#e3f2fd",
          border: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#90caf9"}`,
          mx: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: theme.palette.mode === "dark" ? "#f8fafc" : "#0d47a1",
            mb: 2,
          }}
        >
          Ready to Take Action?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.mode === "dark" ? "#e2e8f0" : "#475569",
            mb: 3,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Join a local crime prevention program or download a safety app today to stay protected and informed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForward />}
          href="https://www.example.com/safety-resources"
          target="_blank"
          sx={{
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 50,
            boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 16px rgba(21,101,192,0.4)",
            },
          }}
        >
          Get Free Safety Guide
        </Button>
      </Box>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 5,
          textAlign: "center",
          color: theme.palette.mode === "dark" ? "#64748b" : "#607d8b",
        }}
      >
        Together, we can prevent crime and build safer neighborhoods for everyone.
      </Typography>
    </Box>
  );
}

export default CrimePrevention;