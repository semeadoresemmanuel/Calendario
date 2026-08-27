import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePdfOptions {
  mode: 'light' | 'dark';
  elementId?: string;
  year?: string;
}

/**
 * Generates and downloads the dynamic calendar A4 PDF
 */
export async function downloadCalendarPdf({
  mode,
  elementId,
  year = '2026',
}: GeneratePdfOptions): Promise<void> {
  const targetId = elementId || `pdf-calendar-template-${mode}`;
  const element = document.getElementById(targetId);

  if (!element) {
    throw new Error(`Element #${targetId} not found in DOM`);
  }

  // Ensure fonts are loaded
  if (document.fonts) {
    await document.fonts.ready;
  }

  const isDark = mode === 'dark';
  const bgColor = isDark ? '#121212' : '#F7F7F7';

  // Render element to high-resolution canvas (scale: 3 gives ~300 DPI clarity for A4)
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    logging: false,
    backgroundColor: bgColor,
    windowWidth: 794, // 210mm in px at 96 DPI
    windowHeight: 1123, // 297mm in px at 96 DPI
  });

  const imgData = canvas.toDataURL('image/png');

  // Create A4 PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Add canvas image to fill exact A4 page
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

  // Download file
  const fileName = isDark
    ? `Calendário ${year} (Dark Mode).pdf`
    : `Calendário ${year} (Light Mode).pdf`;

  pdf.save(fileName);
}
