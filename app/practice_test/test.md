# next.jsでテストの環境を作る

## 前提
- テストとは
    - テストは、ソフトウェアの品質を確保し、予期しないバグや問題を見つけるために行われる活動
    - 開発者が自身のコードが正しく動作するかどうかを確認するための手段です
- jestはテストランナー（テストを実行する）
- testing libraryはテストを行うためのツールセット
- テストはjestもtesting library両方使って書いている
    - describeとかtest/itかはjestの機能 
    - renderはtesting libraryの機能
- Jest と React Testing Library は単体テストに使う
- swc(rust コンパイラ)を使う用法、babelを使う方法がある
    - swcがいい（多分
- Jest は、次の一般的な命名規則のいずれかを持つテスト ファイルを検索する
    - `__test__`フォルダないのファイル(ts,tsx,js,jsx)
    - **.test.tsのように`.test`があるファイル
    - **.spec.tsのように`.spec`があるファイル

### ドキュメント
- [公式ドキュメント](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler)

## 設定内容

### package.json
- scriptにコマンドを追加する
```
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"  ←これを追加
  },
```
- `--watch`などオプションがある

### jest.config.mjs
- jest.config.mjsを作る
- Jestの基本的な設定を定義するためのファイル
- [公式ドキュメント](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler)にある内容を貼り付ける

jest.config.mjs
```
import nextJest from 'next/jest.js' ←ここの.jsは消さない！
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
 
  testEnvironment: 'jest-environment-jsdom',
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```

- jest-environment-jsdomは、JestがJSDOMと呼ばれる仮想のDOM環境でテストを実行することを意味します。JSDOMはブラウザのDOM環境をエミュレートするため、ブラウザ環境でのテストを実行する際に便利です。

### jest.setup.ts
- なくても大丈夫
- テストの実行前に行うセットアップやグローバルな設定を定義するためのファイル
- テストランナーのグローバルなセットアップやテスト実行前に行う処理を記述します
- グローバルなbeforeAllやafterAllなどのテストライフサイクルフックも定義することができます