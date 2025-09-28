
// @ts-nocheck
// Disabling TypeScript check for this file because we are using a global jsPDF object from a CDN script.
// A better solution in a full project would be to use npm and import types.

interface CreateSheetOptions {
  imageUrl: string;
  paperSize: '4x6' | 'A4';
  format: 'jpeg' | 'pdf';
}

const DPI = 300;

const PAPER_SIZES = {
  '4x6': { width: 4 * DPI, height: 6 * DPI, cols: 2, rows: 3 }, // 1200x1800
  'A4': { width: 8.27 * DPI, height: 11.69 * DPI, cols: 4, rows: 2 }, // approx 2480x3508
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => {
        console.error("Image loading failed for canvas processing", err);
        reject(new Error('فشل تحميل الصورة للمعالجة'));
    };
    img.src = src;
  });
};

export const createPrintableSheet = async ({ imageUrl, paperSize, format }: CreateSheetOptions): Promise<string> => {
  const img = await loadImage(imageUrl);
  const spec = PAPER_SIZES[paperSize];
  
  // For A4, we arrange 8 photos horizontally (4 columns, 2 rows)
  const isA4Horizontal = paperSize === 'A4';
  const paperWidth = isA4Horizontal ? spec.height : spec.width;
  const paperHeight = isA4Horizontal ? spec.width : spec.height;
  const cols = isA4Horizontal ? spec.cols : spec.rows;
  const rows = isA4Horizontal ? spec.rows : spec.cols;

  const canvas = document.createElement('canvas');
  canvas.width = paperWidth;
  canvas.height = paperHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('لا يمكن الحصول على سياق لوحة الرسم');
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, paperWidth, paperHeight);

  const photoSlotWidth = paperWidth / cols;
  const photoSlotHeight = paperHeight / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * photoSlotWidth;
      const y = row * photoSlotHeight;
      const hRatio = photoSlotWidth / img.width;
      const vRatio = photoSlotHeight / img.height;
      const ratio = Math.min(hRatio, vRatio) * 0.95; // 95% scale for padding
      const centerShift_x = (photoSlotWidth - img.width * ratio) / 2;
      const centerShift_y = (photoSlotHeight - img.height * ratio) / 2;
      
      ctx.drawImage(
        img, 0, 0, img.width, img.height,
        x + centerShift_x, y + centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  }

  if (format === 'pdf') {
    const { jsPDF } = window.jspdf;
    const orientation = isA4Horizontal ? 'landscape' : 'portrait';
    const pdf = new jsPDF(orientation, 'in', paperSize === 'A4' ? 'a4' : [4, 6]);
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    return pdf.output('datauristring');
  } else {
    return canvas.toDataURL('image/jpeg', 0.95);
  }
};


export const createCompressedImage = async (imageUrl: string): Promise<string> => {
    const img = await loadImage(imageUrl);

    const canvas = document.createElement('canvas');
    // Keep original dimensions for the compressed version
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
        throw new Error('لا يمكن الحصول على سياق لوحة الرسم');
    }

    ctx.drawImage(img, 0, 0);

    // Export as JPEG with 70% quality for web compression
    return canvas.toDataURL('image/jpeg', 0.7);
};
