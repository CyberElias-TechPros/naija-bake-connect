
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Log error to analytics or error reporting service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-bakery-white-cream flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              
              <h1 className="text-2xl font-heading font-bold text-bakery-black mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-600 mb-6">
                We're sorry for the inconvenience. An unexpected error occurred while 
                processing your request. Our team has been notified and is working to fix it.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={this.handleRefresh}
                  className="w-full bg-bakery-pink hover:bg-bakery-pink-dark text-white"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full"
                >
                  <Home size={16} className="mr-2" />
                  Go to Homepage
                </Button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Technical Details (Development Only)
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-700 overflow-auto max-h-32">
                    <p className="font-semibold">Error:</p>
                    <p className="mb-2">{this.state.error.toString()}</p>
                    {this.state.errorInfo && (
                      <>
                        <p className="font-semibold">Component Stack:</p>
                        <p>{this.state.errorInfo.componentStack}</p>
                      </>
                    )}
                  </div>
                </details>
              )}
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Still having trouble? Contact us at{' '}
              <a 
                href="mailto:support@fortunecakes.ng" 
                className="text-bakery-pink hover:underline"
              >
                support@fortunecakes.ng
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
