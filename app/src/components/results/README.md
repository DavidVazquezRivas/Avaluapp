# Componentes de Resultados

Esta carpeta contiene los componentes para mostrar los resultados de las encuestas según diferentes tipos de preguntas.

## Componente Principal: DynamicResults

El componente `DynamicResults` es un componente que automáticamente renderiza el componente de resultado correcto según el tipo de pregunta.

### Uso

```tsx
import { DynamicResults } from '@/components/results'
import { Result } from '@/models/answer.model'

interface MyComponentProps {
  result: Result
}

const MyComponent: React.FC<MyComponentProps> = ({ result }) => {
  return (
    <div>
      <h2>Resultados de la Encuesta</h2>
      <DynamicResults result={result} />
    </div>
  )
}
```

### Funcionalidad

El componente `DynamicResults` examina el `questionType` del objeto `Question` dentro del `Result` y renderiza el componente apropiado:

- **`QuestionType.Date`** → `DateResults`
- **`QuestionType.MultipleChoice`** → `MultipleChoiceResults`
- **`QuestionType.Numeric`** → `NumericResults`
- **`QuestionType.Rating`** → `RatingResults`
- **`QuestionType.SingleChoice`** → `SingleChoiceResults`
- **`QuestionType.Text`** → `TextResults`

### Props

| Prop     | Tipo     | Descripción                                                |
| -------- | -------- | ---------------------------------------------------------- |
| `result` | `Result` | Objeto que contiene la pregunta y las respuestas a mostrar |

### Interfaz Result

```tsx
interface Result {
  answers: BaseAnswer[]
  question: Question
}

interface BaseAnswer {
  value: string | number | Array<string | number>
  answeredAt: Date | string
}
```

## Componentes Individuales

Cada tipo de pregunta tiene su propio componente especializado:

### DateResults

Muestra resultados de preguntas de fecha con gráficos de línea temporal y distribuciones.

### MultipleChoiceResults

Muestra resultados de preguntas de opción múltiple con gráficos de torta y estadísticas promedio.

### NumericResults

Muestra resultados de preguntas numéricas con gráficos de caja (box plots) y estadísticas descriptivas.

### RatingResults

Muestra resultados de preguntas de valoración (estrellas) con gráficos de barras y promedios.

### SingleChoiceResults

Muestra resultados de preguntas de opción única con gráficos de torta y conteos.

### TextResults

Muestra resultados de preguntas de texto con análisis de texto y nube de palabras.

## Ejemplos

Puedes ver ejemplos de uso en:

- `SingleChoiceResultsExample.tsx` - Ejemplos individuales de cada componente
- `DynamicResultsExample.tsx` - Ejemplo de uso del componente dinámico

## Ventajas del DynamicResults

1. **Simplicidad**: Solo necesitas un componente para todos los tipos de preguntas
2. **Mantenibilidad**: Los cambios en los componentes individuales se reflejan automáticamente
3. **Consistencia**: Garantiza que siempre se use el componente correcto para cada tipo
4. **Flexibilidad**: Fácil de extender si se agregan nuevos tipos de preguntas

## Extensión

Para agregar soporte a un nuevo tipo de pregunta:

1. Crea el componente específico (ej. `MyNewQuestionResults.tsx`)
2. Agrega la importación en `DynamicResults.tsx`
3. Agrega un nuevo `case` en el `switch` statement
4. Actualiza el archivo `index.ts` para exportar el nuevo componente
