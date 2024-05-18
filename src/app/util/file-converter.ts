export const readFileAsBinary = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const arrayBuffer = event?.target?.result as ArrayBufferLike;
            const binaryData = new Uint8Array(arrayBuffer);

            resolve(binaryData);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}