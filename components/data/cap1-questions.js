const questions = [
  {
    question: "En el 95% de los casos enterprise, «añadir IA» significa principalmente:",
    options: [
      "Entrenar un modelo personalizado con los datos de la empresa",
      "Enviar texto a una API, recibir una respuesta y actuar en consecuencia",
      "Desplegar infraestructura de GPUs para inferencia local",
      "Contratar a un equipo de data scientists",
    ],
    correct: 1,
    explanation:
      "Añadir IA en la práctica es integración: llamar a una API, interpretar la respuesta y conectarla con la lógica de negocio existente.",
  },
  {
    question: "¿Cuál es la diferencia principal entre un AI Engineer y un Data Scientist?",
    options: [
      "El AI Engineer usa Python y el Data Scientist usa Java",
      "El Data Scientist construye los modelos; el AI Engineer construye los sistemas que los usan",
      "El AI Engineer tiene más conocimientos de estadística",
      "No hay diferencia real, son el mismo perfil con distinto nombre",
    ],
    correct: 1,
    explanation:
      "El Data Scientist investiga y entrena modelos. El AI Engineer integra modelos ya entrenados en aplicaciones de negocio. Son roles distintos con skills distintas.",
  },
  {
    question: "¿Cuál de estos casos de uso tiene el ROI más predecible y el resultado más fácil de verificar?",
    options: [
      "Asistentes conversacionales",
      "Generación de borradores",
      "Clasificación automática",
      "RAG sobre documentación interna",
    ],
    correct: 2,
    explanation:
      "La clasificación tiene etiquetas de referencia, métricas claras (precisión, recall) y un criterio de éxito objetivo. Es el punto de entrada más seguro para proyectos de IA enterprise.",
  },
  {
    question:
      "Una empresa tiene varias demos de IA funcionando en local que impresionan en presentaciones, pero ninguna está en producción. ¿En qué nivel del mapa de madurez se encuentra?",
    options: [
      "Nivel 0 — Sin IA",
      "Nivel 1 — Experimentación",
      "Nivel 2 — Primera producción",
      "Nivel 3 — Escala controlada",
    ],
    correct: 1,
    explanation:
      "El nivel 1 se caracteriza exactamente por esto: hay interés y demos, pero nada en producción. El salto al nivel 2 es el más difícil y el más valioso.",
  },
  {
    question:
      "Tu empresa recibe 500 correos diarios y quiere identificar cuáles mencionan alguno de los 40 productos del catálogo por su nombre exacto. ¿Cuál es el mejor enfoque?",
    options: [
      "Un LLM — el volumen diario justifica la automatización y los correos son texto no estructurado",
      "Una búsqueda de texto sobre los nombres del catálogo — más rápida, más barata y completamente predecible para este caso concreto",
      "Un modelo de clasificación entrenado con correos históricos etiquetados",
      "RAG con el catálogo de productos indexado en un vector store",
    ],
    correct: 1,
    explanation:
      "Cuando se buscan coincidencias exactas sobre un conjunto conocido, la búsqueda de texto supera a la IA en fiabilidad, velocidad y coste. La IA añadiría valor si el problema fuera semántico — por ejemplo, detectar intención de compra aunque no se mencione el producto.",
  },
  {
    question:
      "¿Cuál de los siguientes factores puede disparar el consumo de tokens de forma inesperada en un asistente conversacional?",
    options: [
      "Llamar al modelo desde distintas regiones geográficas",
      "Responder en español en lugar de en inglés",
      "Que cada turno de conversación reenvíe todo el historial anterior al modelo",
      "Hacer más de 100 llamadas al día al proveedor",
    ],
    correct: 2,
    explanation:
      "El historial conversacional crece con cada turno y se reenvía completo en cada llamada. Una conversación de diez turnos puede consumir diez veces más tokens que una de un solo turno, sin que el desarrollador lo haya anticipado.",
  },
  {
    question: "Según el mapa de madurez, ¿cuál de estas iniciativas debería abordarse antes?",
    options: [
      "Implementar un sistema multi-agente con RAG avanzado",
      "Construir un vector store corporativo centralizado",
      "Llevar un caso de uso sencillo a producción aunque no sea perfecto",
      "Definir los estándares de gobernanza de IA para toda la organización",
    ],
    correct: 2,
    explanation:
      "El salto más importante es del nivel 1 al nivel 2: tener algo en producción, por pequeño que sea. La gobernanza y la infraestructura avanzada son objetivos de niveles posteriores — construirlos antes de tener nada en producción es habitual y costoso.",
  },
  {
    question: "¿Por qué el streaming es la solución estándar para interfaces conversacionales con LLMs?",
    options: [
      "Porque reduce el coste en tokens al enviar la respuesta en fragmentos",
      "Porque permite cancelar la respuesta si el modelo empieza a alucinar",
      "Porque el usuario ve texto aparecer de inmediato, haciendo tolerable la latencia de varios segundos",
      "Porque es el único protocolo que soportan los proveedores de LLMs",
    ],
    correct: 2,
    explanation:
      "El streaming no reduce la latencia real — el modelo tarda lo mismo. Pero transforma la experiencia de usuario: en lugar de esperar cinco segundos sin feedback, el texto aparece progresivamente.",
  },
  {
    question: "¿Cuál de estas señales indica que probablemente NO tiene sentido usar IA?",
    options: [
      "El input es texto no estructurado con alta variabilidad",
      "La tarea requiere comprensión semántica del contenido",
      "La decisión debe ser completamente auditable y explicable por normativa",
      "El volumen de operaciones hace inviable la revisión humana",
    ],
    correct: 2,
    explanation:
      "Cuando la regulación exige que cada decisión sea explicable, «el modelo lo decidió» no es una justificación válida. Los LLMs no son auditables de la misma forma que una regla de negocio.",
  },
  {
    question: "¿Por qué los prompts requieren mantenimiento aunque el código no haya cambiado?",
    options: [
      "Porque los prompts se corrompen con el tiempo en el repositorio",
      "Porque cuando el proveedor actualiza el modelo, el comportamiento puede cambiar aunque el prompt sea idéntico",
      "Porque los usuarios siempre encuentran formas de manipularlos",
      "No requieren mantenimiento si están bien escritos desde el principio",
    ],
    correct: 1,
    explanation:
      "Un prompt que funcionaba perfectamente con una versión del modelo puede dar resultados distintos con la siguiente. Los prompts son artefactos vivos que necesitan tests de regresión y monitorización continua.",
  },
]

export default questions
