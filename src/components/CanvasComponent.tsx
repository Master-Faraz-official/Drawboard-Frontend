'use client'

// Import necessary hooks and types from React
import { useRef, useState, type ChangeEvent } from 'react'

// Import ReactSketchCanvas and its type
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef
} from 'react-sketch-canvas'

// Import Button component from ShadCN and icons from lucide-react
import { Button } from '@/components/ui/button'
import { Eraser, Pen, Play, Redo, RotateCcw, Save, Undo } from 'lucide-react'


// Define the Canvas component
export default function Canvas() {

  // Create references for color input and canvas
  const colorInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  // State to manage stroke color and erase mode
  const [strokeColor, setStrokeColor] = useState('#a855f7')
  const [eraseMode, setEraseMode] = useState(false)

  // Handle stroke color change
  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value)
    console.log(strokeColor)
  }

  // Enable eraser mode
  function handleEraserClick() {
    setEraseMode(true)
    canvasRef.current?.eraseMode(true)
  }

  // Enable pen mode
  function handlePenClick() {
    setEraseMode(false)
    canvasRef.current?.eraseMode(false)
  }

  // Undo the last action
  function handleUndoClick() {
    canvasRef.current?.undo()
  }

  // Redo the last undone action
  function handleRedoClick() {
    canvasRef.current?.redo()
  }

  // Clear the canvas
  function handleClearClick() {
    canvasRef.current?.clearCanvas()
  }

  // Save the canvas drawing as an image
  async function handleSave() {
    const dataURL = await canvasRef.current?.exportImage('png')
    console.log(dataURL)
    
    // if (dataURL) {
    //   const link = Object.assign(document.createElement('a'), {
    //     href: dataURL,
    //     style: { display: 'none' },
    //     download: 'sketch.png'
    //   })

    //   document.body.appendChild(link)
    //   link.click()
    //   link.remove()
    // }

  }

  // Render the component
  return (
    <div className={`flex h-[80vh] gap-4 p-5`}>

      {/* Canvas */}
      <ReactSketchCanvas
        width='100%'
        // height='430px'
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor='transparent'
        className='!rounded-2xl shadow-lg !border-slate-300'
      />

      {/* Toolbar */}
      <div className='flex flex-col items-center gap-y-6 divide-y divide-purple-200 py-4 dark:divide-purple-900'>
        {/* Color picker */}
        <Button
          size='icon'
          type='button'
          onClick={() => colorInputRef.current?.click()}
          style={{ backgroundColor: strokeColor }}
        >
          <input
            type='color'
            ref={colorInputRef}
            className='sr-only'
            value={strokeColor}
            onChange={handleStrokeColorChange}
          />
        </Button>

        {/* Drawing mode */}
        <div className='flex flex-col gap-3 pt-6'>
          <Button
            size='icon'
            type='button'
            variant='outline'
            disabled={!eraseMode}
            onClick={handlePenClick}
          >
            <Pen size={16} />
          </Button>
          <Button
            size='icon'
            type='button'
            variant='outline'
            disabled={eraseMode}
            onClick={handleEraserClick}
          >
            <Eraser size={16} />
          </Button>
        </div>

        {/* Actions */}
        <div className='flex flex-col gap-3 pt-6'>
          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleUndoClick}
          >
            <Undo size={16} />
          </Button>
          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleRedoClick}
          >
            <Redo size={16} />
          </Button>
          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleClearClick}
          >
            <RotateCcw size={16} />
          </Button>

          <Button
            size='icon'
            type='button'
            variant='outline'
            onClick={handleSave}
            className='bg-emerald-400'
          >
            {/* <Save size={16} /> */}
            <Play size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}