"use client";

import { styled } from "@mui/system";
import styles from "./transition.module.css"
import { useState } from "react";

/**
 * trasitionの練習
 * 
 * - transitionプロパティはkeyframesの設定が必要ない
 * 
 * - transitionプロパティはトリガーが必要!
 *    :hoverや:activeなど、要素が変化するためのトリガーが必要となります。
 * 
 * - transitionプロパティは詳細設定が出来ない
 *    transitionプロパティは変化前と変化後のつなぎ方を設定するのみなので、詳細設定は出来ません
 * 
 * - ※疑似クラスにtransitionの設定をしない
 *   transitionはもとのクラスに着ける
 * 
 * - ※transitionプロパティはdisplayプロパティには作用しない
 * 
 * 記事
 * https://zero-plus.io/media/css-transition/
 * https://www.asobou.co.jp/blog/web/css-animation3
 */


/**  
 * css modulesで実装
 * */

// hoverすると色が変わる
const HoverBlock = () => {
    return (
        <div className={styles.sample}>
            hoverすると色が変わる
        </div>
    )
}

/** 
 * mui styledで実装
*/

// click block
const Block1 = styled('div')`
    background-color: gray;
    user-select: none;
    transition: all 0.3s;

    &.active {
        background-color: lime;
    }
`

const ClickBlock = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <Block1
            className={isActive ? "active" : ""}
            onClick={() => setIsActive(!isActive)}
        >
            クリックすると色が変わる
        </Block1>
    )
}

// アコーディオン
const AccordionContainer = styled('div')`
    /* +マークを表示させるため */
    position:relative;

    width: 400px;
    border: 2px solid black;
`
const Input = styled('input')`
    display: none;
`
const Label = styled('label')`
    border: solid 1px #ccc;
    padding: 1em;
    display: block;
    color: #333;
    font-weight: bold;
   
    ::after{
        content: "";
        position: absolute;
        right: 1.25em;
        top: 1.25em;
        width: 2px;
        height: 0.75em;
        background-color: #999;
        transform: rotate(90deg);
        transition: all 0.3s;
    }

    ::before {
        content: "";
        position: absolute;
        right: 1.25em;
        top: 1.5em;
        width: 2px;
        height: 0.75em;
        background-color: #999;
        transform: rotate(90deg);
        transition: all 0.3s;
    }

    &.checked {
        ::after{
            transform: rotate(0deg);
            opacity: 0.3 ;
            top: 1.3em;
        }
        ::before {
            transform: rotate(180deg);
            opacity: 0;
        }
    }
`
const Content = styled('div')`
    max-height: 0;
    overflow: hidden;
    transition: all 0.6s ease;

    &.show {
        max-height: 400px;
    }
`

const Accordion = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    return (
        <div>
            <p>アコーディオン</p>

            <AccordionContainer>
                <Input
                    type="checkbox"
                    id="toggle1"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <Label
                    htmlFor="toggle1"
                    className={isChecked ? "checked" : ""}
                >
                    タイトル1 クリックして本文を表示
                </Label>

                <Content className={isChecked ? "show" : ""}>
                    <p>
                        ダミーテキストダミーテキストダミーテキストダミーテキスト<br />
                        ダミーテキストダミーテキストダミーテキストダミーテキスト<br />
                        ダミーテキストダミーテキストダミーテキストダミーテキスト<br />
                        ダミーテキストダミーテキストダミーテキストダミーテキスト<br />
                    </p>
                </Content>
            </AccordionContainer>

        </div>
    )
}


const Transition = () => {
    return (
        <div>
            <p>transitionの練習</p>

            <h4>css module</h4>

            <HoverBlock />

            <div className="spacer" style={{  height: "30px" }}></div>

            <h4>mui styled</h4>

            <ClickBlock />

            <div className="spacer" style={{  height: "30px" }}></div>

            <Accordion />
        </div>
    )
}

export default Transition
