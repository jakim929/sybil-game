const WhitenedOutImage = ({
  imageSrc,
}: {
  imageSrc: string
}) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover',
        }}
      />{' '}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 0,
        }}
      />
    </>
  )
}

export const CenteredCardLayout = ({
  imageSrc,
  children,
}: { imageSrc?: string; children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col relative">
      {imageSrc && <WhitenedOutImage imageSrc={imageSrc} />}
      <div className="flex-1 flex flex-col justify-center items-center relative">
        {children}
      </div>
    </div>
  )
}
