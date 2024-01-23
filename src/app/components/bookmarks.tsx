import { Item } from "../typeAliases";
import Image from 'next/image'
import editIcon from '../assets/edit.png';
import Message from "./message";

import { useRef, useState, forwardRef } from "react";

const Bookmarks = forwardRef((props: Item, forwardRef: React.Ref<HTMLButtonElement>) => {

  const form = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const [editing, setIsEditing] = useState(false)
  const [invalidInput, setInvalidInput] = useState(false);

  const enableEdit = () => {
    const btn = document.querySelectorAll('.edit-button');

    btn.forEach(element => {
      const e = element as HTMLElement;
      e.style.pointerEvents = 'auto';
    });
  }

  const isValidUrl= (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (

    <div className="list-item-container">
      <li className="list-item" >
        <a className={`url-link-${editing ? 'hide' : 'show'}`} href={props.url} target="_blank">{props.text}</a>

        {editing ?
          <form ref={form} className='edit-bookmark-form' noValidate onSubmit={(e) => {
            if (form.current?.checkValidity() && isValidUrl(props.url)) {
              props.handleSubmit(e);
              setIsEditing(false);
              props.isEditing(false);
              setInvalidInput(false);
            }
            else {
              e.preventDefault();
              setInvalidInput(true);
            }
          }
          } >

            <div className="edit-fields-container">

              <div className="name-field-container">
                <label>Name</label>
                <input className="input-name"
                  defaultValue={props.text}
                  type="text"
                  onChange={
                    (e) => {
                      props.setText(e.currentTarget.value);
                    }
                  }
                />
              </div>

              <div className="url-field-container">
                <label>Url</label>
                <input ref={input}
                  defaultValue={props.url}
                  type="url"
                  pattern="https?://.+"
                  onChange={
                    (e) => props.setUrl(e.currentTarget.value)
                  }
                />
              </div>

            </div>

            <div >
              <input className='save-button' type="submit" value="Save" />
              <button className='cancel-button' onClick={() => {
                setIsEditing(false);
                props.isEditing(false);
                enableEdit();
              }}>
                Cancel
              </button>
            </div>

          </form>


          : null}

        <div>

          <button ref={forwardRef} className={'bookmark-buttons edit-button'} onClick={() => {
            setIsEditing(true);
            props.isEditing(true);
          }}>
            <Image
              src={editIcon}
              width={32}
              height={32}
              alt="edit icon"
            />
          </button>

          {props.children}
        </div>

      </li>
      {invalidInput ? <Message color="#FF3131" text='Invalid Input' /> : null}
    </div>
  )
})

export default Bookmarks;