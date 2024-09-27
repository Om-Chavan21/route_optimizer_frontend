// src/components/RouteOutput.js

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const RouteOutput = ({ optimizedRoute, googleMapsLink }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {optimizedRoute.length > 0 && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Optimized Route:</Typography>
            <ul style={{ paddingLeft: "20px" }}>
              {optimizedRoute.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
            {googleMapsLink && (
              <Button
                variant="contained"
                color="primary"
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "10px" }}
              >
                View Route on Google Maps
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RouteOutput;
