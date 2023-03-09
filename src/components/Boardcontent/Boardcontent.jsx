import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash'

import Colum from '../Colum/Colum'
import { mapOder } from '../../ultilities/sorts'
import { applyDrag } from '../../ultilities/dragDrop';

import { initialData } from '../../actions/initialData'


import './Boardcontent.scss'


function Boardcontent() {
  const [board, setBoard] = useState({})
  const [colums, setColums] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColums(mapOder(boardFromDB.colums, boardFromDB.columOder, 'id'))
    }
  }, [])

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
      <div className="add-new-colum">
        < i className="fa fa-plus icon" /> Add new column
      </div>
    </div>

  )
}
export default Boardcontent