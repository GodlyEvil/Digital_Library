export class Book {

    author:string;
    title:string;
    imagePath: string;
    link: string;

    constructor(title: string, author:string, formats:any) {
        this.title = title;
        this.author = author || '';
        this.imagePath = formats['image/jpeg'];
        this.link = this.extractHyperlink(formats, title);
    }

    private extractHyperlink(formats: any, title:string): string {
        let htmlFormat: string;
        let pdfFormat: string;
        let textFormat: string;
        for (let format in formats) {
            switch (format) {
                case 'text/html':
                case 'text/html; charset=us-ascii':
                case 'text/html; charset=iso-8859-1':
                case 'text/html; charset=utf-8':
                    if (formats[format].endsWith('.htm') || formats[format].endsWith('.html')) htmlFormat = formats[format];
                    break;
                case 'application/pdf':
                    if (formats[format].endsWith('.pdf')) pdfFormat = formats[format];
                    break;
                case 'text/plain; charset=iso-8859-1':
                case 'text/plain; charset=us-ascii':
                case 'text/plain; charset=utf-8':
                case 'text/plain':
                    if (formats[format].endsWith('.txt')) textFormat = formats[format];
                    break;
                default:
                    break;
            }
        }
        return htmlFormat || pdfFormat || textFormat || '#';
    }
}