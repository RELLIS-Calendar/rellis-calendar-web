import './Carousel.css';
import react, { useEffect, useState } from "react";

const Carousel = () => {

    const data = ["(Slide with picture and event name)", "2", "3", "4"]
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselInfiniteScroll = () => {
        if (currentIndex === data.length - 1) {
            return setCurrentIndex(0)
        }

        return setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => { carouselInfiniteScroll() }, 3000)
        return () => clearInterval(interval)
    })

    return (
        <div className='carousel-container'>
            {data.map((item, index) => {
                return <h1 className='carousel-item'
                    style={{ transform: `translate(-${currentIndex * 100}%)` }}
                    key={index}>{item}</h1>
            })
            }
        </div>
    )
}


// https://codesandbox.io/p/sandbox/react-carousel-3d-9x3wt?file=%2Fsrc%2FSlider.js%3A16%2C33
// https://stackoverflow.com/questions/62564490/how-to-make-cards-slide-in-react-using-buttons


export default Carousel;