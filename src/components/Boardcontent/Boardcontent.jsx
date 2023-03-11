import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import Colum from '../Colum/Colum'
import { mapOder } from '../../ultilities/sorts'
import { applyDrag } from '../../ultilities/dragDrop';

import { initialData } from '../../actions/initialData'


import './Boardcontent.scss'


function Boardcontent() {
  const [board, setBoard] = useState({})
  const [colums, setColums] = useState([])
  const [openNewColumForm, setOpenNewColumForm] = useState(false)

  const newColumInputRef = useRef(null)
  const [newColumTitle, setNewColumTitle] = useState('')
  const onNewColumTitleChange = useCallback((e) => setNewColumTitle(e.target.value), [])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColums(mapOder(boardFromDB.colums, boardFromDB.columOder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (newColumInputRef && newColumInputRef.current) {
      newColumInputRef.current.focus()
      newColumInputRef.current.select()
    }
  }, [openNewColumForm])

  if (isEmpty(board)) {
    return <div className="not-found">Board not Found</div>
  }

  const onColumDrop = (dropResult) => {
    console.log(dropResult)
    let newColums = [...colums]
    newColums = applyDrag(newColums, dropResult)

    let newBoard = { ...board }
    newBoard.columOder = newColums.map(c => c.id)
    newBoard.colums = newColums

    setColums(newColums)
    setBoard(newBoard)

  }
  const onCardDrop = (columId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColums = [...colums]

      let currentColum = newColums.find(c => c.id === columId)
      currentColum.cards = applyDrag(currentColum.cards, dropResult)
      currentColum.cardOder = currentColum.cards.map(i => i.id)
      setColums(newColums)
      // console.log(dropResult)
    }
  }
  const toggleOpenNewColumForm = () => {
    setOpenNewColumForm(!openNewColumForm)
  }

  const addNewColum = () => {
    if (!newColumTitle) {
      newColumInputRef.current.focus()
      return
    }

    const newColumToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumTitle.trim(),
      cardOder: [],
      cards: []
    }
    let newColums = [...colums]
    newColums.push(newColumToAdd)

    let newBoard = { ...board }
    newBoard.columOder = newColums.map(c => c.id)
    newBoard.colums = newColums

    setColums(newColums)
    setBoard(newBoard)
    setNewColumTitle('')
    toggleOpenNewColumForm()
  }


  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumDrop}
        getChildPayload={index => colums[index]}
        dragHandleSelector=".colum-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'colum-drop-preview'
        }}
      >
        {colums.map((colum, index) => (
          <Draggable key={index}>
            <Colum colum={colum} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="trello-container">
        {!openNewColumForm &&
          <Row>
            <Col className="add-new-colum" onClick={toggleOpenNewColumForm}>
              < i className="fa fa-plus icon" /> Add new column
            </Col>
          </Row>
        }
        {openNewColumForm &&
          <Row>
            <Col className="enter-new-colum">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title ..."
                className="input-enter-new-colum"
                ref={newColumInputRef}
                value={newColumTitle}
                onChange={onNewColumTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColum()}
              />
              <Button variant="success" size="sm" onClick={addNewColum}>Add column</Button>
              <span className="cancel-new-colum" onClick={toggleOpenNewColumForm}>
                <i className="fa fa-trash icon" />
                </span>
            </Col>
          </Row>
        }
      </BootstrapContainer>
    </div>

  )
}
export default Boardcontent