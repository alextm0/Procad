export default function CustomWaveDivider({ 
  className = "",
  position = "bottom"
}: { 
  className?: string
  position?: "top" | "bottom"
}) {
  const isTop = position === "top"
  return (
    <div className={`w-full overflow-hidden ${className} ${isTop ? "rotate-180" : ""}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20">
        <path
          d="M0,80 C240,120 480,40 720,60 C960,80 1200,120 1440,80 L1440,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.3"
        ></path>
        <path
          d="M0,60 C240,100 480,20 720,40 C960,60 1200,100 1440,60 L1440,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.6"
        ></path>
        <path d="M0,40 C240,80 480,0 720,20 C960,40 1200,80 1440,40 L1440,120 L0,120 Z" fill="#ffffff"></path>
      </svg>
    </div>
  )
}
