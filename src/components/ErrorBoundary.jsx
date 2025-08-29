import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, err:null }; }
  static getDerivedStateFromError(err){ return { hasError:true, err }; }
  componentDidCatch(err, info){ console.error('ErrorBoundary', err, info); }
  render(){
    if(this.state.hasError){
      return (
        <div className="p-6 m-6 rounded-2xl bg-red-50 border border-red-200 text-red-800">
          <h2 className="text-xl font-bold mb-2">Se produjo un error</h2>
          <pre className="text-xs whitespace-pre-wrap">{String(this.state.err?.message || this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
