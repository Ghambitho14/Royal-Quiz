// ============================================
// COMPONENTE COMÚN: Fondo con efectos de escenario TV
// ============================================

export function StageBackground() {
  return (
    <>
      {/* TV Stage Background - Heavily Blurred */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1614886011712-57f9165ae311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0diUyMHN0dWRpbyUyMHN0YWdlJTIwbGlnaHRzfGVufDF8fHx8MTc2Mzk0MTI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(15px)',
        }}
      />
      
      {/* Dark overlay for TV studio atmosphere */}
      <div className="fixed inset-0 w-full h-full bg-gray-950/80" />

      {/* Moving TV Stage Spotlights */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Spotlight 1 - Blue beam from top-left */}
        <div 
          className="stage-spotlight-1 absolute -top-40 -left-40 w-[900px] h-[900px]"
          style={{
            background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.6) 10%, rgba(59, 130, 246, 0) 20%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Spotlight 2 - Gold beam from top-right */}
        <div 
          className="stage-spotlight-2 absolute -top-40 -right-40 w-[850px] h-[850px]"
          style={{
            background: 'conic-gradient(from 135deg, rgba(251, 191, 36, 0) 0%, rgba(251, 191, 36, 0.7) 10%, rgba(251, 191, 36, 0) 20%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Spotlight 3 - White/Blue beam from bottom-left */}
        <div 
          className="stage-spotlight-3 absolute -bottom-40 -left-40 w-[800px] h-[800px]"
          style={{
            background: 'conic-gradient(from 225deg, rgba(191, 219, 254, 0) 0%, rgba(191, 219, 254, 0.5) 10%, rgba(191, 219, 254, 0) 20%)',
            filter: 'blur(35px)',
          }}
        />
        
        {/* Spotlight 4 - Amber beam from bottom-right */}
        <div 
          className="stage-spotlight-4 absolute -bottom-40 -right-40 w-[750px] h-[750px]"
          style={{
            background: 'conic-gradient(from 315deg, rgba(245, 158, 11, 0) 0%, rgba(245, 158, 11, 0.6) 10%, rgba(245, 158, 11, 0) 20%)',
            filter: 'blur(35px)',
          }}
        />

        {/* Center spotlight - Main stage light */}
        <div 
          className="stage-spotlight-center absolute top-1/2 left-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 60%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Additional ambient lights */}
        <div 
          className="absolute top-0 left-1/4 w-[400px] h-[400px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 70%)',
            filter: 'blur(60px)',
            animation: 'stage-spotlight-3 14s ease-in-out infinite',
          }}
        />
        
        <div 
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0) 70%)',
            filter: 'blur(60px)',
            animation: 'stage-spotlight-4 16s ease-in-out infinite',
          }}
        />
      </div>
    </>
  );
}
