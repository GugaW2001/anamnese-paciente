import { ScreeningForm } from '@/components/screening-form/ScreeningForm'

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-10 text-center animate-fade-in-down">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-3">
            Sistema de Triagem
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Formulário completo de coleta de dados de pacientes para triagem mamária com foco em
            prevenção e histórico detalhado.
          </p>
        </header>

        <main>
          <ScreeningForm />
        </main>
      </div>
    </div>
  )
}

export default Index
