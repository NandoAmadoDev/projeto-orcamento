import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  calculateSubtotal,
  calculateDiscount,
  calculateTotal,
} from '@/utils/calculateQuote';

import { formatCurrency } from '@/utils/formatCurrency';

import { useNavigation } from '@react-navigation/native';
import { Item, QuoteDoc, QuoteStatus } from '@/types/Quote';
import { quoteStorage } from '@/storage/quoteStorage';
import { Input } from '@/components/Input';

import styles from './styles';

export function NewQuote() {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [discountPct, setDiscountPct] = useState('');

  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');

  const [items, setItems] = useState<Item[]>([]);

  const navigation = useNavigation();

  const discountValue = Number(discountPct) || 0;

  const subtotal = calculateSubtotal(items);

  const discount = calculateDiscount(
    subtotal,
    discountValue
  );

  const total = calculateTotal(
    items,
    discountValue
  );

  function parsePrice(value: string) {
    const normalizedValue = value
      .trim()
      .replace(/\s/g, '')
      .replace('R$', '');

    // Formato brasileiro: 1.350,50
    if (normalizedValue.includes(',')) {
      return Number(
        normalizedValue
          .replace(/\./g, '')
          .replace(',', '.')
      );
    }

    // Formato com ponto decimal: 350.50
    return Number(normalizedValue);
  }

  function handleAddItem() {
    if (!description.trim() || !qty || !price) {
      Alert.alert(
        'Atenção',
        'Preencha a descrição, quantidade e preço.'
      );

      return;
    }

    const priceValue = parsePrice(price);

    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert(
        'Atenção',
        'Informe um preço válido.'
      );

      return;
    }

    const qtyValue = Number(qty);

    if (isNaN(qtyValue) || qtyValue <= 0) {
      Alert.alert(
        'Atenção',
        'Informe uma quantidade válida.'
      );

      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      description: description.trim(),
      qty: qtyValue,
      price: priceValue,
    };

    setItems((prevState) => [
      ...prevState,
      newItem,
    ]);

    setDescription('');
    setQty('');
    setPrice('');
  }

  function handleRemoveItem(id: string) {
    setItems((prevState) =>
      prevState.filter((item) => item.id !== id)
    );
  }

  async function handleSaveQuote() {
    if (!title.trim() || !client.trim()) {
      Alert.alert(
        'Atenção',
        'Informe o título e o cliente.'
      );

      return;
    }

    if (discountValue < 0 || discountValue > 100) {
      Alert.alert(
        'Atenção',
        'O desconto deve estar entre 0% e 100%.'
      );

      return;
    }

    if (items.length === 0) {
      Alert.alert(
        'Atenção',
        'Adicione pelo menos um serviço.'
      );

      return;
    }

    const now = new Date().toISOString();

    const newQuote: QuoteDoc = {
      id: Date.now().toString(),
      title: title.trim(),
      client: client.trim(),
      items,
      discountPct: discountValue,
      status: QuoteStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    };

    await quoteStorage.save(newQuote);

    Alert.alert(
      'Sucesso',
      'Orçamento salvo com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Novo orçamento
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>
          Título
        </Text>

        <Input
          placeholder="Ex: Desenvolvimento de aplicativo"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>
          Cliente
        </Text>

        <Input
          placeholder="Nome do cliente"
          value={client}
          onChangeText={setClient}
        />

        <Text style={styles.label}>
          Desconto (%)
        </Text>

        <Input
          placeholder="0"
          keyboardType="numeric"
          value={discountPct}
          onChangeText={setDiscountPct}
        />

        <Text style={styles.sectionTitle}>
          Serviços
        </Text>

        <Text style={styles.label}>
          Descrição
        </Text>

        <Input
          placeholder="Ex: Desenvolvimento do aplicativo"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>
          Quantidade
        </Text>

        <Input
          placeholder="1"
          keyboardType="numeric"
          value={qty}
          onChangeText={setQty}
        />

        <Text style={styles.label}>
          Preço
        </Text>

        <Input
          placeholder="0,00"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>
            + Adicionar serviço
          </Text>
        </TouchableOpacity>

        {items.map((item) => (
          <View
            key={item.id}
            style={styles.item}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemDescription}>
                {item.description}
              </Text>

              <Text style={styles.itemDetails}>
                {item.qty} x {formatCurrency(item.price)}
              </Text>
            </View>

            <View style={styles.itemActions}>
              <Text style={styles.itemTotal}>
                {formatCurrency(item.qty * item.price)}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  handleRemoveItem(item.id)
                }
              >
                <Text style={styles.removeText}>
                  Remover
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal
            </Text>

            <Text style={styles.summaryValue}>
              {formatCurrency(subtotal)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Desconto ({discountValue}%)
            </Text>

            <Text style={styles.summaryValue}>
              {formatCurrency(discount)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveQuote}
        >
          <Text style={styles.saveButtonText}>
            Salvar orçamento
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}