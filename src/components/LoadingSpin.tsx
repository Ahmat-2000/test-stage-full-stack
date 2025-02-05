
type props = {
  text? : string
}

function LoadingSpin({text}: props) {
  return (
    <span className="inline-flex items-center">
      <span className="border border-b-transparent rounded-full animate-spin h-5 w-5 mr-3" />
      {text ? text : "Processing..."}
    </span>
    
  )
}

export default LoadingSpin;