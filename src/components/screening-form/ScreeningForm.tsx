import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { screeningSchema, ScreeningFormValues, stepsConfig, defaultValues } from '@/lib/schema'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronLeft, ChevronRight, Save, RotateCcw } from 'lucide-react'
import { RenderStep } from './FormSteps'
import { ReviewStep } from './ReviewStep'
import { toast } from 'sonner'
import { getSupabase } from '@/lib/supabase/client'

export function ScreeningForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ScreeningFormValues>({
    resolver: zodResolver(screeningSchema),
    defaultValues,
    mode: 'onChange',
  })

  const TOTAL_STEPS = stepsConfig.length + 1

  const nextStep = async () => {
    if (step < stepsConfig.length) {
      const currentStepConfig = stepsConfig[step]
      const isValid = await form.trigger(currentStepConfig.name, { shouldFocus: true })

      if (isValid) {
        let next = step + 1
        while (
          next < stepsConfig.length &&
          stepsConfig[next].condition &&
          !stepsConfig[next].condition(form.getValues)
        ) {
          next++
        }
        setStep(next)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error('Por favor, preencha o campo corretamente para avançar.')
      }
    }
  }

  const prevStep = () => {
    let prev = step - 1
    while (
      prev >= 0 &&
      stepsConfig[prev].condition &&
      !stepsConfig[prev].condition(form.getValues)
    ) {
      prev--
    }
    setStep(Math.max(0, prev))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: ScreeningFormValues) => {
    setIsSubmitting(true)
    try {
      const payload = {
        registro_id: `PAT-${Math.floor(Date.now() / 1000)}`,
        nome_completo: data.nome_completo,
        idade: data.idade,
        data_atendimento: new Date().toISOString().split('T')[0],
        motivo_exame: data.motivo_exame,
        dados_triagem: {
          data_nascimento: data.data_nascimento,
          idade_menarca: data.idade_menarca,
          menopausa: data.menopausa,
          idade_menopausa: data.idade_menopausa,
          cirurgia_previa_mama: data.cirurgia_previa_mama,
          motivo_cirurgia: data.motivo_cirurgia,
          radioterapia: data.radioterapia,
          periodo_radioterapia: data.periodo_radioterapia,
          braquiterapia: data.braquiterapia,
          periodo_braquiterapia: data.periodo_braquiterapia,
          quimioterapia: data.quimioterapia,
          periodo_quimioterapia: data.periodo_quimioterapia,
          medicacoes_atuais: data.medicacoes_atuais,
          tabagismo: data.tabagismo,
          historico_familiar_cancer_mama: data.historico_familiar_cancer_mama,
          grau_parentesco: data.grau_parentesco,
          exames_anteriores: data.exames_anteriores,
          observacoes: data.observacoes,
        },
        status: 'pendente',
      }

      const { error } = await getSupabase().from('pacientes').insert([payload as any])
      if (error) throw error

      toast.success('Registro salvo com sucesso!')
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar os dados. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    form.reset(defaultValues)
    setStep(0)
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto mt-8 border-none shadow-2xl text-center p-10 animate-slide-up rounded-3xl">
        <CheckCircle2 className="w-28 h-28 text-green-500 mx-auto mb-8 animate-fade-in" />
        <h2 className="text-4xl font-extrabold mb-4 text-primary">Triagem Concluída!</h2>
        <p className="text-muted-foreground mb-10 text-xl max-w-md mx-auto">
          Os dados da paciente foram salvos com sucesso no sistema.
        </p>
        <Button
          onClick={resetForm}
          size="lg"
          className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Iniciar Nova Triagem
        </Button>
      </Card>
    )
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-border/30 transition-all duration-300 rounded-3xl overflow-hidden">
      <CardHeader className="bg-muted/10 border-b border-border/50 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <CardTitle className="text-xl sm:text-2xl text-primary font-bold">
            Formulário de Triagem
          </CardTitle>
          <span className="text-sm font-bold text-primary/80 bg-primary/10 px-4 py-2 rounded-full tracking-wide">
            Passo {step + 1} de {TOTAL_STEPS}
          </span>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-muted/50 transition-all duration-500 rounded-full"
        />
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-6 sm:p-12 min-h-[500px] flex flex-col justify-center">
            {step < stepsConfig.length ? (
              <RenderStep step={step} control={form.control} />
            ) : (
              <ReviewStep form={form} setStep={setStep} />
            )}
          </CardContent>

          <CardFooter className="flex justify-between p-6 sm:px-12 sm:py-8 bg-muted/10 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 0 || isSubmitting}
              className="w-32 sm:w-40 h-14 text-lg font-medium rounded-xl border-border hover:bg-muted/50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>

            {step < stepsConfig.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="w-32 sm:w-40 h-14 text-lg font-bold rounded-xl shadow-md"
              >
                Avançar
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-40 sm:w-48 h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl shadow-md"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Salvando...</span>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Finalizar
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
