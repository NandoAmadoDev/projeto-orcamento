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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },

  title: {
    color: '#062B43',
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#405D6D',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },

  // BOTÃO PRINCIPAL
  newButton: {
    backgroundColor: '#159FE5',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  newButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  empty: {
    color: '#405D6D',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
  },

  // CARD
  card: {
    backgroundColor: '#CCDADF',
    borderWidth: 1,
    borderColor: '#062B43',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: {
    color: '#062B43',
    fontSize: 19,
    fontWeight: 'bold',
  },

  client: {
    color: '#062B43',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
  },

  cardDate: {
    color: '#526F7E',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },

  items: {
    color: '#405D6D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },

  total: {
    color: '#062B43',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },

  values: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#8EB9D0',
    paddingTop: 12,
  },

  valueText: {
    color: '#405D6D',
    fontSize: 14,
    fontWeight: '600',
  },

  discountText: {
    color: '#405D6D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },

  finalValue: {
    color: '#062B43',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },

  // BOTÃO PADRÃO DE ALTERAÇÃO DE STATUS
  statusButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF7FE',
    borderWidth: 1,
    borderColor: '#159FE5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 7,
    marginTop: 8,
  },

  statusButtonText: {
    color: '#076B9F',
    fontSize: 13,
    fontWeight: 'bold',
  },

  statusActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  // BOTÃO RECUSAR
  rejectButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0F2',
    borderWidth: 1,
    borderColor: '#E63946',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 7,
    marginTop: 8,
  },

  rejectButtonText: {
    color: '#D62839',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // FILTROS
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },

  filterButton: {
    backgroundColor: '#062B43',
    borderWidth: 1,
    borderColor: '#0B3D59',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  filterButtonActive: {
    backgroundColor: '#159FE5',
    borderColor: '#159FE5',
  },

  filterText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // ORDENAÇÃO
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },

  sortLabel: {
    color: '#062B43',
    fontSize: 13,
    fontWeight: 'bold',
  },

  sortButton: {
    backgroundColor: '#062B43',
    borderWidth: 1,
    borderColor: '#0B3D59',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },

  sortButtonActive: {
    backgroundColor: '#0B5278',
    borderColor: '#159FE5',
  },

  sortButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // AÇÕES DO CARD
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },

  duplicateButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#EAF7FE',
    borderWidth: 1,
    borderColor: '#159FE5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  duplicateButtonText: {
    color: '#076B9F',
    fontSize: 13,
    fontWeight: 'bold',
  },

  removeButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF0F2',
    borderWidth: 1,
    borderColor: '#E63946',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeButtonText: {
    color: '#D62839',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // STATUS
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 13,
    fontWeight: 'bold',
    overflow: 'hidden',
    marginTop: 6,
  },

  // RASCUNHO - CINZA
  statusDraft: {
    backgroundColor: '#DCE5EA',
    color: '#40545F',
    borderColor: '#879AA4',
  },

  // ENVIADO - AZUL
  statusSent: {
    backgroundColor: '#DDF3FE',
    color: '#0787C9',
    borderColor: '#159FE5',
  },

  // APROVADO - VERDE
  statusApproved: {
    backgroundColor: '#DDF7E8',
    color: '#137A3A',
    borderColor: '#159447',
  },

  // RECUSADO - VERMELHO
  statusRejected: {
    backgroundColor: '#FFE3E6',
    color: '#D62839',
    borderColor: '#E63946',
  },

  pdfButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#EAF7FE',
    borderWidth: 1,
    borderColor: '#15e55a',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pdfButtonText: {
    color: '#079f07',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default styles;