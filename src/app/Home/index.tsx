import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  filterStorage,
  StatusFilter,
  SortOrder,
} from '@/storage/filterStorage';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import {
  calculateSubtotal,
  calculateDiscount,
  calculateTotal,
} from '@/utils/calculateQuote';

import { formatCurrency } from '@/utils/formatCurrency';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuoteDoc, QuoteStatus  } from '@/types/Quote';
import { quoteStorage } from '@/storage/quoteStorage';
import { StackRoutesList } from '@/routes/stack.routes';
import { generateQuotePdf } from '@/utils/generateQuotePdf';

import styles from './styles';

type HomeNavigationProps = NativeStackNavigationProp<
  StackRoutesList,
  'Home'
>;

export function Home() {
  const navigation = useNavigation<HomeNavigationProps>();

  const [quotes, setQuotes] = useState<QuoteDoc[]>([]);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('ALL');

  async function handleFilter(status: StatusFilter) {
    setStatusFilter(status);

    await filterStorage.save(status);
  }

  async function handleSort(sort: SortOrder) {
    setSortOrder(sort);

    await filterStorage.saveSort(sort);
  }

  const filteredQuotes = quotes.filter((quote) => {
    if (statusFilter === 'ALL') {
      return true;
    }

    return quote.status === statusFilter;
  });

  async function loadQuotes() {
    const data = await quoteStorage.getAll();
    const savedFilter = await filterStorage.get();
    const savedSort = await filterStorage.getSort();

    setQuotes(data);
    setStatusFilter(savedFilter);
    setSortOrder(savedSort);
  }

  async function handleDuplicate(id: string) {
    await quoteStorage.duplicate(id);

    await loadQuotes();
  }

  async function handleGeneratePdf(quote: QuoteDoc) {
    try {
      await generateQuotePdf(quote);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível gerar o PDF do orçamento.'
      );
    }
  }

  function handleRemove(quote: QuoteDoc) {
    Alert.alert(
      'Excluir orçamento',
      `Tem certeza que deseja excluir "${quote.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await quoteStorage.remove(quote.id);

            await loadQuotes();
          },
        },
      ]
    );
  }

  async function handleChangeStatus(
    id: string,
    status: QuoteStatus
  ) {
    await quoteStorage.updateStatus(id, status);

    await loadQuotes();
  }

  useFocusEffect(
    useCallback(() => {
      loadQuotes();
    }, [])
  );

  function handleNewQuote() {
    navigation.navigate('NewQuote');
  }

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('NEWEST');

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if (sortOrder === 'NEWEST') {
      return dateB - dateA;
    }

    return dateA - dateB;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Orçamentos
          </Text>

          <Text style={styles.subtitle}>
            Gerencie seus orçamentos
          </Text>
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={handleNewQuote}
        >
          <Text style={styles.newButtonText}>
            + Novo
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'ALL' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilter('ALL')}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === QuoteStatus.DRAFT &&
              styles.filterButtonActive,
          ]}
          onPress={() => handleFilter(QuoteStatus.DRAFT)}
        >
          <Text style={styles.filterText}>Rascunho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === QuoteStatus.SENT &&
              styles.filterButtonActive,
          ]}
          onPress={() => handleFilter(QuoteStatus.SENT)}
        >
          <Text style={styles.filterText}>Enviado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === QuoteStatus.APPROVED &&
              styles.filterButtonActive,
          ]}
          onPress={() => handleFilter(QuoteStatus.APPROVED)}
        >
          <Text style={styles.filterText}>Aprovado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === QuoteStatus.REJECTED &&
              styles.filterButtonActive,
          ]}
          onPress={() => handleFilter(QuoteStatus.REJECTED)}
        >
          <Text style={styles.filterText}>Recusado</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>
          Ordenar:
        </Text>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOrder === 'NEWEST' && styles.sortButtonActive,
          ]}
          onPress={() => handleSort('NEWEST')}
        >
          <Text style={styles.sortButtonText}>
            Mais recentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOrder === 'OLDEST' && styles.sortButtonActive,
          ]}
          onPress={() => handleSort('OLDEST')}
        >
          <Text style={styles.sortButtonText}>
            Mais antigos
          </Text>
        </TouchableOpacity>
      </View>

      {filteredQuotes.length === 0 && (
        <Text style={styles.empty}>
          {statusFilter === 'ALL'
            ? 'Nenhum orçamento cadastrado.'
            : 'Nenhum orçamento encontrado neste status.'}
        </Text>
      )}

      {sortedQuotes.map((quote) => {
        const subtotal = calculateSubtotal(quote.items);

        const discount = calculateDiscount(
          subtotal,
          quote.discountPct || 0
        );

        const total = calculateTotal(
          quote.items,
          quote.discountPct || 0
        );

        return (
          <View
            key={quote.id}
            style={styles.card}
          >

            <Text style={styles.cardTitle}>
              {quote.title}
            </Text>

            <Text style={styles.client}>
              {quote.client}
            </Text>

            <Text style={styles.cardDate}>
              Criado em{' '}
              {new Date(quote.createdAt).toLocaleDateString('pt-BR')}
            </Text>
            
            <Text
              style={[
                styles.status,
                quote.status === QuoteStatus.DRAFT &&
                  styles.statusDraft,

                quote.status === QuoteStatus.SENT &&
                  styles.statusSent,

                quote.status === QuoteStatus.APPROVED &&
                  styles.statusApproved,

                quote.status === QuoteStatus.REJECTED &&
                  styles.statusRejected,
              ]}
            >
              {quote.status}
            </Text>

            {quote.status === QuoteStatus.DRAFT && (
              <TouchableOpacity
                style={styles.statusButton}
                onPress={() =>
                  handleChangeStatus(
                    quote.id,
                    QuoteStatus.SENT
                  )
                }
              >
                <Text style={styles.statusButtonText}>
                  Marcar como enviado
                </Text>
              </TouchableOpacity>
            )}

            {quote.status === QuoteStatus.SENT && (
              <View style={styles.statusActions}>

                {/* APROVAR */}
                <TouchableOpacity
                  style={styles.statusButton}
                  onPress={() =>
                    handleChangeStatus(
                      quote.id,
                      QuoteStatus.APPROVED
                    )
                  }
                >
                  <Text style={styles.statusButtonText}>
                    Aprovar
                  </Text>
                </TouchableOpacity>

                {/* RECUSAR */}
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() =>
                    handleChangeStatus(
                      quote.id,
                      QuoteStatus.REJECTED
                    )
                  }
                >
                  <Text style={styles.rejectButtonText}>
                    Recusar
                  </Text>
                </TouchableOpacity>

              </View>
            )}

            <Text style={styles.items}>
              {quote.items.length} serviço(s)
            </Text>

            <View style={styles.values}>
              <Text style={styles.valueText}>
                Total: {formatCurrency(subtotal)}
              </Text>

              <Text style={styles.discountText}>
                Desconto ({quote.discountPct || 0}%): {formatCurrency(discount)}
              </Text>

              <Text style={styles.finalValue}>
                Valor final: {formatCurrency(total)}
              </Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.duplicateButton}
                onPress={() => handleDuplicate(quote.id)}
              >
                <Text style={styles.duplicateButtonText}>
                  Duplicar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.pdfButton}
                onPress={() => handleGeneratePdf(quote)}
              >
                <Text style={styles.pdfButtonText}>
                  PDF
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(quote)}
              >
                <Text style={styles.removeButtonText}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        );
      })}
    </ScrollView>
  );
}