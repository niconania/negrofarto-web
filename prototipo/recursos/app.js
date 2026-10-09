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
    const cta = pagina === 'wuanda'
      ? '<a class="boton boton--acento boton--chico boton--cotizar" href="#pedido" data-t="wc.cta"></a>'
      : `<a class="boton boton--acento boton--chico boton--cotizar" href="${ancla('cotizar')}" data-t="nav.cotizar"></a>`;
    const puertas = [
      { id: 'agencia', href: inicio, img: 'img/marcas/nfg-negro.png', nombre: 'Negrofarto Group', clave: 'puerta.nfg', ruta: 'negrofarto.com', clase: 'nfg' },
      { id: 'merch', href: base + 'merch/index.html', img: 'img/marcas/lafarteda-oscuro.png', nombre: 'La Fartedá', clave: 'puerta.lf', ruta: '/merch', clase: 'lf' },
      { id: 'wuanda', href: base + 'wuandacrafts/index.html', img: 'img/marcas/wuandacrafts-avatar.png', nombre: 'WuandaCrafts', clave: 'puerta.wc', ruta: '/wuandacrafts', clase: 'wc' },
    ];

    document.body.insertAdjacentHTML('afterbegin', window.NFG_ICONOS
      + '<div class="aviso" data-t="aviso"></div>'
      + '<header class="cabecera"><div class="caja">'
      +   `<a class="logo" href="${inicio}" aria-label="Negrofarto Group"><img src="${base}img/marcas/marca-negro.png" alt="negrofarto group." width="101" height="34" /></a>`
      +   '<nav class="menu" id="menu">'
      +     `<a href="${ancla('servicios')}" data-t="nav.servicios"></a>`
      +     `<a href="${ancla('trabajos')}" data-t="nav.trabajos"></a>`
      +     `<a href="${ancla('nosotros')}" data-t="nav.nosotros"></a>`
      +     '<a href="#contacto" data-t="nav.contacto"></a>'
      +   '</nav>'
      +   selectorIdioma()
      +   (pagina === 'merch' ? `<button class="boton-carrito" type="button" id="abrir-carrito" data-t-aria="car.abrir">${icono('i-bolsa-compra')}<span class="contador" id="contador-carrito" hidden>0</span></button>` : '')
      +   cta
      +   `<button class="menu-movil" type="button" aria-controls="menu" aria-expanded="false" data-t-aria="nav.abrir">${icono('i-menu')}</button>`
      + '</div></header>'
      + '<nav class="puertas" aria-label="Negrofarto Group"><div class="caja">'
      + puertas.map((p) => `<a class="puerta puerta--${p.clase}" href="${p.href}"${p.id === pagina ? ' aria-current="page"' : ''}>`
          + `<img src="${base}${p.img}" alt="" /><span><strong>${p.nombre}</strong><small><span data-t="${p.clave}"></span> · ${p.ruta}</small></span></a>`).join('')
      + '</div></nav>');

    document.body.insertAdjacentHTML('beforeend',
      '<footer class="pie" id="contacto"><div class="caja"><div class="pie-grilla">'
      + `<div><a class="pie-logo" href="${inicio}"><img src="${base}img/marcas/marca-negro.png" alt="negrofarto group." width="119" height="40" /></a>`
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
      +   `<li><button class="enlace" type="button" data-whatsapp="${prefijoWa}cartagena">${icono('i-whatsapp')} WhatsApp Cartagena · <span data-t="pie.col"></span></button></li>`
      +   `<li><a href="mailto:hola@negrofarto.com">${icono('i-correo')} hola@negrofarto.com</a></li>`
      +   `<li><span class="pie-lugar">${icono('i-lugar')} Miami, FL · Cartagena</span></li>`
      + '</ul></div>'
      + '</div>'
      + `<div class="pie-legal"><span data-t="pie.legal"></span>${selectorIdioma()}</div>`
      + '</div></footer>'
      + `<button class="flotante" type="button" data-whatsapp="elegir" aria-label="WhatsApp">${icono('i-whatsapp')}</button>`
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

  /* ── WhatsApp de demostración ── */
  const botonCerrar = () => `<button class="modal-cerrar" type="button" data-cerrar aria-label="${esc(t('car.cerrar'))}">${icono('i-cerrar')}</button>`;
  function abrirWhatsApp(destino, mensaje) {
    const modal = $('#modal-whatsapp');
    if (destino === 'elegir') {
      modal.innerHTML = botonCerrar() + `<div class="modal-cuerpo"><h3>${t('wa.elegir')}</h3><p>${t('wa.elegir_texto')}</p><div class="elegir-wa">`
        + ['miami', 'cartagena'].map((c) => `<button class="contacto-boton wa" type="button" data-whatsapp="${prefijoWa}${c}">${icono('i-whatsapp')}<span><strong>WhatsApp</strong><small>${t('wa.' + c)}</small></span></button>`).join('')
        + '</div></div>';
    } else {
      const nombre = t('destino.' + destino);
      modal.innerHTML = botonCerrar() + `<div class="modal-cuerpo"><h3>${t('wa.titulo')}</h3>`
        + `<p>${esc(t('wa.texto', { destino: nombre }))}</p>`
        + `<div class="chat"><div class="chat-destino">${icono('i-whatsapp')} ${esc(nombre)}</div><div class="burbuja">${esc(mensaje)}</div></div>`
        + `<p class="modal-nota">${t('wa.nota')}</p>`
        + `<button class="boton boton--negro" type="button" data-cerrar>${t('wa.cerrar')}</button></div>`;
    }
    if (!modal.open) modal.showModal();
  }
  const saludo = () => t('wa.saludo' + ({ merch: '_lf', wuanda: '_wc' }[pagina] || ''));

  function activarEstructura() {
    document.addEventListener('click', (e) => {
      const bIdioma = e.target.closest('[data-idioma]');
      if (bIdioma) { aplicarIdioma(bIdioma.dataset.idioma); guardar('nfg-idioma', idioma); }
      const bWa = e.target.closest('[data-whatsapp]');
      if (bWa) abrirWhatsApp(bWa.dataset.whatsapp, saludo());
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
    const kit = { negocio: null, etapa: null };
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
    $('#lista-servicios').addEventListener('click', (e) => {
      const ver = e.target.closest('.servicio-ver');
      if (ver) {
        const id = ver.closest('.servicio').dataset.servicio;
        abiertos.has(id) ? abiertos.delete(id) : abiertos.add(id);
        pintarServicios();
      }
    });

    function pintarKit() {
      $('#kit-negocios').innerHTML = D.negocios.map((n) => `<button class="chip" type="button" data-negocio="${n.id}" aria-pressed="${kit.negocio === n.id}">${esc(L(n.titulo))}</button>`).join('');
      $('#kit-etapas').innerHTML = D.etapas.map((n) => `<button class="chip" type="button" data-etapa="${n.id}" aria-pressed="${kit.etapa === n.id}">${esc(L(n.titulo))}</button>`).join('');
      const caja = $('#kit-resultado');
      const items = itemsKit();
      if (!items) {
        caja.innerHTML = `<div class="kit-vacio"><div class="corchete"></div><p>${t('kit.vacio')}</p></div>`;
        return;
      }
      const negocio = D.negocios.find((n) => n.id === kit.negocio);
      const etapa = D.etapas.find((n) => n.id === kit.etapa);
      caja.innerHTML = `<p class="ceja">${t('kit.resultado')}</p>`
        + `<h3>${esc(L(negocio.titulo))}</h3><p class="kit-para">${esc(L(etapa.titulo))}</p>`
        + '<ol class="kit-items">' + items.map((it) => {
          const s = servicio(it.servicio);
          return `<li class="kit-item"><div class="servicio-icono">${icono(s.icono)}</div><div><strong>${esc(L(it.titulo))}</strong><span>${esc(L(it.porque))}</span><br /><small>${esc(L(s.titulo))}</small></div></li>`;
        }).join('') + '</ol>'
        + (etapa.nota ? `<p class="kit-nota">${esc(L(etapa.nota))}</p>` : '')
        + `<button class="boton boton--acento boton--ancho" type="button" id="pedir-kit">${t('kit.pedir')} ${icono('i-flecha')}</button>`;
    }
    function itemsKit() {
      if (!kit.negocio || !kit.etapa) return null;
      const negocio = D.negocios.find((n) => n.id === kit.negocio);
      const etapa = D.etapas.find((n) => n.id === kit.etapa);
      return (etapa.extra ? [etapa.extra] : []).concat(negocio.kit);
    }
    $('#kit').addEventListener('click', (e) => {
      const n = e.target.closest('[data-negocio]');
      const s = e.target.closest('[data-etapa]');
      if (n) kit.negocio = n.dataset.negocio;
      if (s) kit.etapa = s.dataset.etapa;
      if (n || s) {
        pintarKit();
        // En el celular el kit queda debajo de las opciones: se lleva a la vista.
        if (kit.negocio && kit.etapa && innerWidth < 900) $('#kit-resultado').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    function pintarTrabajos() {
      $('#filtros-trabajos').innerHTML = filtros.map((f) => `<button class="chip" type="button" data-filtro="${f}" aria-pressed="${filtro === f}">${t('trab.' + f)}</button>`).join('');
      $('#lista-trabajos').innerHTML = D.proyectos.map((p) => `
        <button class="trabajo" type="button" data-proyecto="${p.id}"${filtro !== 'todos' && p.categoria !== filtro ? ' hidden' : ''}>
          <img src="${base}img/proyectos/${p.img}" alt="${esc(L(p.titulo))}" loading="lazy" />
          <span class="trabajo-info"><strong>${esc(L(p.titulo))}</strong><span>${esc(L(p.sector))}${p.anio ? ' · ' + p.anio : ''}</span></span>
        </button>`).join('');
    }
    $('#trabajos').addEventListener('click', (e) => {
      const f = e.target.closest('[data-filtro]');
      if (f) { filtro = f.dataset.filtro; pintarTrabajos(); }
      const p = e.target.closest('[data-proyecto]');
      if (p) abrirProyecto(D.proyectos.find((x) => x.id === p.dataset.proyecto));
    });
    const visor = $('#modal-proyecto');
    function abrirProyecto(p) {
      const s = servicio(p.servicio);
      visor.innerHTML = botonCerrar() + '<div class="visor">'
        + `<div class="visor-img"><img src="${base}img/proyectos/${p.img}" alt="${esc(L(p.titulo))}" /></div>`
        + `<div class="modal-cuerpo"><p class="ceja">${esc(L(s.titulo))}</p><h3>${esc(L(p.titulo))}</h3>`
        + `<p><strong>${esc(L(p.sector))}</strong>${p.anio ? ' · ' + p.anio : ''}</p><p>${esc(L(p.texto))}</p>`
        + `<button class="boton boton--acento" type="button" data-similar="${p.id}">${t('trab.similar')}</button></div></div>`;
      visor.showModal();
    }
    visor.addEventListener('click', (e) => {
      const b = e.target.closest('[data-similar]');
      if (!b) return;
      const p = D.proyectos.find((x) => x.id === b.dataset.similar);
      seleccion.add(p.servicio);
      form.elements.mensaje.value = t('trab.mensaje', { proyecto: L(p.titulo) });
      pintarChipsCotizar();
      validarCampo(form, 'servicios', true);
      visor.close();
      irA('cotizar');
    });

    // Cotización
    function pintarChipsCotizar() {
      $('#cot-servicios').innerHTML = D.servicios.map((s) => `<button class="chip" type="button" data-servicio-cot="${s.id}" aria-pressed="${seleccion.has(s.id)}">${icono(s.icono)}${esc(L(s.titulo))}</button>`).join('');
    }
    function pintarRuta() {
      const donde = form.elements.donde.value;
      const ruta = $('#cot-ruta');
      ruta.hidden = !donde;
      if (donde) ruta.innerHTML = icono('i-whatsapp') + t(donde === 'cartagena' ? 'cot.ruta_cartagena' : 'cot.ruta_miami');
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
      abrirWhatsApp(v('donde') === 'cartagena' ? 'cartagena' : 'miami', lineas.join('\n'));
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
      const numero = 'LF-' + (1000 + Math.floor(Math.random() * 9000));
      const lineas = [t('lf.wa_hola'), t('lf.wa_pedido', { numero, pais: t(pais === 'usa' ? 'lf.usa_nombre' : 'lf.col_nombre') }), ''];
      carrito.forEach((l) => {
        const p = productos.find((x) => x.id === l.producto);
        lineas.push(`• ${l.cantidad} × ${p.diseno.nombre} — ${detalleLinea(l, p)} — ${dinero(precio(p) * l.cantidad)}`);
      });
      lineas.push('', t('lf.wa_total', { total: dinero(total()) }), t(pais === 'usa' ? 'lf.wa_envio_usa' : 'lf.wa_envio_col'), '');
      lineas.push(`${t('lf.wa_nombre')}: ${nombre} · ${t('lf.wa_ciudad')}: ${ciudad}`);
      const notas = f.elements.notas.value.trim();
      if (notas) lineas.push(`${t('lf.wa_notas')}: ${notas}`);
      abrirWhatsApp(pais === 'col' ? 'lf_cartagena' : 'lf_miami', lineas.join('\n'));
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
    function pintarPiezas() {
      $('#lista-piezas').innerHTML = D.piezas.map((p, i) => `
        <figure class="pieza"><img src="${base}img/wuanda/${p.img}" alt="${esc(L(p.titulo))}" loading="lazy" />
          <figcaption>${esc(L(p.titulo))}<button type="button" data-pieza="${i}">${t('wc.quiero')}</button></figcaption></figure>`).join('');
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
    function revisarFecha() {
      const valor = form.elements.fecha.value;
      const dias = valor ? (new Date(valor + 'T12:00:00') - new Date()) / 864e5 : Infinity;
      $('#wc-fecha-aviso').hidden = !(dias < 5);
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
      abrirWhatsApp(v('donde') === 'col' ? 'wc_cartagena' : 'wc_miami', lineas.join('\n'));
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
