import React from 'react'
import Card from '../Card/Card'
import './Colum.scss'

function Colum() {
    return (
        <div className="colums">
        <header>Content</header>
        <ul className="card-list">
          <Card />
          <li className="card-item">asdfasdfasf</li>
          <li className="card-item">asdfasdfasf</li>
          <li className="card-item">asdfasdfasf</li>
          <li className="card-item">asdfasdfasf</li>
          <li className="card-item">asdfasdfasf</li>
        </ul>
        <footer>Add Card</footer>
      </div>

    )
}
export default Colum