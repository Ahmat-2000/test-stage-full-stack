
function LoadingSpin({text}) {
  return (
    <>
      <span className="border border-b-transparent rounded-full animate-spin h-5 w-5 mr-3">
      </span>
      {text ? text : "Processing..."}
    </>
    
  )
}

export default LoadingSpin;
// to create the spinner with simple css
/* .loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
  }  */