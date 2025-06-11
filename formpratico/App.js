import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentForm = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('Clínica Geral');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isPresential, setIsPresential] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


  const specialties = [
    'Clínica Geral',
    'Cardiologia',
    'Ortopedia',
    'Pediatria',
    'Dermatologia',
    'Ginecologia',
    'Neurologia'
  ];

  
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Formatar a data para exibição
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

 
  const formatTime = (time) => {
    return time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  
  const handleSubmit = () => {
    if (!name || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const appointmentInfo = `
      Nome: ${name}
      Telefone: ${phone}
      Especialidade: ${specialty}
      Data: ${formatDate(date)}
      Hora: ${formatTime(time)}
      Tipo: ${isPresential ? 'Presencial' : 'Remoto'}
    `;

    Alert.alert(
      'Consulta Agendada!',
      appointmentInfo,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agendamento de Consulta</Text>
      
      {/* Campo Nome */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Paciente*</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      {/* Campo Telefone */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone de Contato*</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      
      {/* Campo Especialidade */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Especialidade Médica</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={specialty}
            style={styles.picker}
            onValueChange={(itemValue) => setSpecialty(itemValue)}
            dropdownIconColor="#007AFF"
          >
            {specialties.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>
      
      {/* Campo Data */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data da Consulta</Text>
        <Button 
          title={formatDate(date)} 
          onPress={() => setShowDatePicker(true)} 
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>
      
      {/* Campo Hora */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora da Consulta</Text>
        <Button 
          title={formatTime(time)} 
          onPress={() => setShowTimePicker(true)} 
        />
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
      
      {/* Campo Presencial */}
      <View style={[styles.inputGroup, styles.switchContainer]}>
        <Text style={styles.label}>Consulta Presencial?</Text>
        <Switch
          value={isPresential}
          onValueChange={setIsPresential}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPresential ? "#007AFF" : "#f4f3f4"}
        />
      </View>
      
      {/* Botão de Agendar */}
      <View style={styles.buttonContainer}>
        <Button
          title="Agendar Consulta"
          onPress={handleSubmit}
          color="#007AFF"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default AppointmentForm;