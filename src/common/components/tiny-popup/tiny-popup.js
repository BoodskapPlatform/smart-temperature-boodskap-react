import { Popover } from 'react-tiny-popover';



function TinyPopup(props) {
    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={['top', 'left']} // if you'd like, you can limit the positions
            padding={10} // adjust padding here!
            reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
            onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
            content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                <div>
                    <div>Hi! I'm popover content. Here's my current position: {position}.</div>
                    <div>I'm {` ${nudgedLeft} `} pixels beyond my boundary horizontally!</div>
                    <div>I'm {` ${nudgedTop} `} pixels beyond my boundary vertically!</div>
                </div>
            )}
        />
    );
}

export default TinyPopup;