"use client"

import { useState } from "react"

const Count = () => {
    const [count, setCount] = useState<number>(0)

    return (
        <div>
            <h2>{count}</h2>
            <div onClick={() => setCount(count + 1)}>increment</div>
            <div onClick={() => setCount(0)}>reset</div>

        </div>
    )
}

export default Count
