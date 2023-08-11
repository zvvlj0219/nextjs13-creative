import Transition from "./_components/transition";
import Scroll from "./_components/scroll"
import Dnd from "./_components/dnd";
import Pnc from "./_components/pnc";

export default function AnimatePage(){
    return (
        <div>
            <nav
                id="top"
                style={{ 
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    backgroundColor: "#fff",
                    borderBottom: "2px solid black",
                    marginBottom: "20px"
                 }}
            >
                <p>ここはanimation page navigation</p>
                <a href="#transition">transition&nbsp;&nbsp;</a>
                <a href="#scroll">scroll&nbsp;&nbsp;</a>
                <a href="#pnc">push and change&nbsp;&nbsp;</a>
            </nav>

            {/* <li id="transition">transition</li>
            <Transition />
            
            <hr />

            <li id="scroll">scroll</li>
            <Scroll />
            */}
            
            {/* <li id="dnd">Drag and Drop</li>
            <Dnd /> */}

            <li id="pnc">push and change</li>
            <Pnc />
        </div>
    )
}