import "@testing-library/jest-dom/extend-expect"
import '@testing-library/jest-dom'
import '@testing-library/user-event'


//cf. https://github.com/jsdom/jsdom/issues/1724#issuecomment-720727999
// テスト内のfetchを実行できるようにする
import 'whatwg-fetch';