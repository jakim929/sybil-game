export const CenteredCardLayout = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
