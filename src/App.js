import { useState } from "react";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [time, setTime] = useState();
  const [score, setScore] = useState(0);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    setIsStart(true);
    setScore(0); // Reset score
    setTime(30); // Reset time
    setPosition({ top: '50%', left: '50%' }); // Reset position
    moveCircle(); // Move circle to a new position
    startTimer();
  };

  const moveCircle = () => {
    const newTop = Math.random() * 90; 
    const newLeft = Math.random() * 90;
    setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    setScore((prevScore) => prevScore + 1);
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the uploaded image as the new circle's background
      };
      reader.readAsDataURL(file);
    }
  };
 

  return (
    <div>
      <div className="mb-2 border-2 border-solid border-gray-500 flex justify-center text-[1.5rem]">Click Challenge</div>
      
     <input type="file" accept="image/*" onChange={handleImageUpload} className="m-auto w-1/6 h-1/7 bg-gray-500 flex items-center justify-center rounded-2xl" />
      <div className="bg-blue-500 flex justify-evenly">
        <span className="text-3xl text-white">Score: {score}</span>
        <span className="text-3xl text-white">Time: {time}</span>
      </div>


      <div className="w-screen h-screen bg-gray-500 border-2 border-solid flex rounded-xl relative">
        {!isStart ? (
          <button className="m-auto w-1/6 h-1/7 bg-white rounded-2xl hover:bg-gray-300" onClick={handleClick}>
            Start
          </button>
        ) : ( time > 0 ? (
          
          <button
            className="w-[80px] h-[80px] bg-red-500 rounded-full flex items-center justify-center absolute pointer-events-auto"
            style={{ 
              top: position.top, 
              left: position.left, 
              transform: 'translate(-50%, -50%)',
              backgroundImage: `url(${image})`, // Set the background image
              backgroundSize: 'cover', // Ensure the image covers the entire circle
              backgroundPosition: 'center' // Center the image
            }}
            onClick={moveCircle}
          />
        ) : (
            
              <div className="flex flex-col items-center justify-center w-full">
                <div className="m-auto text-[9rem] flex text-white items-center justify-center text-purple-300 hover:text-red-500">Game Over</div>
          <button className="m-auto w-1/6 h-1/7 bg-white rounded-2xl hover:bg-gray-300" onClick={handleClick}>
            Restart
          </button>
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default App;