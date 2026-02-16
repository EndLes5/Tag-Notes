import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';

const CATEGORIES = {
  study: { name: 'Study', color: '#4CAF50', emoji: '📚' },
  business: { name: 'Business', color: '#2196F3', emoji: '💼' },
  creativity: { name: 'Creativity', color: '#FF9800', emoji: '🎨' },
  reminders: { name: 'Reminders', color: '#F44336', emoji: '⏰' },
  random: { name: 'Random', color: '#9C27B0', emoji: '🎲' },
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: '',
    content: '',
    category: 'random',
    createdAt: null,
  });
  const [selectedCategory, setSelectedCategory] = useState('random');
  const [longPressNote, setLongPressNote] = useState(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);

  // Load notes from storage on app start
  useEffect(() => {
    loadNotes();
  }, []);

  // Save notes to storage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      saveNotes();
    }
  }, [notes]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const createNote = () => {
    setCurrentNote({
      id: null,
      title: '',
      content: '',
      category: selectedCategory,
      createdAt: null,
    });
    setModalVisible(true);
  };

  const saveNote = () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) {
      Alert.alert('Error', 'Please add a title or content');
      return;
    }

    const timestamp = new Date().toISOString();

    if (currentNote.id) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id
            ? { ...currentNote, updatedAt: timestamp }
            : note
        )
      );
    } else {
      // Create new note
      const newNote = {
        ...currentNote,
        id: Date.now().toString(),
        createdAt: timestamp,
      };
      setNotes([newNote, ...notes]);
    }

    setModalVisible(false);
    setEditModalVisible(false);
    resetCurrentNote();
  };

  const deleteNote = (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setNotes(notes.filter((note) => note.id !== id));
          setActionModalVisible(false);
        },
      },
    ]);
  };

  const editNote = (note) => {
    setCurrentNote(note);
    setEditModalVisible(true);
    setActionModalVisible(false);
  };

  const changeCategory = (note) => {
    setCurrentNote(note);
    setActionModalVisible(false);
    // Show category selector
    Alert.alert(
      'Change Category',
      'Select a new category',
      Object.keys(CATEGORIES).map((key) => ({
        text: `${CATEGORIES[key].emoji} ${CATEGORIES[key].name}`,
        onPress: () => {
          setNotes(
            notes.map((n) =>
              n.id === note.id ? { ...n, category: key } : n
            )
          );
        },
      }))
    );
  };

  const resetCurrentNote = () => {
    setCurrentNote({
      id: null,
      title: '',
      content: '',
      category: selectedCategory,
      createdAt: null,
    });
  };

  const handleLongPress = (note) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLongPressNote(note);
    setActionModalVisible(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const renderNote = ({ item }) => {
    const category = CATEGORIES[item.category];
    return (
      <Pressable
        onPress={() => editNote(item)}
        onLongPress={() => handleLongPress(item)}
        delayLongPress={500}
        style={({ pressed }) => [
          styles.noteCard,
          { borderLeftColor: category.color, borderLeftWidth: 5 },
          pressed && styles.noteCardPressed,
        ]}
      >
        <View style={styles.noteHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text style={[styles.categoryText, { color: category.color }]}>
              {category.name}
            </Text>
          </View>
          <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
        </View>
        {item.title ? (
          <Text style={styles.noteTitle} numberOfLines={1}>
            {item.title}
          </Text>
        ) : null}
        <Text style={styles.noteContent} numberOfLines={3}>
          {item.content}
        </Text>
      </Pressable>
    );
  };

  const NoteEditor = ({ visible, onClose, isEdit }) => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {isEdit ? 'Edit Note' : 'New Note'}
          </Text>
          <TouchableOpacity onPress={saveNote}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editorContainer}>
          <View style={styles.categorySelector}>
            {Object.keys(CATEGORIES).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      currentNote.category === key
                        ? CATEGORIES[key].color
                        : '#f0f0f0',
                  },
                ]}
                onPress={() =>
                  setCurrentNote({ ...currentNote, category: key })
                }
              >
                <Text style={styles.categoryButtonEmoji}>
                  {CATEGORIES[key].emoji}
                </Text>
                <Text
                  style={[
                    styles.categoryButtonText,
                    {
                      color: currentNote.category === key ? '#fff' : '#666',
                    },
                  ]}
                >
                  {CATEGORIES[key].name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#999"
            value={currentNote.title}
            onChangeText={(text) =>
              setCurrentNote({ ...currentNote, title: text })
            }
          />

          <TextInput
            style={styles.contentInput}
            placeholder="Start typing your note..."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            value={currentNote.content}
            onChangeText={(text) =>
              setCurrentNote({ ...currentNote, content: text })
            }
          />
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notepad</Text>
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedCategory === 'all' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === 'all' && styles.filterButtonTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {Object.keys(CATEGORIES).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.filterButton,
                  selectedCategory === key && styles.filterButtonActive,
                  selectedCategory === key && {
                    backgroundColor: CATEGORIES[key].color,
                  },
                ]}
                onPress={() => setSelectedCategory(key)}
              >
                <Text style={styles.filterEmoji}>{CATEGORIES[key].emoji}</Text>
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedCategory === key && styles.filterButtonTextActive,
                  ]}
                >
                  {CATEGORIES[key].name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Notes List */}
      <FlatList
        data={
          selectedCategory === 'all'
            ? notes
            : notes.filter((note) => note.category === selectedCategory)
        }
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to create your first note
            </Text>
          </View>
        }
      />

      {/* Add Note Button */}
      <TouchableOpacity style={styles.addButton} onPress={createNote}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Note Editor Modals */}
      <NoteEditor
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          resetCurrentNote();
        }}
        isEdit={false}
      />

      <NoteEditor
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          resetCurrentNote();
        }}
        isEdit={true}
      />

      {/* Action Modal (Long Press) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible(false)}
      >
        <Pressable
          style={styles.actionModalOverlay}
          onPress={() => setActionModalVisible(false)}
        >
          <View style={styles.actionModalContent}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => editNote(longPressNote)}
            >
              <Text style={styles.actionButtonText}>✏️ Edit Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => changeCategory(longPressNote)}
            >
              <Text style={styles.actionButtonText}>🏷️ Change Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => deleteNote(longPressNote?.id)}
            >
              <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                🗑️ Delete Note
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelActionButton]}
              onPress={() => setActionModalVisible(false)}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterContainer: {
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  filterButtonActive: {
    backgroundColor: '#333',
  },
  filterEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  notesList: {
    padding: 15,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noteDate: {
    fontSize: 11,
    color: '#999',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  editorContainer: {
    flex: 1,
    padding: 20,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryButtonEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingVertical: 10,
    color: '#333',
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
    color: '#333',
  },
  actionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  actionModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  actionButton: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#f44336',
    fontWeight: '600',
  },
  cancelActionButton: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
});
