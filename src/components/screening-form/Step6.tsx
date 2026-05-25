import { Control } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScreeningFormValues } from '@/lib/schema'

export function Step6({ control }: { control: Control<ScreeningFormValues> }) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-semibold mb-4">6. Exames Anteriores</h2>

      <div className="space-y-6">
        <FormField
          control={control}
          name="exames_anteriores"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Possui exames anteriores (mamografia, ultrassom)?</FormLabel>
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

        <FormField
          control={control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações e Queixas Atuais</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Relate quaisquer dores, nódulos palpáveis ou outras queixas..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
