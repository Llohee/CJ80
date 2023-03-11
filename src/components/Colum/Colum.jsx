import React from 'react'

import { Container, Draggable } from 'react-smooth-dnd';
import Card from '../Card/Card'

import { mapOder } from '../../ultilities/sorts'
import './Colum.scss'


function Colum(props) {
  const { colum, onCardDrop } = props
  const cards = mapOder(colum.cards, colum.cardOder, 'id')


  return (
    <div className="colums">
      <header className="colum-drag-handle">{colum.title}</header>
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
      </div>
      <footer>
        <div className="footer-actions">
          < i className="fa fa-plus icon" /> Add Card
        </div>
      </footer>
    </div>

  )
}
export default Colum