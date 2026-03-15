const questions = [
  {
    question:
      "Un modelo genera una respuesta que suena completamente correcta pero es factualmente errónea. ¿Cuál es la causa más precisa?",
    options: [
      "El prompt no incluía instrucciones para rechazar preguntas sin respuesta clara",
      "El modelo genera la continuación más probable, no la más verdadera, y no tiene mecanismo interno de verificación",
      "El modelo no tiene acceso a internet para contrastar los datos generados",
      "Los datos de entrenamiento del modelo estaban desactualizados para ese tema concreto",
    ],
    correct: 1,
    explanation:
      "La alucinación no ocurre por prompts insuficientes ni por falta de contexto — ocurre porque el modelo genera texto estadísticamente coherente, no necesariamente verdadero. No existe ningún proceso de verificación interno que detecte cuándo el resultado es incorrecto.",
  },
  {
    question:
      "Tu sistema procesa contratos en español. Tienes estimaciones de consumo basadas en documentos de prueba en inglés. ¿Qué ajuste deberías aplicar?",
    options: [
      "Ninguno — los tokenizadores modernos están optimizados para múltiples idiomas por igual",
      "Reducir el número de fragmentos en RAG para compensar el mayor tamaño de los documentos",
      "Añadir entre un 10% y un 20% al consumo estimado — el español tiende a generar más tokens para el mismo contenido",
      "Multiplicar por 0.75 — el español usa más contracciones y artículos que agrupan tokens",
    ],
    correct: 2,
    explanation:
      "Los tokenizadores están optimizados principalmente para el inglés. El español, con palabras más largas y morfología más rica, consume sistemáticamente más tokens para el mismo contenido. Ignorar este ajuste lleva a subestimar costes en sistemas reales.",
  },
  {
    question:
      "Estás construyendo un sistema RAG. Para una pregunta compleja, el sistema recupera 80 fragmentos de 500 tokens cada uno. ¿Cuál es el riesgo principal de incluirlos todos en el contexto?",
    options: [
      "El proveedor rechazará la llamada si supera cierto número de fragmentos por petición",
      "Los fragmentos se solapan semánticamente y el modelo generará respuestas contradictorias",
      "El coste de la llamada superará el límite de gasto configurado en la cuenta del proveedor",
      "La información relevante puede quedar enterrada en el centro del contexto, donde los modelos tienden a perder atención",
    ],
    correct: 3,
    explanation:
      "El efecto «lost in the middle» muestra que los modelos prestan más atención al inicio y al final del contexto. Con muchos fragmentos, la información crítica puede caer en el centro y tener menos peso en la respuesta — independientemente del tamaño de la ventana de contexto.",
  },
  {
    question:
      "Un sistema extrae campos estructurados de facturas: fecha, importe, proveedor y número de factura. ¿Qué temperatura es más adecuada?",
    options: [
      "0.7 — para que el modelo explore distintas interpretaciones posibles del documento",
      "0.0 – 0.2 — la respuesta correcta es única y queremos máxima consistencia",
      "0.5 — equilibrio entre precisión y flexibilidad interpretativa",
      "Temperatura por defecto del proveedor — los valores recomendados están optimizados para extracción",
    ],
    correct: 1,
    explanation:
      "La extracción de datos estructurados tiene una respuesta correcta por definición: los campos que están en el documento. Temperatura baja maximiza la consistencia y evita que el modelo «interprete» valores que debería leer literalmente.",
  },
  {
    question:
      "Un equipo de cumplimiento necesita que el sistema procese el mismo documento siempre de la misma forma para poder auditarlo. ¿Qué combinación da más garantías?",
    options: [
      "Temperatura 0 con seed fijo — mejora la reproducibilidad aunque no garantice determinismo perfecto en todos los casos",
      "Temperatura 1.0 con top-p 0.1 — los dos parámetros se compensan entre sí",
      "Temperatura 0 — garantiza determinismo absoluto en cualquier GPU y proveedor",
      "Top-p 0 con temperatura por defecto — elimina la variación mejor que la temperatura sola",
    ],
    correct: 0,
    explanation:
      "Temperatura 0 reduce la variación pero no la elimina del todo: las operaciones en GPU pueden introducir diferencias de coma flotante. El parámetro seed, donde está disponible, añade una capa extra de reproducibilidad. La combinación de ambos es la más robusta para requisitos de auditoría.",
  },
  {
    question:
      "Tu equipo evalúa Llama 4 Maverick para un sistema interno de clasificación de documentos legales. ¿Qué deberías revisar antes de comprometerte con este modelo?",
    options: [
      "La calidad en benchmarks de clasificación — los open source siguen siendo muy inferiores a los propietarios para tareas legales",
      "La licencia del modelo — puede incluir restricciones relevantes para tu empresa o sector",
      "El rendimiento en clasificación — los modelos open source no alcanzan la calidad necesaria para uso profesional en tareas legales",
      "El tiempo de despliegue inicial — los modelos open source requieren meses para tener infraestructura estable",
    ],
    correct: 1,
    explanation:
      "A marzo de 2026, Llama 4 Maverick es competitivo con los mejores modelos propietarios en tareas bien definidas como la clasificación — la brecha de calidad se ha cerrado. El despliegue puede hacerse en horas o días con herramientas como Ollama, que expone una API compatible con la de OpenAI y tiene integración directa con Spring AI. Lo que sí puede ser un bloqueante real es la licencia — puede incluir restricciones por número de usuarios, uso comercial o productos derivados.",
  },
  {
    question:
      "Un banco europeo evalúa modelos para un sistema que analiza solicitudes de crédito. ¿Cuál debería ser el primer filtro en la evaluación?",
    options: [
      "Si el modelo y la arquitectura cumplen los requisitos del AI Act y DORA aplicables",
      "La calidad en benchmarks de razonamiento financiero publicados",
      "El coste por token al volumen estimado de llamadas mensuales",
      "La latencia media del proveedor en Europa para no impactar la experiencia del solicitante",
    ],
    correct: 0,
    explanation:
      "Los sistemas de crédito son de alto riesgo bajo el AI Act, y los bancos están sujetos a DORA. Si el modelo o la arquitectura no cumplen esos requisitos, el análisis de calidad y coste es irrelevante. Compliance es el filtro eliminatorio que va primero.",
  },
  {
    question:
      "Tu empresa necesita procesar 50.000 documentos cada noche en un pipeline batch. ¿Qué métrica de latencia debería guiar la elección del modelo?",
    options: [
      "Time to First Token (TTFT) — determina cuánto tarda en arrancar cada petición individual",
      "Throughput (tokens por segundo) — determina cuánto trabajo se completa en el tiempo disponible",
      "Las dos por igual — TTFT y throughput tienen el mismo peso en cualquier caso de uso",
      "Latencia end-to-end de red — es el factor dominante cuando el volumen es alto",
    ],
    correct: 1,
    explanation:
      "En procesos batch el objetivo es maximizar el trabajo completado en el tiempo disponible, no minimizar la percepción de espera. El throughput determina cuántos documentos procesas por hora. TTFT es la métrica relevante en interfaces conversacionales, donde el usuario espera ver la primera palabra.",
  },
  {
    question:
      "Una empresa de seguros española tiene contrato enterprise con Azure y necesita que los datos de clientes no salgan de la UE. ¿Cuál es el camino más recomendable?",
    options: [
      "API pública directa de OpenAI — es la opción más rápida de implementar",
      "Self-hosted con Ollama — garantiza que los datos no salen de la infraestructura propia",
      "Azure OpenAI Service — los datos se procesan en la región europea configurada y el contrato enterprise ya cubre el servicio",
      "Vertex AI en GCP — ofrece más variedad de modelos disponibles en región europea",
    ],
    correct: 2,
    explanation:
      "Con un contrato enterprise con Azure, Azure OpenAI Service es el camino de menor fricción: los datos quedan en la región europea, el DPA ya está cubierto por el acuerdo existente y no hay que aprovisionar infraestructura propia. Self-hosted añadiría carga operativa sin beneficio adicional real en este escenario.",
  },
  {
    question:
      "Un equipo ha construido su sistema parseando los bloques de razonamiento interno que devuelve Claude (Extended Thinking) para tomar decisiones en el flujo. ¿Cuál es la implicación más importante de esta decisión?",
    options: [
      "Es una decisión con alto riesgo de coste — Claude cobra significativamente más por token que otros modelos",
      "Extended Thinking puede desactivarse sin previo aviso, lo que haría fallar el sistema en producción",
      "No tiene implicaciones especiales — todos los proveedores principales exponen el razonamiento interno de forma similar",
      "El sistema tiene una dependencia explícita con Anthropic que puede ser costosa de migrar si se necesita cambiar de proveedor",
    ],
    correct: 3,
    explanation:
      "Usar Extended Thinking es válido si aporta valor diferencial real. Pero ningún otro proveedor expone el razonamiento interno de esta forma, lo que crea un acoplamiento explícito con Anthropic. El capítulo no dice que hay que evitar estas capacidades — dice que hay que documentar la dependencia para que el coste de una eventual migración sea visible desde el principio.",
  },
]

export default questions
