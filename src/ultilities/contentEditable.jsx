//onKeyDown
export const saveContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }
//Select all input value
export const selectAllInLineText = (e) => {
    e.target.focus()
    e.target.select()

  }