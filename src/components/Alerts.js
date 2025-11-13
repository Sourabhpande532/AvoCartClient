import React, { useEffect } from 'react';

export default function Alerts({ alert = [], onClear }){
  useEffect(()=>{
    if(alert.length){
      const t = setTimeout(()=> onClear && onClear(), 3000);
      return ()=> clearTimeout(t);
    }
  }, [alert, onClear]);

  if(!alert || alert.length===0) return null;
  return (
    <div style={{ position: 'fixed', top: 70, right: 20, zIndex: 1050 }}>
      {alert.map((a,i)=>(
        <div key={i} className={`alert alert-${a.type==='error'?'danger': (a.type||'info')}`} role="alert" style={{minWidth:300}}>
          {a.text}
        </div>
      ))}
    </div>
  );
}