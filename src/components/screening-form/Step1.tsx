import { Control } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScreeningFormValues } from '@/lib/schema'

export function Step1({ control }: { control: Control<ScreeningFormValues> }) {
  return (
    <div className="space-y-4 animate-fade-in-up">
      <h2 className="text-xl font-semibold mb-4">1. Dados da Paciente</h2>

      <FormField
        control={control}
        name="nome_completo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo *</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Maria da Silva" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone *</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="data_atendimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Atendimento *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="idade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Anos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="motivo_exame"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo do Exame *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Rotina, Dor, Nódulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
