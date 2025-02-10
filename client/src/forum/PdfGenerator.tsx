import { jsPDF } from "jspdf";

// Definiši tip propova
interface PdfGeneratorProps {
  content: string; // Ovdje prosljeđuješ tekst koji će biti u PDF-u
  title: string; // Naslov PDF-a
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ content, title }) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(12); // Podesi veličinu fonta
    doc.setTextColor(0, 0, 0); // Boja teksta
    const lines = doc.splitTextToSize(content, 120); // 180 je širina u kojoj tekst prelazi

    // Dodaj podeljeni tekst u PDF, liniju po liniju
    doc.text(lines, 10, 15);
    // Dodaj sadržaj u PDF (tu možeš dodati i stilizovanje po želji)

    // Spasi PDF sa imenom koje je proslijeđeno kao prop 'title'
    doc.save(`${title}.pdf`);
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default PdfGenerator;
