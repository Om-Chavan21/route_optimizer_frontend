// src/theme.js
import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
  },
  fonts: {
    primary: "Roboto, sans-serif",
  },
  spacing: {
    sm: "12px",
    md: "16px",
    lg: "24px",
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    margin: 0;
    padding: 0;
  }
`;
