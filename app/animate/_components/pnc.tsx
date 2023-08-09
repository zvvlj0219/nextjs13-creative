/**
 * push and chage order
 * 
 */

"use client";

import styles from "./pnc.module.css"
import { useState } from "react"

type Square = {
    id: number;
    orderIndex: number;
} 

const dummyData: Square[] = [
    {
        id: 1,
        orderIndex: 0
    },
    {
        id: 2,
        orderIndex: 1
    },
    {
        id: 3,
        orderIndex: 2
    },
    {
        id: 4,
        orderIndex: 3
    },
    // {
    //     id: 5,
    //     orderIndex: 4
    // },
]



const Pnc  = () => {
    // dummyデータと保存用のapiを作る
    const [squareData, setSquareData] = useState<Square[]>(dummyData)

    // 実験用のもので実際はapiを叩く
    const saveApi = (targetSquare: Square, direction: Direction): void => {
        const clikedSquare = squareData.find(data => {
            return data.id === targetSquare.id
        })


        if(!clikedSquare) {
            console.error('種別をフックできませんでした')
            return
        }

        switch(direction){
            case "left": {
                console.log('left')

                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex - 1
                })!

                const filteredData = squareData.filter(data => {
                    
                    return data.id !== clikedSquare.id && data.id !== pairedSquare.id
                }) 

                setSquareData(prevData => {
                
                    const updateData = [
                        ...filteredData,
                        {
                            id: clikedSquare.id,
                            orderIndex: clikedSquare.orderIndex - 1
                        },
                        {
                            id: pairedSquare?.id,
                            orderIndex: pairedSquare.orderIndex + 1
                        }
                    ]
                    console.log(updateData)


                    return updateData.sort((a, b) => {
                        if(a.orderIndex > b.orderIndex) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                })
        
                break;
            }
            case "right": {
                console.log('right')

                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex + 1
                })!

                const filteredData = squareData.filter(data => {
                    
                    return data.id !== clikedSquare.id && data.id !== pairedSquare.id
                }) 

                setSquareData(prevData => {
                
                    const updateData = [
                        ...filteredData,
                        {
                            id: clikedSquare.id,
                            orderIndex: clikedSquare.orderIndex + 1
                        },
                        {
                            id: pairedSquare?.id,
                            orderIndex: pairedSquare.orderIndex - 1
                        }
                    ]

                    console.log(updateData)

                    return updateData.sort((a, b) => {
                        if(a.orderIndex > b.orderIndex) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                })

                break;
            }
            case "lower left": {
                console.log('lower left')

                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex + 1
                })!

                const filteredData = squareData.filter(data => {
                    
                    return data.id !== clikedSquare.id && data.id !== pairedSquare.id
                }) 

                setSquareData(prevData => {
                
                    const updateData = [
                        ...filteredData,
                        {
                            id: clikedSquare.id,
                            orderIndex: clikedSquare.orderIndex + 1
                        },
                        {
                            id: pairedSquare?.id,
                            orderIndex: pairedSquare.orderIndex - 1
                        }
                    ]
                    console.log(updateData)


                    return updateData.sort((a, b) => {
                        if(a.orderIndex > b.orderIndex) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                })

                break;
            }
            case "upper right": {
                console.log('upper right')

                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex - 1
                })!

                const filteredData = squareData.filter(data => {
                    
                    return data.id !== clikedSquare.id && data.id !== pairedSquare.id
                }) 

                setSquareData(prevData => {
                
                    const updateData = [
                        ...filteredData,
                        {
                            id: clikedSquare.id,
                            orderIndex: clikedSquare.orderIndex - 1
                        },
                        {
                            id: pairedSquare?.id,
                            orderIndex: pairedSquare.orderIndex + 1
                        }
                    ]
                    console.log(updateData)


                    return updateData.sort((a, b) => {
                        if(a.orderIndex > b.orderIndex) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                })

                break;
            }
        }

        console.log(clikedSquare)
    }    

    return (
        <div
        >
            <p>this is pnc</p>
            {/* NumberTypeGroup */}
            <div className={styles.container}>
                {squareData.map((data, index )=> (
                    // ここから下がNumberType
                    <SqureElement
                        data={data} /** numberTypeProps */
                        key={data.id}
                        saveApi={saveApi} /** 実際はaxiosからapiを叩く */
                    />
                ))}
            </div> 
        </div>
    )
}

type Direction = "right" | "left" | "lower left" | "upper right"

const SqureElement = ({
    data,
    saveApi
}: {
    data: Square;
    saveApi: (targetSquare: Square, direction: Direction) => void;
}) => {
    const orderChange = (direction: Direction) => {
        saveApi(data, direction) // 実験用api
    }

    return (
        <div
        className={styles.square}
        >
            <div
                className="buttonArea"
            >
                {data.orderIndex % 2 === 0
                    ? data.orderIndex === 0
                        ? <button onClick={() => orderChange("right")}>
                            最初（右だけ）
                            </button> // 0 index
                        : dummyData.length % 2 === 0
                        ?   <>
                                <button  onClick={() => orderChange("right")}>右</button>
                                <button  onClick={() => orderChange("upper right")}>右上</button>
                            </>
                        : data.orderIndex !== dummyData.length - 1
                        ?  <>
                                <button  onClick={() => orderChange("right")}>右</button>
                                <button  onClick={() => orderChange("upper right")}>右上</button>
                            </>
                        : <button onClick={() => orderChange("upper right")}>最後（右上だけ）</button>
                    : null}

                {data.orderIndex % 2 !== 0
                ? data.orderIndex === dummyData.length - 1
                    ? <button onClick={() => orderChange("left")}>最後（左だけ）</button>
                    :   <>
                            <button onClick={() => orderChange("left")}>左</button>
                            <button onClick={() => orderChange("lower left")}>左下</button>
                        </>
                : null}

                <div>
                    <p>id: {data.id} </p>
                    {/* <p>top: </p>
                    <p>left: </p> */}
                </div>
            </div>
        </div>
    )
}

export default Pnc;