export type LegalPage = {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: Array<{
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const site = {
  name: '7Lleva',
  slogan: 'Sí te lleva',
  domain: 'https://7lleva.com',
  stage: 'Etapa inicial',
  emails: {
    support: 'soporte@7lleva.com',
    contact: 'contacto@7lleva.com',
    legal: 'legal@7lleva.com'
  },
  legalResponsible: '7Lleva como nombre comercial; la información legal aplicable se publicará antes del inicio de operaciones.',
  zones: [
    'San José de Gracia',
    'La Manzanilla de la Paz',
    'Concepción de Buenos Aires',
    'Mazamitla',
    'Valle de Juárez',
    'Sahuayo',
    'Jiquilpan',
    'Guadalajara',
    'Zonas cercanas de la región'
  ],
  services: [
    {
      title: 'Viajes locales',
      label: 'Movilidad cercana',
      text: 'Solicitudes dentro de la zona activa, con disponibilidad sujeta a conductores participantes y reglas de operación.'
    },
    {
      title: 'Viajes entre poblaciones',
      label: 'Rutas regionales',
      text: 'Traslados entre comunidades y municipios cercanos, con precio sugerido y confirmación del conductor.'
    },
    {
      title: 'Viajes foráneos',
      label: 'Planeación regional',
      text: 'Viajes fuera de la zona local con información clara de origen, destino, pasajeros y tipo de unidad.'
    },
    {
      title: 'Paquetería',
      label: 'Entregas',
      text: 'Envío de paquetes listos para transportar, con datos de recolección, entrega y condiciones del servicio.'
    },
    {
      title: 'Mandados',
      label: 'Apoyo local',
      text: 'Solicitudes para recoger, llevar o entregar artículos permitidos dentro de las zonas operativas.'
    },
    {
      title: 'Recoger pedido pagado',
      label: 'Pedido listo',
      text: 'El cliente ya pagó su pedido y solo solicita apoyo para recogerlo y entregarlo.'
    },
    {
      title: 'Comprar y entregar',
      label: 'Compra autorizada',
      text: 'El costo del producto se acuerda y autoriza antes de comprar; el servicio de entrega se mantiene separado.'
    }
  ]
};

export const routes = [
  { path: '/', label: 'Inicio' },
  { path: '/pasajeros', label: 'Pasajeros' },
  { path: '/conductores', label: 'Conductores' },
  { path: '/zonas-servicio', label: 'Zonas' },
  { path: '/soporte', label: 'Soporte' },
  { path: '/legales', label: 'Legales' }
];

export const legalPages: LegalPage[] = [
  {
    slug: 'aviso-privacidad',
    navLabel: 'Aviso de privacidad',
    title: 'Aviso de privacidad',
    description: 'Aviso de privacidad en preparación para la etapa de lanzamiento de 7Lleva. La versión aplicable se publicará antes del inicio de operaciones.',
    eyebrow: 'Documento en preparación para lanzamiento',
    intro: 'Documento en preparación para lanzamiento. La versión aplicable se publicará antes del inicio de operaciones.',
    sections: [
      {
        title: 'Responsable e identidad',
        paragraphs: [
          site.legalResponsible,
          'Correo legal previsto: legal@7lleva.com. Los correos públicos funcionarán como canales de contacto del proyecto antes del inicio de operaciones.'
        ]
      },
      {
        title: 'Datos que podrían tratarse',
        bullets: [
          'Nombre y teléfono.',
          'Ubicación de origen y destino.',
          'Historial de servicios, cotizaciones y soporte.',
          'Información de conductor, taxi registrado, documentos de verificación y datos del vehículo.',
          'Datos técnicos del dispositivo y registros necesarios para seguridad.',
          'Datos de pago procesados por terceros, sin almacenar datos completos de tarjeta.'
        ]
      },
      {
        title: 'Finalidades',
        bullets: [
          'Conectar pasajeros, conductores y servicios de traslado en la región.',
          'Gestionar viajes, entregas, mandados, cotizaciones, soporte y seguridad.',
          'Verificar conductores participantes y documentación cuando aplique.',
          'Prevenir fraude, atender incidentes y cumplir obligaciones legales cuando proceda.'
        ]
      },
      {
        title: 'Derechos ARCO y seguridad',
        paragraphs: [
          'El procedimiento formal para derechos ARCO se publicará antes del inicio de operaciones. El canal previsto para solicitudes será legal@7lleva.com.',
          '7Lleva no debe almacenar CVV, PAN completo, vencimiento ni credenciales bancarias.'
        ]
      },
      {
        title: 'Cambios al aviso',
        paragraphs: ['Fecha de última actualización: por confirmar antes del lanzamiento oficial. Este aviso podrá ajustarse antes del inicio de operaciones.']
      }
    ]
  },
  {
    slug: 'terminos-condiciones',
    navLabel: 'Términos y condiciones',
    title: 'Términos y condiciones',
    description: 'Términos y condiciones en preparación para la etapa de lanzamiento de 7Lleva.',
    eyebrow: 'Documento en preparación para lanzamiento',
    intro: 'Documento en preparación para explicar el servicio sin prometer disponibilidad inmediata.',
    sections: [
      {
        title: 'Naturaleza de plataforma',
        paragraphs: [
          '7Lleva prepara una plataforma tecnológica para conectar usuarios con conductores participantes, taxis registrados, mototaxis donde aplique y servicios de entrega o mandados.',
          'La disponibilidad operativa dependerá del lanzamiento oficial, cobertura activa, validación y reglas de operación.'
        ]
      },
      {
        title: 'Servicios',
        bullets: [
          'Viajes locales.',
          'Viajes entre poblaciones.',
          'Viajes foráneos.',
          'Paquetería y mandados.',
          'Recoger pedido pagado.',
          'Comprar y entregar con autorización previa del costo del producto.'
        ]
      },
      {
        title: 'Precios, pagos y promociones',
        paragraphs: [
          'Los precios pueden variar según ruta, horario, disponibilidad, tipo de unidad y condiciones del servicio.',
          'El costo de productos en mandados se mantiene separado del servicio.',
          'Durante la etapa inicial, 7Lleva no cobrará comisión a conductores participantes conforme a la promoción vigente.'
        ]
      },
      {
        title: 'Limitaciones',
        paragraphs: [
          'Estos términos no prometen servicio disponible en todas las zonas ni precios fijos obligatorios.',
          'Los pagos digitales y Mercado Pago se describen como preparación futura cuando corresponda.'
        ]
      }
    ]
  },
  {
    slug: 'cancelaciones-reembolsos',
    navLabel: 'Cancelaciones y reembolsos',
    title: 'Política de cancelaciones y reembolsos',
    description: 'Política de cancelaciones y reembolsos en preparación para la etapa de lanzamiento de 7Lleva.',
    eyebrow: 'Documento en preparación para lanzamiento',
    intro: 'Reglas generales en preparación. No promete reembolsos automáticos ni integra pagos digitales reales por sí misma.',
    sections: [
      {
        title: 'Antes de asignar conductor',
        paragraphs: ['Si se cancela antes de asignar conductor, normalmente no debería existir cargo por servicio. La regla final dependerá del método de pago y etapa operativa.']
      },
      {
        title: 'Después de asignar conductor',
        paragraphs: ['Si el conductor ya aceptó o se desplazó, podrían aplicar reglas de compensación cuando estén definidas y comunicadas.']
      },
      {
        title: 'Pagos y productos',
        paragraphs: [
          'En efectivo o transferencia, las aclaraciones dependerán de comprobantes y registro del servicio.',
          'El costo de productos comprados por mandado es separado y debe revisarse con el comercio vendedor, salvo falla directa del servicio de entrega.'
        ]
      }
    ]
  },
  {
    slug: 'eliminacion-cuenta',
    navLabel: 'Eliminación de cuenta',
    title: 'Eliminación de cuenta',
    description: 'Página pública en preparación para solicitudes de eliminación de cuenta de 7Lleva.',
    eyebrow: 'Documento en preparación para lanzamiento',
    intro: 'Página pública en preparación para atender solicitudes cuando la app sea publicada.',
    sections: [
      {
        title: 'Cómo solicitar eliminación',
        paragraphs: ['El usuario podrá solicitar eliminación desde la app o por correo a soporte@7lleva.com cuando el canal esté activo.']
      },
      {
        title: 'Datos para identificar la cuenta',
        bullets: ['Teléfono registrado.', 'Nombre asociado a la cuenta.', 'Rol de cuenta: pasajero, conductor, taxi registrado u otro.']
      },
      {
        title: 'Conservación temporal',
        paragraphs: ['Algunos datos podrían conservarse por obligaciones legales, operativas, seguridad, disputas, prevención de fraude, pagos o soporte. El plazo de respuesta se definirá antes del inicio de operaciones.']
      }
    ]
  }
];

export const supportSections = [
  {
    title: 'Soporte',
    email: site.emails.support,
    text: 'Canal previsto para dudas de acceso, servicio, reportes o aclaraciones durante la etapa de lanzamiento.'
  },
  {
    title: 'Contacto',
    email: site.emails.contact,
    text: 'Canal previsto para información general sobre la etapa inicial de 7Lleva.'
  },
  {
    title: 'Legal',
    email: site.emails.legal,
    text: 'Canal previsto para privacidad, términos y solicitudes legales del proyecto.'
  }
];
