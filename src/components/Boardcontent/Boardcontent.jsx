import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash'

import Colum from '../Colum/Colum'
import { mapOder } from '../../ultilities/sorts'

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
            <Colum colum={colum} />
          </Draggable>
        ))}
      </Container>

    </div>

  )
}
export default Boardcontent