import { useEffect } from 'react'
import styles from './styles.module.css'

const cssContent = `/*
  Stylesheet
*/
.container {
    background-color:#2b60a0;
    padding: 12px;
    text-align: center;
    border-radius: 6px;
    display: inline-block;
}

.container:hover {
    cursor:pointer;
    background-color:orange;
}`

const content = `/*
  React Component
*/
const Component = () => {
    return (
        <div className='container'>
            Hello World! 
        </div>
    )
}`

const html = `<!DOCTYPE html>
<html>
<head>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.14.0/babel.min.js"></script>
    <script type="text/babel" data-presets="es2017, stage-3" data-plugins="syntax-async-functions,transform-class-properties"></script>
    <style>
   body {
    color: white;
    font-family: sans-serif;
   }

   


   ##CSS##

</style>
</head>
<body>
<div id="app"></div>
<script type="text/babel" src="App.jsx"></script>
<script type="text/babel" >
 ##CODE##
    ReactDOM.render(<Component/>, document.getElementById('app'));
</script>
</body>
</html>`

function App() {

  useEffect(() => {
    var editor = window.ace.edit("editor")
    editor.setTheme("ace/theme/ambiance")
    var JsxMode = window.ace.require("ace/mode/jsx").Mode
    editor.session.setMode(new JsxMode())
    editor.setOptions({
      fontSize: "12pt",
      showPrintMargin: false
    })
    
    const update = () => {
      let iframe = document.getElementById("iframe")
      let value = editor.session.getValue()
      let cssValue = css.session.getValue()

      let content = html.split("##CODE##").join(value).split("##CSS##").join(cssValue)

      iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(content);
    }

    editor.commands.addCommand({
      name: 'save',
      bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
      exec: function(editor) {
        update();
      }
    })

    var css = window.ace.edit("css")
    var CssMode = window.ace.require("ace/mode/css").Mode
    css.session.setMode(new CssMode())
    css.setOptions({
      fontSize: "12pt",
      showPrintMargin: false
    })
    css.setTheme("ace/theme/ambiance")

    css.commands.addCommand({
      name: 'save',
      bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
      exec: function(editor) {
        update();
      }
    })

    

    update()



  }, [])


  return (
    <div>
      App
      <div className={styles.editor} id="editor">{content}</div>
      <div className={styles.css} id="css">{cssContent}</div>
      <iframe className={styles.iframe} id="iframe"/>
    </div>
  );
}

export default App;
