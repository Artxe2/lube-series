export {}

declare global {
    interface String {
        /**
         * Returns the Unicode value of the character at the specified location.
         * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.
         */
        charCodeAt(index?: number): number;
    }
}