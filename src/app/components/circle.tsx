import {CirclePos} from "../typeAliases";

const Circle=(props: CirclePos)=>{
  return(
    <div className='circle' style={{top: props.y,left: props.x}}></div>
  )
}

export default Circle;