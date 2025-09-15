import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }
  componentDidCatch(error, info) {
    console.error("UI Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding:24 }}>
          <h2>Algo salió mal</h2>
          <p style={{ color:"#666" }}>Intenta recargar la página o volver al inicio.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
