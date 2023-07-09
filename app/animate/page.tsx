import Transition from "./_components/transition";
import Scroll from "./_components/scroll"

export default function AnimatePage(){
    return (
        <div>
            <nav
                id="top"
                style={{ 
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "#fff",
                    borderBottom: "2px solid black",
                    marginBottom: "20px"
                 }}
            >
                <p>ここはanimation page navigation</p>
                <a href="#transition">transition&nbsp;&nbsp;</a>
                <a href="#scroll">scroll&nbsp;&nbsp;</a>
            </nav>

            <li id="transition">transition</li>
            <Transition />
            
            <hr />

            <li id="scroll">scroll</li>
            <Scroll />
        </div>
    )
}