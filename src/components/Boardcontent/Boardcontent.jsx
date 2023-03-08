import React, { useState, useEffect} from 'react'
import { isEmpty } from 'lodash'

import Colum from '../Colum/Colum'
import './Boardcontent.scss'
import {initialData } from '../../actions/initialData'
function Boardcontent() {
const [board, setBoard] = useState({})
const [colums, setColums] = useState([])

useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB){
      setBoard(boardFromDB)

      setColums(boardFromDB.colums)
    }
}, [])

if(isEmpty(board)) {
  return <div className="not-found">Board not Found</div>
} 

    return (
        <div className="board-content">
          {colums.map((colum, index) =>  {
            return <Colum />
          })}
       
      </div>

    )
}
export default Boardcontent