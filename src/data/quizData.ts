import { QuizQuestion } from '../types/heuristics';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenarioTitle: "La pantalla en blanco al subir el archivo",
    contextDescription: "Un usuario hace clic en 'Subir reporte anual (450 MB)'. La pantalla no cambia, el botón sigue visible, el cursor no cambia y no hay ningún indicador ni barra de porcentaje.",
    badUiSnippet: "Botón [Subir Archivo] estático. Cero barras, cero loaders, cero mensajes. El usuario hace clic 6 veces pensando que no funcionó.",
    options: [
      { heuristicId: 1, title: "01. Visibilidad del estado del sistema" },
      { heuristicId: 3, title: "03. Control y libertad del usuario" },
      { heuristicId: 8, title: "08. Diseño estético y minimalista" },
      { heuristicId: 10, title: "10. Ayuda y documentación" }
    ],
    correctHeuristicId: 1,
    explanation: "El sistema no está proporcionando ninguna retroalimentación oportuna sobre lo que está sucediendo en el servidor. El usuario queda desorientado y probablemente provocará peticiones duplicadas.",
    recommendation: "Mostrar de inmediato un cambio de estado en el botón ('Subiendo...'), barra de progreso con porcentaje y tiempo restante estimado."
  },
  {
    id: 2,
    scenarioTitle: "El modal que secuestra la navegación",
    contextDescription: "Un usuario hace clic por error en 'Configuración avanzada de red'. Se abre una ventana modal en pantalla completa que no tiene botón 'Cerrar', la tecla Esc no hace nada y el botón 'Atrás' del navegador está deshabilitado.",
    badUiSnippet: "Modal sin botón 'X', sin botón 'Cancelar'. El usuario debe forzar el cierre de la pestaña y perder su sesión.",
    options: [
      { heuristicId: 2, title: "02. Correspondencia con el mundo real" },
      { heuristicId: 3, title: "03. Control y libertad del usuario" },
      { heuristicId: 4, title: "04. Consistencia y estándares" },
      { heuristicId: 7, title: "07. Flexibilidad y eficiencia de uso" }
    ],
    correctHeuristicId: 3,
    explanation: "El usuario carece de una 'salida de emergencia' para cancelar o salir de una interacción no deseada sin consecuencias negativas.",
    recommendation: "Añadir un botón 'Cancelar' evidente, un icono de cerrar 'X' en la esquina superior derecha y permitir cerrar con la tecla Esc o haciendo clic fuera del modal."
  },
  {
    id: 3,
    scenarioTitle: "La jerga de base de datos para el cliente",
    contextDescription: "Al intentar guardar un perfil de usuario, el sistema arroja la alerta: 'ERROR_DB_ROW_LOCK_TIMEOUT: Violation of FOREIGN_KEY constraint tbl_usr_rel_04'.",
    badUiSnippet: "Alerta emergente roja con código SQL y nombres de tablas internas que el usuario final no comprende.",
    options: [
      { heuristicId: 2, title: "02. Correspondencia entre el sistema y el mundo real" },
      { heuristicId: 5, title: "05. Prevención de errores" },
      { heuristicId: 6, title: "06. Reconocimiento antes que recuerdo" },
      { heuristicId: 8, title: "08. Diseño estético y minimalista" }
    ],
    correctHeuristicId: 2,
    explanation: "El sistema habla en la jerga de los programadores y de la base de datos en vez de emplear el lenguaje natural y conceptos familiares para el usuario.",
    recommendation: "Traducir a lenguaje humano claro: 'No se pudieron guardar los cambios porque el servidor tardó en responder. Por favor, intenta de nuevo en unos momentos.'"
  },
  {
    id: 4,
    scenarioTitle: "El icono de ancla como carrito de compras",
    contextDescription: "Una tienda online decide ser 'innovadora' y reemplaza el clásico icono de carrito de compras por un ancla de barco, y cambia el color del botón 'Pagar' a gris sin relieve simulando un pie de página.",
    badUiSnippet: "Icono de ancla ⚓ en lugar de carrito 🛒; enlaces en texto negro idéntico al párrafo sin subrayado ni color de acción.",
    options: [
      { heuristicId: 1, title: "01. Visibilidad del estado del sistema" },
      { heuristicId: 4, title: "04. Consistencia y estándares" },
      { heuristicId: 7, title: "07. Flexibilidad y eficiencia de uso" },
      { heuristicId: 9, title: "09. Ayuda en errores" }
    ],
    correctHeuristicId: 4,
    explanation: "Viola la Ley de Jakob y los estándares universales de la industria. Los usuarios esperan símbolos y ubicaciones estandarizadas en compras digitales.",
    recommendation: "Utilizar el icono universal de carrito o bolsa de compra y mantener el botón de checkout destacado conforme a las convenciones de e-commerce."
  },
  {
    id: 5,
    scenarioTitle: "Reserva de vuelo en fecha anterior al despegue",
    contextDescription: "Un usuario selecciona como fecha de salida el 25 de Octubre. En el campo de fecha de regreso, el sistema le permite seleccionar libremente el 10 de Octubre (fecha anterior) y solo al final del proceso de 5 pasos rechaza la compra.",
    badUiSnippet: "Calendario que permite elegir cualquier día del pasado y arroja error tras 10 minutos de rellenar datos.",
    options: [
      { heuristicId: 5, title: "05. Prevención de errores" },
      { heuristicId: 6, title: "06. Reconocimiento antes que recuerdo" },
      { heuristicId: 10, title: "10. Ayuda y documentación" },
      { heuristicId: 3, title: "03. Control y libertad" }
    ],
    correctHeuristicId: 5,
    explanation: "El sistema debió inhabilitar proactivamente todas las fechas anteriores a la salida en el selector del regreso, previniendo el error antes de que sucediera.",
    recommendation: "Bloquear en gris las fechas anteriores a la fecha de ida seleccionada y actualizar automáticamente el calendario."
  },
  {
    id: 6,
    scenarioTitle: "Escriba de memoria el código de producto",
    contextDescription: "Al llegar a la pantalla de confirmación de pedido, el formulario exige: 'Ingrese el SKU numérico de 12 dígitos del producto que vio en la página anterior para aplicar el descuento'.",
    badUiSnippet: "Campo de texto vacío exigiendo memorizar 12 dígitos vistos hace 3 pantallas.",
    options: [
      { heuristicId: 6, title: "06. Reconocimiento antes que recuerdo" },
      { heuristicId: 8, title: "08. Diseño estético y minimalista" },
      { heuristicId: 7, title: "07. Flexibilidad y eficiencia" },
      { heuristicId: 2, title: "02. Mundo real" }
    ],
    correctHeuristicId: 6,
    explanation: "Obliga a la persona a recurrir a la memoria pura (recall) en lugar de permitirle reconocer opciones en pantalla o transferir automáticamente el dato seleccionado.",
    recommendation: "Mostrar una lista desplegable con los productos vistos recientemente con su imagen y título, o aplicar el descuento con un solo clic."
  },
  {
    id: 7,
    scenarioTitle: "El contador que debe hacer 8 clics por cada fila",
    contextDescription: "Un analista financiero procesa 120 facturas diarias. El software le exige abrir cada factura con 3 clics, cerrar un aviso, pulsar 'Aprobar' con ratón, y no admite atajos como Ctrl+Enter o flechas de teclado.",
    badUiSnippet: "Obliga a usar el ratón para cada micro-paso; sin atajos de teclado, sin selección masiva de filas.",
    options: [
      { heuristicId: 7, title: "07. Flexibilidad y eficiencia de uso" },
      { heuristicId: 1, title: "01. Visibilidad del sistema" },
      { heuristicId: 4, title: "04. Consistencia y estándares" },
      { heuristicId: 10, title: "10. Ayuda y documentación" }
    ],
    correctHeuristicId: 7,
    explanation: "Carece de aceleradores para usuarios frecuentes y expertos, penalizando gravemente su productividad con tareas repetitivas.",
    recommendation: "Incorporar atajos de teclado (J/K para moverse, Enter para aprobar), selección múltiple con casillas y acciones por lotes (Batch processing)."
  },
  {
    id: 8,
    scenarioTitle: "La pantalla con 14 badges y 4 banners de advertencia",
    contextDescription: "Una página de inicio muestra simultáneamente un banner de cookies enorme, 3 alertas de promociones con texto en mayúsculas rojas, 12 badges de estado de colores diferentes y textos explicativos redundantes que tapan el contenido.",
    badUiSnippet: "Relación Señal/Ruido destruida. Elementos parpadeantes compitiendo agresivamente por la atención visual.",
    options: [
      { heuristicId: 8, title: "08. Diseño estético y minimalista" },
      { heuristicId: 6, title: "06. Reconocimiento antes que recuerdo" },
      { heuristicId: 5, title: "05. Prevención de errores" },
      { heuristicId: 2, title: "02. Mundo real" }
    ],
    correctHeuristicId: 8,
    explanation: "La saturación visual y la falta de jerarquía diluyen la información relevante, aumentando la fatiga cognitiva del usuario.",
    recommendation: "Eliminar badges ornamentales, consolidar notificaciones en un centro de avisos y respetar espacios en blanco con un único punto focal primario."
  },
  {
    id: 9,
    scenarioTitle: "Error 404: 'Página no encontrada' sin enlaces",
    contextDescription: "Un usuario llega a un enlace roto y se encuentra con una pantalla negra que dice simplemente '404 NOT FOUND' sin menú de navegación, sin barra de búsqueda y sin sugerencia de a dónde ir.",
    badUiSnippet: "Callejón sin salida. Texto frío '404' y ninguna indicación de cómo recuperarse del problema.",
    options: [
      { heuristicId: 9, title: "09. Ayudar a los usuarios a reconocer y recuperarse de errores" },
      { heuristicId: 1, title: "01. Visibilidad del sistema" },
      { heuristicId: 3, title: "03. Control y libertad" },
      { heuristicId: 10, title: "10. Ayuda y documentación" }
    ],
    correctHeuristicId: 9,
    explanation: "El mensaje no ofrece una ruta constructiva ni diagnóstico comprensible para que el usuario pueda recuperarse del error y continuar su tarea.",
    recommendation: "Explicar en tono amable: 'No encontramos la página solicitada', con botón directo a 'Ir al Inicio', buscador integrado o enlaces más populares."
  },
  {
    id: 10,
    scenarioTitle: "El manual de 120 páginas en PDF para un campo fiscal",
    contextDescription: "En un formulario para autónomos, hay un campo llamado 'Régimen de prorrata especial'. Al lado no hay ninguna explicación ni tooltip; solo un enlace al pie que descarga un PDF tributario de 120 páginas.",
    badUiSnippet: "Enlace externo a documento legislativo masivo en vez de ayuda puntual explicativa de 2 líneas.",
    options: [
      { heuristicId: 10, title: "10. Ayuda y documentación" },
      { heuristicId: 2, title: "02. Mundo real" },
      { heuristicId: 5, title: "05. Prevención de errores" },
      { heuristicId: 7, title: "07. Flexibilidad y eficiencia" }
    ],
    correctHeuristicId: 10,
    explanation: "La documentación no está orientada a la tarea específica ni ofrecida en el contexto inmediato del usuario en dosis accionables.",
    recommendation: "Añadir un icono interactivo de información (?) con un micro-resumen claro ('Aplica si tienes deducciones mixtas con IVA general') y ejemplos ilustrados."
  }
];
