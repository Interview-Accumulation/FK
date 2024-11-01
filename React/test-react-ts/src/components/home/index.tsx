import React, {useEffect, useLayoutEffect, useState} from 'react'

function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com', content: 'hello' },
  { id: 1, name: 'Alice', email: 'alice@mail.com', content: 'world' },
  { id: 2, name: 'Bob', email: 'bob@mail.com', content: 'foo' }
];

function Chat({ contact, changeContent, content }) {
  console.log('content', content)
  const [text, setText] = useState(content || '');
  const valueChange = (value) => {
    setText(value)
    changeContent(value)
  }
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'跟 ' + contact.name + ' 聊一聊'}
        onChange={e => valueChange(e.target.value)}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
  );
}


export default function Index() {
  const [to, setTo] = useState(contacts[0]);
  const [content, setContent] = useState('')
  const [contents, setContents] = useState(['', '', ''])
  const changeSelect = (contact) => {
    setTo(contact)
    console.log(contacts[contact.id].content, contact)
    setContent(contacts[contact.id].content)
  }
  const changeContent = (text) => {
    contacts[to.id].content = text
    console.log(text, to.id, contacts)
  }
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => changeSelect(contact)}
      />
      <Chat key={to.id} contact={to} content={content} changeContent={changeContent} />
  </div>
  )
}
