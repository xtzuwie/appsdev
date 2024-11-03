import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    // Navigate to LoginPage
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header with Settings Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Options Container */}
      <View style={styles.optionsContainer}>
        {/* Option Buttons */}
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={24} color="#6A1B9A" />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('AboutUs')}>
          <Icon name="info-circle" size={24} color="#6A1B9A" />
          <Text style={styles.optionText}>About Health App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => setModalVisible(true)}>
          <Icon name="sign-out" size={24} color="#6A1B9A" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Logout Confirmation */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#6A1B9A',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    elevation: 2, // Shadow effect for Android
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 5,
    width: '48%', // Adjust the width for the buttons
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SettingsScreen;
