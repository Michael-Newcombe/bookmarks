import {MessageSettings} from "../typeAliases";

const Message=(props: MessageSettings)=>{
  return(
    <div >
      <p className="message" style={{color: props.color}}>{props.text}</p>
    </div>
  )
}

export default Message;