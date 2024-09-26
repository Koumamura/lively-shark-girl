// pre config to app
let styleChange = 2;
let colorBG = "#41a3d1";
let interactiveBG = true;

let listenerCalled = false;
const throttleDelay = 50; //miliseconds
let lastCall = 0;

const livelyPropertyListener = (name, value) => {
    switch (name) {
        case "colorBG":
            colorBG = value;
            updateBackground(); // Updates the background when the color is changed
            break;

        case "interactiveBG":
            interactiveBG = value;

            updateBackground(); 
            break;

        case "backgroundStyle":
            styleChange = value;
            updateBackground(); 
            break;

    }
};

if (typeof window.livelyPropertyListener == "undefined"  || listenerCalled == false) {
   
    updateBackground();
}


window.livelyPropertyListener = livelyPropertyListener;

if (interactiveBG){
    mouse_interactive();
}

function mouse_interactive() {
    document.addEventListener('mousemove', (event) => {
        const now = Date.now();
        if (now - lastCall >= throttleDelay) {
            lastCall = now;
            updateBackground(event);
        }
    });
  
}

function remove_mouse_interactive() {
    document.removeEventListener('mousemove', updateBackground);
    
}

function updateBackground(event) {
    
    if (interactiveBG) {
        // Updates the background based on the mouse position
        const mouseY = event ? event.clientY : window.innerHeight / 2; 
        const mouseX = event ? event.clientX : window.innerWidth / 2; 
        const percentageY = (mouseY / window.innerHeight) * 100;
        const percentageX = (mouseX / window.innerWidth) * 100;
        document.querySelector('.dynamicBackground').style.background = styleBG(percentageY, percentageX, styleChange);
        

    } else {
        // Updates the background based on the static background color
        startCBG(colorBG);
    }
    
}


function styleBG(percentageY, percentageX, chosen) {
    switch (chosen) {
        case 0:
            const purpleFactor = 1 + (percentageY / 100) * 0.8;
            return `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(${Math.min(80 * purpleFactor, 255)}, 0, ${Math.min(130 * purpleFactor, 255)}, 1) 0%, rgba(150, 0, 250, 1) 100%)`; // Roxo escuro e claro com radial
        
        case 1:
            const pinkFactor = 1 + (percentageX / 100) * 5;
            return `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(${Math.min(220* pinkFactor, 240)}, 80, 130, 1) 5%, rgba(160, 80, ${Math.min(240 * pinkFactor, 255)}, 1) 100%)`; // Rosa escuro e rosa mosqueta com radial
        
        case 2:
            const blueFactor = 1 + (percentageX / 40) * 0.8; 
            return `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(${Math.min(0 * blueFactor, 255)}, 120, 255, 1) 10%, rgba(0, ${Math.min(60 * blueFactor, 255)}, 220, 1) 100%)`; // Azul claro e escuro com radial
        
        case 3:
            const mixedFactor = 1 + (percentageY / 100) * 0.8; 
            return `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(${Math.min(180 * mixedFactor, 255)}, 140, 220, 1) 12%, rgba(${Math.min(120 * mixedFactor, 255)}, 100, ${Math.min(240 * mixedFactor, 255)}, 1) 100%)`; // Rosa mosqueta e roxo claro com radial
        
        default:
            return '';
    }
}




function startCBG(color) {
    const [r, g, b] = hexToRgb(color);
    document.querySelector('.dynamicBackground').style.background = `linear-gradient(to bottom, rgba(${r}, ${g}, ${b}, 0.8) 40%, rgba(${r}, ${g}, ${b}, 1) 120%)`;
}

function hexToRgb(hex) {
    let r = 0,
        g = 0,
        b = 0;
    if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 25);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 20);
    }
    return [r, g, b];
}

