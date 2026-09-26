import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },

  title: {
    color: '#062B43',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 32,
  },

  form: {
    gap: 12,
  },

  // TÍTULOS DOS CAMPOS
  label: {
    color: '#062B43',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2,
  },

  // TÍTULO SERVIÇOS
  sectionTitle: {
    color: '#062B43',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 26,
    marginBottom: 10,
  },

  // ADICIONAR SERVIÇO
  addButton: {
    height: 52,
    backgroundColor: '#159FE5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // SERVIÇO ADICIONADO
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D6E7F0',
    borderWidth: 1,
    borderColor: '#8EB9D0',
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
  },

  itemInfo: {
    flex: 1,
  },

  itemDescription: {
    color: '#062B43',
    fontSize: 17,
    fontWeight: 'bold',
  },

  itemDetails: {
    color: '#405D6D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },

  itemActions: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },

  itemTotal: {
    color: '#062B43',
    fontSize: 16,
    fontWeight: 'bold',
  },

  removeText: {
    color: '#D93648',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 6,
  },

  // RESUMO
  summary: {
    backgroundColor: '#EAF4F9',
    borderWidth: 1,
    borderColor: '#A6CADC',
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
    gap: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    color: '#405D6D',
    fontSize: 15,
    fontWeight: '600',
  },

  summaryValue: {
    color: '#062B43',
    fontSize: 15,
    fontWeight: 'bold',
  },

  totalLabel: {
    color: '#062B43',
    fontSize: 19,
    fontWeight: 'bold',
  },

  totalValue: {
    color: '#0787C9',
    fontSize: 21,
    fontWeight: 'bold',
  },

  // SALVAR ORÇAMENTO
  saveButton: {
    height: 52,
    backgroundColor: '#159FE5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButton: {
    alignSelf: 'flex-start',
    height: 42,
    paddingHorizontal: 16,

    backgroundColor: '#062B43',

    borderWidth: 1,
    borderColor: '#0B5278',
    borderRadius: 8,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 18,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;