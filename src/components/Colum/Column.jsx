import React, { useEffect, useState, useRef } from 'react'

import { Container, Draggable } from 'react-smooth-dnd';
import Card from '../Card/Card'
import ConfirmModal from '../Common/ConfirmModal'

import { mapOder } from '../../ultilities/sorts'
import { MODAL_ACTION_CONFIRM } from '../../ultilities/constants';
import { saveContentAfterPressEnter, selectAllInLineText } from '../../ultilities/contentEditable';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { cloneDeep } from 'lodash'

import './Column.scss'

function Column(props) {
  const { column, onCardDrop, onUpdateColumnn } = props
  const cards = mapOder(column.cards, column.cardOder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }

  const newCardTextareaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [openNewCardForm])

  const onConformModalAction = (type) => {
    console.log(type)
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumnn = {
        ...column,
        _destroy: true,
      }
      onUpdateColumnn(newColumnn)
    }
    toggleShowConfirmModal()
  }



  const handleColumnTitleBlur = () => {
    console.log(columnTitle)
    const newColumnn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumnn(newColumnn)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }
    // console.log(column)  
    let newColumnn = cloneDeep(column)
    newColumnn.cards.push(newCardToAdd)
    newColumnn.cardOder.push(newCardToAdd.id)

    onUpdateColumnn(newColumnn)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  return (
    <div className="columns">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={handleColumnChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInLineText}
            onMouseDown={e => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-action">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item >Add Card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal} >Remove Columnn...</Dropdown.Item>
              <Dropdown.Item >Move All Cards...</Dropdown.Item>
              <Dropdown.Item >Archive All Cards...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          orientation="vertical"
          groupName='app-columns'
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
        title="Remove columnn"
        content={`Are you sure to remove <strong>${column.title}</strong>. <br />`}
      />
    </div>

  )
}
export default Column