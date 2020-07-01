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
      active: state['cell-left']
    },
    {
      icon: 'format_align_right',
      action: 'cell-right',
      active: state['cell-right']
    },
    {
      icon: 'format_align_center',
      action: 'cell-center',
      active: state['cell-center']
    },
    {type: 'spacer'},
    {
      icon: 'format_bold',
      action: 'cell-bold',
      active: state['cell-bold']
    },
    {
      icon: 'format_italic',
      action: 'cell-italic',
      active: state['cell-italic']
    },
    {
      icon: 'format_underlined',
      action: 'cell-underline',
      active: state['cell-underline']
    },
    {type: 'spacer'},
    {
      icon: 'delete_sweep',
      action: 'cell-erase'
    },
    {type: 'spacer'},
    {
      icon: 'border_all',
      action: 'cell-border',
      active: state['cell-border']
    },
    {
      icon: 'format_paint',
      action: 'cell-color',
      active: state['cell-color'],
      drop: true,
      dropHtml: colorPicker
    }
  ]

  return buttons.map(createButton).join('')
}

function createButton(element) {
  // meta for click actions
  const metaData = `data-type="button" data-action="${element.action}"`
  const active = `${element.active ? 'active' : ''}`
  // drop menu if exist
  const dropContent = `<div class="drop-content" ${metaData}>
    ${element.dropHtml}</div>`
  const drop = `${element.drop ? dropContent : ''}`
  //
  const button = `
        <div class="button ${active}" ${metaData}>
            <i class="material-icons" ${metaData}>${element.icon}</i>
            ${drop}
        </div>`
  const spacer = `<div class="spacer"></div>`
  //
  const html = element.type === 'spacer' ? spacer : button
  return html
}

const colorPicker = `
    
    <p>Text color</p>
    <div class="row">
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #ca0000" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #e49038" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #69a74e" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #3c77d6" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #9800fd" 
           data-action="color#a51c00">stop_circle</i></div>
           </div>
           <div class="row">
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #fd00fd" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #000000" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #989898" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #d7d7d7" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" 
            style="color: #fdfdfd; text-shadow: 0px 0px 1px grey" 
           data-action="color#a51c00">stop_circle</i></div>    
    </div>
    <div class="br"></div>
    <p>Background color</p>
    <div class="row">
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #ca0000" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #e49038" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #69a74e" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #3c77d6" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #9800fd" 
           data-action="color#a51c00">stop_circle</i></div>
                      </div>                      
           <div class="row">
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #fd00fd" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #000000" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #989898" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" style="color: #d7d7d7" 
           data-action="color#a51c00">stop_circle</i></div>
    <div class="button" data-action="color#a51c00">
        <i class="material-icons" 
            style="color: #fdfdfd; text-shadow: 0px 0px 1px grey" 
           data-action="color#a51c00">stop_circle</i></div>    
    </div>
`
