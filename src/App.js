// src/App.js

import React, { useState } from "react";
import RouteOutput from "./components/RouteOutput";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import "./App.css"; // Import CSS for App component

const App = () => {
  const [links, setLinks] = useState(["", ""]); // Default two input fields for start and end locations
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const addLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index + 1, 0, ""); // Insert a new empty link after the specified index
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    if (links.length > 2) {
      // Ensure at least two links remain (start and end)
      const newLinks = links.filter((_, i) => i !== index);
      setLinks(newLinks);
    }
  };

  const handleChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting optimization

    const response = await fetch("http://localhost:5000/optimize_route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locations: links }),
    });

    const data = await response.json();

    // Set optimized route and Google Maps link to state
    setOptimizedRoute(data.optimized_route);
    setGoogleMapsLink(data.google_maps_link);
    setLoading(false); // Set loading to false when done
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Route Optimizer
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {links.map((link, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={link}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Insert ${
                index === 0 ? "starting" : "destination"
              } link`}
              InputProps={{
                style: { height: "56px" }, // Match height with buttons
              }}
            />
            {index > 0 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeLink(index)}
                style={{ marginLeft: "10px", height: "56px" }}
              >
                Remove
              </Button>
            )}
            {index < links.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => addLink(index)}
                style={{ marginLeft: "10px", height: "56px" }}
              >
                Add Destination
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ height: "56px" }}
        >
          Optimize Route
        </Button>
      </form>
      {/* Loading indicator */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
          <Typography variant="body1">Optimizing route...</Typography>
        </div>
      )}
      {/* Pass optimizedRoute and googleMapsLink to RouteOutput */}
      <RouteOutput
        optimizedRoute={optimizedRoute}
        googleMapsLink={googleMapsLink}
      />
    </Container>
  );
};

export default App;
