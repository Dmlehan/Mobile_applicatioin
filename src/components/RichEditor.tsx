import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { Surface, IconButton } from 'react-native-paper';

// Declare require variable for dynamic imports on native platform in TypeScript
declare let require: any;

let RichEditorMobile: any = null;
let RichToolbarMobile: any = null;
let actionsMobile: any = null;

if (Platform.OS !== 'web') {
  try {
    const PellEditor = require('react-native-pell-rich-editor');
    RichEditorMobile = PellEditor.RichEditor;
    RichToolbarMobile = PellEditor.RichToolbar;
    actionsMobile = PellEditor.actions;
  } catch (e) {
    console.warn('Failed to load react-native-pell-rich-editor on native', e);
  }
}

interface RichEditorProps {
  initialContent: string;
  onChangeContent: (content: string) => void;
  placeholder?: string;
}

export default function RichEditor({ initialContent, onChangeContent, placeholder }: RichEditorProps) {
  const richTextRef = useRef<any>(null);
  const webEditorRef = useRef<HTMLDivElement>(null);

  // Sync initial content to web editor on mount
  useEffect(() => {
    if (Platform.OS === 'web' && webEditorRef.current && initialContent !== webEditorRef.current.innerHTML) {
      webEditorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  if (Platform.OS === 'web') {
    const handleTextChange = () => {
      if (webEditorRef.current) {
        onChangeContent(webEditorRef.current.innerHTML);
      }
    };

    const applyStyle = (command: string) => {
      document.execCommand(command, false, '');
      handleTextChange();
    };

    return (
      <Surface style={styles.webContainer} elevation={1}>
        <View style={styles.toolbar}>
          <IconButton icon="format-bold" size={20} onPress={() => applyStyle('bold')} />
          <IconButton icon="format-italic" size={20} onPress={() => applyStyle('italic')} />
          <IconButton icon="format-underline" size={20} onPress={() => applyStyle('underline')} />
          <IconButton icon="format-list-bulleted" size={20} onPress={() => applyStyle('insertUnorderedList')} />
          <IconButton icon="format-list-numbered" size={20} onPress={() => applyStyle('insertOrderedList')} />
        </View>
        <div
          ref={webEditorRef}
          contentEditable
          onInput={handleTextChange}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            fontFamily: 'sans-serif',
            color: '#333333',
            outline: 'none',
            minHeight: '230px',
            backgroundColor: '#FFFFFF',
            overflowY: 'auto' as any,
          }}
          data-placeholder={placeholder}
        />
      </Surface>
    );
  }

  // Mobile Native rich-editor rendering
  return (
    <View style={styles.nativeContainer}>
      <RichToolbarMobile
        editor={richTextRef}
        actions={[
          actionsMobile.setBold,
          actionsMobile.setItalic,
          actionsMobile.setUnderline,
          actionsMobile.insertBulletsList,
          actionsMobile.insertOrderedList,
          actionsMobile.alignLeft,
          actionsMobile.alignCenter,
          actionsMobile.alignRight,
        ]}
        style={styles.nativeToolbar}
      />
      <ScrollView style={styles.editorScroll}>
        <RichEditorMobile
          ref={richTextRef}
          initialContentStr={initialContent}
          onChange={onChangeContent}
          placeholder={placeholder || 'Start typing...'}
          style={styles.nativeEditor}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    paddingHorizontal: 4,
  },
  nativeContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  nativeToolbar: {
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  editorScroll: {
    flex: 1,
  },
  nativeEditor: {
    flex: 1,
    minHeight: 250,
  },
});
