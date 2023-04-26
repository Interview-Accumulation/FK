// import react from "react";

const MemoFunc = (props) => {
    const {list} = props
    // 防抖
    // const debounceFunc = (func, wait) => {
    //     let timer = null
    //     return function () {
    //         if (timer) {
    //             clearTimeout(timer)
    //         }
    //         timer = setTimeout(() => {
    //             func.apply(this, arguments)
    //         }, wait)
    //     }
    // }

    return (
        <div>
            {
                list.map((item, index) => (
                    <p key={index}>{item.name}</p>
                )) 
            }
        </div>
    )
}
export default MemoFunc