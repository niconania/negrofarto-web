// Contenido del prototipo de negrofarto.com: servicios, trabajos, kits, el
// catálogo de La Fartedá (precios del catálogo 2026) y lo que hace WuandaCrafts.
// Cada texto visible va en { en, es }.
// Las láminas de un carrusel: <id>/01.webp … <id>/NN.webp, con su miniatura <id>/t-NN.webp (herramientas/preparar-trabajos.mjs).
const laminas = (id, n) => Array.from({ length: n }, (_, k) => ({ img: `${id}/${String(k + 1).padStart(2, '0')}.webp` }));

window.NFG_DATOS = {
  // WhatsApp reales (confirmados el 9 oct 2026): número completo, solo dígitos.
  // EE.UU. → Juan en Miami; Colombia → el WhatsApp Business de Cartagena.
  contacto: { whatsapp: { miami: '17868373919', cartagena: '573017480634' } },

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
      // Sin manteles: Juan es proveedor de otra empresa que los vende y no quiere competirle (reunión del 23 oct 2026).
      corto: { en: 'Uniforms, tumblers, mugs and bags with your logo, made on our own machines.', es: 'Uniformes, termos, tazas y bolsas con tu logo, hechos con nuestras máquinas.' },
      incluye: {
        en: ['Team uniforms and tees', 'Tumblers, mugs and bags'],
        es: ['Uniformes y camisetas de equipo', 'Termos, tazas y bolsas'],
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

  // Trabajos reales publicados en Instagram (@negrofartogroup y @wuandacrafts), cada uno con el enlace a su
  // publicación (comprobados el 12 oct 2026 comparando imagen y texto; /reel/ en los que son video).
  // «medios» (26 oct 2026): lo que se ve al pasar por la tarjeta y en el visor, en orden. Cada uno es una lámina
  // { img } o un video { video, poster, dur }; las rutas son relativas a img/proyectos/. Sin «medios», el trabajo
  // se ve como una sola imagen (su portada «img»). Las láminas son las del carrusel de la publicación; en Bom Paso,
  // además del reel, van su lámina de presentación y el menú del paquete del Drive.
  proyectos: [
    { id: 'karin', img: 'karin-ramirez.webp', categoria: 'branding', servicio: 'branding', anio: '2024', titulo: 'Karin Ramirez',
      instagram: 'https://www.instagram.com/p/DAnxl5YORh9/', medios: laminas('karin', 9),
      sector: { en: 'Health services', es: 'Servicios de salud' },
      texto: { en: 'Brand identity for an emotional learning practice.', es: 'Identidad de marca para un espacio de aprendizaje emocional.' } },
    { id: 'bompaso', img: 'bom-paso.webp', categoria: 'branding', servicio: 'branding', anio: '2023', titulo: 'Bom Paso',
      instagram: 'https://www.instagram.com/reel/Cy-9veLA4bq/',
      medios: [{ video: 'bompaso/video.mp4', poster: 'bompaso/poster.webp', dur: '0:31' }, ...laminas('bompaso', 4).slice(1)],
      sector: { en: 'Restaurant', es: 'Restaurante' },
      texto: { en: 'Brand management, from the logo to the takeout bag.', es: 'Manejo de marca, del logo a la bolsa para llevar.' } },
    { id: 'boda', img: 'boda.webp', categoria: 'branding', servicio: 'branding', anio: '2026',
      titulo: { en: 'A wedding identity', es: 'Identidad para una boda' },
      instagram: 'https://www.instagram.com/p/DanF-tjEYOQ/', medios: laminas('boda', 13),
      sector: { en: 'Weddings', es: 'Bodas' },
      texto: { en: "Illustrated monogram and visual identity for a couple's celebration.", es: 'Monograma ilustrado e identidad visual para la celebración de una pareja.' } },
    { id: 'warro', img: 'warro.webp', categoria: 'branding', servicio: 'branding', anio: '2025', titulo: 'Warro',
      instagram: 'https://www.instagram.com/p/DKxyAiLAcLE/', medios: laminas('warro', 7),
      sector: { en: 'Wellness', es: 'Bienestar' },
      texto: { en: 'Brand identity for a wellness brand.', es: 'Identidad para una marca de bienestar.' } },
    { id: 'gables', img: 'isayes.webp', categoria: 'letreros', servicio: 'letreros', titulo: 'Gables Tailor · Isayes',
      instagram: 'https://www.instagram.com/reel/CpBwwBUudnl/',
      sector: { en: 'Retail', es: 'Comercio' },
      texto: { en: 'Door vinyl with hours, phone and social media.', es: 'Vinil en la puerta con horario, teléfono y redes.' } },
    { id: 'suite', img: 'letrero-oficina.webp', categoria: 'letreros', servicio: 'letreros',
      titulo: { en: 'Office suite sign', es: 'Letrero de oficina' },
      instagram: 'https://www.instagram.com/reel/Cn-4IHcgXTW/',
      medios: [{ video: 'suite/video.mp4', poster: 'suite/poster.webp', dur: '0:09' }],
      sector: { en: 'Real estate', es: 'Bienes raíces' },
      texto: { en: 'Suite signage for a real estate office.', es: 'Letrero de suite para una oficina de bienes raíces.' } },
    { id: 'greenteam', img: 'green-team.webp', categoria: 'productos', servicio: 'merch', anio: '2026', titulo: 'Green Team FC',
      instagram: 'https://www.instagram.com/p/DdmPSM5ET0x/', medios: laminas('greenteam', 5),
      sector: { en: 'Sports', es: 'Deportes' },
      texto: { en: 'Custom products for a football club, made at WuandaCrafts.', es: 'Productos personalizados para un club de fútbol, hechos en WuandaCrafts.' } },
    { id: 'infinity', img: 'infinity.webp', categoria: 'productos', servicio: 'merch', anio: '2026', titulo: 'Infinity Home Remodeling',
      instagram: 'https://www.instagram.com/p/DdE2v-CEdEW/', medios: laminas('infinity', 5),
      sector: { en: 'Home remodeling', es: 'Remodelación' },
      texto: { en: 'Custom products for a remodeling company.', es: 'Productos personalizados para una empresa de remodelación.' } },
    { id: 'spillmug', img: 'spillmug.webp', categoria: 'productos', servicio: 'merch', anio: '2026', titulo: 'SpillMug Coffee',
      instagram: 'https://www.instagram.com/p/Dd4J4OzEVKc/', medios: laminas('spillmug', 5),
      sector: { en: 'Coffee shop', es: 'Cafetería' },
      texto: { en: 'Pieces for their first Coffee Party, in April 2025.', es: 'Piezas para su primer Coffee Party, en abril de 2025.' } },
  ],

  // «¿Qué necesita tu negocio?»: kit base por tipo de negocio, ajustado por etapa. «logo» es al que se transforma el «nfg.» del
  // recomendador al elegirlo (la metamorfosis que propuso Juan el 29 oct 2026): el de un trabajo de ese tipo («proyecto»,
  // el id de arriba) o el de La Fartedá («enlace»). Los de los clientes están sacados de las portadas de sus trabajos
  // (herramientas/construir-logos-clientes.sh) hasta que Juan mande los originales.
  negocios: [
    { id: 'cafe', icono: 'i-cafe', logo: 'img/marcas/clientes/spillmug.webp', proyecto: 'spillmug', titulo: { en: 'Café or restaurant', es: 'Café o restaurante' }, kit: [
      { servicio: 'impresos', titulo: { en: 'Table QR to your Instagram', es: 'QR en las mesas hacia tu Instagram' }, porque: { en: 'People follow you while they wait — more useful than a business card.', es: 'Te siguen mientras esperan: más útil que una tarjeta.' } },
      { servicio: 'letreros', titulo: { en: 'Window vinyl with logo and hours', es: 'Vinil en la vidriera con logo y horario' }, porque: { en: 'Your door works as a sign around the clock.', es: 'Tu puerta trabaja como aviso las 24 horas.' } },
      { servicio: 'merch', titulo: { en: 'Aprons, cups or mugs with your logo', es: 'Delantales, vasos o tazas con tu logo' }, porque: { en: 'Every photo your customers take shows your brand.', es: 'Cada foto que toman tus clientes muestra tu marca.' } },
    ] },
    { id: 'tienda', icono: 'i-bolsa-compra', logo: 'img/marcas/lafarteda-logo.svg', enlace: 'merch/', titulo: { en: 'Store or boutique', es: 'Tienda o boutique' }, kit: [
      { servicio: 'letreros', titulo: { en: 'Storefront sign', es: 'Aviso de fachada' }, porque: { en: 'The first thing people see from the street.', es: 'Lo primero que se ve desde la calle.' } },
      { servicio: 'impresos', titulo: { en: 'Labels, stickers and business cards', es: 'Etiquetas, stickers y tarjetas' }, porque: { en: 'Every bag that leaves carries your name.', es: 'Cada bolsa que sale lleva tu nombre.' } },
      { servicio: 'merch', titulo: { en: 'Branded tote bags', es: 'Tote bags con tu marca' }, porque: { en: 'Your customers walk your brand around town.', es: 'Tus clientes pasean tu marca por la ciudad.' } },
    ] },
    { id: 'estudio', icono: 'i-pesa', logo: 'img/marcas/clientes/warro.webp', proyecto: 'warro', titulo: { en: 'Gym, studio or salon', es: 'Gimnasio, estudio o salón' }, kit: [
      { servicio: 'letreros', titulo: { en: 'Door and glass vinyl', es: 'Vinil en puertas y vidrios' }, porque: { en: 'Your space explains itself from the sidewalk.', es: 'Tu espacio se explica solo desde la acera.' } },
      { servicio: 'merch', titulo: { en: 'Team tees and uniforms', es: 'Camisetas y uniformes del equipo' }, porque: { en: 'Your instructors become your brand.', es: 'Tus instructores se vuelven tu marca.' } },
      { servicio: 'impresos', titulo: { en: 'QR to your class schedule', es: 'QR a tu horario de clases' }, porque: { en: 'Booking starts at the front desk.', es: 'La reserva empieza en la recepción.' } },
    ] },
    { id: 'oficina', icono: 'i-maletin', logo: 'img/marcas/clientes/karin-ramirez.webp', proyecto: 'karin', titulo: { en: 'Office or professional services', es: 'Oficina o servicios profesionales' }, kit: [
      { servicio: 'impresos', titulo: { en: 'Business cards with QR', es: 'Tarjetas de presentación con QR' }, porque: { en: 'Your contact and your website in one scan.', es: 'Tu contacto y tu web en un escaneo.' } },
      { servicio: 'letreros', titulo: { en: 'Office or suite sign', es: 'Letrero de oficina o suite' }, porque: { en: 'Clients find you without calling.', es: 'Los clientes te encuentran sin llamar.' } },
      { servicio: 'branding', titulo: { en: 'Brand guidelines', es: 'Manual de marca' }, porque: { en: 'Every document looks like the same company.', es: 'Cada documento parece de la misma empresa.' } },
    ] },
    { id: 'contratista', icono: 'i-casa', logo: 'img/marcas/clientes/infinity.webp', proyecto: 'infinity', titulo: { en: 'Contractor or home services', es: 'Contratista o servicios a domicilio' }, kit: [
      { servicio: 'merch', titulo: { en: 'Crew uniforms', es: 'Uniformes para tu equipo' }, porque: { en: "Clients know who's at their door.", es: 'El cliente sabe quién llega a su puerta.' } },
      { servicio: 'impresos', titulo: { en: 'Business cards with QR', es: 'Tarjetas de presentación con QR' }, porque: { en: 'Leave your contact at every job.', es: 'Deja tu contacto en cada trabajo.' } },
      { servicio: 'impresos', titulo: { en: 'Yard signs and door hangers', es: 'Letreros de jardín y colgadores de puerta' }, porque: { en: 'Neighbors see your work and your number.', es: 'Los vecinos ven tu trabajo y tu número.' } },
    ] },
    { id: 'organizacion', icono: 'i-grupo', logo: 'img/marcas/clientes/green-team.webp', proyecto: 'greenteam', titulo: { en: 'School, team or organization', es: 'Escuela, equipo u organización' }, kit: [
      { servicio: 'merch', titulo: { en: 'Team uniforms and merch', es: 'Uniformes y merch del equipo' }, porque: { en: 'Like Green Team FC: everyone in the same colors.', es: 'Como Green Team FC: todos con los mismos colores.' } },
      { servicio: 'letreros', titulo: { en: 'Banners and event signage', es: 'Pendones y señalización para eventos' }, porque: { en: 'Your event looks organized from the entrance.', es: 'Tu evento se ve organizado desde la entrada.' } },
      { servicio: 'impresos', titulo: { en: 'Flyers and QR for sign-ups', es: 'Flyers y QR para inscripciones' }, porque: { en: 'From the flyer to the sign-up form in one scan.', es: 'Del flyer a la inscripción en un escaneo.' } },
    ] },
  ],
  etapas: [
    { id: 'cero', icono: 'i-brote', titulo: { en: 'Starting from zero', es: 'Empiezo de cero' },
      extra: { servicio: 'branding', titulo: { en: 'Logo and identity, first', es: 'Primero, logo e identidad' }, porque: { en: 'Everything else is built on it.', es: 'Todo lo demás se construye sobre eso.' } } },
    { id: 'logo', icono: 'i-branding', titulo: { en: 'I have a logo, I need to use it', es: 'Tengo logo y necesito usarlo' },
      nota: { en: "We'll work with your current logo — and if it needs a tune-up, we'll tell you honestly.", es: 'Trabajamos con tu logo actual, y si necesita un ajuste, te lo decimos con honestidad.' } },
    { id: 'crecer', icono: 'i-crecer', titulo: { en: 'I want to look more professional', es: 'Quiero verme más profesional' },
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

  // WuandaCrafts · tendedero de fotos: cómo se rotula cada pieza y a qué categoría del catálogo lleva «¿Quieres uno así?».
  // «categoria»: null si esa pieza ya no es una categoría del catálogo (las ilustraciones a medida son de la agencia, 23 oct 2026).
  tipos: [
    { id: 'ropa', categoria: null, titulo: { en: 'Apparel', es: 'Ropa' }, texto: { en: 'Tees, hoodies and caps', es: 'Camisetas, hoodies y gorras' } },
    { id: 'termos', categoria: 'termos', titulo: { en: 'Tumblers & mugs', es: 'Termos y tazas' }, texto: { en: 'With names, photos or art', es: 'Con nombres, fotos o arte' } },
    { id: 'bolsas', categoria: 'totes', titulo: { en: 'Tote bags', es: 'Tote bags' }, texto: { en: 'For gifts and special dates', es: 'Para regalos y fechas especiales' } },
    { id: 'calcomanias', categoria: 'calcomanias', titulo: { en: 'Custom decals', es: 'Calcomanías personalizadas' }, texto: { en: 'Vinyl with names or logos', es: 'Vinil con nombres o logos' } },
    { id: 'ilustracion', categoria: null, titulo: { en: 'Illustrations', es: 'Ilustraciones' }, texto: { en: 'Portraits and custom art', es: 'Retratos y arte a medida' } },
    { id: 'corporativo', categoria: 'lamparas', titulo: { en: 'Team & corporate gifts', es: 'Regalos de equipo y empresa' }, texto: { en: 'With your logo, in volume', es: 'Con tu logo, en cantidad' } },
  ],
  // WuandaCrafts · catálogo (pase 4, estilo Etsy; maqueta A elegida el 26 oct 2026).
  // Solo lo que dijo Juan el 23 oct (docs/09): termos con sus estilos, hoodies, camisetas, tote bags, calcomanías, lámparas y «otros»
  // (wine bag, flask, mouse pad). Sin fundas de celular, manteles ni gorras. TODAVÍA NO hay precios, colores, medidas ni fuentes
  // confirmados por Juan: lo marcado «ejemplo» sale de la maqueta, se muestra con su etiqueta y se quita al definirlo. De las
  // escalas por cantidad, solo «de 10 a 24» lo dijo él. Las fotos son las reales de @wuandacrafts; sin foto, un mosaico con los
  // colores de la «W». Los nombres en inglés de los estilos de termo (campero, huevo…) son traducción nuestra: confirmar con Juan.
  wc: {
    // Los mismos topes que enviar.php (servidor/enviar-config.ejemplo.php): por archivo, archivos por pedido y total.
    topeMb: 5, maxArchivos: 5, totalMb: 15,
    tamanosFiltro: ['20 oz'], // los tamaños de termo que nombró Juan («también por onzas, 20 oz»); las demás medidas, por definir
    categorias: [
      { id: 'termos', icono: 'i-termo', titulo: { en: 'Tumblers', es: 'Termos' },
        texto: { en: 'Sublimated tumbler with your name, your art or your logo. Made one by one in Miami or Cartagena.', es: 'Termo sublimado con tu nombre, tu arte o tu logo. Lo hacemos uno a uno en Miami o en Cartagena.' } },
      { id: 'hoodies', icono: 'i-hoodie', titulo: { en: 'Hoodies', es: 'Hoodies' },
        texto: { en: 'Hoodie with your name, your art or your logo.', es: 'Hoodie con tu nombre, tu arte o tu logo.' } },
      { id: 'camisetas', icono: 'i-camiseta', titulo: { en: 'T-shirts', es: 'Camisetas' },
        texto: { en: 'T-shirt with your name, your art or your logo.', es: 'Camiseta con tu nombre, tu arte o tu logo.' } },
      { id: 'totes', icono: 'i-bolsa', titulo: { en: 'Tote bags', es: 'Tote bags' },
        texto: { en: 'Tote bag with your name, a photo or your art.', es: 'Tote bag con tu nombre, una foto o tu arte.' } },
      { id: 'calcomanias', icono: 'i-calcomania', titulo: { en: 'Decals', es: 'Calcomanías' },
        texto: { en: 'Cut vinyl with the name or logo you want. You see it on the sheet before you order.', es: 'Vinil cortado con el nombre o el logo que quieras. Lo ves en el pliego antes de pedir.' } },
      { id: 'lamparas', icono: 'i-lampara', titulo: { en: 'Lamps', es: 'Lámparas' },
        texto: { en: 'Lamp with a plate personalized with your illustration or your name.', es: 'Lámpara con placa personalizada con tu ilustración o tu nombre.' } },
      { id: 'otros', icono: 'i-regalo', titulo: { en: 'Other', es: 'Otros' },
        texto: { en: 'Personalized with your name or your logo.', es: 'Personalizado con tu nombre o tu logo.' } },
    ],
    estilos: [ // los estilos de termo que nombró Juan (la subcategoría)
      { id: 'lata', titulo: { en: 'Can', es: 'Lata' } },
      { id: 'campero', titulo: { en: 'Camper', es: 'Campero' } },
      { id: 'botella', titulo: { en: 'Bottle', es: 'Botella' } },
      { id: 'mug', titulo: { en: 'Ceramic mug', es: 'Mug de cerámica' } },
      { id: 'kids', titulo: { en: 'Kids', es: 'Kids' } },
      { id: 'bebe', titulo: { en: 'Baby', es: 'Bebés' } },
      { id: 'skinny', titulo: { en: 'Skinny', es: 'Skinny' } },
      { id: 'huevo', titulo: { en: 'Egg', es: 'Huevo' } },
    ],
    colores: {
      blanco: { hex: '#ffffff', nombre: { en: 'White', es: 'Blanco' } },
      negro: { hex: '#151515', nombre: { en: 'Black', es: 'Negro' } },
      rosa: { hex: '#e55d8e', nombre: { en: 'Pink', es: 'Rosa' } },
      azul: { hex: '#32ace3', nombre: { en: 'Blue', es: 'Azul' } },
      verde: { hex: '#9fc75b', nombre: { en: 'Green', es: 'Verde' } },
      morado: { hex: '#7c599b', nombre: { en: 'Purple', es: 'Morado' } },
      natural: { hex: '#eadfc6', nombre: { en: 'Natural', es: 'Natural' } },
    },
    fuentes: [ // se muestran con el nombre que escribe la persona; Pacifico, Montserrat, Permanent Marker y Fredoka (Google Fonts)
      { id: 'cursiva', css: "'Pacifico', cursive", peso: 400, nombre: { en: 'Script', es: 'Cursiva' } },
      { id: 'clasica', css: "'Montserrat', sans-serif", peso: 800, nombre: { en: 'Classic', es: 'Clásica' } },
      { id: 'marcador', css: "'Permanent Marker', cursive", peso: 400, nombre: { en: 'Marker', es: 'Marcador' } },
      { id: 'redonda', css: "'Fredoka', sans-serif", peso: 600, nombre: { en: 'Rounded', es: 'Redonda' } },
    ],
    escalas: [{ desde: 1, hasta: 9 }, { desde: 10, hasta: 24 }, { desde: 25, hasta: null }], // ejemplo, salvo «de 10 a 24»
    // El orden es el de «Todo»: arriba las piezas que ya tienen foto. El orden real lo decide Juan.
    // «instagram»: la publicación de la foto (la misma del tendedero). «tamanos» y «colores» son ejemplos hasta que Juan los defina.
    catalogo: [
      { id: 'termo-lata', cat: 'termos', estilo: 'lata', icono: 'i-termo', tono: 'azul', titulo: { en: 'Can tumbler', es: 'Termo lata' },
        foto: 'termos.webp', encuadre: '50% 50%', insignia: 'mas-vendido', instagram: 'https://www.instagram.com/reel/Cy4FXEigbS-/',
        pie: { en: 'Tumblers with custom art', es: 'Termos con arte a medida' },
        tamanos: ['20 oz', '30 oz'], colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'tote', cat: 'totes', icono: 'i-bolsa', tono: 'verde', titulo: { en: 'Tote bag', es: 'Tote bag' },
        foto: 'tote-foto.webp', encuadre: '50% 50%', instagram: 'https://www.instagram.com/p/DRMbJaajpSd/',
        pie: { en: 'Tote with a photo', es: 'Tote con foto' }, colores: ['natural', 'negro'] },
      { id: 'lampara', cat: 'lamparas', icono: 'i-lampara', tono: 'naranja', titulo: { en: 'Lamp with plate', es: 'Lámpara con placa' },
        foto: 'lampara-foto.webp', encuadre: '50% 56%', insignia: 'nuevo', instagram: 'https://www.instagram.com/reel/DeY6XO0suIh/',
        pie: { en: 'Lamp with a custom illustration', es: 'Lámpara con ilustración a medida' } },
      { id: 'calcomania', cat: 'calcomanias', icono: 'i-calcomania', tono: 'rosa', titulo: { en: 'Custom decal', es: 'Calcomanía con tu nombre' }, unidad: 'pliego',
        foto: 'calcomania-mascota.webp', encuadre: '50% 90%', instagram: 'https://www.instagram.com/reel/CnQhQQJJbfl/',
        pie: { en: "Decal with the pet's name", es: 'Calcomanía con el nombre de la mascota' }, colores: ['morado', 'negro', 'blanco', 'rosa', 'azul'] },
      { id: 'hoodie', cat: 'hoodies', icono: 'i-hoodie', tono: 'naranja', titulo: { en: 'Hoodie', es: 'Hoodie' },
        tamanos: ['S', 'M', 'L', 'XL'], colores: ['negro', 'blanco', 'rosa', 'azul'] },
      { id: 'camiseta', cat: 'camisetas', icono: 'i-camiseta', tono: 'rosa', titulo: { en: 'T-shirt', es: 'Camiseta' },
        tamanos: ['S', 'M', 'L', 'XL'], colores: ['negro', 'blanco', 'rosa', 'azul'] },
      { id: 'termo-campero', cat: 'termos', estilo: 'campero', icono: 'i-termo', tono: 'azul', titulo: { en: 'Camper tumbler', es: 'Termo campero' }, tamanos: ['20 oz', '30 oz'], colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'termo-botella', cat: 'termos', estilo: 'botella', icono: 'i-termo', tono: 'verde', titulo: { en: 'Bottle tumbler', es: 'Termo botella' }, tamanos: ['20 oz', '30 oz'], colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'mug', cat: 'termos', estilo: 'mug', icono: 'i-cafe', tono: 'naranja', titulo: { en: 'Ceramic mug', es: 'Mug de cerámica' }, colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'termo-kids', cat: 'termos', estilo: 'kids', icono: 'i-termo', tono: 'rosa', titulo: { en: 'Kids tumbler', es: 'Termo kids' }, colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'termo-bebe', cat: 'termos', estilo: 'bebe', icono: 'i-termo', tono: 'verde', titulo: { en: 'Baby tumbler', es: 'Termo bebé' }, colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'termo-skinny', cat: 'termos', estilo: 'skinny', icono: 'i-termo', tono: 'morado', titulo: { en: 'Skinny tumbler', es: 'Termo skinny' }, tamanos: ['20 oz', '30 oz'], colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'termo-huevo', cat: 'termos', estilo: 'huevo', icono: 'i-termo', tono: 'azul', titulo: { en: 'Egg tumbler', es: 'Termo huevo' }, colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'wine-bag', cat: 'otros', icono: 'i-vino', tono: 'morado', titulo: { en: 'Wine bag', es: 'Wine bag' }, colores: ['natural', 'negro'] },
      { id: 'flask', cat: 'otros', icono: 'i-flask', tono: 'azul', titulo: { en: 'Flask', es: 'Flask' }, colores: ['blanco', 'negro', 'rosa', 'azul', 'verde'] },
      { id: 'mouse-pad', cat: 'otros', icono: 'i-mousepad', tono: 'rosa', titulo: { en: 'Mouse pad', es: 'Mouse pad' }, colores: ['negro', 'blanco'] },
    ],
  },

  // Piezas del tendedero de fotos, cada una con su publicación de Instagram (comprobadas el 26 oct 2026 comparando imagen
  // y texto). «portada»: también cuelgan en la cortina del héroe. Sin fotos de Juan: «la gente tiene que creer que somos
  // un equipo» (reunión del 23 oct 2026); la calcomanía y la lámpara reemplazan las de la Cricut y el gimnasio.
  // «nota»: lo que va escrito en la foto, si no es el nombre de su tipo.
  piezas: [
    { img: 'tote-joe-jonas.webp', portada: true, tipo: 'bolsas', instagram: 'https://www.instagram.com/reel/Dc3zsg1xKGs/',
      titulo: { en: 'Birthday tote for a Joe Jonas fan', es: 'Tote de cumpleaños para una fan de Joe Jonas' } },
    { img: 'termos.webp', portada: true, tipo: 'termos', instagram: 'https://www.instagram.com/reel/Cy4FXEigbS-/',
      titulo: { en: 'Tumblers with custom art', es: 'Termos con arte a medida' } },
    { img: 'lampara-foto.webp', portada: true, tipo: 'corporativo', nota: { en: 'Lamps', es: 'Lámparas' },
      instagram: 'https://www.instagram.com/reel/DeY6XO0suIh/',
      titulo: { en: 'Lamp with a custom illustration', es: 'Lámpara con ilustración a medida' } },
    { img: 'ilustracion-gators.webp', portada: true, tipo: 'ilustracion', instagram: 'https://www.instagram.com/reel/DdgppVxxvfj/',
      titulo: { en: 'Custom illustration', es: 'Ilustración a medida' } },
    { img: 'calcomania-mascota.webp', tipo: 'calcomanias', instagram: 'https://www.instagram.com/reel/CnQhQQJJbfl/',
      titulo: { en: "Decal with the pet's name", es: 'Calcomanía con el nombre de la mascota' } },
    { img: 'tote-foto.webp', tipo: 'bolsas', instagram: 'https://www.instagram.com/p/DRMbJaajpSd/',
      titulo: { en: 'Tote with a photo', es: 'Tote con foto' } },
    { img: 'gorra.webp', tipo: 'ropa', instagram: 'https://www.instagram.com/p/DdeiHp0EZ2_/',
      titulo: { en: "Kids' cap with his name", es: 'Gorra infantil con su nombre' } },
  ],
};
