/**
 * push and chage order
 * 
 */

"use client";

import styles from "./pnc.module.css"
import { useState, useEffect, useCallback, useRef } from "react"

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
    {
        id: 5,
        orderIndex: 4
    },
]

/**
 * 個々のスクエアの座標
 */
interface SquarePosition {
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
    // 並び替えでクリックされた要素の座標
    clickedPosition: SquarePosition | null;
    // 並び替えで、クリックされた要素の対になる要素（一緒に動くやつ）のインデクス
    pairedSquareIndex: number | null;
    // 並び替えで、クリックされた要素の対になる要素（一緒に動くやつ）の座標
    pairedPosition: SquarePosition | null;
}


// ここがNumberTypeGroup
const Pnc  = () => {
    // 実験用のもので実際はapiを叩く 中身分解しないと

    return (
        <div className="">{/* NumberTypeGroup */}
            <p>this is pnc</p>
            {/* wrapper */}
            <SquareElementWrapper squares={dummyData} />
        </div>
    )
}

// NumberTypeをラップするコンポーネント
type SquareElementWrapperProps = {
    squares: Square[]
}
const SquareElementWrapper: React.FC<SquareElementWrapperProps> = ({ squares }) => {
    // squareのデータを保持する 
    const [squareData, setSquareData] = useState<Square[]>(squares)

    // squareの並び替えのメインの処理
    const handleSquareCustomOrder = (
        /** クリックされたスクエア */
        square: Square,
        /** 並び替える方向 */
        direction: Direction,
        /** クリックされたスクエアの座標 */
        position: SquarePosition
    ): void => {
        const clikedSquare = squareData.find(_square => {
            return _square.id === square.id
        })


        if(!clikedSquare) {
            console.error('種別をフックできませんでした')
            return
        }

        switch(direction){
            case "left": {
                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex - 1
                })!

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex,
                    pairedPosition: null,
                    clickedPosition: position
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
                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex + 1
                })!

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex,
                    pairedPosition: null,
                    clickedPosition: position
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
                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex + 1
                })!

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex,
                    pairedPosition: null,
                    clickedPosition: position
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
                const pairedSquare = squareData.find(data => {
                    return data.orderIndex === clikedSquare.orderIndex - 1
                })!

                updateCustomOrderState({
                    isActiveCustomOrder: true,
                    clickedSquareIndex: clikedSquare.orderIndex,
                    pairedSquareIndex: pairedSquare.orderIndex,
                    pairedPosition: null,
                    clickedPosition: position
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

        setTimeout(() => {
            updateCustomOrderState({
                isActiveCustomOrder: false,
                clickedSquareIndex: null,
                clickedPosition: null, 
                pairedSquareIndex: null,
                pairedPosition: null
            })
        }, 1000)
    }

    // 親側で並び替えの状態を管理する
    const [customOrderState, setCustomOrderState] = useState<CustomOrderState>({
        isActiveCustomOrder: false,
        clickedSquareIndex: null,
        pairedSquareIndex: null,
        clickedPosition: null,
        pairedPosition: null
    })

    // 並び替えの実行の前後に、これを実行する
    const updateCustomOrderState = useCallback((newState: CustomOrderState): void => {
        setCustomOrderState(newState)
    },[])

    console.log('customOrderState', customOrderState)

    return (
        <div className={styles.container}>
            {squareData.map((square, index )=> (
                // ここから下がNumberType
                <SqureElement
                    key={square.id}
                    square={square} /** numberTypeProps */
                    squaresLength={squareData.length}
                    handleSquareCustomOrder={handleSquareCustomOrder} /** 実際はaxiosからapiを叩く */
                    customOrderState={customOrderState}
                    updateCustomOrderState={updateCustomOrderState}
                />
            ))}
        </div>
    )
}

type Direction = "right" | "left" | "lower left" | "upper right"


// ここがNumberType
type SquareElementProps = {
    square: Square;
    squaresLength: number;
    handleSquareCustomOrder: (square: Square, direction: Direction, position: SquarePosition) => void;
    customOrderState: CustomOrderState;
    updateCustomOrderState: (newState: CustomOrderState) => void
}
const SqureElement: React.FC<SquareElementProps> = ({
    square,
    squaresLength,
    handleSquareCustomOrder,
    customOrderState,
    updateCustomOrderState
}) => {
    const squareRef = useRef<HTMLDivElement>(null);

    // 親側のメインの処理を発火させる
    const emitSquareCustomOrder = (direction: Direction) => {
        if(!squareRef.current) return

        handleSquareCustomOrder(
            square,
            direction,
            {
                top: squareRef.current.offsetTop,
                left: squareRef.current.offsetLeft
            }
        )
    }

    const {
        isActiveCustomOrder,
        pairedSquareIndex,
        clickedSquareIndex,
        clickedPosition,
    } = customOrderState

    useEffect(() => {
        if(isActiveCustomOrder){
            if(square.orderIndex === pairedSquareIndex){
                if(!squareRef.current) return;

                updateCustomOrderState({
                    isActiveCustomOrder,
                    pairedSquareIndex,
                    clickedSquareIndex,
                    clickedPosition,
                    pairedPosition: {
                        top: squareRef.current.offsetTop,
                        left: squareRef.current.offsetLeft
                    }
                })
            }
        }
    }, [clickedPosition, clickedSquareIndex, isActiveCustomOrder, pairedSquareIndex, square.orderIndex, updateCustomOrderState])

    return (
        <div
            className={styles.square}
            ref={squareRef}
        >
            <div
                className="buttonArea"
            >
                {square.orderIndex % 2 === 0
                    ? square.orderIndex === 0
                        ? <button onClick={() => emitSquareCustomOrder("right")}>
                            最初（右だけ）
                            </button> // 0 index
                        : squaresLength % 2 === 0
                        ?   <>
                                <button  onClick={() => emitSquareCustomOrder("right")}>右</button>
                                <button  onClick={() => emitSquareCustomOrder("upper right")}>右上</button>
                            </>
                        : square.orderIndex !== squaresLength - 1
                        ?  <>
                                <button  onClick={() => emitSquareCustomOrder("right")}>右</button>
                                <button  onClick={() => emitSquareCustomOrder("upper right")}>右上</button>
                            </>
                        : <button onClick={() => emitSquareCustomOrder("upper right")}>最後（右上だけ）</button>
                    : null}

                {square.orderIndex % 2 !== 0
                ? square.orderIndex === squaresLength - 1
                    ? <button onClick={() => emitSquareCustomOrder("left")}>最後（左だけ）</button>
                    :   <>
                            <button onClick={() => emitSquareCustomOrder("left")}>左</button>
                            <button onClick={() => emitSquareCustomOrder("lower left")}>左下</button>
                        </>
                : null}

                <div>
                    <p>id: {square.id} </p>
                </div>
            </div>
        </div>
    )
}

export default Pnc;