import React, { useState } from "react";


import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  ExpandMore,
  Search,
  Gavel,
  Shield,
  LocalPolice,
  Balance,
  Phone,
  Email,
  LocationOn
} from "@mui/icons-material";

const LegalResources = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample data - in a real app, this would come from an API
  const legalResources = [
    {
      id: 1,
      title: "Crime Reporting Guide",
      description: "Step-by-step guide on how to report different types of crimes in India",
      category: "reporting",
      icon: <LocalPolice color="primary" />,
      link: "#"
    },
    {
      id: 2,
      title: "Victim Rights",
      description: "Understand your rights as a crime victim under Indian law",
      category: "rights",
      icon: <Shield color="secondary" />,
      link: "#"
    },
    {
      id: 3,
      title: "Legal Aid Services",
      description: "Free and low-cost legal assistance programs across India",
      category: "aid",
      icon: <Balance color="success" />,
      link: "#"
    },
    {
      id: 4,
      title: "Cyber Crime Helpline",
      description: "24/7 helpline for reporting cyber crimes and fraud",
      category: "reporting",
      icon: <Phone color="error" />,
      link: "tel:1930"
    },
    {
      id: 5,
      title: "Women Safety Laws",
      description: "Comprehensive guide to laws protecting women in India",
      category: "rights",
      icon: <Shield color="secondary" />,
      link: "#"
    },
    {
      id: 6,
      title: "Child Protection",
      description: "Resources for reporting child abuse and exploitation",
      category: "reporting",
      icon: <LocalPolice color="primary" />,
      link: "#"
    }
  ];

  const emergencyContacts = [
    { name: "Police", number: "100", icon: <LocalPolice /> },
    { name: "Women Helpline", number: "1091", icon: <Shield /> },
    { name: "Child Helpline", number: "1098", icon: <Shield /> },
    { name: "Ambulance", number: "102", icon: <LocationOn /> },
    { name: "Disaster Management", number: "108", icon: <Phone /> }
  ];

  const faqs = [
    {
      question: "How do I report a crime anonymously?",
      answer: "You can report crimes anonymously through the National Crime Reporting Portal or by calling the police helpline. Your identity will be protected under the Whistleblower Protection Act."
    },
    {
      question: "What are my rights if I'm arrested?",
      answer: "Under Article 22 of the Indian Constitution, you have the right to be informed of the grounds of arrest, consult a lawyer, and be produced before a magistrate within 24 hours."
    },
    {
      question: "How long does a police investigation take?",
      answer: "The time varies by case complexity. Simple cases may take a few weeks, while complex cases can take months. You can follow up with the investigating officer for updates."
    }
  ];

  const filteredResources = legalResources.filter(resource =>
    (activeCategory === "all" || resource.category === activeCategory) &&
    (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        p: 4,
        borderRadius: 2,
        mb: 4,
        textAlign: 'center'
      }}>
        <Gavel sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Legal Resources & Support
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto' }}>
          Access comprehensive legal information, report crimes, and find support services.
          Your safety and rights are our priority.
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search legal resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="All"
            color={activeCategory === "all" ? "primary" : "default"}
            onClick={() => setActiveCategory("all")}
          />
          <Chip
            label="Reporting"
            color={activeCategory === "reporting" ? "primary" : "default"}
            onClick={() => setActiveCategory("reporting")}
          />
          <Chip
            label="Rights"
            color={activeCategory === "rights" ? "primary" : "default"}
            onClick={() => setActiveCategory("rights")}
          />
          <Chip
            label="Legal Aid"
            color={activeCategory === "aid" ? "primary" : "default"}
            onClick={() => setActiveCategory("aid")}
          />
        </Box>
      </Box>

      {/* Emergency Contacts */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone color="error" /> Emergency Contacts
        </Typography>
        <Grid container spacing={2}>
          {emergencyContacts.map((contact, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card sx={{ textAlign: 'center', py: 2 }}>
                <CardContent>
                  {React.cloneElement(contact.icon, { sx: { fontSize: 40, mb: 1, color: 'primary.main' } })}
                  <Typography variant="subtitle1">{contact.name}</Typography>
                  <Typography variant="h6" color="error">
                    <a href={`tel:${contact.number}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {contact.number}
                    </a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Resources Grid */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Legal Resources
      </Typography>
      <Grid container spacing={3}>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {React.cloneElement(resource.icon, { sx: { fontSize: 40, mr: 2 } })}
                    <Typography variant="h6" component="h3">
                      {resource.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    href={resource.link}
                    endIcon={<ExpandMore />}
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No resources found matching your search criteria.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* FAQ Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Gavel /> Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Call to Action */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
        mt: 4
      }}>
        <Typography variant="h5" gutterBottom>
          Need Immediate Help?
        </Typography>
        <Typography variant="body1" paragraph>
          If you're in danger or need urgent assistance, please call the emergency numbers above
          or visit your nearest police station.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="error"
          startIcon={<Phone />}
          href="tel:100"
          sx={{ mt: 2 }}
        >
          Call Police Now
        </Button>
      </Box>
    </Box>
  );
};

export default LegalResources;