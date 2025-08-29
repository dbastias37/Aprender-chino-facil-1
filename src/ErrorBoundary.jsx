import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, err:null } }
  static getDerivedStateFromError(err){ return { hasError:true, err } }
  componentDidCatch(err, info){ console.error('[ErrorBoundary]', err, info) }
  render(){
    if(this.state.hasError){
      return (
        <div style={{padding:24,fontFamily:'ui-sans-serif'}}>
          <h2>Uy… algo se rompió 😅</h2>
          <pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.err)}</pre>
          <button onClick={()=>location.reload()}>Recargar</button>
        </div>
      )
    }
    return this.props.children
  }
}
