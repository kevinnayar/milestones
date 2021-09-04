import * as React from 'react';
import { PureComponent, ErrorInfo } from 'react';
import { Alert } from '../Alert/Alert';
import { formatError } from '../../../shared/utils/baseUtils';

type ComponentProps = {
  children?: any;
};

type ComponentState = {
  error: void | Error;
};

export class ErrorBoundary extends PureComponent<ComponentProps, ComponentState> {
  state: ComponentState = {
    error: undefined,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error });
    console.error(errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <Alert severity="error">
          <p>{formatError(this.state.error)}</p>
        </Alert>
      );
    }

    return this.props.children;
  }
}
