export function createToolbar() {
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
      active: true,
      style: {textAlign: 'left'}
    },
    {
      icon: 'format_align_right',
      action: 'cell-right',
      style: {textAlign: 'right'}
    },
    {
      icon: 'format_align_center',
      action: 'cell-center',
      style: {textAlign: 'center'}
    },
    {type: 'spacer'},
    {
      icon: 'format_bold',
      action: 'cell-bold',
      active: true,
      style: {fontWeight: 'bold'}
    },
    {
      icon: 'format_italic',
      action: 'cell-italic',
      style: {fontStyle: 'italic'}
    },
    {
      icon: 'format_underlined',
      action: 'cell-underline',
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
