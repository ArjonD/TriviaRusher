import { decode } from 'he';

export function decodeText(text: string) {
    return decode(text);
}