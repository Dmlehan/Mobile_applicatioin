import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface RichEditorProps {
  initialContent: string;
  onChangeContent: (content: string) => void;
  placeholder?: string;
}

export default function RichEditor({ initialContent, onChangeContent, placeholder }: RichEditorProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={initialContent}
        onChangeText={onChangeContent}
        placeholder={placeholder || 'Start typing your note here...'}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
});
