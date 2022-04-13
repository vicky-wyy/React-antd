import screenfull from "screenfull";

function fullToggle(){
  if(screenfull.isEnabled){
    screenfull.toggle()
  }
}
export default fullToggle