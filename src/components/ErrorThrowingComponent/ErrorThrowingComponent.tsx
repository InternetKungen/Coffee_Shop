// ErrorThrowingComponent.tsx

import React from 'react';

// Function for creating an error to check if ErrorBoundary works
const ErrorThrowingComponent: React.FC = () => {
    // Throw an error when this component is rendered
    throw new Error('This is a test error');
};

export default ErrorThrowingComponent;
