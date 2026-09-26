# 📋 Projeto Orçamento

Aplicativo mobile desenvolvido em **React Native com Expo e TypeScript** para criação e gerenciamento de orçamentos.

O projeto permite cadastrar clientes, adicionar serviços, calcular valores automaticamente, aplicar descontos, controlar o status dos orçamentos e armazenar os dados localmente no dispositivo.

Também foi implementada a geração de **orçamentos em PDF**, permitindo compartilhar, salvar ou imprimir o documento.

---

## 🚀 Funcionalidades

- Criar novos orçamentos
- Informar título e cliente
- Adicionar múltiplos serviços
- Informar descrição, quantidade e valor unitário
- Remover serviços do orçamento
- Cálculo automático do subtotal
- Aplicação de desconto percentual
- Cálculo automático do valor total
- Salvar orçamentos localmente
- Filtrar orçamentos por status
- Ordenar por mais recentes ou mais antigos
- Persistir filtros e ordenação selecionados
- Alterar o status do orçamento
- Duplicar orçamento
- Excluir orçamento com confirmação
- Gerar orçamento em PDF
- Compartilhar, salvar ou imprimir o PDF

---

## 📌 Status dos orçamentos

Os orçamentos podem possuir os seguintes status:

- **Rascunho**
- **Enviado**
- **Aprovado**
- **Recusado**

O fluxo permite alterar um orçamento de:

```text
Rascunho → Enviado

Enviado → Aprovado
        → Recusado
```

---

## 💰 Cálculo do orçamento

Cada serviço possui:

```text
Descrição
Quantidade
Valor unitário
```

O subtotal é calculado pela soma dos serviços:

```text
Quantidade × Valor unitário
```

Quando informado um desconto:

```text
Desconto = Subtotal × Percentual / 100
```

O total final é:

```text
Total = Subtotal - Desconto
```

---

## 📄 Geração de PDF

O aplicativo permite gerar um documento PDF contendo:

- Título do orçamento
- Cliente
- Status
- Data de criação
- Data de emissão
- Serviços
- Quantidades
- Valores unitários
- Total por serviço
- Subtotal
- Desconto
- Valor total

Após a geração, o PDF pode ser compartilhado utilizando os recursos nativos do dispositivo.

---

## 💾 Persistência de dados

Os dados são armazenados localmente utilizando **AsyncStorage**.

São persistidos:

- Orçamentos
- Serviços
- Status
- Filtro selecionado
- Ordenação selecionada

Dessa forma, os dados permanecem disponíveis mesmo após fechar e abrir novamente o aplicativo.

---

## 🛠️ Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Expo Print
- Expo Sharing

---

## 📁 Estrutura principal

```text
src/
├── app/
│   ├── Home/
│   └── NewQuote/
│
├── components/
│   └── Input/
│
├── routes/
│   ├── index.tsx
│   └── stack.routes.tsx
│
├── storage/
│   ├── quoteStorage.ts
│   └── filterStorage.ts
│
├── types/
│   └── Quote.ts
│
└── utils/
    ├── calculateQuote.ts
    ├── formatCurrency.ts
    └── generateQuotePdf.ts
```

---

## ▶️ Executando o projeto

Clone o repositório:

```bash
git clone https://github.com/NandoAmadoDev/projeto-orcamento.git
```

Entre na pasta:

```bash
cd Projeto_Orcamento
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Para executar o projeto Android utilizando o development build:

```bash
npx expo run:android
```

---

## 📱 Principais telas

### Home

Tela responsável pela listagem e gerenciamento dos orçamentos.

Permite:

- Filtrar
- Ordenar
- Alterar status
- Duplicar
- Gerar PDF
- Excluir

### Novo Orçamento

Tela utilizada para cadastrar um novo orçamento.

Permite informar os dados do cliente, adicionar serviços, aplicar desconto e visualizar os valores calculados antes de salvar.

---

## 🎯 Objetivo

Projeto desenvolvido como desafio prático para aplicação dos fundamentos de desenvolvimento mobile com **React Native**, incluindo:

- Componentização
- Estados
- Tipagem com TypeScript
- Navegação
- Persistência local
- Manipulação de listas
- Regras de negócio
- Geração de documentos

---

## 👨‍💻 Autor

Desenvolvido por **Fernando Amado**.