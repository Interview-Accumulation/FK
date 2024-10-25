// webworker进行切片的md5计算
// 通过postMessage返回计算结果
// 通过onmessage接收计算请求
// 通过terminate终止计算
// 通过close关闭worker

importScripts('spark-md5.min.js'); 