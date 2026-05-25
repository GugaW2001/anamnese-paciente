import { Control, UseFormWatch } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScreeningFormValues } from '@/lib/schema'

export function Step5({
  control,
  watch,
}: {
  control: Control<ScreeningFormValues>
  watch: UseFormWatch<ScreeningFormValues>
}) {
  const historicoFamiliar = watch('historico_familiar_cancer_mama') === 'sim'

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-semibold mb-4">5. Histórico Familiar</h2>

      <div className="space-y-6">
        <FormField
          control={control}
          name="historico_familiar_cancer_mama"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Histórico Familiar de Câncer de Mama?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sim" />
                    </FormControl>
                    <FormLabel className="font-normal">Sim</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nao" />
                    </FormControl>
                    <FormLabel className="font-normal">Não</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {historicoFamiliar && (
          <FormField
            control={control}
            name="grau_parentesco"
            render={({ field }) => (
              <FormItem className="animate-fade-in">
                <FormLabel>Grau de Parentesco</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Mãe, Irmã, Tia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  )
}
