import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import Editor from '@toast-ui/editor';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const CustomEditor = ({ onChange, name, value }) => {
  let tuiEditor;

  useEffect(() => {
    tuiEditor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg',
      initialValue: value,
      previewStyle: 'none',
      useCommandShortcut: true,
      height: '300px',
      exts: ['colorSyntax'],
      plugins: [[codeSyntaxHighlight, { hljs }]],
      events: {
        change() {
          onChange({ target: { name, value: tuiEditor.getHtml() } });
        },
      },
    });
  }, []);

  return (
    <Wrapper>
      <div id="editSection" />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CustomEditor;
