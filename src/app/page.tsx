'use client'
import Image from 'next/image'
import Bookmarks from './components/bookmarks';
import bookmarkArray from './db/bookmarks';
import Pagination from './components/pagination';
import Circle from './components/circle';
import Message from './components/message';
import { SearchParams } from './typeAliases';
import { useState, useRef, useEffect } from 'react';
import deleteIcon from './assets/delete.png';
import './styles/style.css';

export default function Home(props: SearchParams) {

  const [items, setItems] = useState(bookmarkArray);

  //@ts-ignore
  const page = props.searchParams['page'] ?? '1';
  //@ts-ignore
  const per_page = props.searchParams['per_page'] ?? '20';
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const entries = items.slice(start, end);

  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [id, setId] = useState(1);
  const [invalidInput, setInvalidInput] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLButtonElement>(null);


  const handleUpdate = (id: number) => {
    const newList = items.map((item) => {
      if (item.id === id) {
        return { ...item, text: text, url: url };
      }
      return item;
    });
    setItems(newList);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate(id)

    const btn = document.querySelectorAll('.edit-button');

    btn.forEach(element => {
      const e = element as HTMLElement;
      e.style.pointerEvents = 'auto';
    });
  }

  const isEditing = (state: boolean) => {
  }

  const isValidUrl= (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  const handleAddItemForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.current?.checkValidity() && isValidUrl(url)) {
      event.preventDefault();
      setInvalidInput(false);
      setValidInput(true);
      let index = items.length;
      setItems([...items, { id: index + 1, text: text, url: url }])
      clearMessages();
    }
    else {
      event.preventDefault();
      setInvalidInput(true);
      setValidInput(false);
      clearMessages();
    }
  }


  const clearMessages = () => {
    setTimeout(() => {
      setInvalidInput(false);
      setValidInput(false);
      form.current && form.current.reset();
    }, 5000);
  }

  useEffect(() => {
    const editButton = document.querySelectorAll('.edit-button');

    items.map((item) => {
      const currentEditBtn = editButton[item.id - 1];
      if (currentEditBtn) {
        currentEditBtn.addEventListener('click', () => {
          setId(item.id);
          setText(item.text);
          setUrl(item.url);
        });
      }
    });

    editButton.forEach((nodeElement) => {
      nodeElement.addEventListener('click', () => {
        editButton.forEach((element) => {
          const btn = element as HTMLElement;
          btn.style.pointerEvents = 'none';
        })
      })
    });


  }, [items]);


  const dragBookmark = useRef<number>(0)
  const draggedOverBookmark = useRef<number>(0)

  function handleSort() {
    const bookmarkCopy = [...items];
    const temp = bookmarkCopy[dragBookmark.current];
    bookmarkCopy[dragBookmark.current] = bookmarkCopy[draggedOverBookmark.current];
    bookmarkCopy[draggedOverBookmark.current] = temp;
    setItems(bookmarkCopy);
  }

  return (
    <main >
      <h2>Bookmarks</h2>
      <form ref={form} className='add-bookmark-form' noValidate onSubmit={handleAddItemForm}
      >

        <input className="input-name-edit add-field"
          required
          defaultValue=''
          type="text"
          placeholder='bookmark name'
          onChange={
            (e) => {
              setText(e.currentTarget.value);
            }
          }
        />

        <input className='new-item-input-field add-field'
          defaultValue=''
          type='url'
          required
          placeholder='bookmark URL'
          onChange={e => setUrl(e.currentTarget.value)}
        />
        <input type="submit" name="Add item" id="" />
      </form>


      {invalidInput ? <Message color='#FF3131' text='Invalid Input!' /> : null}
      {validInput ? <Message color='#0BDA51' text='BookMark Added!' /> : null}

      <ul className='list-container'>
        <Circle x='-50px' y='-10px' />
        <Circle x='500px' y='1000px' />
        {entries.map((item,index) =>
        <div className='draggable' draggable key={item.id}
 
        onDragStart={() => (dragBookmark.current = index)}
          onDragEnter={() => (draggedOverBookmark.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        
        >

          <Bookmarks
            id={index}
            text={item.text}
            url={item.url}
            handleSubmit={handleSubmit}
            setText={setText}
            setUrl={setUrl}
            ref={inputRef}
            isEditing={isEditing}
          >

            <button className="bookmark-buttons" onClick={() => {
              setItems(
                items.filter(i =>
                  i.id !== item.id
                )
              );
            }}>
              <Image
                src={deleteIcon}
                width={32}
                height={32}
                alt="delete icon"
              />
            </button>

          </Bookmarks>
          </div>

        )}


        <Pagination hasNextPage={end < items.length}
          hasPreviousPage={start > 0} />
      </ul>

      <div className='add-item-container'>
      </div>


    </main>
  )
}
