// ErrorBoundary.tsx

import React, { Component, ReactNode } from 'react';

// Define the props interface for ErrorBoundary
interface ErrorBoundaryProps {
    children: ReactNode; // ReactNode allows for any valid React child (elements, strings, etc.)
}

// Define the state interface for ErrorBoundary
interface ErrorBoundaryState {
    hasError: boolean; // Boolean to indicate whether an error has been caught
    error?: Error;
}

// Create a class component ErrorBoundary that extends React.Component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        // Initialize the state with hasError set to false
        this.state = { hasError: false };
    }

    // Static method to update state when an error is thrown in a child component
    static getDerivedStateFromError(error: Error) {
        // Update state to show the fallback UI on next render
        console.error('Error caught by ErrorBoundary:', error);
        return { hasError: true, error: error };
    }

    // Lifecycle method to handle side effects when an error is caught
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log the error and error info for debugging or reporting
        console.error('Uncaught error:', error, errorInfo);
    }

    // Render method to display either the fallback UI or the children components
    render() {
        if (this.state.hasError) {
            // Render fallback UI if an error has been caught
            return <h1>Something went wrong.</h1>;
        }

        // Otherwise, render the children components passed to ErrorBoundary
        return this.props.children;
    }
}

export default ErrorBoundary;
