using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using System.IO;

public class PdfService
{
    public void CreatePdf(string filePath)
    {
        using (var writer = new PdfWriter(filePath))
        {
            using (var pdf = new PdfDocument(writer))
            {
                var document = new Document(pdf);
                document.Add(new Paragraph("Hello, this is a sample PDF!"));
            }
        }
    }
}
