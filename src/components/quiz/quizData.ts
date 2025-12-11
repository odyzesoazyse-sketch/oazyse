export interface QuizQuestion {
  id: string;
  field: string;
  question: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean' | 'slider' | 'textarea';
  options?: string[];
  min?: number;
  max?: number;
  required?: boolean;
}

export interface QuizLevel {
  level: number;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export const quizLevels: QuizLevel[] = [
  {
    level: 0,
    title: "О вас",
    subtitle: "Базовая информация",
    questions: [
      { id: "q1", field: "code_name", question: "Ваше имя", type: "text", required: true },
      { id: "q2", field: "age", question: "Возраст", type: "number", min: 18, max: 100 },
      { id: "q3", field: "current_country", question: "Страна проживания", type: "text" },
      { id: "q4", field: "current_profession", question: "Род деятельности", type: "text" }
    ]
  },
  {
    level: 1,
    title: "Ваше самочувствие",
    subtitle: "Текущее состояние",
    questions: [
      { id: "q5", field: "stress_level", question: "Уровень стресса в повседневной жизни", type: "slider", min: 0, max: 10 },
      { id: "q6", field: "sleep_quality", question: "Качество сна", type: "select", options: ["Отличное", "Хорошее", "Удовлетворительное", "Плохое", "Очень плохое"] },
      { id: "q7", field: "energy_level", question: "Уровень энергии в течение дня", type: "slider", min: 0, max: 10 },
      { id: "q8", field: "anxiety_frequency", question: "Как часто вы испытываете тревогу?", type: "select", options: ["Никогда", "Редко", "Иногда", "Часто", "Постоянно"] }
    ]
  },
  {
    level: 2,
    title: "Эмоциональное состояние",
    subtitle: "Ваши чувства",
    questions: [
      { id: "q9", field: "main_emotion", question: "Какая эмоция преобладает в вашей жизни?", type: "select", options: ["Радость", "Спокойствие", "Грусть", "Тревога", "Раздражение", "Усталость", "Неопределённость"] },
      { id: "q10", field: "happiness_rating", question: "Насколько вы счастливы сейчас?", type: "slider", min: 0, max: 10 },
      { id: "q11", field: "self_confidence", question: "Уровень уверенности в себе", type: "slider", min: 0, max: 10 },
      { id: "q12", field: "mood_stability", question: "Стабильность настроения", type: "select", options: ["Очень стабильное", "В основном стабильное", "Переменчивое", "Часто меняется", "Крайне нестабильное"] }
    ]
  },
  {
    level: 3,
    title: "Цели и желания",
    subtitle: "Чего вы хотите достичь",
    questions: [
      { id: "q13", field: "main_goal", question: "Главная цель, которой вы хотите достичь", type: "textarea" },
      { id: "q14", field: "change_area", question: "Какую область жизни хотите изменить больше всего?", type: "select", options: ["Здоровье", "Отношения", "Карьера", "Финансы", "Саморазвитие", "Эмоциональное состояние", "Привычки"] },
      { id: "q15", field: "obstacles", question: "Что мешает вам достичь желаемого?", type: "textarea" },
      { id: "q16", field: "motivation_level", question: "Уровень мотивации к изменениям", type: "slider", min: 0, max: 10 }
    ]
  },
  {
    level: 4,
    title: "Привычки и образ жизни",
    subtitle: "Ваш ритм жизни",
    questions: [
      { id: "q17", field: "exercise_frequency", question: "Как часто занимаетесь физической активностью?", type: "select", options: ["Ежедневно", "Несколько раз в неделю", "Раз в неделю", "Редко", "Никогда"] },
      { id: "q18", field: "meditation_practice", question: "Практикуете ли медитацию или расслабление?", type: "select", options: ["Регулярно", "Иногда", "Пробовал(а)", "Никогда"] },
      { id: "q19", field: "bad_habits", question: "Есть ли привычки, от которых хотите избавиться?", type: "textarea" },
      { id: "q20", field: "self_care_time", question: "Сколько времени уделяете себе ежедневно?", type: "select", options: ["Более 2 часов", "1-2 часа", "30 минут - 1 час", "Менее 30 минут", "Совсем не уделяю"] }
    ]
  },
  {
    level: 5,
    title: "Отношения",
    subtitle: "Связи с окружающими",
    questions: [
      { id: "q21", field: "relationship_satisfaction", question: "Удовлетворённость личными отношениями", type: "slider", min: 0, max: 10 },
      { id: "q22", field: "social_support", question: "Есть ли у вас поддержка близких?", type: "select", options: ["Да, сильная поддержка", "Да, умеренная", "Частичная", "Минимальная", "Нет"] },
      { id: "q23", field: "communication_style", question: "Как вы оцениваете свои коммуникативные навыки?", type: "slider", min: 0, max: 10 },
      { id: "q24", field: "loneliness_feeling", question: "Как часто чувствуете одиночество?", type: "select", options: ["Никогда", "Редко", "Иногда", "Часто", "Постоянно"] }
    ]
  },
  {
    level: 6,
    title: "Готовность к работе",
    subtitle: "Ваш настрой",
    questions: [
      { id: "q25", field: "hypnotherapy_experience", question: "Был ли опыт гипнотерапии?", type: "select", options: ["Да, регулярно", "Да, несколько раз", "Один раз", "Нет, но интересно", "Нет"] },
      { id: "q26", field: "openness_to_change", question: "Готовность к внутренним изменениям", type: "slider", min: 0, max: 10 },
      { id: "q27", field: "expectations", question: "Что вы ожидаете от гипнотерапии?", type: "textarea" },
      { id: "q28", field: "additional_info", question: "Что ещё важно нам знать о вас?", type: "textarea" }
    ]
  }
];

export const getTotalQuestions = (): number => {
  return quizLevels.reduce((total, level) => total + level.questions.length, 0);
};

export const getQuestionNumber = (levelIndex: number, questionIndex: number): number => {
  let count = 0;
  for (let i = 0; i < levelIndex; i++) {
    count += quizLevels[i].questions.length;
  }
  return count + questionIndex + 1;
};
