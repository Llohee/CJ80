import React, { useEffect, useState, useRef } from 'react'

import { Container, Draggable } from 'react-smooth-dnd';
import Card from '../Card/Card'
import ConfirmModal from '../Common/ConfirmModal'

import { mapOder } from '../../ultilities/sorts'
import { MODAL_ACTION_CONFIRM } from '../../ultilities/constants';
import { saveContentAfterPressEnter, selectAllInLineText } from '../../ultilities/contentEditable';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { cloneDeep } from 'lodash'

import './Colum.scss'

function Colum(props) {
  const { colum, onCardDrop, onUpdateColumn } = props
  const cards = mapOder(colum.cards, colum.cardOder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columTitle, setColumTitle] = useState('')
  const handleColumChange = (e) => setColumTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }

  const newCardTextareaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumTitle(colum.title)
  }, [colum.title])

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [openNewCardForm])

  const onConformModalAction = (type) => {
    console.log(type)
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...colum,
        _destroy: true,
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }



  const handleColumTitleBlur = () => {
    console.log(columTitle)
    const newColumn = {
      ...colum,
      title: columTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: colum.boardId,
      columId: colum.id,
      title: newCardTitle.trim(),
      cover: null
    }
    // console.log(colum)  
    let newColumn = cloneDeep(colum)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOder.push(newCardToAdd.id)

    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  return (
    <div className="colums">
      <header className="colum-drag-handle">
        <div className="colum-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columTitle}
            onChange={handleColumChange}
            onBlur={handleColumTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInLineText}
            onMouseDown={e => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="colum-dropdown-action">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item >Add Card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal} >Remove Column...</Dropdown.Item>
              <Dropdown.Item >Move All Cards...</Dropdown.Item>
              <Dropdown.Item >Archive All Cards...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          orientation="vertical"
          groupName='app-colums'
          onDrop={dropResult => onCardDrop(colum.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >

          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card..."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
          </div>
        }
      </div>



      <footer>
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Button variant="success" size="sm" onClick={addNewCard} >Add card</Button>
            <span className="cacel-icon" onClick={toggleOpenNewCardForm} >
              <i className="fa fa-trash icon" />
            </span>
          </div>
        }

        {!openNewCardForm &&
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            < i className="fa fa-plus icon" /> Add Card
          </div>
        }
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConformModalAction}
        title="Remove column"
        content={`Are you sure to remove <strong>${colum.title}</strong>. <br />`}
      />
    </div>

  )
}
export default Colum