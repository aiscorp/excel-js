export function createToolbar(state) {
  const buttons = [
    {
      icon: 'note_add',
      action: 'new-table'
    },
    {
      icon: 'save',
      action: 'save-table'
    },
    {type: 'spacer'},
    {
      icon: 'undo',
      action: 'undo'
    },
    {
      icon: 'redo',
      action: 'redo'
    },
    {type: 'spacer'},
    {
      icon: 'format_align_left',
      action: 'cell-left',
      active: state['cell-left'],
      style: {textAlign: 'left'}
    },
    {
      icon: 'format_align_right',
      action: 'cell-right',
      active: state['cell-right'],
      style: {textAlign: 'right'}
    },
    {
      icon: 'format_align_center',
      action: 'cell-center',
      active: state['cell-center'],
      style: {textAlign: 'center'}
    },
    {type: 'spacer'},
    {
      icon: 'format_bold',
      action: 'cell-bold',
      active: state['cell-bold'],
      style: {fontWeight: 'bold'}
    },
    {
      icon: 'format_italic',
      action: 'cell-italic',
      active: state['cell-italic'],
      style: {fontStyle: 'italic'}
    },
    {
      icon: 'format_underlined',
      action: 'cell-underline',
      active: state['cell-underline'],
      style: {textDecoration: 'underline'}
    },
    {type: 'spacer'},
    {
      icon: 'delete_sweep',
      action: 'cell-erase'
    }
  ]

  return buttons.map(createButton).join('')
}

function createButton(element) {
  const metaData = `data-type="button" data-action="${element.action}"`
  const active = `${element.active ? 'active' : ''}`

  const button = `
        <div class="button ${active}" ${metaData}>
            <i class="material-icons" ${metaData}>${element.icon}</i>
        </div>`
  const spacer = `<div class="spacer"></div>`

  const html = element.type === 'spacer' ? spacer : button

  return html
}
