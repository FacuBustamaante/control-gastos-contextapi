type ErrorMessageProps = {
    children: React.ReactNode
}


export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="bg-red-600 text-white text-center p-3 uppercase font-bold text-sm">
        {children}
    </p>
  )
}
