import SparkMD5 from 'spark-md5';

// 在webwoker中计算分片hash

onmessage = function  (e) {
    const file = e.data;
    if(!file.size) return;
    console.log('file', file, !file.size);
    const chunkSize = 1024 * 1024;
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    let currentChunk = 0;
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    const chunks = Math.ceil(file.size / chunkSize);
    reader.onload = function (e) {
        spark.append(e.target.result);
        console.log('chunk', currentChunk + 1, 'of', chunks);
        currentChunk++;
        if (currentChunk < chunks) {
            loadNext();
        } else {
            console.log('hash', spark.end());
            postMessage({
                hash: spark.end()
            });
        }
    };
    const loadNext = async function () {
        const start = currentChunk * chunkSize;
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        const newFile = new File([blobSlice.call(file, start, end)], file.name, {
            type: file.type,
        });
        const sliceFile = blobSlice.call(file, start, end)
        const sliceMd5 = await getfileHash(newFile);
        reader.readAsArrayBuffer(sliceFile);
    };
    loadNext();
}

const getfileHash = (file) => {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer();
        const reader = new FileReader();
        reader.onload = function (e) {
            spark.append(e.target.result);
            resolve(spark.end());
        };
        reader.onerror = function () {
            reject('error');
        }
    })
}
