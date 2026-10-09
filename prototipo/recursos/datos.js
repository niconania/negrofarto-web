// Contenido del prototipo de negrofarto.com: servicios, trabajos, kits, el
// catálogo de La Fartedá (precios del catálogo 2026) y lo que hace WuandaCrafts.
// Cada texto visible va en { en, es }.
window.NFG_DATOS = {
  servicios: [
    {
      id: 'branding', icono: 'i-branding',
      titulo: { en: 'Branding & identity', es: 'Branding e identidad' },
      corto: { en: 'Logo, palette and guidelines — or an honest review of the one you have.', es: 'Logo, paleta y manual, o una revisión honesta del que ya tienes.' },
      incluye: {
        en: ['Logo and its variations', 'Color palette and typography', 'Brand guidelines for print and web'],
        es: ['Logo y sus variaciones', 'Paleta de color y tipografías', 'Manual de marca para impreso y web'],
      },
    },
    {
      id: 'letreros', icono: 'i-letrero',
      titulo: { en: 'Signage & vinyl', es: 'Letreros y vinil' },
      corto: { en: 'Storefront signs, door and window vinyl and interior graphics, installed by us.', es: 'Avisos de fachada, vinil en puertas y vidrios y gráficos interiores, instalados por nosotros.' },
      incluye: {
        en: ['Storefront and entrance signs', 'Door, glass and wall vinyl', 'Measuring, design and installation'],
        es: ['Avisos de fachada y de entrada', 'Vinil en puertas, vidrios y paredes', 'Medición, diseño e instalación'],
      },
    },
    {
      id: 'vehiculos', icono: 'i-vehiculo',
      titulo: { en: 'Vehicle wraps', es: 'Rotulación de vehículos' },
      corto: { en: 'Full or partial wraps that turn your car or van into a moving billboard.', es: 'Forrado total o parcial para que tu carro o tu van sea una valla en movimiento.' },
      incluye: {
        en: ['Full or partial wrap', 'Logo, phone and QR on the doors', "Design on your vehicle's template"],
        es: ['Forrado total o parcial', 'Logo, teléfono y QR en las puertas', 'Diseño sobre la plantilla de tu vehículo'],
      },
    },
    {
      id: 'impresos', icono: 'i-qr',
      titulo: { en: 'Print & QR', es: 'Impresos y QR' },
      corto: { en: 'Business cards, flyers and QR codes for your counter or your tables.', es: 'Tarjetas, flyers y códigos QR para tu mostrador o tus mesas.' },
      incluye: {
        en: ['Business cards and flyers', 'Table and counter QR codes', 'Menus, stickers and labels'],
        es: ['Tarjetas de presentación y flyers', 'Códigos QR para mesas y mostrador', 'Menús, stickers y etiquetas'],
      },
    },
    {
      id: 'merch', icono: 'i-camiseta',
      titulo: { en: 'Corporate merch', es: 'Merch corporativo' },
      corto: { en: 'Uniforms, tumblers, mugs, bags and tablecloths with your logo, made on our own machines.', es: 'Uniformes, termos, tazas, bolsas y manteles con tu logo, hechos con nuestras máquinas.' },
      incluye: {
        en: ['Team uniforms and tees', 'Tumblers, mugs and bags', 'Printed tablecloths for events'],
        es: ['Uniformes y camisetas de equipo', 'Termos, tazas y bolsas', 'Manteles impresos para eventos'],
      },
    },
    {
      id: 'asesoria', icono: 'i-chat',
      titulo: { en: '1:1 brand consulting', es: 'Asesoría 1 a 1' },
      corto: { en: 'A session to decide what your brand actually needs before you spend.', es: 'Una sesión para decidir qué necesita tu marca antes de gastar.' },
      incluye: {
        en: ['Review of your logo and materials', 'Priorities that fit your budget', 'A clear plan: what to make first'],
        es: ['Revisión de tu logo y tus materiales', 'Prioridades según tu presupuesto', 'Un plan claro: qué hacer primero'],
      },
    },
  ],

  // Trabajos reales publicados en Instagram (@negrofartogroup y @wuandacrafts).
  proyectos: [
    { id: 'karin', img: 'karin-ramirez.webp', categoria: 'branding', servicio: 'branding', anio: '2024', titulo: 'Karin Ramirez',
      sector: { en: 'Health services', es: 'Servicios de salud' },
      texto: { en: 'Brand identity for an emotional learning practice.', es: 'Identidad de marca para un espacio de aprendizaje emocional.' } },
    { id: 'bompaso', img: 'bom-paso.webp', categoria: 'branding', servicio: 'branding', anio: '2023', titulo: 'Bom Paso',
      sector: { en: 'Restaurant', es: 'Restaurante' },
      texto: { en: 'Brand management, from the logo to the takeout bag.', es: 'Manejo de marca, del logo a la bolsa para llevar.' } },
    { id: 'boda', img: 'boda.webp', categoria: 'branding', servicio: 'branding', anio: '2026',
      titulo: { en: 'A wedding identity', es: 'Identidad para una boda' },
      sector: { en: 'Weddings', es: 'Bodas' },
      texto: { en: "Illustrated monogram and visual identity for a couple's celebration.", es: 'Monograma ilustrado e identidad visual para la celebración de una pareja.' } },
    { id: 'warro', img: 'warro.webp', categoria: 'branding', servicio: 'branding', anio: '2025', titulo: 'Warro',
      sector: { en: 'Wellness', es: 'Bienestar' },
      texto: { en: 'Brand identity for a wellness brand.', es: 'Identidad para una marca de bienestar.' } },
    { id: 'gables', img: 'isayes.webp', categoria: 'letreros', servicio: 'letreros', titulo: 'Gables Tailor · Isayes',
      sector: { en: 'Retail', es: 'Comercio' },
      texto: { en: 'Door vinyl with hours, phone and social media.', es: 'Vinil en la puerta con horario, teléfono y redes.' } },
    { id: 'suite', img: 'letrero-oficina.webp', categoria: 'letreros', servicio: 'letreros',
      titulo: { en: 'Office suite sign', es: 'Letrero de oficina' },
      sector: { en: 'Real estate', es: 'Bienes raíces' },
      texto: { en: 'Suite signage for a real estate office.', es: 'Letrero de suite para una oficina de bienes raíces.' } },
    { id: 'greenteam', img: 'green-team.webp', categoria: 'productos', servicio: 'merch', anio: '2026', titulo: 'Green Team FC',
      sector: { en: 'Sports', es: 'Deportes' },
      texto: { en: 'Custom products for a football club, made at WuandaCrafts.', es: 'Productos personalizados para un club de fútbol, hechos en WuandaCrafts.' } },
    { id: 'infinity', img: 'infinity.webp', categoria: 'productos', servicio: 'merch', anio: '2026', titulo: 'Infinity Home Remodeling',
      sector: { en: 'Home remodeling', es: 'Remodelación' },
      texto: { en: 'Custom products for a remodeling company.', es: 'Productos personalizados para una empresa de remodelación.' } },
    { id: 'spillmug', img: 'spillmug.webp', categoria: 'productos', servicio: 'merch', anio: '2026', titulo: 'SpillMug Coffee',
      sector: { en: 'Coffee shop', es: 'Cafetería' },
      texto: { en: 'Pieces for their first Coffee Party, in April 2025.', es: 'Piezas para su primer Coffee Party, en abril de 2025.' } },
  ],

  // «¿Qué necesita tu negocio?»: kit base por tipo de negocio, ajustado por etapa.
  negocios: [
    { id: 'cafe', titulo: { en: 'Café or restaurant', es: 'Café o restaurante' }, kit: [
      { servicio: 'impresos', titulo: { en: 'Table QR to your Instagram', es: 'QR en las mesas hacia tu Instagram' }, porque: { en: 'People follow you while they wait — more useful than a business card.', es: 'Te siguen mientras esperan: más útil que una tarjeta.' } },
      { servicio: 'letreros', titulo: { en: 'Window vinyl with logo and hours', es: 'Vinil en la vidriera con logo y horario' }, porque: { en: 'Your door works as a sign around the clock.', es: 'Tu puerta trabaja como aviso las 24 horas.' } },
      { servicio: 'merch', titulo: { en: 'Aprons, cups or mugs with your logo', es: 'Delantales, vasos o tazas con tu logo' }, porque: { en: 'Every photo your customers take shows your brand.', es: 'Cada foto que toman tus clientes muestra tu marca.' } },
    ] },
    { id: 'tienda', titulo: { en: 'Store or boutique', es: 'Tienda o boutique' }, kit: [
      { servicio: 'letreros', titulo: { en: 'Storefront sign', es: 'Aviso de fachada' }, porque: { en: 'The first thing people see from the street.', es: 'Lo primero que se ve desde la calle.' } },
      { servicio: 'impresos', titulo: { en: 'Labels, stickers and business cards', es: 'Etiquetas, stickers y tarjetas' }, porque: { en: 'Every bag that leaves carries your name.', es: 'Cada bolsa que sale lleva tu nombre.' } },
      { servicio: 'merch', titulo: { en: 'Branded tote bags', es: 'Tote bags con tu marca' }, porque: { en: 'Your customers walk your brand around town.', es: 'Tus clientes pasean tu marca por la ciudad.' } },
    ] },
    { id: 'estudio', titulo: { en: 'Gym, studio or salon', es: 'Gimnasio, estudio o salón' }, kit: [
      { servicio: 'letreros', titulo: { en: 'Door and glass vinyl', es: 'Vinil en puertas y vidrios' }, porque: { en: 'Your space explains itself from the sidewalk.', es: 'Tu espacio se explica solo desde la acera.' } },
      { servicio: 'merch', titulo: { en: 'Team tees and uniforms', es: 'Camisetas y uniformes del equipo' }, porque: { en: 'Your instructors become your brand.', es: 'Tus instructores se vuelven tu marca.' } },
      { servicio: 'impresos', titulo: { en: 'QR to your class schedule', es: 'QR a tu horario de clases' }, porque: { en: 'Booking starts at the front desk.', es: 'La reserva empieza en la recepción.' } },
    ] },
    { id: 'oficina', titulo: { en: 'Office or professional services', es: 'Oficina o servicios profesionales' }, kit: [
      { servicio: 'impresos', titulo: { en: 'Business cards with QR', es: 'Tarjetas de presentación con QR' }, porque: { en: 'Your contact and your website in one scan.', es: 'Tu contacto y tu web en un escaneo.' } },
      { servicio: 'letreros', titulo: { en: 'Office or suite sign', es: 'Letrero de oficina o suite' }, porque: { en: 'Clients find you without calling.', es: 'Los clientes te encuentran sin llamar.' } },
      { servicio: 'branding', titulo: { en: 'Brand guidelines', es: 'Manual de marca' }, porque: { en: 'Every document looks like the same company.', es: 'Cada documento parece de la misma empresa.' } },
    ] },
    { id: 'contratista', titulo: { en: 'Contractor or home services', es: 'Contratista o servicios a domicilio' }, kit: [
      { servicio: 'vehiculos', titulo: { en: 'Truck or van wrap', es: 'Rotulación de tu camioneta' }, porque: { en: 'Your vehicle advertises at every job site.', es: 'Tu vehículo anuncia en cada obra.' } },
      { servicio: 'merch', titulo: { en: 'Crew uniforms', es: 'Uniformes para tu equipo' }, porque: { en: "Clients know who's at their door.", es: 'El cliente sabe quién llega a su puerta.' } },
      { servicio: 'impresos', titulo: { en: 'Yard signs and door hangers', es: 'Letreros de jardín y colgadores de puerta' }, porque: { en: 'Neighbors see your work and your number.', es: 'Los vecinos ven tu trabajo y tu número.' } },
    ] },
    { id: 'organizacion', titulo: { en: 'School, team or organization', es: 'Escuela, equipo u organización' }, kit: [
      { servicio: 'merch', titulo: { en: 'Team uniforms and merch', es: 'Uniformes y merch del equipo' }, porque: { en: 'Like Green Team FC: everyone in the same colors.', es: 'Como Green Team FC: todos con los mismos colores.' } },
      { servicio: 'letreros', titulo: { en: 'Banners and event signage', es: 'Pendones y señalización para eventos' }, porque: { en: 'Your event looks organized from the entrance.', es: 'Tu evento se ve organizado desde la entrada.' } },
      { servicio: 'impresos', titulo: { en: 'Flyers and QR for sign-ups', es: 'Flyers y QR para inscripciones' }, porque: { en: 'From the flyer to the sign-up form in one scan.', es: 'Del flyer a la inscripción en un escaneo.' } },
    ] },
  ],
  etapas: [
    { id: 'cero', titulo: { en: 'Starting from zero', es: 'Empiezo de cero' },
      extra: { servicio: 'branding', titulo: { en: 'Logo and identity, first', es: 'Primero, logo e identidad' }, porque: { en: 'Everything else is built on it.', es: 'Todo lo demás se construye sobre eso.' } } },
    { id: 'logo', titulo: { en: 'I have a logo, I need to use it', es: 'Tengo logo y necesito usarlo' },
      nota: { en: "We'll work with your current logo — and if it needs a tune-up, we'll tell you honestly.", es: 'Trabajamos con tu logo actual, y si necesita un ajuste, te lo decimos con honestidad.' } },
    { id: 'crecer', titulo: { en: 'I want to look more professional', es: 'Quiero verme más profesional' },
      extra: { servicio: 'asesoria', titulo: { en: '1:1 review of your brand', es: 'Revisión 1 a 1 de tu marca' }, porque: { en: 'We look at what you have and decide what to change first.', es: 'Vemos lo que tienes y decidimos qué cambiar primero.' } } },
  ],

  // La Fartedá — catálogo 2026. La camiseta Clásica cuesta menos en COP.
  colores: {
    blanco: { hex: '#ffffff', nombre: { en: 'White', es: 'Blanco' } },
    negro: { hex: '#151515', nombre: { en: 'Black', es: 'Negro' } },
    crema: { hex: '#eee3cc', nombre: { en: 'Cream', es: 'Crema' } },
    vinotinto: { hex: '#7a1f2b', nombre: { en: 'Wine', es: 'Vinotinto' } },
  },
  tallas: ['S', 'M', 'L', 'XL', 'Oversize'],
  precios: {
    camiseta: { usd: 34.99, cop: 69900 },
    clasica: { usd: 34.99, cop: 39900 },
    tote: { usd: 24.99, cop: 39900 },
  },
  disenos: [
    { id: 'clasica', nombre: 'La Fartedá Clásica', precioCamiseta: 'clasica',
      texto: { en: 'The house logo, in white or black.', es: 'El logo de la casa, en blanco o negro.' },
      camiseta: { colores: ['negro', 'blanco'] }, tote: { colores: ['negro', 'crema'] } },
    { id: 'suero', nombre: "Suero Pa' ese Bollo", masVendido: true,
      texto: { en: "The coast's classic combo: bollo with suero. Our bestseller.", es: 'El clásico de la Costa: bollo con suero. Nuestro más vendido.' },
      camiseta: { colores: ['blanco'] }, tote: { colores: ['crema'] } },
    { id: 'oveja-farta', nombre: 'La Oveja Farta de la Familia',
      texto: { en: '“I’m the black — and picky — sheep of the family.”', es: '«Soy la oveja negra y farta de la familia».' },
      camiseta: { colores: ['negro'] }, tote: { colores: ['negro'] } },
    { id: 'oveja-proud', nombre: 'La Oveja Proud de la Familia',
      texto: { en: 'For the proud sheep of the family.', es: 'Para la oveja orgullosa de la familia.' },
      camiseta: { colores: ['blanco'], estilos: [{ en: 'Large chest logo', es: 'Logo grande en el pecho' }, { en: 'Small pocket logo', es: 'Logo pequeño tipo bolsillo' }] },
      tote: { colores: ['crema'] } },
    { id: 'unboxing', nombre: 'Unboxing de Adulto',
      texto: { en: 'Horror stories of adult life. Black in Spanish, white in English.', es: 'Cuentos de terror de la vida adulta. Negra en español, blanca en inglés.' },
      camiseta: { colores: ['negro', 'blanco'], notaColor: { negro: { en: 'in Spanish', es: 'en español' }, blanco: { en: 'in English', es: 'en inglés' } } },
      tote: { colores: ['crema', 'negro'] } },
    { id: 'burro', nombre: 'Puya El Burro',
      texto: { en: '“¡Puya el burro!” — coastal slang for “step on it.”', es: '¡Puya el burro! Para los que van con todo.' },
      camiseta: { colores: ['blanco'] }, tote: { colores: ['crema'] } },
    { id: 'avena', nombre: 'Su Avena y Su Pitillo',
      texto: { en: '“Love has to be taken… with its oat drink and its straw.”', es: '«El amor hay que tomárselo… con su avena y su pitillo».' },
      camiseta: { colores: ['vinotinto', 'blanco'] }, tote: { colores: ['crema'] } },
    { id: 'empana', nombre: 'Mira Tú Esa Empaná',
      texto: { en: "For anyone who can't walk past an empanada.", es: 'Para los que no pasan de largo frente a una empaná.' },
      camiseta: { colores: ['blanco'] }, tote: { colores: ['crema'] } },
  ],

  // WuandaCrafts: qué se hace, para qué ocasión y piezas reales de @wuandacrafts.
  tipos: [
    { id: 'ropa', icono: 'i-camiseta', titulo: { en: 'Apparel', es: 'Ropa' }, texto: { en: 'Tees, hoodies and caps', es: 'Camisetas, hoodies y gorras' } },
    { id: 'termos', icono: 'i-termo', titulo: { en: 'Tumblers & mugs', es: 'Termos y tazas' }, texto: { en: 'With names, photos or art', es: 'Con nombres, fotos o arte' } },
    { id: 'bolsas', icono: 'i-bolsa', titulo: { en: 'Tote bags', es: 'Tote bags' }, texto: { en: 'For gifts and events', es: 'Para regalos y eventos' } },
    { id: 'eventos', icono: 'i-globo', titulo: { en: 'Parties & events', es: 'Fiestas y eventos' }, texto: { en: 'Balloons, banners and décor', es: 'Globos, pendones y decoración' } },
    { id: 'ilustracion', icono: 'i-pincel', titulo: { en: 'Illustrations', es: 'Ilustraciones' }, texto: { en: 'Portraits and custom art', es: 'Retratos y arte a medida' } },
    { id: 'corporativo', icono: 'i-regalo', titulo: { en: 'Team & corporate gifts', es: 'Regalos de equipo y empresa' }, texto: { en: 'With your logo, in volume', es: 'Con tu logo, en cantidad' } },
  ],
  ocasiones: [
    { id: 'cumple', titulo: { en: 'Birthday', es: 'Cumpleaños' } },
    { id: 'fiesta', titulo: { en: 'Baby shower or party', es: 'Baby shower o fiesta' } },
    { id: 'equipo', titulo: { en: 'Team or company', es: 'Equipo o empresa' } },
    { id: 'boda', titulo: { en: 'Wedding', es: 'Boda' } },
    { id: 'porque', titulo: { en: 'Just because', es: 'Porque sí' } },
  ],
  piezas: [
    { img: 'tote-joe-jonas.webp', tipo: 'bolsas', titulo: { en: 'Birthday tote for a Joe Jonas fan', es: 'Tote de cumpleaños para una fan de Joe Jonas' } },
    { img: 'termos.webp', tipo: 'termos', titulo: { en: 'Tumblers with custom art', es: 'Termos con arte a medida' } },
    { img: 'baby-shower.webp', tipo: 'eventos', titulo: { en: 'Baby shower décor', es: 'Decoración de baby shower' } },
    { img: 'gorra.webp', tipo: 'ropa', titulo: { en: "Kids' cap with his name", es: 'Gorra infantil con su nombre' } },
    { img: 'ilustracion-gators.webp', tipo: 'ilustracion', titulo: { en: 'Custom illustration', es: 'Ilustración a medida' } },
    { img: 'botella-nombre.webp', tipo: 'termos', titulo: { en: 'Bottle with a name', es: 'Botella con nombre' } },
    { img: 'tote-foto.webp', tipo: 'bolsas', titulo: { en: 'Tote with a photo', es: 'Tote con foto' } },
    { img: 'camiseta-gym.webp', tipo: 'ropa', titulo: { en: 'Gym tee and cap', es: 'Camiseta y gorra para el gym' } },
  ],
};
