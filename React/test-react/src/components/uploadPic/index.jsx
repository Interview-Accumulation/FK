import React, {useEffect, useState} from 'react'
import {Upload, Button} from 'antd'
import {UploadOutlined} from '@ant-design/icons'

export default function Index() {
    const [file, setFile] = useState(null)
    
    const uploadchange = (info) => {
        console.log(info)
    }
    const beforeUpload = (file) => {
        console.log(file)
        setFile(file)
        return false
    }
    useEffect(() => {
        const myWorker = new Worker(new URL('./worker.js', import.meta.url), {
            type: 'module'
        })
        myWorker.postMessage(file)
        myWorker.onmessage = (e) => {
            console.log('onmessage', e.data)
        }
    }, [file])

    
  return (
    <div>
        <Upload
            beforeUpload={beforeUpload}
            maxCount={1}
            showUploadList={false}
        >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    </div>
  )
}
