import ClientComponent from "./ClientComponent"
import ServerComponent2 from "./ServerComponent2"

const ServerComponent = () => {
    console.log('ServerComponent 実行はサーバーのみ')
    return (
        <div>
            <ClientComponent>
                <ServerComponent2 />
            </ClientComponent>
        </div>
    )
}

export default ServerComponent
