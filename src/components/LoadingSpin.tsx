
function LoadingSpin({text} : {text : string}) {
  return (
    <>
      <span className="border border-b-transparent rounded-full animate-spin h-5 w-5 mr-3">
      </span>
      {text ? text : "Processing..."}
    </>
    
  )
}

export default LoadingSpin;