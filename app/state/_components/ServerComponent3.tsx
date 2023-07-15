// "use client" 

//  import { memo } from "react"
// const ServerComponent3 = memo(() => {
//     console.log('このコンポーネントはclient boundleに含まれてしまう')
//     return (
//         <div>
//             <p>このコンポーネントはclient boundleに含まれてしまう </p>
//         </div>
//     )
// })


const ServerComponent3 = ({count}: {count: number}) => {
    console.log('このコンポーネントはclient boundleに含まれてしまう')
    return (
        <div>
            <p>このコンポーネントはclient boundleに含まれてしまう {count}</p>
        </div>
    )
}

export default ServerComponent3
