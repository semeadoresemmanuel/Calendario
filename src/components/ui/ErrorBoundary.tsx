import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#121212] text-white select-none">
          <h2 className="text-xl font-bold text-red-500 mb-2">Ops! Ocorreu um erro inesperado.</h2>
          <p className="text-sm text-zinc-400 mb-6 max-w-md">
            {this.state.error?.message || 'Erro ao processar visualização.'}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#00cc00] text-black font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer text-sm uppercase tracking-wider"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
