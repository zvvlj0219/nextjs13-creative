import Link from "next/link"

export default function Home(){
  return (
    <div>
      <p>ホーム画面</p>

      <hr />

      <ul>

        <li><Link href={"/mui-system"}>mui-system</Link></li>

        <li><Link href={"/animate"}>animte</Link></li>

      </ul>

    </div>
  )
}