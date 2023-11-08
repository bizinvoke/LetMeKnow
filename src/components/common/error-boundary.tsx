import type { ErrorInfo } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children?: JSX.Element;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.group();
    console.log('ErrorBoundary catch a error:');
    console.info('error', error);
    console.info('error info', errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <img
            src={require('/public/svg/error.svg')}
            alt="システムエラーが発生しました"
          />
          <p
            style={{
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 700,
              marginTop: '12px',
              lineHeight: 1,
            }}
          >
            <div>インタネットに</div>
            <div>接続されていません</div>
          </p>
          <p
            style={{
              textAlign: 'center',
              fontSize: '14px',
              marginTop: '12px',
              marginBottom: '32px',
              lineHeight: 1.2,
              color: '#7a7a89',
            }}
          >
            <div>ネット回線の接続状況をご確認ください</div>
            <div>回復後、再試行お願いします</div>
          </p>
          <div
            style={{
              width: '241px',
              height: '40px',
              boxShadow: '0px 2px 4px #7F63C04B',
              borderRadius: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#977fe7',
              color: 'white',
            }}
            onClick={() => location.reload()}
          >
            再試行
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
