import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const faqs = [
  {
    question: 'Como faço para comprar um produto?',
    answer: 'Navegue até a página de produtos, selecione o item desejado e clique em "Adicionar ao carrinho". Depois, vá para o carrinho e finalize a compra.'
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Aceitamos cartões de crédito (Visa, Mastercard, American Express), boleto bancário e PIX.'
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia de acordo com sua localização. Em média, de 3 a 7 dias úteis após a confirmação do pagamento.'
  },
  {
    question: 'Posso trocar ou devolver um produto?',
    answer: 'Sim, você tem até 7 dias após o recebimento para solicitar a troca ou devolução, desde que o produto esteja nas mesmas condições em que foi recebido.'
  },
];

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Central de Ajuda</Text>
      
      <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
      
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
      
      <View style={styles.contactInfo}>
        <Text style={styles.sectionTitle}>Contato do Suporte</Text>
        <Text style={styles.infoText}>Email: suporte@ecommerce.com</Text>
        <Text style={styles.infoText}>Telefone: (11) 1234-5678</Text>
        <Text style={styles.infoText}>Horário de atendimento: Segunda a Sexta, das 9h às 18h</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#6200ee',
  },
  faqItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: '#666',
  },
  contactInfo: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default HelpScreen;