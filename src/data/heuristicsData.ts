import { HeuristicItem } from '../types/heuristics';

export const NIELSEN_HEURISTICS: HeuristicItem[] = [
  {
    id: 1,
    numberStr: "01",
    titleSpanish: "Visibilidad del estado del sistema",
    titleEnglish: "Visibility of system status",
    summary: "El diseño siempre debe mantener a los usuarios informados sobre lo que está ocurriendo, a través de una retroalimentación adecuada dentro de un tiempo razonable.",
    quote: "Cuando los usuarios conocen el estado actual del sistema, comprenden las consecuencias de sus interacciones anteriores y deciden el siguiente paso con confianza.",
    realWorldAnalogy: "Como el indicador de batería o las señales luminosas del ascensor que muestran en qué piso está subiendo.",
    keyQuestion: "¿El usuario sabe exactamente qué está procesando el sistema y cuánto tardará?",
    bestPractices: [
      "Indicar claramente el estado actual (cargando, guardado, sin conexión, sincronizado).",
      "Mostrar retroalimentación inmediata (<100ms visual, barras de progreso para >1 segundo).",
      "Proporcionar estimaciones realistas de tiempo en operaciones largas.",
      "Usar micro-animaciones funcionales que confirmen clics y envíos."
    ],
    commonViolations: [
      "Botones que al hacer clic se quedan estáticos sin spinner ni texto de 'Cargando'.",
      "Subidas de archivos pesados sin porcentaje ni tiempo restante estimado.",
      "Cambios guardados en segundo plano sin ninguna notificación de confirmación."
    ],
    category: 'feedback',
    severityGuidelines: "Crítica en transacciones financieras o transferencias de datos donde el usuario puede realizar dobles pagos por falta de feedback."
  },
  {
    id: 2,
    numberStr: "02",
    titleSpanish: "Correspondencia entre el sistema y el mundo real",
    titleEnglish: "Match between system and the real world",
    summary: "El diseño debe hablar el idioma de los usuarios. Utilice palabras, frases y conceptos familiares para el usuario, en lugar de términos internos o jerga técnica del sistema.",
    quote: "Siga las convenciones del mundo real, haciendo que la información aparezca en un orden natural y lógico según el modelo mental del usuario.",
    realWorldAnalogy: "El icono de papelera de reciclaje, la carpeta de archivos o el carrito de compras en supermercados.",
    keyQuestion: "¿La interfaz utiliza términos humanos comprensibles o códigos de error y jerga de base de datos?",
    bestPractices: [
      "Adoptar metáforas familiares del entorno físico y cotidiano.",
      "Evitar acrónimos técnicos internos o nombres de tablas de base de datos.",
      "Organizar la información según el flujo de pensamiento de la persona, no según la arquitectura del servidor.",
      "Realizar pruebas de comprensión de vocabulario con usuarios reales."
    ],
    commonViolations: [
      "Mensajes como 'Error 0x80040115: Invariant violation in memory buffer'.",
      "Uso de términos como 'Subrutina terminada' en lugar de 'Sesión cerrada'.",
      "Flujos de compra ordenados según la lógica de despacho del almacén y no de selección del cliente."
    ],
    category: 'language',
    severityGuidelines: "Mayor cuando aleja a usuarios no técnicos de completar tareas esenciales por incomprensión del léxico."
  },
  {
    id: 3,
    numberStr: "03",
    titleSpanish: "Control y libertad del usuario",
    titleEnglish: "User control and freedom",
    summary: "Los usuarios suelen realizar acciones por error. Necesitan una 'salida de emergencia' claramente identificada para salir del estado no deseado sin trámites engorrosos.",
    quote: "Cuando es fácil salir de un proceso o deshacer una acción accidental, se fomenta una sensación de libertad y seguridad para explorar.",
    realWorldAnalogy: "La puerta de salida de emergencia en un edificio o el botón de parada de emergencia en una escalera mecánica.",
    keyQuestion: "¿Puede el usuario cancelar, cerrar, deshacer (Ctrl+Z) o regresar fácilmente si se equivocó?",
    bestPractices: [
      "Soporte inmediato y visible para 'Deshacer' (Undo) y 'Rehacer' (Redo).",
      "Botones claros de 'Cancelar' o 'Cerrar' (icono X y tecla Esc) en modales y asistentes.",
      "Permitir volver al paso anterior en procesos multifase sin perder los datos rellenados.",
      "Habilitar papelera temporal antes de borrados permanentes definitivos."
    ],
    commonViolations: [
      "Modales emergentes sin botón para cerrar o que no responden a la tecla Escape.",
      "Eliminación inmediata de elementos sin opción de 'Deshacer'.",
      "Formularios de varios pasos donde volver atrás borra todos los campos ya completados."
    ],
    category: 'freedom',
    severityGuidelines: "Catástrofe cuando una acción irreversible no ofrece confirmación ni mecanismo de reversión."
  },
  {
    id: 4,
    numberStr: "04",
    titleSpanish: "Consistencia y estándares",
    titleEnglish: "Consistency and standards",
    summary: "Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Siga las convenciones de la plataforma e industria (Ley de Jakob).",
    quote: "La Ley de Jakob establece que los usuarios pasan la mayor parte de su tiempo en otros sitios. Prefieren que el tuyo funcione igual que los que ya conocen.",
    realWorldAnalogy: "El pedal de freno siempre a la izquierda del acelerador en cualquier automóvil del mundo.",
    keyQuestion: "¿Los botones, enlaces, iconos y comportamientos se alinean con los estándares reconocidos?",
    bestPractices: [
      "Mantener consistencia interna: tipografía, colores, espaciados y nomenclatura idéntica en toda la app.",
      "Mantener consistencia externa: utilizar patrones estándar de la industria (p. ej., lupa para búsqueda).",
      "Ubicar elementos clave donde el usuario espera (perfil arriba a la derecha, navegación principal fija).",
      "Evitar reinventar la rueda en componentes universales como calendarios o selectores."
    ],
    commonViolations: [
      "Usar el icono de un ancla o un candado para representar el carrito de compras.",
      "En una pantalla usar el botón 'Guardar' verde y en otra usar 'Registrar' rojo.",
      "Enlaces que no se diferencian visualmente del texto estático o que abren ventanas sin aviso."
    ],
    category: 'standards',
    severityGuidelines: "Moderada a Mayor: provoca fricción continua y desconcierto cognitivo al navegar entre secciones."
  },
  {
    id: 5,
    numberStr: "05",
    titleSpanish: "Prevención de errores",
    titleEnglish: "Error prevention",
    summary: "Aún mejor que los buenos mensajes de error es un diseño cuidadoso que evite que el problema ocurra en primer lugar. Elimine condiciones propensas a errores o pida confirmación antes de la acción.",
    quote: "Hay dos tipos de errores: deslices (involuntarios causados por falta de atención) y equivocaciones (conscientes basadas en un modelo mental incorrecto). Ambos deben prevenirse.",
    realWorldAnalogy: "Las tomas de enchufe con polaridad o las boquillas de combustible diésel que no encajan en tanques de gasolina.",
    keyQuestion: "¿El diseño ayuda proactivamente al usuario a no cometer errores antes de que sucedan?",
    bestPractices: [
      "Inhabilitar opciones no válidas (p. ej., deshabilitar fechas pasadas en reserva de vuelos).",
      "Validación en tiempo real en formularios mientras se escribe, no solo tras enviar.",
      "Mecanismo de doble confirmación o deslizador de seguridad para acciones altamente destructivas.",
      "Autocompletado inteligente y sugerencias de búsqueda tolerantes a faltas tipográficas."
    ],
    commonViolations: [
      "Permitir ingresar un formulario entero para luego rechazarlo por un carácter especial no permitido.",
      "Botón 'Eliminar cuenta' colocado justo al lado de 'Guardar cambios' con el mismo estilo.",
      "Campos de fecha en texto libre sin selector ni máscara de formato (DD/MM/AAAA)."
    ],
    category: 'prevention',
    severityGuidelines: "Muy alta: el mejor diseño no soluciona errores, previene que la persona tenga que sufrirlos."
  },
  {
    id: 6,
    numberStr: "06",
    titleSpanish: "Reconocimiento antes que recuerdo",
    titleEnglish: "Recognition rather than recall",
    summary: "Minimice la carga de memoria del usuario haciendo visibles los elementos, las acciones y las opciones. La información debe ser visible o fácilmente recuperable cuando sea necesario.",
    quote: "Los humanos somos mucho mejores reconociendo algo que hemos visto que recordando datos de la memoria pura. Reduzca el esfuerzo cognitivo.",
    realWorldAnalogy: "Un examen de opción múltiple (reconocimiento) frente a una pregunta abierta de memoria pura (recuerdo).",
    keyQuestion: "¿El usuario tiene que memorizar datos de un paso anterior para usarlos en el paso siguiente?",
    bestPractices: [
      "Mostrar historial de búsquedas recientes, documentos abiertos y elementos favoritos.",
      "Proporcionar menús contextuales y listas desplegables con miniaturas visuales.",
      "Mantener resúmenes de pedidos visibles durante todo el flujo de pago.",
      "Ofrecer pistas visuales y ayudas en el punto exacto de decisión."
    ],
    commonViolations: [
      "Exigir escribir a mano el código alfanumérico de un producto visto tres pantallas atrás.",
      "Ocultar opciones críticas de acción dentro de submenús invisibles sin señalización.",
      "Formularios de checkout donde no se puede ver qué productos se están pagando."
    ],
    category: 'memory',
    severityGuidelines: "Mayor: el agotamiento de la memoria a corto plazo conduce a abandono inmediato de carritos y tareas."
  },
  {
    id: 7,
    numberStr: "07",
    titleSpanish: "Flexibilidad y eficiencia de uso",
    titleEnglish: "Flexibility and efficiency of use",
    summary: "Los aceleradores —invisibles para el usuario novato— a menudo pueden acelerar la interacción para el usuario experto, atendiendo a usuarios con diferentes niveles de experiencia.",
    quote: "Un buen sistema acoge con calidez al principiante a través de asistentes simples y empodera al experto con atajos y personalización.",
    realWorldAnalogy: "El pedal de embrague y marchas manuales para conductores expertos frente a la caja automática para principiantes.",
    keyQuestion: "¿Existen atajos de teclado, comandos rápidos o personalización para usuarios frecuentes?",
    bestPractices: [
      "Implementar atajos de teclado (como Ctrl+K, Ctrl+S, o navegación J/K).",
      "Permitir selecciones múltiples y operaciones por lotes (batch actions).",
      "Ofrecer filtros rápidos y personalización de vistas o columnas en tablas de datos.",
      "Mantener flujos guiados para novatos sin bloquear accesos directos para usuarios avanzados."
    ],
    commonViolations: [
      "Obligar a usuarios avanzados a repetir 10 clics en un asistente para una tarea diaria repetitiva.",
      "Falta de soporte para teclas universales como Tab para saltar entre campos o Enter para enviar.",
      "Ausencia de opciones de búsqueda rápida o paleta de comandos en aplicaciones complejas."
    ],
    category: 'efficiency',
    severityGuidelines: "Crítica en software empresarial de productividad donde la lentitud impacta horas de trabajo diario."
  },
  {
    id: 8,
    numberStr: "08",
    titleSpanish: "Diseño estético y minimalista",
    titleEnglish: "Aesthetic and minimalist design",
    summary: "Las interfaces no deben contener información irrelevante o rara vez necesaria. Cada unidad adicional de información compite con las unidades relevantes y disminuye su visibilidad.",
    quote: "El minimalismo en UX no es solo una moda visual en blanco y negro: se trata de maximizar la relación entre señal y ruido (Signal-to-Noise Ratio).",
    realWorldAnalogy: "El panel de control de un velocímetro moderno frente a una cabina sobrecargada de botones innecesarios.",
    keyQuestion: "¿Cada elemento en pantalla aporta un valor real a la tarea o es simple ruido visual decorativo?",
    bestPractices: [
      "Priorizar el contenido primario y reducir elementos decorativos superfluos.",
      "Utilizar espacios en blanco (whitespace) para estructurar y dar respiro a la lectura.",
      "Aplicar una jerarquía visual estricta (1 acción principal destacada, secundarias sutiles).",
      "Evitar sobrecargar con insignias, banners promocionales y textos redundantes."
    ],
    commonViolations: [
      "Pantallas colmadas de 15 badges de colores, banners parpadeantes y tipografías inconexas.",
      "Descripciones redundantes que repiten lo que el título del botón ya explica con claridad.",
      "Tablas saturadas de datos secundarios que ocultan la métrica principal requerida para decidir."
    ],
    category: 'aesthetic',
    severityGuidelines: "Moderada a Alta: satura la atención del usuario y aumenta el tiempo de procesamiento visual."
  },
  {
    id: 9,
    numberStr: "09",
    titleSpanish: "Ayudar a los usuarios a reconocer, diagnosticar y recuperarse de errores",
    titleEnglish: "Help users recognize, diagnose, and recover from errors",
    summary: "Los mensajes de error deben expresarse en un lenguaje sencillo (sin códigos oscuros), indicar con precisión el problema y sugerir de manera constructiva una solución práctica.",
    quote: "Un error no es un castigo al usuario: es una conversación donde el sistema le asiste a retomar el rumbo con empatía y claridad.",
    realWorldAnalogy: "Un mecánico que en vez de decir 'Fallo código E-448' te dice 'La rueda delantera izquierda tiene baja presión, aquí tienes el inflador'.",
    keyQuestion: "¿El mensaje explica claramente qué pasó y cómo se arregla en un solo clic?",
    bestPractices: [
      "Usar lenguaje natural y humano, evitando tecnicismos como 'Null Pointer' o 'Error 500'.",
      "Señalar visualmente el campo exacto del error con un mensaje al lado, no en un aviso flotante lejano.",
      "Ofrecer una solución constructiva o enlace directo de acción ('Probar con otro correo', 'Reintentar').",
      "No culpar al usuario con tonos acusatorios ('Has cometido un error grave')."
    ],
    commonViolations: [
      "Mostrar una pantalla blanca o roja con el texto 'Ocurrió un error inesperado' sin ninguna guía.",
      "Mensajes crípticos del backend expuestos al usuario final.",
      "Indicar 'Formulario inválido' sin especificar cuál de los 20 campos tiene el dato incorrecto."
    ],
    category: 'recovery',
    severityGuidelines: "Crítica: los mensajes de error deficientes provocan frustración extrema y abandono inmediato de la aplicación."
  },
  {
    id: 10,
    numberStr: "10",
    titleSpanish: "Ayuda y documentación",
    titleEnglish: "Help and documentation",
    summary: "Aunque es mejor si el sistema se puede usar sin documentación, puede ser necesario proporcionar ayuda. Debe ser fácil de buscar, centrada en la tarea y listar pasos concretos.",
    quote: "La mejor ayuda es la que no se necesita. La segunda mejor es la que aparece exactamente cuando y donde se necesita, en pequeñas dosis.",
    realWorldAnalogy: "La pequeña etiqueta ilustrada al lado del neumático de repuesto que muestra en 3 pasos cómo colocar el gato.",
    keyQuestion: "¿La ayuda está disponible en contexto, es breve y ofrece soluciones paso a paso?",
    bestPractices: [
      "Ofrecer ayuda contextual (tooltips con '¿Por qué necesitamos este dato?') en puntos críticos.",
      "Diseñar documentación modular orientada a tareas ('Cómo exportar un reporte') en lugar de manuales densos.",
      "Buscador de ayuda con autocompletado y preguntas frecuentes visibles.",
      "Guías de bienvenida interactivas (onboarding) breves y descartables en cualquier momento."
    ],
    commonViolations: [
      "Obligar al usuario a descargar un PDF de 80 páginas para resolver una duda de 30 segundos.",
      "Glosarios técnicos sin buscador o con respuestas que no explican la solución práctica.",
      "Ausencia de pistas de ayuda en campos complejos de impuestos o configuraciones de seguridad."
    ],
    category: 'help',
    severityGuidelines: "Moderada: se vuelve severa en herramientas profesionales con reglas de negocio intrincadas."
  }
];
