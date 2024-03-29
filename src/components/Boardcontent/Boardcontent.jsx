import React, { useState, useEffect, useRef } from 'react'


import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import Column from '../Colum/Column'
import { mapOder } from '../../ultilities/sorts'
import { applyDrag } from '../../ultilities/dragDrop';

import { initialData } from '../../actions/initialData'
import Sidebar from './Sidebar/Sidebar';
import './Boardcontent.scss'


function Boardcontent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOder(boardFromDB.columns, boardFromDB.columnOder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return <div className="not-found">Board not Found</div>
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult)
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOder = currentColumn.cards.map(i => i.id)
      setColumns(newColumns)
      // console.log(dropResult)
    }
  }


  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }



    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOder: [],
      cards: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...board }
    newBoard.columnOder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }
  const onUpdateColumnn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id

    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      //remove columnn
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      //update column info
      console.log(newColumnToUpdate  )
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

  }


  return (
    <div className="board-content">
      <div className="sidebar">
        <Sidebar />
      </div>
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnn={onUpdateColumnn}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="trello-container">
        {!openNewColumnForm &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              < i className="fa fa-plus icon" /> Add new columnn
            </Col>
          </Row>
        }
        {openNewColumnForm &&
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter columnn title ..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>Add columnn</Button>
              <span className="cacel-icon" onClick={toggleOpenNewColumnForm}>
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