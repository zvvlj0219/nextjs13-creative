"use client"

import { ReactNode, useState } from "react"
import ServerComponent3 from "./ServerComponent3"

/**
 * 
 * client componentでは、server componentをインポートとそのserver componentは
 * client componentになってしまう（client boundleにとみなされる）
 * 
 * childrenを穴をマークするだけだと,なかのserver componentはサーバー側で
 * レンダリングされたhtmlが入ってくる
 * 
 */

const ClientComponent = ({ children}: {children: ReactNode}) => {
    const [count, setCount] = useState<number>(0)

    console.log("clientcomponentはサーバーとクライアントの両方で実行される") 
    // ログがサーバーとクライアントの両方ででる

    return (
        <div>
            <div>
                <h2>{count}</h2>
                <div onClick={() => setCount(count + 1)}>increment</div>
                <p>↓はクライアントコンポーネントになってしまう</p>
                {/* servercomponentをcient componentでインポートしたら、
                    client boundleとみなされてしまう
                    
                    そのため、stateをpropsとして、渡すことができる
                */}
                {/* <ServerComponent3 /> */}
                <ServerComponent3 count={count} />
            </div>

            {/*このなかはhtmlになっている  */}
            {/* もうhtmlになっているものにstateは渡せない */}
            {children}

        </div>
    )
}

export default ClientComponent
