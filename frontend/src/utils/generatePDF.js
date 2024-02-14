import jsPDF from 'jspdf';

const generatePDF = invoice => {
  const doc = new jsPDF();

  doc.text(20, 20, 'Invoice');

  // Client details
  doc.text(20, 30, `Client: ${invoice?.clientId.name}`);
  doc.text(20, 40, `Email: ${invoice?.clientId.email}`);
  doc.text(20, 50, `Phone number: ${invoice?.clientId.phone}`);

  // Invoice items
  let startY = 70;
  doc.text(20, startY, 'Item');
  doc.text(80, startY, 'Rate');
  doc.text(150, startY, 'Hours');
  startY += 10;
  invoice?.items.forEach((item, index) => {
    doc.text(20, startY + index * 10, item.item);
    doc.text(80, startY + index * 10, `$${item.rate.toFixed(2).toString()}`);
    doc.text(150, startY + index * 10, item.hours.toString());
  });

  // Total
  doc.text(80, startY + invoice.items.length * 10 + 10, 'Total');
  doc.text(
    150,
    startY + invoice?.items.length * 10 + 10,
    `$${invoice?.totalAmount.toFixed(2).toString()}`
  );

  const pdfPath = 'invoice.pdf';
  doc.save(pdfPath);
};

export default generatePDF;
