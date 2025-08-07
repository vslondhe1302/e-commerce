import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import './editor.css'
import { FaBold, FaItalic } from "react-icons/fa";
import { MdFormatListBulleted, MdFormatListNumbered, MdFormatUnderlined } from 'react-icons/md';
import { GrLink } from 'react-icons/gr'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

const TextEditor = forwardRef(({value},ref)=> {
  const editor = useEditor({
    extensions: [StarterKit,
      Underline,
      Link],
    content: value || '',
  })

  useEffect(()=>{
    if(editor && value){
      editor.commands.setContent(value)
    }
  },[value,editor])
  if (!editor) return null;

  useImperativeHandle(ref, ()=>({
    getContent : ()=>editor?.getText() || '',
    setContent : (newValue)=>editor?.commands.setContent(newValue)
  }))

  return (
    <div className='editor-container'>
      <div className="toolbar">
        <select
          onChange={(e) => {
            const level = e.target.value;
            editor.chain().focus().toggleHeading({ level: parseInt(level) }).run()
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? '1' :
              editor.isActive('heading', { level: 2 }) ? '2' :
                editor.isActive('heading', { level: 3 }) ? '3' :
                  editor.isActive('heading', { level: 4 }) ? '4' : 'normal'
          }>
          <option value="1" className='text-[28px]'>Heading 1</option>
          <option value="2" className='text-[22px]'>Heading 2</option>
          <option value="3" className='text-[18px]'>Heading 3</option>
          <option value="4" >Normal</option>
        </select>
        <button type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <MdFormatUnderlined />
        </button>

        <button type='button'
          onClick={() => {
            const url = prompt('Enter URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}>
          <GrLink />
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Remove Link
        </button>


        <button type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <MdFormatListNumbered />
        </button>

        <button type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <MdFormatListBulleted />
        </button>

      </div>

      <EditorContent editor={editor} />
    </div>
  )
})
export default TextEditor
