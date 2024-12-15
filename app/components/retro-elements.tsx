interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    children: React.ReactNode
  }
  
  export function RetroButton({ variant = 'primary', children, ...props }: RetroButtonProps) {
    return (
      <button
        {...props}
        className={`
          relative px-8 py-3 font-bold text-lg transition-transform
          ${variant === 'primary' 
            ? 'bg-black text-white border-white' 
            : 'bg-white text-black border-black'
          }
          border-2 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          before:absolute before:inset-0 before:border-2 
          before:border-current before:transform before:translate-x-1 before:translate-y-1
          ${props.className || ''}
        `}
      >
        {children}
      </button>
    )
  }
  
  export function RetroCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
      <div className={`
        relative bg-white text-black p-6 border-2 border-black
        before:absolute before:inset-0 before:border-2 before:border-black 
        before:transform before:translate-x-2 before:translate-y-2
        ${className}
      `}>
        {children}
      </div>
    )
  }
  
  export function WavyDivider() {
    return (
      <div className="w-full h-12 bg-repeat-x" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='48' viewBox='0 0 100 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 48C25 48 25 0 50 0C75 0 75 48 100 48H0Z' fill='%23000000'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 48px'
        }}
      />
    )
  }
  
  export function RetroHeading({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative inline-block">
        <h2 className="text-4xl font-bold relative z-10">{children}</h2>
        <div className="absolute -bottom-2 left-0 w-full h-2 bg-black transform -skew-x-12" />
      </div>
    )
  }
  
  export function RetroInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <input
        {...props}
        className={`
          w-full p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black
          ${props.className || ''}
        `}
      />
    )
  }
  
  