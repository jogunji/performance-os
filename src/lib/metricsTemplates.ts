export type ScoringType = 'capped_minimum' | 'rating' | 'adherence'

export type Cadence = 'daily' | 'weekly'

export type MetricTemplate = {
    id: string
    name: string
    unit: string
    scoringType: ScoringType
    cadence: Cadence
    defaultTarget: number
    description: string
}


export const metricTemplates: MetricTemplate[] = [
    {
        id: 'sleep',
        name: 'Sleep',
        unit: 'hours',
        scoringType: 'capped_minimum',
        cadence: 'daily',
        defaultTarget: 7.5,
        description: 'Hours slept.',
    },
    {
        id: 'protein',
        name: 'Protein',
        unit: 'grams',
        scoringType: 'capped_minimum',
        cadence: 'daily',
        defaultTarget: 180,
        description: 'Daily protein intake.',
    },
    {
        id: 'steps',
        name: 'Steps',
        unit: 'steps',
        scoringType: 'capped_minimum',
        cadence: 'daily',
        defaultTarget: 8000,
        description: 'Daily step count.'
    },
    {
        id: 'training_adherence',
        name: 'Training Adherence',
        unit: 'sessions',
        scoringType: 'adherence',
        cadence: 'weekly',
        defaultTarget: 4,
        description: 'Weekly completed training sessions.'
    },
    {
        id: 'energy',
        name: 'Energy',
        unit: '1-10',
        scoringType: 'rating',
        cadence: 'daily',
        defaultTarget: 8,
        description: 'Subjective daily energy rating.'
    },
    {
        id: 'focus',
        name: 'Focus',
        unit: '1-10',
        scoringType: 'rating',
        cadence: 'daily',
        defaultTarget: 8,
        description: 'Subjective daily focus rating.'
    }
]

