import{ livelyPropertyListener1 } from "./main.js"
import{ livelyPropertyListener2 } from "./bg_interactive.js"


const livelyPropertyListener = (name, value) => {
  
    livelyPropertyListener1(name, value);
    livelyPropertyListener2(name, value);
    
  };
  

  window.livelyPropertyListener = livelyPropertyListener;