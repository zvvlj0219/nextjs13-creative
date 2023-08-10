/**
 * push and chage order
 * 
 */

"use client";

import styles from "./pnc.module.css"
import { useState, useEffect, useMemo, useCallback, useRef } from "react"

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

/**
 * 個々のスクエアの座標
 */
interface OrderPosition {
    top: number;
    left: number;
}

/**
 * 並び替えのイベントの状態
 */
interface CustomOrderState {
    // 並び替えを実行中かどうか
    isActiveCustomOrder: boolean;
    // 並び替えでクリックされた要素のインデクス
    clickedSquareIndex: number | null;
    // 並び替えで、クリックされた要素の対になる要素（一緒に動くやつ）のインデクス
    pairedSquareIndex: number | null;
}


const Pnc  = () => {
    // dummyデータと保存用のapiを作る
    const [squareData, setSquareData] = useState<Square[]>(dummyData)

    // 実験用のもので実際はapiを叩く 中身分解しないと
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

                console.log({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                /////以下は実験用のapiの処理

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

                console.log({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                /////以下は実験用のapiの処理

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

                console.log({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                /////以下は実験用のapiの処理

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

                console.log({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex
                })

                /////以下は実験用のapiの処理

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
    }

    const [customOrderState, setCustomOrderState] = useState<CustomOrderState>({
        isActiveCustomOrder: false,
        clickedSquareIndex: null,
        pairedSquareIndex: null
    })

    // 並び替えの実行の前後に、これを実行する
    const updateCustomOrderState = (newState: CustomOrderState): void => {
        const {
            clickedSquareIndex,
            pairedSquareIndex,
            isActiveCustomOrder
        } = newState;

        setCustomOrderState({
            clickedSquareIndex,
            pairedSquareIndex,
            isActiveCustomOrder
        })
    }

    return (
        <div
        >
            {/* NumberTypeGroup */}
            <p>this is pnc</p>
            {/* wrapper */}
            <div className={styles.container}>
                {squareData.map((data, index )=> (
                    // ここから下がNumberType
                    <SqureElement
                        data={data} /** numberTypeProps */
                        key={data.id}
                        saveApi={saveApi} /** 実際はaxiosからapiを叩く */
                        customOrderState={customOrderState}
                        updateCustomOrderState={updateCustomOrderState}
                    />
                ))}
            </div> 
        </div>
    )
}

type Direction = "right" | "left" | "lower left" | "upper right"

const SqureElement = ({
    data,
    saveApi,
    customOrderState,
    updateCustomOrderState
}: {
    data: Square;
    saveApi: (targetSquare: Square, direction: Direction) => void; // 実験用
    customOrderState: CustomOrderState;
    updateCustomOrderState: (newState: CustomOrderState) => void;
}) => {
    const squareRef = useRef<HTMLDivElement>(null);

    
    const orderChange = (direction: Direction) => {
        saveApi(data, direction) // 実験用api

        const rect = squareRef.current?.getBoundingClientRect();


        console.log('clicked', "index",data.orderIndex)
        console.log('clicked', { 
            top: rect?.top,
            left: rect?.left
        })
    }

    const {
        isActiveCustomOrder,
        pairedSquareIndex,
        clickedSquareIndex
    } = customOrderState

    useEffect(() => {
        if(isActiveCustomOrder){
            console.log(
                'useEffect',
                'pairedSquareIndex',pairedSquareIndex,
                'clickedSquareIndex',clickedSquareIndex
            )
            if(data.orderIndex === pairedSquareIndex){
                const rect = squareRef.current?.getBoundingClientRect();

                console.log('pair', data.orderIndex)
                console.log("pair", { 
                    top: rect?.top,
                    left: rect?.left
                })
            }
        }
    }, [clickedSquareIndex, data.id, data.orderIndex, isActiveCustomOrder, pairedSquareIndex])

    return (
        <div
            className={styles.square}
            ref={squareRef}
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