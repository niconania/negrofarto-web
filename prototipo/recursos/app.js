// Prototipo de negrofarto.com: estructura común (cabecera, las tres puertas,
// pie, idioma y WhatsApp) y la lógica de cada página — agencia, La Fartedá y
// WuandaCrafts. Nada se envía: los pedidos se muestran como el mensaje de
// WhatsApp que llegaría a Miami o a Cartagena.
(function () {
  const T = window.NFG_T;
  const D = window.NFG_DATOS;
  const pagina = document.body.dataset.pagina; // agencia | merch | wuanda
  const base = document.body.dataset.base || ''; // '' en la raíz, '../' en las marcas
  const prefijoWa = { merch: 'lf_', wuanda: 'wc_' }[pagina] || '';
  const alCambiarIdioma = [];
  let idioma = idiomaInicial();

  function t(clave, datos) {
    let s = (T[idioma] && T[idioma][clave]) ?? T.en[clave] ?? clave;
    if (datos) s = s.replace(/\{(\w+)\}/g, (_, k) => datos[k] ?? '');
    return s;
  }
  const L = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[idioma] ?? v.en : v);
  const esc = (s) => String(s).replace(/[&<>"']/g, (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
  const icono = (id, clase) => `<svg class="icono${clase ? ' ' + clase : ''}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const servicio = (id) => D.servicios.find((s) => s.id === id);
  function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
  function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento */ } }
  function idiomaInicial() {
    const guardado = leer('nfg-idioma');
    if (guardado === 'en' || guardado === 'es') return guardado;
    return /^es\b/i.test(navigator.language || '') ? 'es' : 'en';
  }
  function irA(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Estructura común ── */
  function selectorIdioma() {
    return '<div class="idioma" role="group" aria-label="Language / Idioma">'
      + '<button type="button" data-idioma="en" aria-pressed="false">EN</button>'
      + '<button type="button" data-idioma="es" aria-pressed="false">ES</button></div>';
  }

  function montarEstructura() {
    const inicio = base + 'index.html';
    const ancla = (id) => (pagina === 'agencia' ? '' : inicio) + '#' + id;
    // «Contacto» lleva a donde se escribe. Antes bajaba al pie y la página quedaba «mocha» (Juan, 23 oct 2026): en la
    // agencia va al formulario de cotización, que también tiene el WhatsApp y el correo directos; en WuandaCrafts, a
    // «Cuéntanos tu idea»; La Fartedá no tiene formulario, así que abre la elección de WhatsApp (Miami o Cartagena).
    const contacto = {
      agencia: '<a href="#cotizar" data-t="nav.contacto"></a>',
      wuanda: '<a href="#pedido" data-t="nav.contacto"></a>',
      merch: '<a href="#contacto" data-whatsapp="elegir" data-t="nav.contacto"></a>',
    }[pagina];
    const cta = pagina === 'wuanda'
      ? '<a class="boton boton--acento boton--chico boton--cotizar" href="#pedido" data-t="wc.cta"></a>'
      : `<a class="boton boton--acento boton--chico boton--cotizar" href="${ancla('cotizar')}" data-t="nav.cotizar"></a>`;
    // Cada puerta es el logo de su marca. Repetir el nombre al lado era redundante (Juan, 12 oct 2026) y
    // empujaba la barra más allá de donde empieza el menú. Solo la "W" lleva nombre: sola no dice WuandaCrafts.
    // El nombre completo va en aria-label para lectores de pantalla. La Fartedá va con su isotipo «LF» (23 oct 2026).
    const puertas = [
      { id: 'agencia', href: inicio, img: 'img/marcas/nfg-negro.svg', clave: 'puerta.nfg', clase: 'nfg' },
      { id: 'merch', href: base + 'merch/index.html', img: 'img/marcas/lafarteda-lf.svg', clave: 'puerta.lf', clase: 'lf' },
      { id: 'wuanda', href: base + 'wuandacrafts/index.html', img: 'img/marcas/wuandacrafts-w.svg', clave: 'puerta.wc', nombre: 'WuandaCrafts', clase: 'wc' },
    ];

    document.body.insertAdjacentHTML('afterbegin', window.NFG_ICONOS
      + '<div class="aviso" data-t="aviso"></div>'
      + '<header class="cabecera"><div class="caja">'
      +   `<a class="logo" href="${inicio}" aria-label="Negrofarto Group"><img src="${base}img/marcas/marca-negro.svg" alt="negrofarto group." width="113" height="34" /></a>`
      +   '<nav class="menu" id="menu">'
      +     `<a href="${ancla('servicios')}" data-t="nav.servicios"></a>`
      +     `<a href="${ancla('trabajos')}" data-t="nav.trabajos"></a>`
      +     `<a href="${ancla('nosotros')}" data-t="nav.nosotros"></a>`
      +     contacto
      +   '</nav>'
      +   selectorIdioma()
      +   (pagina === 'merch' ? `<button class="boton-carrito" type="button" id="abrir-carrito" data-t-aria="car.abrir">${icono('i-bolsa-compra')}<span class="contador" id="contador-carrito" hidden>0</span></button>` : '')
      +   cta
      +   `<button class="menu-movil" type="button" aria-controls="menu" aria-expanded="false" data-t-aria="nav.abrir">${icono('i-menu')}</button>`
      + '</div></header>'
      + '<nav class="puertas" aria-label="Negrofarto Group"><div class="caja">'
      + puertas.map((p) => `<a class="puerta puerta--${p.clase}" href="${p.href}" data-t-aria="${p.clave}"${p.id === pagina ? ' aria-current="page"' : ''}>`
          + `<img src="${base}${p.img}" alt="" />${p.nombre ? `<strong>${p.nombre}</strong>` : ''}</a>`).join('')
      + '</div></nav>');

    // La agencia se presenta desde Miami (comentarios de Juan, 10 oct 2026): su pie no menciona Cartagena.
    // Cartagena queda en el pie de La Fartedá y WuandaCrafts, que sí trabajan en las dos ciudades.
    const soloMiami = pagina === 'agencia';
    document.body.insertAdjacentHTML('beforeend',
      '<footer class="pie" id="contacto"><div class="caja"><div class="pie-grilla">'
      + `<div><a class="pie-logo" href="${inicio}"><img src="${base}img/marcas/marca-negro.svg" alt="negrofarto group." width="132" height="40" /></a>`
      +   '<p class="pie-lema" data-t="pie.lema"></p>'
      +   `<div class="pie-redes"><a href="https://www.instagram.com/negrofartogroup/" target="_blank" rel="noopener" aria-label="Instagram">${icono('i-instagram')}</a></div></div>`
      + '<div><h4 data-t="pie.agencia"></h4><ul>'
      +   `<li><a href="${ancla('servicios')}" data-t="nav.servicios"></a></li>`
      +   `<li><a href="${ancla('trabajos')}" data-t="nav.trabajos"></a></li>`
      +   `<li><a href="${ancla('nosotros')}" data-t="nav.nosotros"></a></li>`
      +   `<li><a href="${ancla('cotizar')}" data-t="nav.cotizar"></a></li>`
      + '</ul></div>'
      + '<div><h4 data-t="pie.marcas"></h4><ul>'
      +   `<li><a href="${base}merch/index.html">La Fartedá</a></li>`
      +   `<li><a href="${base}wuandacrafts/index.html">WuandaCrafts</a></li>`
      +   `<li><a href="https://www.instagram.com/lafarteda/" target="_blank" rel="noopener">@lafarteda ${icono('i-externo')}</a></li>`
      +   `<li><a href="https://www.instagram.com/wuandacrafts/" target="_blank" rel="noopener">@wuandacrafts ${icono('i-externo')}</a></li>`
      + '</ul></div>'
      + '<div><h4 data-t="pie.contacto"></h4><ul>'
      +   `<li><button class="enlace" type="button" data-whatsapp="${prefijoWa}miami">${icono('i-whatsapp')} WhatsApp Miami · <span data-t="pie.usa"></span></button></li>`
      +   (soloMiami ? '' : `<li><button class="enlace" type="button" data-whatsapp="${prefijoWa}cartagena">${icono('i-whatsapp')} WhatsApp Cartagena · <span data-t="pie.col"></span></button></li>`)
      +   `<li><a href="mailto:projects@negrofarto.com">${icono('i-correo')} projects@negrofarto.com</a></li>`
      +   `<li><span class="pie-lugar">${icono('i-lugar')} ${soloMiami ? 'Miami, FL' : 'Miami, FL · Cartagena'}</span></li>`
      + '</ul></div>'
      + '</div>'
      + `<div class="pie-legal"><span data-t="${soloMiami ? 'pie.legal' : 'pie.legal_marcas'}"></span>${selectorIdioma()}</div>`
      + '</div></footer>'
      // En la agencia el WhatsApp va directo a Miami; en La Fartedá y WuandaCrafts se elige el país.
      + `<button class="flotante" type="button" data-whatsapp="${pagina === 'agencia' ? 'miami' : 'elegir'}" aria-label="WhatsApp">${icono('i-whatsapp')}</button>`
      + '<dialog class="modal" id="modal-whatsapp"></dialog>');
  }

  function aplicarIdioma(nuevo) {
    idioma = T[nuevo] ? nuevo : 'en';
    document.documentElement.lang = idioma;
    document.title = t('titulo.' + pagina);
    $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
    $$('[data-t-html]').forEach((el) => { el.innerHTML = t(el.dataset.tHtml); });
    $$('[data-t-ph]').forEach((el) => { el.placeholder = t(el.dataset.tPh); });
    $$('[data-t-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.tAria)); });
    $$('[data-idioma]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.idioma === idioma)));
    alCambiarIdioma.forEach((f) => f());
  }

  /* ── WhatsApp: abre el chat real con el mensaje listo; la persona decide si lo envía ── */
  const botonCerrar = () => `<button class="modal-cerrar" type="button" data-cerrar aria-label="${esc(t('car.cerrar'))}">${icono('i-cerrar')}</button>`;
  function abrirWhatsApp(destino, mensaje) {
    const modal = $('#modal-whatsapp');
    if (destino === 'elegir') {
      modal.innerHTML = botonCerrar() + `<div class="modal-cuerpo"><h3>${t('wa.elegir')}</h3><p>${t('wa.elegir_texto')}</p><div class="elegir-wa">`
        + ['miami', 'cartagena'].map((c) => `<button class="contacto-boton wa" type="button" data-whatsapp="${prefijoWa}${c}">${icono('i-whatsapp')}<span><strong>WhatsApp</strong><small>${t('wa.' + c)}</small></span></button>`).join('')
        + '</div></div>';
      if (!modal.open) modal.showModal();
      return;
    }
    // miami, lf_miami y wc_miami van a Miami; cartagena, lf_cartagena y wc_cartagena, a Colombia.
    const numero = D.contacto.whatsapp[destino.endsWith('cartagena') ? 'cartagena' : 'miami'];
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
    if (modal.open) modal.close();
  }
  const saludo = () => t('wa.saludo' + ({ merch: '_lf', wuanda: '_wc' }[pagina] || ''));

  /* ── Copia al correo (servidor/enviar.php) ── */
  // Cada cotización y cada pedido se manda también a projects@negrofarto.com (decidido el 26 oct 2026). Solo desde negrofarto.com: la
  // vista previa y las pruebas nunca envían, salvo una prueba que active window.NFG_ENVIO ({ activo, url }). Es una copia: si falla, no
  // se nota (WhatsApp ya abrió), y va con sendBeacon para que salga aunque la persona cambie de pestaña enseguida.
  const enProduccion = /^(www\.)?negrofarto\.com$/i.test(location.hostname);
  function copiaAlCorreo(datos) {
    const envio = window.NFG_ENVIO || {};
    if (!enProduccion && !envio.activo) return;
    try {
      const fd = new FormData();
      Object.entries({ idioma, pagina: location.pathname, ...datos }).forEach(([k, v]) => { if (v != null && v !== '') fd.append(k, v); });
      const url = envio.url || base + 'enviar.php';
      if (!(navigator.sendBeacon && navigator.sendBeacon(url, fd))) fetch(url, { method: 'POST', body: fd, keepalive: true }).catch(() => { /* solo es una copia */ });
    } catch (e) { /* solo es una copia */ }
  }

  function activarEstructura() {
    document.addEventListener('click', (e) => {
      const bIdioma = e.target.closest('[data-idioma]');
      if (bIdioma) { aplicarIdioma(bIdioma.dataset.idioma); guardar('nfg-idioma', idioma); }
      const bWa = e.target.closest('[data-whatsapp]');
      if (bWa) {
        if (bWa.tagName === 'A') e.preventDefault(); // el «Contacto» de La Fartedá: abre WhatsApp sin saltar al pie
        abrirWhatsApp(bWa.dataset.whatsapp, saludo());
      }
      const cerrar = e.target.closest('[data-cerrar]');
      if (cerrar) cerrar.closest('dialog').close();
      if (e.target.tagName === 'DIALOG') e.target.close(); // toque en el fondo
    });
    const botonMenu = $('.menu-movil');
    const menu = $('#menu');
    botonMenu.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', String(abierto));
    });
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) { menu.classList.remove('abierto'); botonMenu.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Muestra u oculta el error de un campo; devuelve si el campo está bien.
  function validarCampo(form, nombre, ok) {
    const error = $(`[data-error="${nombre}"]`, form);
    if (error) error.hidden = ok;
    const campo = form.elements[nombre];
    if (campo && campo.closest) campo.closest('.campo')?.classList.toggle('con-error', !ok);
    return ok;
  }
  function limpiarErrorAlEscribir(form) {
    form.addEventListener('input', (e) => { if (e.target.name) validarCampo(form, e.target.name, true); });
    form.addEventListener('change', (e) => { if (e.target.name) validarCampo(form, e.target.name, true); });
  }

  /* ── Agencia ── */
  function iniciarAgencia() {
    const seleccion = new Set();
    let abiertos = new Set();
    let filtro = 'todos';
    const kit = { negocio: null, etapa: null, paso: 1 }; // paso: 1 negocio · 2 etapa · 3 el kit
    const form = $('#form-cotizar');

    function pintarCinta() {
      const items = t('cinta').split(' · ').map((x) => `<span>${esc(x)}</span>`).join('');
      $('#cinta').innerHTML = items + items;
    }

    function pintarServicios() {
      $('#lista-servicios').innerHTML = D.servicios.map((s) => `
        <article class="servicio${abiertos.has(s.id) ? ' abierto' : ''}" data-servicio="${s.id}">
          <div class="servicio-icono">${icono(s.icono)}</div>
          <h3>${esc(L(s.titulo))}</h3>
          <p>${esc(L(s.corto))}</p>
          <button class="enlace-flecha servicio-ver" type="button" aria-expanded="${abiertos.has(s.id)}">${t('serv.ver')} ${icono('i-abajo')}</button>
          <div class="servicio-detalle">
            <ul class="lista-check">${L(s.incluye).map((x) => `<li>${icono('i-check')}<span>${esc(x)}</span></li>`).join('')}</ul>
            <button class="boton boton--negro boton--chico" type="button" data-cotizar="${s.id}">${t('serv.cotizar')}</button>
          </div>
        </article>`).join('');
    }
    // Toda la tarjeta abre y cierra «qué incluye»: Juan tocó la tarjeta y no pasó nada (23 oct 2026). Dentro del
    // detalle (la lista y «Cotizar este servicio») el clic no la cierra. Con teclado sigue el botón «Ver qué incluye».
    $('#lista-servicios').addEventListener('click', (e) => {
      const tarjeta = e.target.closest('.servicio');
      if (!tarjeta || e.target.closest('.servicio-detalle')) return;
      const id = tarjeta.dataset.servicio;
      const conBoton = !!e.target.closest('.servicio-ver');
      abiertos.has(id) ? abiertos.delete(id) : abiertos.add(id);
      pintarServicios();
      if (conBoton) $(`.servicio[data-servicio="${id}"] .servicio-ver`)?.focus(); // el foco no se pierde al repintar
    });

    // Recomendador de kits (reunión del 23 oct 2026; diseño elegido por Nicola el 26 oct): la caja blanca es el
    // formulario, de dos pasos (tipo de negocio, etapa) y el kit; la pregunta se escribe al cambiar de paso. Al lado,
    // sobre el fondo oscuro, el logo líquido (recursos/liquido.js) «piensa» cada vez que se elige. Sin WebGL2 o con
    // «reducir movimiento», queda el logo quieto y la pregunta aparece completa.
    const reduceMov = matchMedia('(prefers-reduced-motion: reduce)');
    const logoKit = $('#kit-logo-caja');
    const liquido = window.NFG_LIQUIDO?.montar(logoKit, $('.kit-logo', logoKit)) || null;
    let escribiendo = 0; // temporizador de la pregunta que se escribe

    // Escribe la pregunta letra por letra. El texto de verdad no cambia (lo que falta va en un <span> transparente):
    // los lectores de pantalla lo leen completo y las líneas no se corren a mitad de palabra.
    function escribir(h) {
      const el = $('.kit-texto', h), texto = el.textContent;
      let i = 0;
      const poner = () => { el.innerHTML = `${esc(texto.slice(0, i))}<span class="kit-resto">${esc(texto.slice(i))}</span>`; };
      const letra = () => {
        i++;
        if (i >= texto.length) { el.textContent = texto; return; }
        poner();
        escribiendo = setTimeout(letra, 24 + Math.random() * 22);
      };
      poner();
      escribiendo = setTimeout(letra, 140);
    }

    function pintarKit({ animar = false } = {}) {
      clearTimeout(escribiendo);
      $('.kit-pista', logoKit).textContent = t(matchMedia('(hover: hover)').matches ? 'kit.pista' : 'kit.pista_toque');
      const negocio = D.negocios.find((n) => n.id === kit.negocio);
      const etapa = D.etapas.find((n) => n.id === kit.etapa);
      const progreso = (n, texto) => `<div class="kit-progreso"><span>${esc(texto)}</span><i class="lleno"></i><i${n > 1 ? ' class="lleno"' : ''}></i></div>`;
      const opcion = (dato, clave, elegida, i) => `<button class="kit-opcion" type="button" data-${clave}="${dato.id}" aria-pressed="${elegida}" style="--i:${i}"><span class="kit-ico">${icono(dato.icono)}</span><span>${esc(L(dato.titulo))}</span></button>`;
      const elegido = (texto) => `<div class="kit-elegido">${icono('i-check')}<strong>${esc(texto)}</strong><button class="kit-cambiar" type="button" data-volver aria-label="${esc(t('kit.cambiar_aria'))}">${t('kit.cambiar')}</button></div>`;
      const titulo = (clave) => `<h3 class="kit-pregunta" id="kit-pregunta" tabindex="-1"><span class="kit-texto">${t(clave)}</span></h3>`;
      let html;
      if (kit.paso === 1) {
        html = progreso(1, t('kit.progreso', { n: 1 })) + `<p class="kit-ceja">${t('kit.usame')}</p>` + titulo('kit.p1')
          + `<div class="kit-opciones" role="group" aria-labelledby="kit-pregunta">${D.negocios.map((n, i) => opcion(n, 'negocio', kit.negocio === n.id, i)).join('')}</div>`
          + `<p class="kit-despues">${t('kit.despues1')}</p>`;
      } else if (kit.paso === 2) {
        html = progreso(2, t('kit.progreso', { n: 2 })) + elegido(L(negocio.titulo)) + `<p class="kit-ceja">${t('kit.ya_casi')}</p>` + titulo('kit.p2')
          + `<div class="kit-opciones kit-opciones--una" role="group" aria-labelledby="kit-pregunta">${D.etapas.map((n, i) => opcion(n, 'etapa', kit.etapa === n.id, i)).join('')}</div>`
          + `<p class="kit-despues">${t('kit.despues2')}</p>`;
      } else {
        html = progreso(2, t('kit.listo')) + elegido(`${L(negocio.titulo)} · ${L(etapa.titulo)}`) + titulo('kit.resultado')
          + '<ol class="kit-items">' + itemsKit().map((it) => {
            const s = servicio(it.servicio);
            return `<li class="kit-item"><div class="servicio-icono">${icono(s.icono)}</div><div><strong>${esc(L(it.titulo))}</strong><span>${esc(L(it.porque))}</span><br /><small>${esc(L(s.titulo))}</small></div></li>`;
          }).join('') + '</ol>'
          + (etapa.nota ? `<p class="kit-nota">${esc(L(etapa.nota))}</p>` : '')
          + `<button class="boton boton--acento boton--ancho" type="button" id="pedir-kit">${t('kit.pedir')} ${icono('i-flecha')}</button>`;
      }
      $('#kit-resultado').innerHTML = html;
      if (animar) {
        // El foco pasa a la pregunta: con teclado no se pierde al cambiar de paso y los lectores de pantalla la leen.
        $('#kit-pregunta').focus({ preventScroll: true });
        if (kit.paso < 3 && !reduceMov.matches) escribir($('#kit-pregunta'));
      }
    }
    function itemsKit() {
      const negocio = D.negocios.find((n) => n.id === kit.negocio);
      const etapa = D.etapas.find((n) => n.id === kit.etapa);
      return (etapa.extra ? [etapa.extra] : []).concat(negocio.kit);
    }
    // Al cambiar de paso, lo nuevo queda a la vista: la página solo se desplaza si la caja quedó bajo la cabecera o si la
    // pregunta nueva quedó fuera de pantalla; con el kit ya listo, se lleva la caja arriba para verlo entero. Así, en el
    // celular, el logo sigue a la vista mientras «piensa» (fuera de pantalla el motor se detiene).
    function verCaja() {
      const caja = $('#kit-resultado'), arriba = caja.getBoundingClientRect().top, pregunta = $('#kit-pregunta').getBoundingClientRect().bottom;
      if (arriba < 84 || pregunta > innerHeight - 24 || (kit.paso === 3 && arriba > innerHeight * 0.35)) caja.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // La primera vez, la pregunta se escribe justo antes de que la caja entre en pantalla (así no se ve parpadear).
    if (!reduceMov.matches && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (kit.paso === 1 && !kit.negocio) escribir($('#kit-pregunta'));
      }, { rootMargin: '0px 0px 30% 0px' });
      io.observe($('#kit-resultado'));
    }
    $('#kit').addEventListener('click', (e) => {
      const n = e.target.closest('[data-negocio]');
      const s = e.target.closest('[data-etapa]');
      const volver = e.target.closest('[data-volver]');
      if (n) { kit.negocio = n.dataset.negocio; kit.paso = 2; }
      if (s) { kit.etapa = s.dataset.etapa; kit.paso = 3; }
      if (volver) kit.paso = 1;
      if (n || s || volver) {
        if (n || s) liquido?.pensar(s ? 1900 : 1400); // el logo «piensa» un poco más cuando ya sale el kit
        pintarKit({ animar: true });
        verCaja();
      }
      if (e.target.closest('#pedir-kit')) {
        const items = itemsKit();
        items.forEach((it) => seleccion.add(it.servicio));
        form.elements.mensaje.value = t('kit.mensaje', {
          negocio: L(D.negocios.find((x) => x.id === kit.negocio).titulo),
          etapa: L(D.etapas.find((x) => x.id === kit.etapa).titulo).toLowerCase(),
          items: items.map((it) => L(it.titulo)).join(', '),
        });
        pintarChipsCotizar();
        validarCampo(form, 'servicios', true);
        irA('cotizar');
      }
    });

    const filtros = ['todos', 'branding', 'letreros', 'productos'];
    // Cada trabajo abre el visor; el ícono de Instagram lleva directo a su publicación (lo pidió Juan, 10 oct 2026).
    // Van como hermanos y no uno dentro del otro: un enlace no puede ir dentro de un botón.
    const enlaceInstagram = (p, clase, contenido, aria) => `<a class="${clase}" href="${esc(p.instagram)}" target="_blank" rel="noopener"${aria ? ` aria-label="${esc(aria)}" title="${esc(aria)}"` : ''}>${contenido}</a>`;

    // Trabajos como el carrusel de Instagram (pedido de Juan en la reunión del 23 oct 2026; diseño B elegido el 26 oct):
    // en la tarjeta, el mouse recorre las láminas o reproduce el video; el visor las pasa con flechas, teclado,
    // miniaturas o deslizando. «medios» está en datos.js; sin él, el trabajo es una sola imagen (su portada).
    const proyecto = (id) => D.proyectos.find((x) => x.id === id);
    const rutaProy = (r) => `${base}img/proyectos/${r}`;
    const miniatura = (m) => rutaProy(m.poster || m.img.replace(/(\d+)\.webp$/, 't-$1.webp'));
    const mediosDe = (p) => p.medios || [{ img: p.img }];
    const conVideo = (p) => !!(p.medios && p.medios[0].video);           // la tarjeta reproduce el video…
    const conLaminas = (p) => !!(p.medios && !conVideo(p) && p.medios.length > 1); // …o recorre las láminas
    const insignia = (p) => (conVideo(p)
      ? `<span class="insignia">${icono('i-play')}${esc(p.medios[0].dur)}<span class="solo-lectores"> ${t('trab.video')}</span></span>`
      : conLaminas(p) ? `<span class="insignia">${icono('i-laminas')}${p.medios.length}<span class="solo-lectores"> ${t('trab.laminas')}</span></span>` : '');

    let tarjetaActiva = null;     // la tarjeta con el mouse encima
    const laminaTarjeta = new Map(); // id del trabajo → lámina que se ve en la tarjeta (0 = la portada)
    const precargados = new Set();
    function pintarTrabajos() {
      tarjetaActiva = null;
      $('#filtros-trabajos').innerHTML = filtros.map((f) => `<button class="chip" type="button" data-filtro="${f}" aria-pressed="${filtro === f}">${t('trab.' + f)}</button>`).join('');
      $('#lista-trabajos').innerHTML = D.proyectos.map((p) => `
        <div class="trabajo${p.medios ? ' trabajo--medios' : ''}${conLaminas(p) ? ' trabajo--laminas' : ''}" data-id="${p.id}"${filtro !== 'todos' && p.categoria !== filtro ? ' hidden' : ''}>
          <button class="trabajo-abrir" type="button" data-proyecto="${p.id}">
            <img class="trabajo-portada" src="${rutaProy(p.img)}" alt="${esc(L(p.titulo))}" loading="lazy" />
            ${insignia(p)}${conLaminas(p) ? '<span class="trabajo-contador" aria-hidden="true"></span>' : ''}
            <span class="trabajo-info"><strong>${esc(L(p.titulo))}</strong><span>${esc(L(p.sector))}${p.anio ? ' · ' + p.anio : ''}</span></span>
          </button>
          ${conLaminas(p) ? [-1, 1].map((paso) => `<button class="boton-circulo trabajo-flecha ${paso < 0 ? 'ant' : 'sig'}" type="button" tabindex="-1" data-paso="${paso}" aria-label="${esc(t(paso < 0 ? 'trab.ant' : 'trab.sig'))}">${icono(paso < 0 ? 'i-izq' : 'i-der')}</button>`).join('') : ''}
          ${p.instagram ? enlaceInstagram(p, 'trabajo-ig', icono('i-instagram'), t('trab.ver_ig_de', { proyecto: L(p.titulo) })) : ''}
        </div>`).join('');
    }

    // Vista previa en la tarjeta: solo con mouse (en el celular se toca y se abre el visor). Las láminas se recorren con el
    // mouse (el centro de la tarjeta) o con las flechas de los costados; el video suena (sin sonido) mientras el mouse
    // está encima, salvo con «reducir movimiento».
    function laminaDeTarjeta(card, i) {
      const p = proyecto(card.dataset.id), n = p.medios.length;
      i = Math.max(0, Math.min(n - 1, i));
      laminaTarjeta.set(p.id, i);
      $('.trabajo-portada', card).src = i === 0 ? rutaProy(p.img) : miniatura(p.medios[i]);
      $('.trabajo-contador', card).textContent = `${i + 1} / ${n}`;
    }
    function entrarTarjeta(card) {
      const p = proyecto(card.dataset.id);
      card.classList.add('viendo');
      if (conLaminas(p)) {
        laminaDeTarjeta(card, 0);
        if (!precargados.has(p.id)) { precargados.add(p.id); p.medios.forEach((m) => { new Image().src = miniatura(m); }); }
      } else if (conVideo(p) && !reduceMov.matches) {
        let v = $('.trabajo-video', card);
        if (!v) {
          v = document.createElement('video');
          Object.assign(v, { className: 'trabajo-video', muted: true, loop: true, playsInline: true, preload: 'auto', tabIndex: -1, poster: rutaProy(p.medios[0].poster), src: rutaProy(p.medios[0].video) });
          v.setAttribute('muted', ''); v.setAttribute('aria-hidden', 'true');
          $('.trabajo-portada', card).after(v);
        }
        v.play().then(() => v.classList.add('suena'), () => { /* el navegador no dejó reproducir: queda la portada */ });
      }
    }
    function salirTarjeta() {
      const card = tarjetaActiva;
      tarjetaActiva = null;
      if (!card) return;
      card.classList.remove('viendo');
      const p = proyecto(card.dataset.id);
      if (conLaminas(p)) { laminaTarjeta.delete(p.id); $('.trabajo-portada', card).src = rutaProy(p.img); }
      const v = $('.trabajo-video', card);
      if (v) { v.pause(); v.currentTime = 0; v.classList.remove('suena'); }
    }
    const lista = $('#lista-trabajos');
    lista.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'mouse') return;
      const card = e.target.closest('.trabajo--medios');
      if (card === tarjetaActiva) return;
      salirTarjeta();
      tarjetaActiva = card;
      if (card) entrarTarjeta(card);
    });
    lista.addEventListener('pointerleave', salirTarjeta);
    lista.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !tarjetaActiva) return;
      const p = proyecto(tarjetaActiva.dataset.id);
      if (!conLaminas(p)) return;
      const r = tarjetaActiva.getBoundingClientRect(), u = (e.clientX - r.left) / r.width;
      if (u < 0.16 || u > 0.84) return; // en los costados están las flechas
      laminaDeTarjeta(tarjetaActiva, Math.floor((u - 0.16) / 0.68 * p.medios.length));
    });

    $('#trabajos').addEventListener('click', (e) => {
      const f = e.target.closest('[data-filtro]');
      if (f) { filtro = f.dataset.filtro; pintarTrabajos(); }
      const flecha = e.target.closest('.trabajo-flecha');
      if (flecha) {
        const card = flecha.closest('.trabajo');
        laminaDeTarjeta(card, (laminaTarjeta.get(card.dataset.id) || 0) + Number(flecha.dataset.paso));
        return;
      }
      const b = e.target.closest('[data-proyecto]');
      // Si se estaba viendo una lámina en la tarjeta, el visor se abre en esa.
      if (b) abrirProyecto(proyecto(b.dataset.proyecto), laminaTarjeta.get(b.dataset.proyecto) || 0);
    });

    // El visor: la lámina o el video, con flechas, contador, miniaturas (escritorio) o puntos (celular).
    const visor = $('#modal-proyecto');
    let abierto = null; // { p, medios, i }
    function abrirProyecto(p, desde = 0) {
      const s = servicio(p.servicio), medios = mediosDe(p), varias = medios.length > 1;
      abierto = { p, medios, i: Math.max(0, Math.min(medios.length - 1, desde)) };
      visor.innerHTML = botonCerrar() + '<div class="visor">'
        + `<div class="visor-medios${varias ? ' visor-medios--varias' : ''}"><div class="visor-escena">`
        + `<div class="visor-lamina" id="visor-lamina"${varias ? ` role="group" aria-roledescription="${esc(t('trab.carrusel'))}" aria-label="${esc(L(p.titulo))}"` : ''}></div>`
        + (varias
          ? '<span class="visor-contador" id="visor-contador" aria-hidden="true"></span>'
            + [-1, 1].map((paso) => `<button class="boton-circulo visor-flecha ${paso < 0 ? 'ant' : 'sig'}" type="button" data-lamina="${paso}" aria-label="${esc(t(paso < 0 ? 'trab.ant' : 'trab.sig'))}">${icono(paso < 0 ? 'i-izq' : 'i-der')}</button>`).join('')
          : '')
        + '</div>'
        + (varias
          ? '<div class="visor-tira">' + medios.map((m, k) => `<button class="visor-mini${m.video ? ' visor-mini--video' : ''}" type="button" data-ir="${k}" aria-label="${esc(t('trab.ir', { i: k + 1 }))}"><img src="${miniatura(m)}" alt="" loading="lazy" /></button>`).join('') + '</div>'
            + '<div class="visor-puntos" aria-hidden="true">' + medios.map(() => '<i></i>').join('') + '</div>'
            + '<p class="solo-lectores" id="visor-anuncio" aria-live="polite"></p>'
          : '')
        + '</div>'
        + `<div class="modal-cuerpo"><p class="ceja">${esc(L(s.titulo))}</p><h3>${esc(L(p.titulo))}</h3>`
        + `<p><strong>${esc(L(p.sector))}</strong>${p.anio ? ' · ' + p.anio : ''}</p><p>${esc(L(p.texto))}</p>`
        + `<button class="boton boton--acento" type="button" data-similar="${p.id}">${t('trab.similar')}</button>`
        + (p.instagram ? enlaceInstagram(p, 'boton boton--borde', `${icono('i-instagram')}${esc(t('trab.ver_ig'))}`) : '')
        + '</div></div>';
      visor.showModal();
      pintarLamina(false);
    }
    function pintarLamina(avisar) {
      const { p, medios, i } = abierto, m = medios[i], n = medios.length, marco = $('#visor-lamina');
      marco.querySelectorAll('video').forEach((v) => v.pause());
      marco.innerHTML = m.video
        ? `<video class="visor-video" src="${rutaProy(m.video)}" poster="${rutaProy(m.poster)}" controls playsinline muted loop autoplay></video>`
        : `<img src="${rutaProy(m.img)}" alt="${esc(L(p.titulo))}${n > 1 ? ' — ' + esc(t('trab.lamina_de', { i: i + 1, n })) : ''}" />`;
      if (n < 2) return;
      $('#visor-contador').textContent = `${i + 1} / ${n}`;
      $$('.visor-mini', visor).forEach((b, k) => { b.setAttribute('aria-current', String(k === i)); if (k === i) b.scrollIntoView({ inline: 'center', block: 'nearest' }); });
      $$('.visor-puntos i', visor).forEach((d, k) => d.classList.toggle('activo', k === i));
      $$('.visor-flecha', visor).forEach((b) => { const sin = Number(b.dataset.lamina) < 0 ? i === 0 : i === n - 1; b.disabled = sin; });
      if (avisar) $('#visor-anuncio').textContent = t('trab.lamina_de', { i: i + 1, n });
      [i - 1, i + 1].forEach((k) => { if (medios[k] && medios[k].img) new Image().src = rutaProy(medios[k].img); });
    }
    function irALamina(k) {
      if (!abierto || k < 0 || k > abierto.medios.length - 1 || k === abierto.i) return;
      abierto.i = k;
      pintarLamina(true);
    }
    visor.addEventListener('click', (e) => {
      const paso = e.target.closest('[data-lamina]');
      if (paso) { irALamina(abierto.i + Number(paso.dataset.lamina)); return; }
      const mini = e.target.closest('[data-ir]');
      if (mini) { irALamina(Number(mini.dataset.ir)); return; }
      const b = e.target.closest('[data-similar]');
      if (!b) return;
      const p = proyecto(b.dataset.similar);
      seleccion.add(p.servicio);
      form.elements.mensaje.value = t('trab.mensaje', { proyecto: L(p.titulo) });
      pintarChipsCotizar();
      validarCampo(form, 'servicios', true);
      visor.close();
      irA('cotizar');
    });
    visor.addEventListener('keydown', (e) => {
      // Con el foco en el video, las flechas son del reproductor (adelantar y retroceder).
      if (!abierto || e.target.tagName === 'VIDEO' || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
      e.preventDefault();
      irALamina(abierto.i + (e.key === 'ArrowRight' ? 1 : -1));
    });
    // Deslizar con el dedo sobre la lámina: a la izquierda, la siguiente.
    let toque = null;
    visor.addEventListener('pointerdown', (e) => { toque = e.pointerType !== 'mouse' && e.target.closest('.visor-lamina') ? { x: e.clientX, y: e.clientY } : null; });
    visor.addEventListener('pointerup', (e) => {
      if (!toque || !abierto) return;
      const dx = e.clientX - toque.x, dy = e.clientY - toque.y;
      toque = null;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) irALamina(abierto.i + (dx < 0 ? 1 : -1));
    });
    visor.addEventListener('pointercancel', () => { toque = null; });
    // Al cerrar, el video se detiene (un diálogo cerrado seguiría sonando) y el visor queda vacío.
    visor.addEventListener('close', () => { visor.querySelectorAll('video').forEach((v) => v.pause()); abierto = null; visor.innerHTML = ''; });

    // Cotización
    function pintarChipsCotizar() {
      $('#cot-servicios').innerHTML = D.servicios.map((s) => `<button class="chip" type="button" data-servicio-cot="${s.id}" aria-pressed="${seleccion.has(s.id)}">${icono(s.icono)}${esc(L(s.titulo))}</button>`).join('');
    }
    function pintarRuta() {
      const donde = form.elements.donde.value;
      const ruta = $('#cot-ruta');
      ruta.hidden = !donde;
      if (donde) ruta.innerHTML = icono('i-whatsapp') + t('cot.ruta_miami'); // las cotizaciones de la agencia van a Miami
    }
    $('#cot-servicios').addEventListener('click', (e) => {
      const b = e.target.closest('[data-servicio-cot]');
      if (!b) return;
      const id = b.dataset.servicioCot;
      seleccion.has(id) ? seleccion.delete(id) : seleccion.add(id);
      pintarChipsCotizar();
      validarCampo(form, 'servicios', true);
    });
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cotizar]');
      if (!b) return;
      seleccion.add(b.dataset.cotizar);
      pintarChipsCotizar();
      validarCampo(form, 'servicios', true);
      irA('cotizar');
    });
    form.addEventListener('change', (e) => { if (e.target.name === 'donde') pintarRuta(); });
    limpiarErrorAlEscribir(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (n) => form.elements[n].value.trim();
      const oks = [
        validarCampo(form, 'servicios', seleccion.size > 0),
        validarCampo(form, 'nombre', v('nombre') !== ''),
        validarCampo(form, 'telefono', v('telefono').replace(/\D/g, '').length >= 7),
        validarCampo(form, 'donde', v('donde') !== ''),
      ];
      if (oks.includes(false)) { $('.con-error input, [data-error]:not([hidden])', form)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      const lineas = [t('cot.wa_hola'), '',
        `• ${t('cot.wa_servicios')}: ${D.servicios.filter((s) => seleccion.has(s.id)).map((s) => L(s.titulo)).join(', ')}`];
      if (v('negocio')) lineas.push(`• ${t('cot.wa_negocio')}: ${v('negocio')}`);
      lineas.push(`• ${t('cot.wa_donde')}: ${t('cot.' + v('donde'))}`);
      lineas.push(`• ${t('cot.wa_cuando')}: ${t('cot.' + v('cuando'))}`);
      if (v('mensaje')) lineas.push(`• ${t('cot.wa_mensaje')}: ${v('mensaje')}`);
      lineas.push('', `${t('cot.wa_contacto')}: ${v('nombre')} · ${v('telefono')}${v('correo') ? ' · ' + v('correo') : ''}`);
      const mensaje = lineas.join('\n');
      copiaAlCorreo({ tipo: 'cotizacion', destino: 'miami', nombre: v('nombre'), telefono: v('telefono'), correo: v('correo'), mensaje });
      abrirWhatsApp('miami', mensaje);
    });

    alCambiarIdioma.push(pintarCinta, pintarServicios, pintarKit, pintarTrabajos, pintarChipsCotizar, pintarRuta);
  }

  /* ── La Fartedá: tienda con precios por país y pedido por WhatsApp ── */
  function iniciarMerch() {
    const productos = [];
    ['camiseta', 'tote'].forEach((tipo) => D.disenos.forEach((d) => productos.push({ id: `${tipo}-${d.id}`, tipo, diseno: d, img: `${tipo}-${d.id}.webp` })));
    let pais = leer('nfg-pais') === 'col' ? 'col' : 'usa';
    let filtro = 'todo';
    let carrito = [];
    try { carrito = JSON.parse(leer('nfg-carrito') || '[]').filter((l) => productos.some((p) => p.id === l.producto)); } catch (e) { carrito = []; }
    let actual = null; // producto abierto en la ficha
    let eleccion = null;
    const ficha = $('#modal-producto');
    const cajon = $('#cajon-carrito');

    const opcionesDe = (p) => p.diseno[p.tipo];
    function precio(p) {
      const tabla = p.tipo === 'tote' ? D.precios.tote : D.precios[p.diseno.precioCamiseta || 'camiseta'];
      return pais === 'usa' ? tabla.usd : tabla.cop;
    }
    function dinero(n) {
      return pais === 'usa'
        ? '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD'
        : '$' + Math.round(n).toLocaleString('es-CO') + ' COP';
    }
    const nombreTipo = (p) => t(p.tipo === 'tote' ? 'lf.tote' : 'lf.camiseta');
    function nombreColor(p, c) {
      const nota = opcionesDe(p).notaColor && opcionesDe(p).notaColor[c];
      return L(D.colores[c].nombre) + (nota ? ' · ' + L(nota) : '');
    }
    const puntos = (p) => `<span class="puntos">${opcionesDe(p).colores.map((c) => `<span class="punto" style="background:${D.colores[c].hex}" title="${esc(L(D.colores[c].nombre))}"></span>`).join('')}</span>`;

    function pintarBarra() {
      $('#lf-filtros').innerHTML = [['todo', 'lf.todos'], ['camiseta', 'lf.camisetas'], ['tote', 'lf.totes']]
        .map(([id, clave]) => `<button class="chip" type="button" data-filtro="${id}" aria-pressed="${filtro === id}">${t(clave)}</button>`).join('');
      $$('[data-pais]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pais === pais)));
      $('#lf-nota-envio').innerHTML = icono('i-envio') + t(pais === 'usa' ? 'lf.nota_usa' : 'lf.nota_col');
    }
    function pintarProductos() {
      $('#lista-productos').innerHTML = productos.filter((p) => filtro === 'todo' || p.tipo === filtro).map((p) => `
        <button class="producto" type="button" data-producto="${p.id}">
          ${p.diseno.masVendido && p.tipo === 'camiseta' ? `<span class="etiqueta-producto">${t('lf.mas_vendido')}</span>` : ''}
          <img src="${base}img/productos/${p.img}" alt="${esc(p.diseno.nombre)} — ${esc(nombreTipo(p))}" loading="lazy" />
          <span class="producto-info">
            <span class="producto-tipo">${esc(nombreTipo(p))}</span>
            <span class="producto-nombre">${esc(p.diseno.nombre)}</span>
            <span class="producto-precio">${dinero(precio(p))}</span>
            ${puntos(p)}
          </span>
        </button>`).join('');
    }
    $('#coleccion').addEventListener('click', (e) => {
      const f = e.target.closest('[data-filtro]');
      if (f) { filtro = f.dataset.filtro; pintarBarra(); pintarProductos(); }
      const b = e.target.closest('[data-pais]');
      if (b) cambiarPais(b.dataset.pais);
      const p = e.target.closest('[data-producto]');
      if (p) abrirFicha(productos.find((x) => x.id === p.dataset.producto));
    });
    function cambiarPais(nuevo) {
      pais = nuevo;
      guardar('nfg-pais', pais);
      pintarBarra(); pintarProductos(); pintarCarrito();
      if (ficha.open) pintarFicha();
    }

    function abrirFicha(p) {
      actual = p;
      const op = opcionesDe(p);
      eleccion = { color: op.colores[0], talla: null, estilo: op.estilos ? 0 : null, cantidad: 1, error: false };
      pintarFicha();
      ficha.showModal();
    }
    function pintarFicha() {
      const p = actual;
      const op = opcionesDe(p);
      const grupo = (titulo, extra, html) => `<div class="grupo-opciones"><h4>${titulo}${extra ? `<span>${extra}</span>` : ''}</h4><div class="opciones">${html}</div></div>`;
      ficha.innerHTML = botonCerrar() + '<div class="ficha">'
        + `<div class="ficha-img"><img src="${base}img/productos/${p.img}" alt="${esc(p.diseno.nombre)}" /></div>`
        + '<div class="modal-cuerpo">'
        +   `<p class="producto-tipo">${esc(nombreTipo(p))}${p.diseno.masVendido && p.tipo === 'camiseta' ? ' · ' + t('lf.mas_vendido') : ''}</p>`
        +   `<h3>${esc(p.diseno.nombre)}</h3>`
        +   `<p>${esc(L(p.diseno.texto))}${p.tipo === 'tote' ? ' ' + esc(t('lf.tote_texto')) : ''}</p>`
        +   `<p class="ficha-precio">${dinero(precio(p))}<small>${t('lf.envio_incluido')}</small></p>`
        +   grupo(t('lf.color'), esc(nombreColor(p, eleccion.color)), op.colores.map((c) => `<button class="opcion-btn" type="button" data-color="${c}" aria-pressed="${eleccion.color === c}"><span class="punto" style="background:${D.colores[c].hex}"></span>${esc(L(D.colores[c].nombre))}</button>`).join(''))
        +   (op.estilos ? grupo(t('lf.estilo'), '', op.estilos.map((s, i) => `<button class="opcion-btn" type="button" data-estilo="${i}" aria-pressed="${eleccion.estilo === i}">${esc(L(s))}</button>`).join('')) : '')
        +   (p.tipo === 'camiseta' ? grupo(t('lf.talla'), t('lf.tallas_nota'), D.tallas.map((s) => `<button class="opcion-btn" type="button" data-talla="${s}" aria-pressed="${eleccion.talla === s}">${s}</button>`).join(''))
              + `<p class="error-campo"${eleccion.error ? '' : ' hidden'}>${t('lf.err_talla')}</p>` : '')
        +   `<div class="grupo-opciones"><h4>${t('lf.cantidad')}</h4><div class="fila-agregar">`
        +     `<div class="cantidad"><button type="button" data-cant="-1" aria-label="${esc(t('car.menos'))}">${icono('i-menos')}</button><output>${eleccion.cantidad}</output><button type="button" data-cant="1" aria-label="${esc(t('car.mas'))}">${icono('i-mas')}</button></div>`
        +     `<button class="boton boton--acento" type="button" id="agregar">${icono('i-bolsa-compra')} ${t('lf.agregar')}</button>`
        +   '</div></div>'
        + '</div></div>';
    }
    ficha.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || b.hasAttribute('data-cerrar')) return;
      if (b.dataset.color) eleccion.color = b.dataset.color;
      else if (b.dataset.estilo) eleccion.estilo = Number(b.dataset.estilo);
      else if (b.dataset.talla) { eleccion.talla = b.dataset.talla; eleccion.error = false; }
      else if (b.dataset.cant) eleccion.cantidad = Math.min(20, Math.max(1, eleccion.cantidad + Number(b.dataset.cant)));
      else if (b.id === 'agregar') {
        if (actual.tipo === 'camiseta' && !eleccion.talla) { eleccion.error = true; pintarFicha(); return; }
        agregar();
        return;
      } else return;
      pintarFicha();
    });
    function agregar() {
      const linea = { producto: actual.id, color: eleccion.color, talla: eleccion.talla, estilo: eleccion.estilo };
      const igual = carrito.find((l) => l.producto === linea.producto && l.color === linea.color && l.talla === linea.talla && l.estilo === linea.estilo);
      if (igual) igual.cantidad = Math.min(20, igual.cantidad + eleccion.cantidad);
      else carrito.push({ ...linea, cantidad: eleccion.cantidad });
      guardarCarrito();
      ficha.close();
      pintarCarrito();
      const contador = $('#contador-carrito');
      contador.classList.remove('latido'); void contador.offsetWidth; contador.classList.add('latido');
      cajon.showModal();
    }

    function guardarCarrito() { guardar('nfg-carrito', JSON.stringify(carrito)); }
    function detalleLinea(l, p) {
      const partes = [nombreTipo(p), nombreColor(p, l.color)];
      if (l.estilo != null && opcionesDe(p).estilos) partes.push(L(opcionesDe(p).estilos[l.estilo]));
      if (l.talla) partes.push(`${t('lf.talla_corta')} ${l.talla}`);
      return partes.join(', ');
    }
    function total() { return carrito.reduce((s, l) => s + precio(productos.find((p) => p.id === l.producto)) * l.cantidad, 0); }
    function pintarCarrito() {
      const unidades = carrito.reduce((s, l) => s + l.cantidad, 0);
      const contador = $('#contador-carrito');
      contador.hidden = unidades === 0;
      contador.textContent = unidades;
      const datos = { nombre: cajon.querySelector('[name="nombre"]')?.value || '', ciudad: cajon.querySelector('[name="ciudad"]')?.value || '', notas: cajon.querySelector('[name="notas"]')?.value || '' };
      cajon.innerHTML = `<div class="cajon-cabeza"><h3>${t('car.titulo')}</h3>${botonCerrar()}</div>`
        + '<div class="cajon-lista">'
        + (carrito.length === 0
          ? `<div class="cajon-vacio">${icono('i-bolsa-compra')}<p>${t('car.vacio')}</p><button class="boton boton--negro boton--chico" type="button" data-cerrar>${t('car.seguir')}</button></div>`
          : carrito.map((l, i) => {
            const p = productos.find((x) => x.id === l.producto);
            return `<div class="linea-carrito"><img src="${base}img/productos/${p.img}" alt="" />`
              + `<div><strong>${esc(p.diseno.nombre)}</strong><small>${esc(detalleLinea(l, p))}</small>`
              + `<div class="cantidad cantidad--chica"><button type="button" data-linea="${i}" data-cant="-1" aria-label="${esc(t('car.menos'))}">${icono('i-menos')}</button><output>${l.cantidad}</output><button type="button" data-linea="${i}" data-cant="1" aria-label="${esc(t('car.mas'))}">${icono('i-mas')}</button></div></div>`
              + `<div class="linea-precio">${dinero(precio(p) * l.cantidad)}<button class="quitar" type="button" data-quitar="${i}" aria-label="${esc(t('car.quitar'))}">${icono('i-basura')}</button></div></div>`;
          }).join(''))
        + '</div>'
        + (carrito.length === 0 ? '' : '<form class="cajon-pie" id="form-pedido" novalidate>'
          + '<div class="totales">'
          +   `<div><span>${t('car.subtotal')}</span><span>${dinero(total())}</span></div>`
          +   `<div><span>${t('car.envio')}</span><span>${t('car.incluido')}</span></div>`
          +   `<div class="total"><span>${t('car.total')}</span><span>${dinero(total())}</span></div>`
          + '</div>'
          + '<div class="fila-2">'
          +   `<label class="campo"><span class="etiqueta-campo">${t('car.nombre')}</span><input name="nombre" autocomplete="name" value="${esc(datos.nombre)}" /></label>`
          +   `<label class="campo"><span class="etiqueta-campo">${t('car.ciudad')}</span><input name="ciudad" autocomplete="address-level2" value="${esc(datos.ciudad)}" /></label>`
          + '</div>'
          + `<label class="campo"><span class="etiqueta-campo">${t('car.notas')} <span class="opcional">(${t('cot.opcional')})</span></span><textarea name="notas" rows="2" placeholder="${esc(t('car.notas_ph'))}">${esc(datos.notas)}</textarea></label>`
          + `<p class="error-campo" data-error="pedido" hidden>${t('car.err')}</p>`
          + `<p class="ruta">${icono('i-whatsapp')}${esc(t('car.ruta', { destino: t(pais === 'col' ? 'destino.lf_cartagena' : 'destino.lf_miami') }))}</p>`
          + `<button class="boton boton--acento boton--ancho" type="submit">${icono('i-whatsapp')} ${t('car.enviar')}</button>`
          + '</form>');
    }
    cajon.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.linea != null) {
        const l = carrito[Number(b.dataset.linea)];
        l.cantidad = Math.min(20, l.cantidad + Number(b.dataset.cant));
        if (l.cantidad < 1) carrito.splice(Number(b.dataset.linea), 1);
      } else if (b.dataset.quitar != null) {
        carrito.splice(Number(b.dataset.quitar), 1);
      } else return;
      guardarCarrito();
      pintarCarrito();
    });
    cajon.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      const nombre = f.elements.nombre.value.trim();
      const ciudad = f.elements.ciudad.value.trim();
      const ok = nombre !== '' && ciudad !== '';
      $('[data-error="pedido"]', f).hidden = ok;
      f.elements.nombre.closest('.campo').classList.toggle('con-error', !nombre);
      f.elements.ciudad.closest('.campo').classList.toggle('con-error', !ciudad);
      if (!ok) return;
      // Con la fecha (mes, día y dos letras o cifras al azar) no se repite casi nunca: LF-1026-A7. Antes era LF-#### al azar.
      const fecha = new Date(), dos = (n) => String(n).padStart(2, '0'), azar = () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)];
      const numero = `LF-${dos(fecha.getMonth() + 1)}${dos(fecha.getDate())}-${azar()}${azar()}`;
      const lineas = [t('lf.wa_hola'), t('lf.wa_pedido', { numero, pais: t(pais === 'usa' ? 'lf.usa_nombre' : 'lf.col_nombre') }), ''];
      carrito.forEach((l) => {
        const p = productos.find((x) => x.id === l.producto);
        lineas.push(`• ${l.cantidad} × ${p.diseno.nombre} — ${detalleLinea(l, p)} — ${dinero(precio(p) * l.cantidad)}`);
      });
      lineas.push('', t('lf.wa_total', { total: dinero(total()) }), t(pais === 'usa' ? 'lf.wa_envio_usa' : 'lf.wa_envio_col'), '');
      lineas.push(`${t('lf.wa_nombre')}: ${nombre} · ${t('lf.wa_ciudad')}: ${ciudad}`);
      const notas = f.elements.notas.value.trim();
      if (notas) lineas.push(`${t('lf.wa_notas')}: ${notas}`);
      const mensaje = lineas.join('\n');
      copiaAlCorreo({ tipo: 'lafarteda', destino: pais === 'col' ? 'cartagena' : 'miami', ref: numero, moneda: pais === 'col' ? 'COP' : 'USD', nombre, ciudad, mensaje });
      abrirWhatsApp(pais === 'col' ? 'lf_cartagena' : 'lf_miami', mensaje);
    });
    cajon.addEventListener('input', (e) => { if (e.target.name) e.target.closest('.campo')?.classList.remove('con-error'); });
    $('#abrir-carrito').addEventListener('click', () => { pintarCarrito(); cajon.showModal(); });

    alCambiarIdioma.push(pintarBarra, pintarProductos, pintarCarrito, () => { if (ficha.open) pintarFicha(); });
  }

  /* ── WuandaCrafts: pedido uno a uno ── */
  function iniciarWuanda() {
    const form = $('#form-pedido');
    const tipos = new Set();
    let ocasion = null;
    let foto = null; // URL local de la vista previa; nunca se sube

    function pintarTipos() {
      $('#lista-tipos').innerHTML = D.tipos.map((x) => `
        <div class="tipo"><div class="tipo-icono">${icono(x.icono)}</div><div>
          <h3>${esc(L(x.titulo))}</h3><p>${esc(L(x.texto))}</p>
          <button class="enlace-flecha" type="button" data-pedir="${x.id}">${t('wc.tipo_cta')} ${icono('i-flecha')}</button>
        </div></div>`).join('');
    }
    // Tendedero de fotos (recursos/tendedero.js): las piezas cuelgan de una cuerda que se arrastra, y las de
    // portada, de la cortina del héroe. «¿Quieres uno así?» va en la barra del tendedero con data-pieza.
    const tipoDe = (id) => D.tipos.find((x) => x.id === id);
    const fotoPieza = (p) => ({
      img: `${base}img/wuanda/${p.img}`, encuadre: p.encuadre, alt: L(p.titulo), titulo: L(p.titulo),
      nota: L(p.nota || tipoDe(p.tipo).titulo), texto: L(tipoDe(p.tipo).texto), enlace: p.instagram,
    });
    const textosTendedero = () => ({
      region: t('wc.piezas_ceja'), carrusel: t('tend.carrusel'), anterior: t('tend.anterior'), siguiente: t('tend.siguiente'),
      accion: t('wc.quiero'), anuncio: (n, total, titulo) => t('tend.anuncio', { n, total, titulo }),
      enlace: (titulo) => t('trab.ver_ig_de', { proyecto: titulo }),
    });
    const textosCortina = () => ({ ver: (titulo) => t('tend.ver', { titulo }) });
    const portada = D.piezas.filter((p) => p.portada);
    const tendedero = window.NFG_TENDEDERO.carrusel($('#tendedero-piezas'), { items: D.piezas.map(fotoPieza), textos: textosTendedero(), accion: 'pieza' });
    const cortina = window.NFG_TENDEDERO.cortina($('#cortina-heroe'), {
      items: portada.map(fotoPieza), cuerdas: 3, enlace: '#piezas', textos: textosCortina(),
      alElegir: (i) => { irA('piezas'); tendedero.ir(D.piezas.indexOf(portada[i])); },
    });
    function pintarPiezas() {
      tendedero.actualizar(D.piezas.map(fotoPieza), textosTendedero());
      cortina.actualizar(portada.map(fotoPieza), textosCortina());
    }
    function pintarChips() {
      $('#wc-tipos').innerHTML = D.tipos.map((x) => `<button class="chip" type="button" data-tipo="${x.id}" aria-pressed="${tipos.has(x.id)}">${icono(x.icono)}${esc(L(x.titulo))}</button>`).join('');
      $('#wc-ocasiones').innerHTML = D.ocasiones.map((x) => `<button class="chip" type="button" data-ocasion="${x.id}" aria-pressed="${ocasion === x.id}">${esc(L(x.titulo))}</button>`).join('');
    }
    function pintarRuta() {
      const donde = form.elements.donde.value;
      const ruta = $('#wc-ruta');
      ruta.hidden = !donde;
      if (donde) ruta.innerHTML = icono('i-whatsapp') + esc(t(donde === 'col' ? 'destino.wc_cartagena' : 'destino.wc_miami'));
    }
    const diasHasta = (valor) => (valor ? (new Date(valor + 'T12:00:00') - new Date()) / 864e5 : Infinity);
    function revisarFecha() {
      $('#wc-fecha-aviso').hidden = !(diasHasta(form.elements.fecha.value) < 5);
    }

    document.addEventListener('click', (e) => {
      const pedir = e.target.closest('[data-pedir]');
      const pieza = e.target.closest('[data-pieza]');
      if (pedir) tipos.add(pedir.dataset.pedir);
      if (pieza) {
        const p = D.piezas[Number(pieza.dataset.pieza)];
        tipos.add(p.tipo);
        if (!form.elements.idea.value.trim()) form.elements.idea.value = t('wc.parecido', { pieza: L(p.titulo) });
      }
      if (pedir || pieza) { pintarChips(); validarCampo(form, 'tipos', true); irA('pedido'); }
    });
    form.addEventListener('click', (e) => {
      const tb = e.target.closest('[data-tipo]');
      const ob = e.target.closest('[data-ocasion]');
      if (tb) { const id = tb.dataset.tipo; tipos.has(id) ? tipos.delete(id) : tipos.add(id); validarCampo(form, 'tipos', true); }
      if (ob) ocasion = ocasion === ob.dataset.ocasion ? null : ob.dataset.ocasion;
      if (tb || ob) pintarChips();
      if (e.target.closest('#quitar-foto')) quitarFoto();
    });
    form.addEventListener('change', (e) => {
      if (e.target.name === 'donde') pintarRuta();
      if (e.target.name === 'fecha') revisarFecha();
      if (e.target.name === 'foto') {
        const archivo = e.target.files && e.target.files[0];
        if (!archivo) return;
        if (foto) URL.revokeObjectURL(foto);
        foto = URL.createObjectURL(archivo);
        $('#foto-vista').src = foto;
        $('#foto-vista').hidden = false;
        $('#quitar-foto').hidden = false;
      }
    });
    function quitarFoto() {
      if (foto) URL.revokeObjectURL(foto);
      foto = null;
      form.elements.foto.value = '';
      $('#foto-vista').hidden = true;
      $('#quitar-foto').hidden = true;
    }
    limpiarErrorAlEscribir(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (n) => form.elements[n].value.trim();
      const oks = [
        validarCampo(form, 'tipos', tipos.size > 0),
        validarCampo(form, 'idea', v('idea') !== ''),
        validarCampo(form, 'donde', v('donde') !== ''),
        validarCampo(form, 'nombre', v('nombre') !== ''),
        validarCampo(form, 'telefono', v('telefono').replace(/\D/g, '').length >= 7),
      ];
      if (oks.includes(false)) { $('.con-error, [data-error]:not([hidden])', form)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      const lineas = [t('wc.wa_hola'), '', `• ${t('wc.wa_que')}: ${D.tipos.filter((x) => tipos.has(x.id)).map((x) => L(x.titulo)).join(', ')}`];
      if (ocasion) lineas.push(`• ${t('wc.wa_ocasion')}: ${L(D.ocasiones.find((x) => x.id === ocasion).titulo)}`);
      lineas.push(`• ${t('wc.wa_cantidad')}: ${Math.max(1, Number(v('cantidad')) || 1)}`);
      if (v('fecha')) lineas.push(`• ${t('wc.wa_fecha')}: ${new Date(v('fecha') + 'T12:00:00').toLocaleDateString(idioma === 'es' ? 'es-CO' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`);
      lineas.push(`• ${t('wc.wa_idea')}: ${v('idea')}`);
      if (foto) lineas.push(`• ${t('wc.wa_foto')}`);
      lineas.push('', `${t('wc.wa_contacto')}: ${v('nombre')} · ${v('telefono')}`);
      const mensaje = lineas.join('\n');
      copiaAlCorreo({ tipo: 'wuandacrafts', destino: v('donde') === 'col' ? 'cartagena' : 'miami', rush: diasHasta(v('fecha')) < 5 ? '1' : '', nombre: v('nombre'), telefono: v('telefono'), mensaje });
      abrirWhatsApp(v('donde') === 'col' ? 'wc_cartagena' : 'wc_miami', mensaje);
    });
    const hoy = new Date();
    form.elements.fecha.min = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

    alCambiarIdioma.push(pintarTipos, pintarPiezas, pintarChips, pintarRuta);
  }

  montarEstructura();
  activarEstructura();
  if (pagina === 'agencia') iniciarAgencia();
  if (pagina === 'merch') iniciarMerch();
  if (pagina === 'wuanda') iniciarWuanda();
  aplicarIdioma(idioma);
})();
