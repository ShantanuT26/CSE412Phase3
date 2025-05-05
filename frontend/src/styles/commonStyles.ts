import { CSSProperties } from 'react';

// Common styles for consistent UI across all pages
export const commonStyles = {
  // Font styles
  fonts: {
    heading: {
      fontFamily: "sans-serif",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#1a202c"
    },
    subheading: {
      fontFamily: "sans-serif",
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#2d3748"
    },
    button: {
      fontFamily: "sans-serif",
      fontWeight: 700,
      fontSize: "1.125rem",
      color: "#1a202c"
    },
    body: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      color: "#4a5568"
    },
    label: {
      fontFamily: "sans-serif",
      fontWeight: 600,
      fontSize: "0.875rem",
      color: "#4a5568"
    }
  },
  
  // Colors
  colors: {
    background: "#ffffff",
    card: "#ffffff",
    primary: "#1a202c",
    secondary: "#4a5568",
    accent: "#3182ce",
    border: "#e2e8f0",
    success: "#48bb78",
    warning: "#ed8936",
    danger: "#f56565",
    info: "#4299e1"
  },
  
  // Animations (for Framer Motion)
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    }
  },
  
  // Common component styles
  components: {
    // Button styles
    button: {
      primary: {
        backgroundColor: "#ffffff",
        color: "#1a202c",
        border: "1px solid #e2e8f0",
        borderRadius: "9999px",
        padding: "0.75rem 1.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease",
        fontWeight: 700
      },
      secondary: {
        backgroundColor: "#f7fafc",
        color: "#4a5568",
        border: "1px solid #e2e8f0",
        borderRadius: "9999px",
        padding: "0.75rem 1.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        fontWeight: 600
      },
      home: {
        backgroundColor: "#ffffff",
        color: "#1a202c",
        border: "1px solid #e2e8f0",
        borderRadius: "9999px",
        padding: "0.5rem 1.25rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        fontWeight: 600,
        fontSize: "0.875rem"
      }
    },
    
    // Card styles
    card: {
      container: {
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0",
        padding: "1.5rem"
      },
      header: {
        marginBottom: "1.25rem"
      },
      body: {
        marginBottom: "1rem"
      },
      footer: {
        marginTop: "1.25rem",
        display: "flex",
        justifyContent: "flex-end"
      }
    },
    
    // Table styles
    table: {
      container: {
        width: "100%",
        borderCollapse: "separate" as const,
        borderSpacing: "0"
      },
      header: {
        backgroundColor: "#f7fafc",
        fontWeight: 600,
        color: "#4a5568",
        textTransform: "uppercase" as const,
        fontSize: "0.75rem",
        letterSpacing: "0.05em"
      },
      headerCell: {
        padding: "0.75rem 1rem",
        textAlign: "left" as const,
        borderBottom: "1px solid #e2e8f0"
      },
      row: {
        borderBottom: "1px solid #e2e8f0",
        transition: "background-color 0.2s ease"
      },
      rowHover: {
        backgroundColor: "#f7fafc"
      },
      cell: {
        padding: "1rem",
        color: "#4a5568"
      }
    },
    
    // Form styles
    form: {
      group: {
        marginBottom: "1.25rem"
      },
      label: {
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: 600,
        color: "#4a5568",
        fontSize: "0.875rem"
      },
      input: {
        width: "100%",
        padding: "0.625rem 0.75rem",
        borderRadius: "0.375rem",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        color: "#4a5568",
        transition: "border-color 0.2s ease",
        outline: "none"
      },
      inputFocus: {
        borderColor: "#4299e1",
        boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.15)"
      }
    },
    
    // Status badge styles
    badge: {
      base: {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontWeight: 600,
        fontSize: "0.75rem",
        display: "inline-block"
      },
      success: {
        backgroundColor: "#c6f6d5",
        color: "#22543d",
        border: "1px solid #9ae6b4"
      },
      warning: {
        backgroundColor: "#feebc8",
        color: "#7b341e",
        border: "1px solid #fbd38d"
      },
      danger: {
        backgroundColor: "#fed7d7",
        color: "#822727",
        border: "1px solid #feb2b2"
      },
      info: {
        backgroundColor: "#bee3f8",
        color: "#2a4365",
        border: "1px solid #90cdf4"
      },
      neutral: {
        backgroundColor: "#e2e8f0",
        color: "#4a5568",
        border: "1px solid #cbd5e0"
      }
    }
  },
  
  // Layout styles
  layout: {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "1.5rem"
    },
    pageContainer: {
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      padding: "1.5rem"
    },
    header: {
      marginBottom: "2rem"
    },
    section: {
      marginBottom: "2.5rem"
    }
  }
};
