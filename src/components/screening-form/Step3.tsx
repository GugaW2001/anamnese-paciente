import { Control } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScreeningFormValues } from '@/lib/schema'

export function Step3({ control }: { control: Control<ScreeningFormValues> }) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-semibold mb-4">3. Histórico Obstétrico</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="numero_filhos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Filhos</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 2" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="idade_primeiro_filho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade no Primeiro Filho</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 25" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
