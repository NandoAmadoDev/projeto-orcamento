import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { QuoteDoc } from '@/types/Quote';
import {
  calculateSubtotal,
  calculateDiscount,
  calculateTotal,
} from '@/utils/calculateQuote';
import { formatCurrency } from '@/utils/formatCurrency';

export async function generateQuotePdf(quote: QuoteDoc) {
  const discountPct = quote.discountPct || 0;

  const subtotal = calculateSubtotal(quote.items);
  const discount = calculateDiscount(subtotal, discountPct);
  const total = calculateTotal(quote.items, discountPct);

  const services = quote.items
    .map(
      (item, index) => `
        <tr>
          <td class="number">${index + 1}</td>
          <td>${item.description}</td>
          <td class="center">${item.qty}</td>
          <td class="right">${formatCurrency(item.price)}</td>
          <td class="right strong">
            ${formatCurrency(item.qty * item.price)}
          </td>
        </tr>
      `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">

      <head>
        <meta charset="UTF-8">

        <style>

          @page {
            margin: 35px;
          }

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #062B43;
            margin: 0;
            padding: 0;
            font-size: 13px;
          }

          /* CABEÇALHO */

          .header {
            border-bottom: 4px solid #159FE5;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }

          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .document-title {
            font-size: 30px;
            font-weight: bold;
            color: #062B43;
            margin: 0;
          }

          .document-subtitle {
            color: #647985;
            font-size: 15px;
            margin-top: 6px;
          }

          .document-date {
            text-align: right;
            color: #647985;
            font-size: 12px;
            line-height: 1.6;
          }

          /* CLIENTE */

          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #062B43;
            margin-bottom: 10px;
          }

          .client-box {
            background-color: #EAF4F9;
            border: 1px solid #B7D7E7;
            border-radius: 8px;
            padding: 18px;
            margin-bottom: 28px;
          }

          .client-name {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .client-info {
            color: #425E6D;
            line-height: 1.7;
          }

          /* STATUS */

          .status {
            display: inline-block;
            margin-top: 8px;
            padding: 5px 10px;
            background-color: #DDF3FE;
            border: 1px solid #159FE5;
            border-radius: 5px;
            color: #076B9F;
            font-weight: bold;
            font-size: 11px;
          }

          /* TABELA */

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          thead {
            display: table-header-group;
          }

          th {
            background-color: #062B43;
            color: #FFFFFF;
            padding: 12px 10px;
            text-align: left;
            font-size: 12px;
          }

          td {
            padding: 13px 10px;
            border-bottom: 1px solid #D6E3EA;
            color: #243F4D;
          }

          tbody tr:nth-child(even) {
            background-color: #F4F8FA;
          }

          .number {
            width: 35px;
            color: #708590;
          }

          .center {
            text-align: center;
          }

          .right {
            text-align: right;
          }

          .strong {
            font-weight: bold;
            color: #062B43;
          }

          /* RESUMO */

          .summary-wrapper {
            display: flex;
            justify-content: flex-end;
            margin-top: 30px;
          }

          .summary {
            width: 330px;
            background-color: #F4F8FA;
            border: 1px solid #C7DCE6;
            border-radius: 8px;
            padding: 18px;
          }

          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 7px 0;
            color: #425E6D;
          }

          .summary-row strong {
            color: #062B43;
          }

          .total {
            margin-top: 10px;
            padding-top: 15px;
            border-top: 2px solid #159FE5;
            color: #062B43;
            font-size: 21px;
            font-weight: bold;
          }

          .total-value {
            color: #076B9F;
          }

          /* RODAPÉ */

          .footer {
            margin-top: 55px;
            padding-top: 15px;
            border-top: 1px solid #D6E3EA;
            text-align: center;
            color: #8497A1;
            font-size: 10px;
          }

        </style>
      </head>

      <body>

        <!-- CABEÇALHO -->

        <div class="header">

          <div class="header-top">

            <div>
              <div class="document-title">
                ORÇAMENTO
              </div>

              <div class="document-subtitle">
                ${quote.title}
              </div>
            </div>

            <div class="document-date">
              Emitido em<br>
              <strong>
                ${new Date().toLocaleDateString('pt-BR')}
              </strong>
            </div>

          </div>

        </div>


        <!-- CLIENTE -->

        <div class="section-title">
          Dados do orçamento
        </div>

        <div class="client-box">

          <div class="client-name">
            ${quote.client}
          </div>

          <div class="client-info">

            <div>
              <strong>Título:</strong>
              ${quote.title}
            </div>

            <div>
              <strong>Criado em:</strong>
              ${new Date(quote.createdAt).toLocaleDateString('pt-BR')}
            </div>

          </div>

          <div class="status">
            ${quote.status}
          </div>

        </div>


        <!-- SERVIÇOS -->

        <div class="section-title">
          Serviços
        </div>

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th class="center">Qtd.</th>
              <th class="right">Valor unitário</th>
              <th class="right">Total</th>
            </tr>
          </thead>

          <tbody>
            ${services}
          </tbody>

        </table>


        <!-- TOTAIS -->

        <div class="summary-wrapper">

          <div class="summary">

            <div class="summary-row">
              <span>Subtotal</span>

              <strong>
                ${formatCurrency(subtotal)}
              </strong>
            </div>

            <div class="summary-row">
              <span>
                Desconto (${discountPct}%)
              </span>

              <strong>
                - ${formatCurrency(discount)}
              </strong>
            </div>

            <div class="summary-row total">

              <span>
                TOTAL
              </span>

              <span class="total-value">
                ${formatCurrency(total)}
              </span>

            </div>

          </div>

        </div>


        <!-- RODAPÉ -->

        <div class="footer">
          Orçamento gerado eletronicamente
        </div>

      </body>

    </html>
  `;

  const { uri } = await Print.printToFileAsync({
    html,
  });

  const canShare = await Sharing.isAvailableAsync();

  if (canShare) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: `Orçamento - ${quote.title}`,
      UTI: 'com.adobe.pdf',
    });
  }
}