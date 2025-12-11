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
    title: "Вход в систему",
    subtitle: "Идентификация",
    questions: [
      { id: "q0", field: "code_name", question: "Кодовое имя / ник / настоящее имя", type: "text", required: true }
    ]
  },
  {
    level: 1,
    title: "Био-идентификация",
    subtitle: "20 вопросов о твоём теле и происхождении",
    questions: [
      { id: "q1", field: "birth_sex", question: "Пол при рождении", type: "select", options: ["Мужской", "Женский", "Интерсекс"] },
      { id: "q2", field: "current_gender", question: "Текущий гендер", type: "select", options: ["Мужчина", "Женщина", "Небинарный", "Трансгендер M→F", "Трансгендер F→M", "Агендер", "Другое"] },
      { id: "q3", field: "orientation", question: "Сексуальная ориентация", type: "select", options: ["Гетеросексуал", "Гомосексуал", "Бисексуал", "Пансексуал", "Асексуал", "Другое"] },
      { id: "q4", field: "romantic_orientation", question: "Романтическая ориентация", type: "select", options: ["Гетероромантик", "Гоморомантик", "Биромантик", "Панромантик", "Аромантик", "Другое"] },
      { id: "q5", field: "age", question: "Возраст", type: "number", min: 12, max: 120 },
      { id: "q6", field: "height", question: "Рост (см)", type: "number", min: 100, max: 250 },
      { id: "q7", field: "weight", question: "Вес (кг)", type: "number", min: 30, max: 300 },
      { id: "q8", field: "body_fat_percent", question: "Процент жира в теле (примерно)", type: "number", min: 3, max: 60 },
      { id: "q9", field: "eye_color", question: "Цвет глаз", type: "select", options: ["Карие", "Голубые", "Зелёные", "Серые", "Ореховые", "Чёрные", "Другой"] },
      { id: "q10", field: "blood_type", question: "Группа крови", type: "select", options: ["I (O)", "II (A)", "III (B)", "IV (AB)", "Не знаю"] },
      { id: "q11", field: "chronic_diseases", question: "Хронические болезни (перечисли)", type: "textarea" },
      { id: "q12", field: "allergies", question: "Аллергии", type: "textarea" },
      { id: "q13", field: "surgeries", question: "Операции (перечисли)", type: "textarea" },
      { id: "q14", field: "birth_country", question: "Страна рождения", type: "text" },
      { id: "q15", field: "current_country", question: "Текущая страна проживания", type: "text" },
      { id: "q16", field: "city", question: "Город", type: "text" },
      { id: "q17", field: "city_district", question: "Район города", type: "text" },
      { id: "q18", field: "mother_nationality", question: "Национальность матери", type: "text" },
      { id: "q19", field: "father_nationality", question: "Национальность отца", type: "text" },
      { id: "q20", field: "childhood_language", question: "Язык детства (основной)", type: "text" },
      { id: "q21", field: "second_language", question: "Второй язык", type: "text" }
    ]
  },
  {
    level: 2,
    title: "Религия и космология",
    subtitle: "25 вопросов о твоей вере и картине мира",
    questions: [
      { id: "q22", field: "official_religion", question: "Официальная религия (по документам/семье)", type: "select", options: ["Православие", "Католицизм", "Протестантизм", "Ислам", "Иудаизм", "Буддизм", "Индуизм", "Атеизм", "Агностицизм", "Другое"] },
      { id: "q23", field: "actual_belief", question: "Во что ты реально веришь?", type: "textarea" },
      { id: "q24", field: "believes_reincarnation", question: "Веришь в реинкарнацию?", type: "boolean" },
      { id: "q25", field: "past_lives_count", question: "Сколько прошлых жизней ты помнишь/ощущаешь?", type: "number", min: 0, max: 1000 },
      { id: "q26", field: "starseed_type", question: "Считаешь себя звёздным семенем?", type: "select", options: ["Нет", "Индиго", "Кристалл", "Радуга", "Плеядеанец", "Сирианец", "Арктурианец", "Другое"] },
      { id: "q27", field: "earth_mission", question: "В чём твоя миссия на Земле?", type: "textarea" },
      { id: "q28", field: "believes_god", question: "Во что/кого ты веришь?", type: "select", options: ["Единый Бог", "Много богов", "Источник/Вселенная", "Высший разум", "Ничего", "Другое"] },
      { id: "q29", field: "daily_meditation_hours", question: "Сколько часов в день молишься/медитируешь?", type: "number", min: 0, max: 24 },
      { id: "q30", field: "believes_simulation", question: "Веришь, что мы живём в симуляции?", type: "boolean" },
      { id: "q31", field: "believes_adrenochrome", question: "Веришь в теорию адренохрома?", type: "boolean" },
      { id: "q32", field: "believes_flat_earth", question: "Веришь в плоскую Землю?", type: "boolean" },
      { id: "q33", field: "believes_antarctica", question: "Веришь, что в Антарктиде скрывают что-то?", type: "boolean" },
      { id: "q34", field: "believes_moon_station", question: "Веришь, что Луна — это станция?", type: "boolean" },
      { id: "q35", field: "believes_chips", question: "Веришь в чипирование населения?", type: "boolean" },
      { id: "q36", field: "believes_5g", question: "Веришь в опасность 5G?", type: "boolean" },
      { id: "q37", field: "believes_reptilians", question: "Веришь в рептилоидов?", type: "boolean" },
      { id: "q38", field: "believes_anunnaki", question: "Веришь в Аннунаков?", type: "boolean" },
      { id: "q39", field: "believes_great_deception", question: "Веришь в Великий Обман?", type: "boolean" },
      { id: "q40", field: "believes_deep_state", question: "Веришь в глубинное государство?", type: "boolean" }
    ]
  },
  {
    level: 3,
    title: "Родовая карма и детство",
    subtitle: "40 вопросов о твоих корнях и ранних травмах",
    questions: [
      { id: "q41", field: "family_size", question: "Сколько человек было в твоей семье?", type: "number", min: 1, max: 50 },
      { id: "q42", field: "birth_order", question: "Каким по счёту ребёнком ты был?", type: "number", min: 1, max: 20 },
      { id: "q43", field: "father_relationship", question: "Отношения с отцом (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q44", field: "mother_relationship", question: "Отношения с матерью (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q45", field: "has_stepparent", question: "Был ли отчим/мачеха?", type: "boolean" },
      { id: "q46", field: "grandparents_relationship", question: "Опиши отношения с бабушками и дедушками", type: "textarea" },
      { id: "q47", field: "physical_abuse", question: "Было ли физическое насилие в детстве?", type: "boolean" },
      { id: "q48", field: "emotional_abuse", question: "Было ли эмоциональное насилие?", type: "boolean" },
      { id: "q49", field: "sexual_abuse", question: "Было ли сексуальное насилие?", type: "boolean" },
      { id: "q50", field: "family_alcoholism", question: "Был ли алкоголизм в роду?", type: "boolean" },
      { id: "q51", field: "family_suicides", question: "Были ли самоубийства в роду?", type: "boolean" },
      { id: "q52", field: "family_cancer", question: "Был ли рак в роду?", type: "boolean" },
      { id: "q53", field: "family_poverty", question: "Была ли нищета в роду?", type: "boolean" },
      { id: "q54", field: "family_wealth", question: "Было ли богатство в роду?", type: "boolean" },
      { id: "q55", field: "parents_main_fear", question: "Главный страх твоих родителей", type: "textarea" },
      { id: "q56", field: "mother_main_message", question: "Главное послание от матери", type: "textarea" },
      { id: "q57", field: "father_main_message", question: "Главное послание от отца", type: "textarea" },
      { id: "q58", field: "first_memory", question: "Самое первое воспоминание жизни", type: "textarea" },
      { id: "q59", field: "scariest_childhood_day", question: "Самый страшный день детства", type: "textarea" },
      { id: "q60", field: "favorite_toy", question: "Любимая игрушка детства", type: "text" },
      { id: "q61", field: "first_sexual_experience_age", question: "Возраст первого сексуального опыта", type: "number", min: 0, max: 100 },
      { id: "q62", field: "first_love_age", question: "Возраст первой влюблённости", type: "number", min: 0, max: 100 },
      { id: "q63", field: "first_kiss_age", question: "Возраст первого поцелуя", type: "number", min: 0, max: 100 },
      { id: "q64", field: "first_sex_age", question: "Возраст первого секса", type: "number", min: 0, max: 100 },
      { id: "q65", field: "first_cheating_age", question: "Возраст первой измены (0 если не было)", type: "number", min: 0, max: 100 }
    ]
  },
  {
    level: 4,
    title: "Текущая семья и дети",
    subtitle: "25 вопросов о твоей семье сейчас",
    questions: [
      { id: "q66", field: "relationship_status", question: "Статус отношений", type: "select", options: ["Холост/не замужем", "В отношениях", "Женат/замужем", "Разведён(а)", "Вдовец/вдова", "Полиамория", "Другое"] },
      { id: "q67", field: "marriages_count", question: "Количество браков", type: "number", min: 0, max: 20 },
      { id: "q68", field: "divorces_count", question: "Количество разводов", type: "number", min: 0, max: 20 },
      { id: "q69", field: "children", question: "Дети (имена, возраст, пол — через запятую)", type: "textarea" },
      { id: "q70", field: "abortions_count", question: "Количество абортов", type: "number", min: 0, max: 50 },
      { id: "q71", field: "miscarriages_count", question: "Количество выкидышей", type: "number", min: 0, max: 50 },
      { id: "q72", field: "plans_more_children", question: "Планируешь ещё детей?", type: "boolean" },
      { id: "q73", field: "ideal_family_10_years", question: "Идеальная семья через 10 лет — опиши", type: "textarea" },
      { id: "q74", field: "parent_role_rating", question: "Оценка себя как родителя (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q75", field: "main_fear_for_children", question: "Главный страх за детей", type: "textarea" }
    ]
  },
  {
    level: 5,
    title: "Деньги и власть",
    subtitle: "30 вопросов о финансах и амбициях",
    questions: [
      { id: "q76", field: "monthly_income", question: "Доход за последние 12 месяцев (опиши примерно)", type: "textarea" },
      { id: "q77", field: "passive_income", question: "Пассивный доход в месяц (в USD)", type: "number", min: 0, max: 100000000 },
      { id: "q78", field: "max_single_payment", question: "Максимальный чек за раз (в USD)", type: "number", min: 0, max: 100000000 },
      { id: "q79", field: "current_savings", question: "Текущие сбережения (в USD)", type: "number", min: 0, max: 100000000 },
      { id: "q80", field: "debts", question: "Долги (в USD)", type: "number", min: 0, max: 100000000 },
      { id: "q81", field: "mortgage", question: "Ипотека (в USD)", type: "number", min: 0, max: 100000000 },
      { id: "q82", field: "attitude_to_rich", question: "Отношение к богатым", type: "select", options: ["Восхищение", "Зависть", "Нейтральное", "Презрение", "Страх", "Смешанное"] },
      { id: "q83", field: "envy_or_admiration", question: "Больше завидуешь или восхищаешься?", type: "select", options: ["Завидую", "Восхищаюсь", "Поровну"] },
      { id: "q84", field: "ready_billionaire_any_cost", question: "Готов стать миллиардером любой ценой?", type: "boolean" },
      { id: "q85", field: "political_views", question: "Политические взгляды", type: "select", options: ["Левые", "Правые", "Центр", "Либертарианство", "Анархизм", "Аполитичен", "Другое"] },
      { id: "q86", field: "ready_for_revolution", question: "Готов к революции?", type: "boolean" },
      { id: "q87", field: "favorite_politician", question: "Любимый политик/диктатор", type: "text" },
      { id: "q88", field: "tax_optimization", question: "Занимаешься налоговой оптимизацией?", type: "boolean" },
      { id: "q89", field: "black_cash", question: "Есть чёрный нал?", type: "boolean" },
      { id: "q90", field: "has_crypto", question: "Есть криптовалюта?", type: "boolean" },
      { id: "q91", field: "has_stocks", question: "Есть акции?", type: "boolean" },
      { id: "q92", field: "has_real_estate", question: "Есть недвижимость?", type: "boolean" }
    ]
  },
  {
    level: 6,
    title: "Образование и призвание",
    subtitle: "20 вопросов о твоих талантах и карьере",
    questions: [
      { id: "q93", field: "school_name", question: "Школа (название)", type: "text" },
      { id: "q94", field: "university_name", question: "ВУЗ (название)", type: "text" },
      { id: "q95", field: "specialty", question: "Специальность", type: "text" },
      { id: "q96", field: "honors_diploma", question: "Красный диплом?", type: "boolean" },
      { id: "q97", field: "expelled", question: "Было отчисление?", type: "boolean" },
      { id: "q98", field: "favorite_subject", question: "Любимый предмет", type: "text" },
      { id: "q99", field: "hated_subject", question: "Ненавистный предмет", type: "text" },
      { id: "q100", field: "iq_score", question: "IQ (если знаешь)", type: "number", min: 50, max: 200 },
      { id: "q101", field: "eq_score", question: "EQ эмоциональный интеллект (0-100)", type: "number", min: 0, max: 100 },
      { id: "q102", field: "talents", question: "Таланты (перечисли)", type: "textarea" },
      { id: "q103", field: "genius_level", question: "В чём ты гений?", type: "textarea" },
      { id: "q104", field: "current_profession", question: "Текущая профессия", type: "text" },
      { id: "q105", field: "loves_current_job", question: "Любишь свою работу?", type: "boolean" },
      { id: "q106", field: "dream_occupation", question: "Если бы не деньги — чем бы занимался 16 часов в сутки?", type: "textarea" }
    ]
  },
  {
    level: 7,
    title: "Секс и интимная сфера",
    subtitle: "40 вопросов о твоей сексуальности",
    questions: [
      { id: "q107", field: "sex_satisfaction", question: "Удовлетворённость сексом (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q108", field: "sex_frequency", question: "Частота секса", type: "select", options: ["Каждый день", "Несколько раз в неделю", "Раз в неделю", "Несколько раз в месяц", "Раз в месяц", "Реже", "Нет секса"] },
      { id: "q109", field: "masturbation_frequency", question: "Частота мастурбации", type: "select", options: ["Несколько раз в день", "Каждый день", "Несколько раз в неделю", "Раз в неделю", "Реже", "Никогда"] },
      { id: "q110", field: "porn_addiction", question: "Есть порнозависимость?", type: "boolean" },
      { id: "q111", field: "favorite_porn_categories", question: "Любимые категории порно", type: "textarea" },
      { id: "q112", field: "main_fantasy", question: "Главная сексуальная фантазия", type: "textarea" },
      { id: "q113", field: "taboo", question: "Что для тебя табу в сексе?", type: "textarea" },
      { id: "q114", field: "bdsm_role", question: "БДСМ-роль", type: "select", options: ["Не практикую", "Доминант", "Сабмиссив", "Свитч", "Другое"] },
      { id: "q115", field: "cheating_history", question: "Изменял(а)?", type: "boolean" },
      { id: "q116", field: "partners_count", question: "Количество сексуальных партнёров", type: "number", min: 0, max: 10000 },
      { id: "q117", field: "is_virgin", question: "Девственник/девственница?", type: "boolean" },
      { id: "q118", field: "prostitution_bought", question: "Покупал(а) секс-услуги?", type: "boolean" },
      { id: "q119", field: "prostitution_sold", question: "Продавал(а) секс-услуги?", type: "boolean" },
      { id: "q120", field: "sexual_trauma", question: "Есть сексуальные травмы?", type: "boolean" },
      { id: "q121", field: "rape_victim", question: "Был(а) жертвой изнасилования?", type: "boolean" },
      { id: "q122", field: "harassment_victim", question: "Был(а) жертвой домогательств?", type: "boolean" },
      { id: "q123", field: "fantasy_orientation", question: "Ориентация в фантазиях", type: "select", options: ["Гетеро", "Гомо", "Би", "Другое"] },
      { id: "q124", field: "real_orientation", question: "Ориентация в реальности", type: "select", options: ["Гетеро", "Гомо", "Би", "Другое"] },
      { id: "q125", field: "genital_self_rating", question: "Самооценка размера половых органов (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q126", field: "orgasmic_ability", question: "Оргазмичность (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q127", field: "frigidity_impotence", question: "Есть фригидность/импотенция?", type: "boolean" }
    ]
  },
  {
    level: 8,
    title: "Тело и здоровье",
    subtitle: "25 вопросов о твоём физическом состоянии",
    questions: [
      { id: "q128", field: "naked_body_rating", question: "Отношение к своему голому телу (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q129", field: "body_complexes", question: "Комплексы по поводу тела", type: "textarea" },
      { id: "q130", field: "current_sport", question: "Спорт сейчас", type: "text" },
      { id: "q131", field: "best_weight", question: "Лучший вес в жизни (кг)", type: "number", min: 30, max: 300 },
      { id: "q132", field: "worst_weight", question: "Худший вес в жизни (кг)", type: "number", min: 30, max: 300 },
      { id: "q133", field: "eating_disorder", question: "Есть расстройство пищевого поведения?", type: "boolean" },
      { id: "q134", field: "bulimia", question: "Была/есть булимия?", type: "boolean" },
      { id: "q135", field: "anorexia", question: "Была/есть анорексия?", type: "boolean" },
      { id: "q136", field: "chronic_pain", question: "Хронические боли (где)", type: "textarea" },
      { id: "q137", field: "psychosomatics", question: "Психосоматика (что болит от стресса)", type: "textarea" },
      { id: "q138", field: "antidepressants", question: "Принимаешь антидепрессанты?", type: "boolean" },
      { id: "q139", field: "tranquilizers", question: "Принимаешь транквилизаторы?", type: "boolean" },
      { id: "q140", field: "psychiatric_treatment", question: "Лечился в психиатрии?", type: "boolean" }
    ]
  },
  {
    level: 9,
    title: "Питание и зависимости",
    subtitle: "20 вопросов о твоих привычках",
    questions: [
      { id: "q141", field: "diet_type", question: "Тип питания", type: "select", options: ["Обычное", "Вегетарианство", "Веганство", "Кето", "Палео", "Сыроедение", "Другое"] },
      { id: "q142", field: "intermittent_fasting", question: "Практикуешь интервальное голодание?", type: "boolean" },
      { id: "q143", field: "raw_food", question: "Сыроедение?", type: "boolean" },
      { id: "q144", field: "alcohol_liters_weekly", question: "Алкоголь (литров в неделю)", type: "number", min: 0, max: 50 },
      { id: "q145", field: "cigarettes_daily", question: "Сигарет в день", type: "number", min: 0, max: 100 },
      { id: "q146", field: "drugs_history", question: "Наркотики (перечисли какие пробовал/употребляешь)", type: "textarea" },
      { id: "q147", field: "sugar_addiction", question: "Зависимость от сахара?", type: "boolean" },
      { id: "q148", field: "coffee_addiction", question: "Зависимость от кофе?", type: "boolean" },
      { id: "q149", field: "energy_drinks", question: "Употребляешь энергетики?", type: "boolean" },
      { id: "q150", field: "sex_work_doping", question: "Используешь допинг для секса/работы?", type: "boolean" }
    ]
  },
  {
    level: 10,
    title: "Психическое здоровье и тёмная сторона",
    subtitle: "30 вопросов о твоих демонах",
    questions: [
      { id: "q151", field: "official_diagnoses", question: "Официальные диагнозы", type: "textarea" },
      { id: "q152", field: "suicide_attempts", question: "Количество суицидальных попыток", type: "number", min: 0, max: 100 },
      { id: "q153", field: "self_harm", question: "Селфхарм (самоповреждение)?", type: "boolean" },
      { id: "q154", field: "psychopathy_self_rating", question: "Психопатия по самооценке (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q155", field: "narcissism_self_rating", question: "Нарциссизм по самооценке (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q156", field: "schizoid_self_rating", question: "Шизоидность по самооценке (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q157", field: "darkest_deed", question: "Самый тёмный поступок в жизни", type: "textarea" },
      { id: "q158", field: "killed_animals", question: "Убивал животных (не для еды)?", type: "boolean" },
      { id: "q159", field: "killed_humans", question: "Убивал людей?", type: "boolean" },
      { id: "q160", field: "theft_history", question: "Воровал?", type: "boolean" },
      { id: "q161", field: "violence_history", question: "Применял насилие?", type: "boolean" },
      { id: "q162", field: "prison_history", question: "Был в тюрьме/судимость?", type: "boolean" },
      { id: "q163", field: "biggest_sin", question: "Самый большой грех", type: "textarea" }
    ]
  },
  {
    level: 11,
    title: "Смерть и наследие",
    subtitle: "15 вопросов о конце и бессмертии",
    questions: [
      { id: "q164", field: "believes_afterlife", question: "Веришь в жизнь после смерти?", type: "boolean" },
      { id: "q165", field: "afterlife_type", question: "Что будет после смерти?", type: "select", options: ["Рай/Ад", "Реинкарнация", "Ничего", "Слияние с Источником", "Не знаю", "Другое"] },
      { id: "q166", field: "death_fear_rating", question: "Страх смерти (0-10)", type: "slider", min: 0, max: 10 },
      { id: "q167", field: "desired_death_way", question: "Желаемый способ умереть", type: "textarea" },
      { id: "q168", field: "epitaph", question: "Эпитафия на твоей могиле", type: "textarea" },
      { id: "q169", field: "legacy_wish", question: "Что должно остаться после тебя?", type: "textarea" }
    ]
  },
  {
    level: 12,
    title: "Метасинхроника",
    subtitle: "Готовность к полному уничтожению эго",
    questions: [
      { id: "q170", field: "ready_ego_death", question: "Готов ли ты умереть для текущего «я» ради рождения нового?", type: "boolean" },
      { id: "q171", field: "daily_practice_hours", question: "Сколько часов в сутки готов практиковать?", type: "number", min: 0, max: 24 },
      { id: "q172", field: "transformation_investment", question: "Сколько денег готов вложить прямо сейчас в полную трансформацию (USD)?", type: "number", min: 0, max: 100000000 },
      { id: "q173", field: "ready_give_all_property", question: "Готов ли ты отдать всё имущество ради пробуждения?", type: "boolean" },
      { id: "q174", field: "ready_public_confession", question: "Готов ли ты публично признаться в самых тёмных поступках?", type: "boolean" },
      { id: "q175", field: "ready_commune_life", question: "Готов ли ты жить в общине Oazyse без интернета и личных вещей?", type: "boolean" },
      { id: "q176", field: "email", question: "Email (обязательно)", type: "text", required: true },
      { id: "q177", field: "telegram", question: "Telegram (обязательно)", type: "text", required: true },
      { id: "q178", field: "archive_permission", question: "Разрешаешь ли записать твоё досье в закрытый архив Oazyse навсегда?", type: "boolean" },
      { id: "q179", field: "confirmation_word", question: "Введи слово «ГОТОВ», если прошёл все вопросы до конца", type: "text", required: true }
    ]
  }
];

export const getTotalQuestions = (): number => {
  return quizLevels.reduce((acc, level) => acc + level.questions.length, 0);
};

export const getQuestionNumber = (levelIndex: number, questionIndex: number): number => {
  let count = 0;
  for (let i = 0; i < levelIndex; i++) {
    count += quizLevels[i].questions.length;
  }
  return count + questionIndex + 1;
};
