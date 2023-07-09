"use client";

import { css, styled, width } from "@mui/system";
import styles from "./transition.module.css"
import { useRef, useState, useEffect, useMemo } from "react";

const SquareContainer = styled('div')`
    background-color: #f0f0f0;
    padding: 10px 0;
`
const Square1 = styled('div')(() => {
    return css`
        width: 300px;
        height: 300px;
        background-color: lightgreen;
        margin: 10px;
    `
})
const Square2 = styled('div')(() => {
    return css`
        width: 300px;
        height: 300px;
        background-color: lightblue;
        margin: 10px;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.5s;

        &.show {
            opacity: 1;
            transform: translateX(0)
        }
    `
})
const Square3 = styled('div')(() => {
    return css`
        width: 300px;
        height: 300px;
        background-color: lightpink;
        margin: 10px;
        overflow-y: scroll;
        position: relative;
    `
})

/**
 * ■Reactでは、レンダリング後にjavascript（useStateとか）を実行するが、
 * レンダリングに必要なjsは実行されてから、レンダリングする（はず）なので、
 * 意図した挙動にならない場合がある。特にスクロール、リサイズ系!!!
 * ※基本的に、reactコンポーネントでは、useEffectとaddEventListenerが必要になる。
 * かつ、jsx・js（hookなし）は動かないことのほうが多いと思っていい。
 * 
 * （以下、ChatGPT）
 * Reactのコンポーネント内でwindow.scrollYを直接使用すると、
 * 初期描画時に正しいスクロール位置を取得できない場合があります。
 * これは、Reactコンポーネントの初期描画時にはまだDOMが完全に構築されておらず、
 * スクロール位置の情報が利用できないためです。
 * 
 * めも
 * ①window.pageYOffsetは非推奨なので、window.scrollYを使おう
 * ②document.body.scrollTop, document.documentElement.scrollTopは、
 *  htmlかbodyの高さを取得するだけなので意味ない
 * ③offsetTopはuseStateに入れない方がいい!!!
 */

const ScrollPage = () => {
    // スクロール量 useStateは使わなくてもできる
    const [scrollTop, setScrollTop]  = useState<number>(0);

    // ブラウザの高さ
    // これはuseEffectの中じゃなくてもいい
    const innerHeight = window.innerHeight 

    // square1
    const square1Ref = useRef<HTMLDivElement>(null)
    // squre1 の高さを保持
    const [square1Top, setsquare1Top] = useState<number>(0);


    // square2
    const square2Ref = useRef<HTMLDivElement>(null)
    // square2を表示するかのフラグ
    const [isShowSquare2, setIsShowSquare2] = useState<boolean>(false);

    // square3 
    const square3Ref = useRef<HTMLDivElement>(null)

    const handleScroll3 = () => {
        console.log("scrolltop", square3Ref.current?.scrollTop); // 要素内のスクロール量
        console.log(square3Ref.current?.offsetTop); // ブラウザの一番上からの距離
        console.log(square3Ref.current?.offsetHeight); // 要素の高さ（見えているところだけ）
        console.log(square3Ref.current?.scrollHeight); // 要素からはみ出ているノード込みでの高さ
    };
      
    useEffect(() => {
        const element = square3Ref.current;
        element?.addEventListener("scroll", handleScroll3);
        
        return () => {
            element?.removeEventListener("scroll", handleScroll3);
        };
    }, []);

    const handleScroll = () => {
        // スクロール量
        setScrollTop(window.scrollY)

        // console.log('callesd scroll')

        if(square1Ref.current){
            const top = square1Ref.current.offsetTop
            setsquare1Top(top)
        }
        
        if(square2Ref.current){
            // square2の上からの高さ ちなみに要素の高さはoffsetHeight
            const square2Top = square2Ref.current.offsetTop

            // console.log(square2Top,window.scrollY,innerHeight)

            // square2が見えるところまでスクロールしているか
            if(square2Top < (window.scrollY + innerHeight)){
                console.log('show square2')
                setIsShowSquare2(true)
            } else {
                console.log('hide square2')
                setIsShowSquare2(false)
            }
        }

    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // これで、呼び出したスクロールも、handleScrollで監視できる！
        // window.scrollTo({
        //     top: 1200,
        //     behavior: "smooth"
        // })

        // コンポーネントのクリーンアップ時にイベントリスナーを削除する
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div>
            <p>スクロールの練習</p>
            <div>
                <p>スクロールTOP (ページのトップから、ブラウザで見えてる範囲の一番上までほ長さ=一番上からスクロールした距離)</p>
                <span id="span1">{scrollTop}</span>
                <p>ブラウザの高さ</p>
                <span id="span2">{innerHeight}</span>
            </div>

            <SquareContainer>
                <p>この要素のページ一番上からの距離</p>
                <Square1 ref={square1Ref}>
                    {square1Top}
                </Square1>

                <p>スクロールしたら見えます</p>
                <Square2 ref={square2Ref} className={isShowSquare2 ? "show" : ""}>
                    スクロールしたら見えます
                </Square2>

                <Square3
                    ref={square3Ref}
                >
                    {Array.from({ length: 20 }, (ele, index) => (<div key={index}>ダミーテキスト{index}<br /></div>))}     
                </Square3>
            </SquareContainer>

        </div>
    )
}

export default ScrollPage
