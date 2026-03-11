// prisma/seed.ts
// Generado automáticamente desde datos reales — Colegio Granadino — Feb 2026
// 172 ítems · 102 funcionarios · 1020 movimientos históricos

import { PrismaClient, Role, RequisitionStatus, RequisitionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed — Colegio Granadino...')

  // ─── CATEGORÍAS ─────────────────────────────────────────────
  const categories: Record<string, string> = {}
  const cat_Arte_y_Decoracion = await prisma.category.upsert({
    where: { name: 'Arte y Decoración' }, update: {},
    create: { name: 'Arte y Decoración' },
  })
  categories['Arte y Decoración'] = cat_Arte_y_Decoracion.id
  const cat_Descartables_y_Limpieza = await prisma.category.upsert({
    where: { name: 'Descartables y Limpieza' }, update: {},
    create: { name: 'Descartables y Limpieza' },
  })
  categories['Descartables y Limpieza'] = cat_Descartables_y_Limpieza.id
  const cat_Dotacion = await prisma.category.upsert({
    where: { name: 'Dotación' }, update: {},
    create: { name: 'Dotación' },
  })
  categories['Dotación'] = cat_Dotacion.id
  const cat_Ferreteria_y_Electrico = await prisma.category.upsert({
    where: { name: 'Ferretería y Eléctrico' }, update: {},
    create: { name: 'Ferretería y Eléctrico' },
  })
  categories['Ferretería y Eléctrico'] = cat_Ferreteria_y_Electrico.id
  const cat_Implementos = await prisma.category.upsert({
    where: { name: 'Implementos' }, update: {},
    create: { name: 'Implementos' },
  })
  categories['Implementos'] = cat_Implementos.id
  const cat_Luminaria = await prisma.category.upsert({
    where: { name: 'Luminaria' }, update: {},
    create: { name: 'Luminaria' },
  })
  categories['Luminaria'] = cat_Luminaria.id
  const cat_Miscelaneos = await prisma.category.upsert({
    where: { name: 'Misceláneos' }, update: {},
    create: { name: 'Misceláneos' },
  })
  categories['Misceláneos'] = cat_Miscelaneos.id
  const cat_Papeleria_y_Útiles = await prisma.category.upsert({
    where: { name: 'Papelería y Útiles' }, update: {},
    create: { name: 'Papelería y Útiles' },
  })
  categories['Papelería y Útiles'] = cat_Papeleria_y_Útiles.id
  const cat_Salud_y_Bienestar = await prisma.category.upsert({
    where: { name: 'Salud y Bienestar' }, update: {},
    create: { name: 'Salud y Bienestar' },
  })
  categories['Salud y Bienestar'] = cat_Salud_y_Bienestar.id
  console.log('✅ 9 categorías creadas')

  // ─── ADMINISTRADOR ──────────────────────────────────────────
  const adminPwd = await bcrypt.hash('Admin2026!', 12)
  await prisma.user.upsert({
    where: { email: 'admin@colegiogranadino.edu.co' },
    update: {},
    create: {
      name: 'SERGIO FARFAN RICO',
      email: 'admin@colegiogranadino.edu.co',
      password: adminPwd, role: Role.ADMIN, section: 'Almacen',
      budgetTotal: 0, budgetUsed: 0,
    },
  })
  console.log('✅ Admin creado: admin@colegiogranadino.edu.co / Admin2026!')

  // ─── FUNCIONARIOS (102) ─────────────────────────────────────
  const userPwd = await bcrypt.hash('Granadino2026!', 12)
  const userMap: Record<string, string> = {}
  const usersData = [
    { name: 'ANGELA MARIA BENAVIDEZ BUITRAGO', email: 'angela.maria.benavidez.buitrago@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'MARIA CAMILA PIEDRAHITA LINARES', email: 'maria.camila.piedrahita.linares@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'VANEGAS RODRIGUEZ JAQUELINE', email: 'vanegas.rodriguez.jaqueline@colegiogranadino.edu.co', section: 'Administracion' },
    { name: 'ARANGO CARDONA CARLOS ALBERTO', email: 'arango.cardona.carlos.alberto@colegiogranadino.edu.co', section: 'Administracion' },
    { name: 'LORENA MENDIETA AGUDELO', email: 'lorena.mendieta.agudelo@colegiogranadino.edu.co', section: 'Contabilidad' },
    { name: 'ADRIANA MARIA ISAZA RAMIREZ', email: 'adriana.maria.isaza.ramirez@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'LILIANA MARIA GIRALDO CARDONA', email: 'liliana.maria.giraldo.cardona@colegiogranadino.edu.co', section: 'Biblioteca' },
    { name: 'LOPEZ ARIAS MANUELA', email: 'lopez.arias.manuela@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'LOPEZ PALACIO CESAR AUGUSTO', email: 'lopez.palacio.cesar.augusto@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'LÓPEZ RAMÍREZ ALEXANDRA IVONNE', email: 'lopez.ramirez.alexandra.ivonne@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'TORRES CUERVO ANA MARIA', email: 'torres.cuervo.ana.maria@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'VALDES OCAMPO MANUELA', email: 'valdes.ocampo.manuela@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'SANDRA LORENA VALENCIA RAMIREZ', email: 'sandra.lorena.valencia.ramirez@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'NATALI VELASQUEZ VELASCO', email: 'natali.velasquez.velasco@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'MYRIAM SERRANO BONITTO', email: 'myriam.serrano.bonitto@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'MARIA CRISTINA MARIN POSADA', email: 'maria.cristina.marin.posada@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'CAROLINA HERNANDEZ LONDOÑO', email: 'carolina.hernandez.londono@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'VILLADA GIL MARITZA VIVIANA', email: 'villada.gil.maritza.viviana@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'AGUDELO ARCILA JENNIFER', email: 'agudelo.arcila.jennifer@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'VELASQUEZ LONDOÑO DIEGO FERNANDO', email: 'velasquez.londono.diego.fernando@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'VELASQUEZ ZULUAGA BLANCALIBETH', email: 'velasquez.zuluaga.blancalibeth@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'MEJÍA FÁTIMA', email: 'mejia.fatima@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'MELISSA NICOLE HOLLIDAY OLGES', email: 'melissa.nicole.holliday.olges@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'WILSON  MACKENZIE RUTH', email: 'wilson.mackenzie.ruth@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'VALLENDER MARTIN MURPHY', email: 'vallender.martin.murphy@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'THOMAS EDWARD OLGES', email: 'thomas.edward.olges@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'SHIRDEL MOHAMMAD', email: 'shirdel.mohammad@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'SANTIAGO ARANGO TORO', email: 'santiago.arango.toro@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'PINILLA ROJAS SUSANA', email: 'pinilla.rojas.susana@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'CHIBANDA NDANATSEYI', email: 'chibanda.ndanatseyi@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'BRAND VASQUEZ MARIA ISABEL', email: 'brand.vasquez.maria.isabel@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'BUITRAGO LÓPEZ CARLOS ALBERTO', email: 'buitrago.lopez.carlos.alberto@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'CABEZAS VANEGAS TRACY DAHYANA', email: 'cabezas.vanegas.tracy.dahyana@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'SÁNCHEZ GONZÁLES BRYAN ESTEBAN', email: 'sanchez.gonzales.bryan.esteban@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'YUDI ANGELICA GALLEGO PARRA', email: 'yudi.angelica.gallego.parra@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'MARIA DE LOS ANGELES ZAPATA ECHEVERRY', email: 'maria.de.los.angeles.zapata.echeverry@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'MILANO MEJÍAS VICTOR MANUEL', email: 'milano.mejias.victor.manuel@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'MONTESINO RODRIGUEZ ANA MARÍA', email: 'montesino.rodriguez.ana.maria@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'OSORIO DUQUE GUILLERMO ANTONIO', email: 'osorio.duque.guillermo.antonio@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'NEVER BETANCUR SOTO', email: 'never.betancur.soto@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'NOREÑA AGUIRRE CAMILO', email: 'norena.aguirre.camilo@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'JUAN CARLOS DIAZ', email: 'juan.carlos.diaz@colegiogranadino.edu.co', section: 'Transporte' },
    { name: 'KATHERINE MILENA GIRALDO ZAMBRANO', email: 'katherine.milena.giraldo.zambrano@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'JUAN CAMILO GALEANO CARDONA', email: 'juan.camilo.galeano.cardona@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'JAMES KYLE MICHELE', email: 'james.kyle.michele@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'JANNA MARIE OZZELLO', email: 'janna.marie.ozzello@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'BEDOYA GIRALDO LUZ ADRIANA', email: 'bedoya.giraldo.luz.adriana@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'BECTON IV JULIUS WESLEY', email: 'becton.iv.julius.wesley@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'ARISTIZABAL MUÑOZ LILIANA', email: 'aristizabal.munoz.liliana@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'FALISKIE MELANIE', email: 'faliskie.melanie@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'FRANCO MELÉNDEZ DIANA BEATRIZ', email: 'franco.melendez.diana.beatriz@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'HANNAH KRAYESKI', email: 'hannah.krayeski@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'HARP ELIZABETH ANN', email: 'harp.elizabeth.ann@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'HEGSTETTER GRACE ELIZABETH', email: 'hegstetter.grace.elizabeth@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'GONZALEZ OROZCO PAULA LORENA', email: 'gonzalez.orozco.paula.lorena@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'DANIELA VASQUEZ RIOS', email: 'daniela.vasquez.rios@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'LUZ DIONE CASILIMAS SANCHEZ', email: 'luz.dione.casilimas.sanchez@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'LUISA FERNANDA QUINTERO CORREA', email: 'luisa.fernanda.quintero.correa@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'LUISA FERNANDA SANCHEZ VEGA', email: 'luisa.fernanda.sanchez.vega@colegiogranadino.edu.co', section: 'Primaria 1-5' },
    { name: 'LOPEZ RUEDA WILLIAM ADIER', email: 'lopez.rueda.william.adier@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'CRUZ RAMÍREZ HAROLD ANDRÉS', email: 'cruz.ramirez.harold.andres@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'GIRALDO OSORIO ALEJANDRA', email: 'giraldo.osorio.alejandra@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'GIRALDO OSORIO NATALIA', email: 'giraldo.osorio.natalia@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'ERIN ANN DODD', email: 'erin.ann.dodd@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'JARAMILLO GIRALDO ARCESIO', email: 'jaramillo.giraldo.arcesio@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'HOOVEN KYLE ROBERT', email: 'hooven.kyle.robert@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'JUAN PABLO RIOS RESTREPO', email: 'juan.pablo.rios.restrepo@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'JILLIAN ELIZABETH HOLMES', email: 'jillian.elizabeth.holmes@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'ADRIANA CLEMENCIA CRUZ QUINTERO', email: 'adriana.clemencia.cruz.quintero@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'ANDRES FELIPE GONZALEZ ALVAREZ', email: 'andres.felipe.gonzalez.alvarez@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'AVILA AGUDELO MANUELA', email: 'avila.agudelo.manuela@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'BECERRA VALENCIA JUAN MANUEL', email: 'becerra.valencia.juan.manuel@colegiogranadino.edu.co', section: 'Secundaria' },
    { name: 'PINILLA ROJAS MANUEL ALEJANDRO', email: 'pinilla.rojas.manuel.alejandro@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'SANDRA LUNA FORERO', email: 'sandra.luna.forero@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'SEPULVEDA LOPEZ JESICA PAOLA', email: 'sepulveda.lopez.jesica.paola@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'OCAMPO GOMEZ VALERIA', email: 'ocampo.gomez.valeria@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'PAOLA OCAMPO AGUDELO', email: 'paola.ocampo.agudelo@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'PAULA ANDREA TREJOS YEPES', email: 'paula.andrea.trejos.yepes@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'RODRIGUEZ HENRIQUEZ MARGARITA MARIA', email: 'rodriguez.henriquez.margarita.maria@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'ROWENA RIESS EMILY', email: 'rowena.riess.emily@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'CLAUDIA PATRICIA BALLESTEROS VEGA', email: 'claudia.patricia.ballesteros.vega@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'VIVIANA JARAMILLO MEJIA', email: 'viviana.jaramillo.mejia@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'MARIA VERONICA LOPEZ ZAPATA', email: 'maria.veronica.lopez.zapata@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'MARIA YALIDE GALLEGO GUTIERREZ', email: 'maria.yalide.gallego.gutierrez@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'LAUREN RENEE HEGARTY', email: 'lauren.renee.hegarty@colegiogranadino.edu.co', section: 'Teaching & Learning' },
    { name: 'STEFFENS SAMPAYO CATHERINE', email: 'steffens.sampayo.catherine@colegiogranadino.edu.co', section: 'Comunicaciones' },
    { name: 'TRUJILLO GOMEZ GUSTAVO ADOLFO', email: 'trujillo.gomez.gustavo.adolfo@colegiogranadino.edu.co', section: 'Deportes' },
    { name: 'NANCY ESTELLA GARCES OSPINA', email: 'nancy.estella.garces.ospina@colegiogranadino.edu.co', section: 'Deportes' },
    { name: 'OSCAR JULIAN CASTAÑO GIRALDO', email: 'oscar.julian.castano.giraldo@colegiogranadino.edu.co', section: 'Deportes' },
    { name: 'JHON WALTER GOMEZ MENDOZA', email: 'jhon.walter.gomez.mendoza@colegiogranadino.edu.co', section: 'Deportes' },
    { name: 'EDWARD ANDRES COTRINO TRIANA', email: 'edward.andres.cotrino.triana@colegiogranadino.edu.co', section: 'Deportes' },
    { name: 'GRANADA ARIAS GERMAN STIVEN', email: 'granada.arias.german.stiven@colegiogranadino.edu.co', section: 'Deportes' },
    { name: 'GARCIA MONTES SANDRA LUCIA', email: 'garcia.montes.sandra.lucia@colegiogranadino.edu.co', section: 'Gestión del Talento Humano' },
    { name: 'JULIANA RAMIREZ RESTREPO', email: 'juliana.ramirez.restrepo@colegiogranadino.edu.co', section: 'Gestión del Talento Humano' },
    { name: 'ARISTIZABAL LOPEZ FRANCY MILENA', email: 'aristizabal.lopez.francy.milena@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'AURA GISELLA FLOREZ MARIN', email: 'aura.gisella.florez.marin@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'ALBA CECILIA PETREL HINCAPIE', email: 'alba.cecilia.petrel.hincapie@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'ANDREINA PADRON MORENO', email: 'andreina.padron.moreno@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'JAKSOHARA MAGON HENAO', email: 'jaksohara.magon.henao@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'HERRERA GIRALDO SARA', email: 'herrera.giraldo.sara@colegiogranadino.edu.co', section: 'Preescolar' },
    { name: 'VALENTINA GARCIA MONTOYA', email: 'valentina.garcia.montoya@colegiogranadino.edu.co', section: 'Preescolar' },
  ] as const

  for (const u of usersData) {
    const created = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name, email: u.email, password: userPwd,
        role: Role.USER, section: u.section,
        budgetTotal: 5000000, budgetUsed: 0,
      },
    })
    userMap[u.name] = created.id
  }
  console.log(`✅ ${usersData.length} funcionarios creados (contraseña: Granadino2026!)`)

  // ─── INVENTARIO (172 ítems reales) ──────────────────────────
  const itemMap: Record<string, string> = {}
  const itemsData = [
    { code: 'AL-AD2005', name: 'BANDERAS', unit: 'UND', stock: 6, price: 1059.93, cat: 'Arte y Decoración', minStock: 3 },
    { code: 'AL-AD2058', name: 'LANA', unit: 'UND', stock: 5, price: 5120.0, cat: 'Arte y Decoración', minStock: 3 },
    { code: 'AL-AD2149', name: 'OJOS MEDIANOS', unit: 'UND', stock: 1, price: 4201.6, cat: 'Arte y Decoración', minStock: 3 },
    { code: 'AL-DL6003', name: 'AMBIENTADOR', unit: 'UND', stock: 2, price: 28655.46, cat: 'Descartables y Limpieza', minStock: 3 },
    { code: 'AL-DL6029', name: 'BOMBAS R12', unit: 'PAQ', stock: 4, price: 10500.0, cat: 'Descartables y Limpieza', minStock: 3 },
    { code: 'AL-DL6044', name: 'COPA DESECHABLE', unit: 'PAQ', stock: 1, price: 4033.61, cat: 'Descartables y Limpieza', minStock: 3 },
    { code: 'AL-DL6127', name: 'PALOS DE HELADO', unit: 'PAQ', stock: 16, price: 819.33, cat: 'Descartables y Limpieza', minStock: 3 },
    { code: 'AL-DL6194', name: 'VELAS', unit: 'PAQ', stock: 1, price: 8403.36, cat: 'Descartables y Limpieza', minStock: 3 },
    { code: 'AL-DL6220', name: 'BOMBAS R9', unit: 'PAQ', stock: 6, price: 5800.0, cat: 'Descartables y Limpieza', minStock: 3 },
    { code: 'AL-DT0003', name: 'BOTAS MEDIA CAÑA', unit: 'UND', stock: 3, price: 65300.0, cat: 'Dotación', minStock: 3 },
    { code: 'AL-FR3091', name: 'CAJA HERRAMIENTA TECNOLOGIA', unit: 'UND', stock: 3, price: 89148.35, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3104', name: 'CANDELAS', unit: 'UND', stock: 2, price: 504.2, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3125', name: 'CINTA AISLANTE', unit: 'UND', stock: 24, price: 7478.99, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3142', name: 'COLBON 1/2 BOTELLA', unit: 'UND', stock: 15, price: 5882.35, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3147', name: 'CORREA O BANDAS B 59', unit: 'UND', stock: 2, price: 12395.0, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3153', name: 'COSEDORA OFICINA SEMINDUSTRIAL', unit: 'UND', stock: 1, price: 91070.0, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3310', name: 'NYLON', unit: 'ROLLO', stock: 2, price: 7521.0, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3338', name: 'PILA DOBLE AA', unit: 'PAR', stock: 16, price: 3700.0, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3342', name: 'PILA TRIPLE A PAR', unit: 'PAR', stock: 25, price: 3700.0, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3457', name: 'ACCESORIOS VARIOS', unit: 'UND', stock: 1, price: 316098.32, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-FR3603', name: 'PROTECTOR TOMA', unit: 'UND', stock: 16, price: 250.21, cat: 'Ferretería y Eléctrico', minStock: 3 },
    { code: 'AL-IM7032', name: 'PAJUELAS', unit: 'UND', stock: 4, price: 2000.0, cat: 'Implementos', minStock: 3 },
    { code: 'AL-LS8027', name: 'BOMBILLO 30W LED', unit: 'UND', stock: 3, price: 20840.34, cat: 'Luminaria', minStock: 3 },
    { code: 'AL-MC9036', name: 'HULE', unit: 'UND', stock: 1, price: 4201.68, cat: 'Misceláneos', minStock: 3 },
    { code: 'AL-PP1015', name: 'ALMOHADILLA TABLERO', unit: 'UND', stock: 10, price: 2714.25, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1051', name: 'BISTURI', unit: 'UND', stock: 6, price: 1800.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1066', name: 'BOLSILLO LAMINACION OFICIO', unit: 'UND', stock: 396, price: 516.39, cat: 'Papelería y Útiles', minStock: 59 },
    { code: 'AL-PP1074', name: 'BORRADOR NATA', unit: 'UND', stock: 24, price: 601.52, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1077', name: 'BOTONES DE ORO', unit: 'UND', stock: 4, price: 37500.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1078', name: 'BOTONES DE PLATA', unit: 'UND', stock: 1, price: 37500.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1080', name: 'CAJA ARCHIVO INACTIVO', unit: 'UND', stock: 10, price: 6187.78, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1082', name: 'CAJA CARTON CPU', unit: 'UND', stock: 5, price: 6500.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1084', name: 'CAJA DE COLORES', unit: 'CAJ', stock: 3, price: 8245.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1086', name: 'BOLIGRAFO SEMIGEL 0.7', unit: 'UND', stock: 9, price: 899.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1090', name: 'CARPETA CON GANCHO', unit: 'UND', stock: 1, price: 1831.64, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1091', name: 'CARPETA PERMANENT STUDENT', unit: 'UND', stock: 7, price: 3037.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1101', name: 'CARTON PAJA EN OCTAVOS', unit: 'UND', stock: 358, price: 421.65, cat: 'Papelería y Útiles', minStock: 53 },
    { code: 'AL-PP1102', name: 'CARTON PAJA HABANO', unit: 'UND', stock: 12, price: 3357.5, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1106', name: 'CARTULINA ACUARELA  240GR 1/8', unit: 'UND', stock: 50, price: 1200.0, cat: 'Papelería y Útiles', minStock: 7 },
    { code: 'AL-PP1107', name: 'CARTULINA PLIEGO (AMARILLA,AZUL,VERDE)', unit: 'UND', stock: 20, price: 793.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1111', name: 'CARTULINA BLANCA PLIEGO', unit: 'UND', stock: 7, price: 672.4, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1113', name: 'CARTULINA NEGRA PLIEGO', unit: 'UND', stock: 20, price: 1227.85, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1114', name: 'CARTULINA OPALINA OFICIO', unit: 'UND', stock: 242, price: 248.74, cat: 'Papelería y Útiles', minStock: 36 },
    { code: 'AL-PP1115', name: 'CARTULINA OPALINA CARTA', unit: 'UND', stock: 1521, price: 170.02, cat: 'Papelería y Útiles', minStock: 228 },
    { code: 'AL-PP1116', name: 'CARTULINA PLANA EN OCTAVOS', unit: 'UND', stock: 12, price: 175.82, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1117', name: 'CARTULINA PLANA MEDIO PLIEGO', unit: 'UND', stock: 64, price: 714.0, cat: 'Papelería y Útiles', minStock: 9 },
    { code: 'AL-PP1120', name: 'CELOFAN COLORES SURTIDOS', unit: 'UND', stock: 29, price: 700.0, cat: 'Papelería y Útiles', minStock: 4 },
    { code: 'AL-PP1124', name: 'CINTA / MAQUINA E. MANUAL', unit: 'UND', stock: 4, price: 7200.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1126', name: 'CINTA ENMASCARAR ANGOSTA', unit: 'UND', stock: 22, price: 5640.34, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1127', name: 'CINTA ENMASCARAR ANCHA', unit: 'UND', stock: 10, price: 10775.63, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1129', name: 'CINTA EPSON FX 2190', unit: 'UND', stock: 2, price: 46551.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1132', name: 'CINTA OFINORMA', unit: 'UND', stock: 4, price: 4000.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1133', name: 'CINTA TRANSPARENTE ANCHA 100 MT', unit: 'UND', stock: 24, price: 4205.3, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1134', name: 'CINTA TRANSPARENTE ANGOSTA', unit: 'UND', stock: 8, price: 678.5, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1136', name: 'CLIP GRANDE', unit: 'CAJ', stock: 3, price: 1891.26, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1137', name: 'CLIP MEDIANO', unit: 'CAJ', stock: 5, price: 2250.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1138', name: 'CLIP STANDARD', unit: 'CAJ', stock: 14, price: 714.3, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1148', name: 'LAPIZ CORRECTOR', unit: 'UND', stock: 2, price: 2046.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1149', name: 'CINTA CORRECTORA', unit: 'UND', stock: 3, price: 1750.2, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1151', name: 'COSEDORA OFICINA', unit: 'UND', stock: 2, price: 11966.77, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1152', name: 'PAPEL CRAFT', unit: 'MTS', stock: 37, price: 321.42, cat: 'Papelería y Útiles', minStock: 5 },
    { code: 'AL-PP1154', name: 'CRAYOLA GRANDE', unit: 'UND', stock: 10, price: 616.07, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1155', name: 'CRAYOLA TRIANGULAR', unit: 'CAJ', stock: 5, price: 8999.8, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1158', name: 'CUADERNO ARGOLLADO GRANDE', unit: 'UND', stock: 7, price: 4802.55, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1163', name: 'CUADERNO ARGOLLADO PEQUEÑO', unit: 'UND', stock: 2, price: 3357.5, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1164', name: 'CUCHILLA GRANDE PARA BISTURI', unit: 'PAQ', stock: 20, price: 110.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1182', name: 'ESCARCHA EN TUBO COLORES VARIOS', unit: 'UND', stock: 21, price: 200.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1193', name: 'FICHA BIBLIOGRAFICA', unit: 'PAQ', stock: 7, price: 642.6, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1198', name: 'FOLDER LEGAJADOR COLGANTE', unit: 'UND', stock: 89, price: 1063.29, cat: 'Papelería y Útiles', minStock: 13 },
    { code: 'AL-PP1199', name: 'FOLDER LEGAJADOR OFICIO', unit: 'UND', stock: 199, price: 417.72, cat: 'Papelería y Útiles', minStock: 29 },
    { code: 'AL-PP1220', name: 'GANCHO COSEDORA SEMI-INDUSTRIA', unit: 'CAJ', stock: 3, price: 2436.97, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1224', name: 'GANCHO LEGAJADOR PLASTICO', unit: 'PAQ', stock: 9, price: 2367.09, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1225', name: 'GANCHO LOTERO 1.5/8"', unit: 'UND', stock: 5, price: 387.33, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1226', name: 'GANCHO LOTERO 1"', unit: 'UND', stock: 36, price: 166.27, cat: 'Papelería y Útiles', minStock: 5 },
    { code: 'AL-PP1227', name: 'GANCHO LOTERO 2"', unit: 'UND', stock: 36, price: 622.03, cat: 'Papelería y Útiles', minStock: 5 },
    { code: 'AL-PP1231', name: 'GANCHO COSEDORA', unit: 'CAJ', stock: 11, price: 2525.32, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1240', name: 'HOJA STICKER COMPLETA', unit: 'UND', stock: 3, price: 246.83, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1243', name: 'HOJAS PARA BINDER', unit: 'PAQ', stock: 9, price: 3361.34, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1245', name: 'HUELLERO', unit: 'UND', stock: 2, price: 5379.73, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1265', name: 'LAPICERO', unit: 'UND', stock: 56, price: 459.57, cat: 'Papelería y Útiles', minStock: 8 },
    { code: 'AL-PP1270', name: 'LAPIZ', unit: 'UND', stock: 126, price: 576.8, cat: 'Papelería y Útiles', minStock: 18 },
    { code: 'AL-PP1272', name: 'LAPIZ ROJO', unit: 'UND', stock: 12, price: 989.87, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1273', name: 'LAPIZ TRIANGULAR', unit: 'UND', stock: 52, price: 1485.0, cat: 'Papelería y Útiles', minStock: 7 },
    { code: 'AL-PP1295', name: 'MARCADOR BORRABLE', unit: 'UND', stock: 36, price: 1964.36, cat: 'Papelería y Útiles', minStock: 5 },
    { code: 'AL-PP1299', name: 'MARCADOR PERMANENTE SURTIDO', unit: 'UND', stock: 23, price: 1642.83, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1300', name: 'MARCADOR RECARGABLE', unit: 'UND', stock: 5, price: 4785.8, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1301', name: 'MARCADOR SHARPIE', unit: 'UND', stock: 79, price: 1975.18, cat: 'Papelería y Útiles', minStock: 11 },
    { code: 'AL-PP1312', name: 'MEDALLAS PARA BIRRETE', unit: 'UND', stock: 14, price: 9520.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1314', name: 'MEMORIA USB', unit: 'UND', stock: 3, price: 33529.41, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1315', name: 'MICROPUNTA', unit: 'UND', stock: 43, price: 1535.95, cat: 'Papelería y Útiles', minStock: 6 },
    { code: 'AL-PP1316', name: 'MINAS 0.5 Y 0.7 PARA PORTAMINAS', unit: 'UND', stock: 29, price: 1161.26, cat: 'Papelería y Útiles', minStock: 4 },
    { code: 'AL-PP1325', name: 'PAPEL MEMBRETEADO COLEGIO', unit: 'HOJA', stock: 1500, price: 145.0, cat: 'Papelería y Útiles', minStock: 225 },
    { code: 'AL-PP1332', name: 'PAPEL CARTA BOND RESMA', unit: 'HOJA', stock: 91, price: 12400.16, cat: 'Papelería y Útiles', minStock: 13 },
    { code: 'AL-PP1333', name: 'PAPEL DOBLE CARTA BOND RESMA', unit: 'HOJA', stock: 505, price: 60.83, cat: 'Papelería y Útiles', minStock: 75 },
    { code: 'AL-PP1335', name: 'PAPEL OFICIO BOND RESMA', unit: 'HOJA', stock: 6, price: 15151.86, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1338', name: 'PAPEL CARTA ECOLOGICO EARTH PACT', unit: 'UND', stock: 8, price: 12500.4, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1339', name: 'PAPEL FOTOGRAFICO CARTA', unit: 'HOJA', stock: 43, price: 239.28, cat: 'Papelería y Útiles', minStock: 6 },
    { code: 'AL-PP1350', name: 'PAPEL PROPALCOTE 240 GR', unit: 'UND', stock: 390, price: 34.82, cat: 'Papelería y Útiles', minStock: 58 },
    { code: 'AL-PP1354', name: 'PASTA DE ARGOLLA 0.5', unit: 'UND', stock: 1, price: 5318.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1355', name: 'PASTA DE ARGOLLA 1"', unit: 'UND', stock: 4, price: 6392.75, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1356', name: 'PASTA DE ARGOLLA 1.5', unit: 'UND', stock: 3, price: 8428.5, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1360', name: 'PASTA DE ARGOLLA 0.5"', unit: 'UND', stock: 3, price: 5318.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1362', name: 'PEGASTIC', unit: 'UND', stock: 7, price: 7214.29, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1367', name: 'PERFORADORA 2 HUECOS', unit: 'UND', stock: 4, price: 7563.83, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1368', name: 'PERFORADORA 1 HUECO', unit: 'UND', stock: 2, price: 2286.98, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1372', name: 'PAPEL PERIODICO PLIEGO', unit: 'UND', stock: 26, price: 212.5, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1376', name: 'PINCELES #3', unit: 'UND', stock: 5, price: 500.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1382', name: 'PINCELES DELINEADORES', unit: 'UND', stock: 30, price: 464.13, cat: 'Papelería y Útiles', minStock: 4 },
    { code: 'AL-PP1392', name: 'PLASTILINA CAJA VARIADAS', unit: 'CAJ', stock: 3, price: 5285.71, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1393', name: 'PLASTILINA EN PANES', unit: 'UND', stock: 6, price: 2464.22, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1402', name: 'PLUMONES FABER CASTELL', unit: 'PAQ', stock: 4, price: 8500.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1403', name: 'PLUMONES PELIKAN', unit: 'PAQ', stock: 6, price: 6710.11, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1409', name: 'PORTAMINAS 2MM', unit: 'UND', stock: 8, price: 1095.62, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1412', name: 'POST-IT COLORES', unit: 'UND', stock: 14, price: 1436.01, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1419', name: 'PROTECTOR VINILO CRISTAL', unit: 'UND', stock: 118, price: 74.68, cat: 'Papelería y Útiles', minStock: 17 },
    { code: 'AL-PP1424', name: 'REFUERZOS PASTA DE ARGOLLA', unit: 'UND', stock: 4, price: 988.37, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1426', name: 'REGLA ESCOLAR', unit: 'UND', stock: 9, price: 2835.43, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1429', name: 'MINAS 2 MM', unit: 'UND', stock: 2, price: 521.22, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1431', name: 'RESALTADOR', unit: 'UND', stock: 11, price: 1178.55, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1433', name: 'ROLLO DE PLOTER BOND', unit: 'UND', stock: 1, price: 62357.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1434', name: 'ROLLO DE SUMADORA', unit: 'UND', stock: 60, price: 3893.0, cat: 'Papelería y Útiles', minStock: 9 },
    { code: 'AL-PP1437', name: 'ROLLOS ROTULADORA', unit: 'UND', stock: 4, price: 31309.52, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1439', name: 'SACAGANCHO OFICINA', unit: 'UND', stock: 3, price: 1393.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1440', name: 'SACAPUNTAS DOBLE SERVICIO', unit: 'UND', stock: 10, price: 1132.97, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1441', name: 'SACAPUNTAS UN SERVICIO', unit: 'UND', stock: 22, price: 2071.44, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1442', name: 'SEDA COLORES SURTIDOS', unit: 'UND', stock: 49, price: 142.8, cat: 'Papelería y Útiles', minStock: 7 },
    { code: 'AL-PP1444', name: 'SEPARADORES PASTA DE ARGOLLA', unit: 'PAQ', stock: 5, price: 1056.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1445', name: 'SEPARADORES PLASTICOS', unit: 'PAQ', stock: 16, price: 1607.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1447', name: 'SILICONA BARRA DELGADA', unit: 'UND', stock: 41, price: 200.39, cat: 'Papelería y Útiles', minStock: 6 },
    { code: 'AL-PP1449', name: 'SILICONA LIQUIDA', unit: 'UND', stock: 19, price: 3321.41, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1452', name: 'SOBRE LORD SENCILLO', unit: 'UND', stock: 24, price: 107.14, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1453', name: 'SOBRE MANILA MEDIA CARTA 17.5 X 24', unit: 'UND', stock: 60, price: 77.61, cat: 'Papelería y Útiles', minStock: 9 },
    { code: 'AL-PP1454', name: 'SOBRE MANILA CARTA', unit: 'UND', stock: 132, price: 112.0, cat: 'Papelería y Útiles', minStock: 19 },
    { code: 'AL-PP1456', name: 'SOBRE MANILA OFICIO', unit: 'UND', stock: 72, price: 156.23, cat: 'Papelería y Útiles', minStock: 10 },
    { code: 'AL-PP1457', name: 'SOBRE MEMBRETEADO COLEGIO', unit: 'UND', stock: 73, price: 1071.0, cat: 'Papelería y Útiles', minStock: 10 },
    { code: 'AL-PP1458', name: 'SOBRE MANILA PAGO', unit: 'UND', stock: 12, price: 71.15, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1462', name: 'SOBRES MEDIA CARTA JARDIN', unit: 'UND', stock: 118, price: 852.24, cat: 'Papelería y Útiles', minStock: 17 },
    { code: 'AL-PP1463', name: 'SOBRES OFICIO JARDIN', unit: 'UND', stock: 172, price: 380.01, cat: 'Papelería y Útiles', minStock: 25 },
    { code: 'AL-PP1470', name: 'STICKERS', unit: 'UND', stock: 2, price: 3361.34, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1473', name: 'TABLA CON GANCHO', unit: 'UND', stock: 1, price: 4143.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1489', name: 'TIJERAS PARA ESCRITORIO', unit: 'UND', stock: 12, price: 2700.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1490', name: 'TIJERAS PUNTA ROMA', unit: 'UND', stock: 7, price: 606.32, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1514', name: 'TONOS ( PAPEL )', unit: 'HOJA', stock: 749, price: 164.56, cat: 'Papelería y Útiles', minStock: 112 },
    { code: 'AL-PP1522', name: 'VINILO COLORES SURTIDOS 150 GR', unit: 'UND', stock: 100, price: 2100.44, cat: 'Papelería y Útiles', minStock: 15 },
    { code: 'AL-PP1523', name: 'VINILOS NEON 150 GR', unit: 'UND', stock: 65, price: 3135.0, cat: 'Papelería y Útiles', minStock: 9 },
    { code: 'AL-PP1525', name: 'VISOR PARA FOLDER COLGANTE', unit: 'PAQ', stock: 2, price: 870.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1535', name: 'CARPETA CON BISEL', unit: 'UND', stock: 9, price: 2821.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1551', name: 'PLIEGO PAPEL BOND', unit: 'UND', stock: 30, price: 357.1, cat: 'Papelería y Útiles', minStock: 4 },
    { code: 'AL-PP1560', name: 'AVISOS CARROS NARANJA', unit: 'UND', stock: 4, price: 3200.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1562', name: 'AVISOS CARROS VINOTINTO', unit: 'UND', stock: 120, price: 5002.69, cat: 'Papelería y Útiles', minStock: 18 },
    { code: 'AL-PP1603', name: 'PINCELES #9', unit: 'UND', stock: 24, price: 933.33, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1627', name: 'LANA ESCOLAR (15 GR)', unit: 'UND', stock: 28, price: 425.0, cat: 'Papelería y Útiles', minStock: 4 },
    { code: 'AL-PP1643', name: 'PAPEL MEDIA CARTA BOND RESMA', unit: 'HOJA', stock: 4500, price: 15.0, cat: 'Papelería y Útiles', minStock: 675 },
    { code: 'AL-PP1654', name: 'TIJERAS PARA ZURDOS', unit: 'UND', stock: 12, price: 3721.51, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1677', name: 'CABALLETE DE MESA', unit: 'HOJA', stock: 1, price: 235294.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1683', name: 'PAQUETE BANDAS DE CAUCHO', unit: 'HOJA', stock: 2, price: 1401.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1684', name: 'TABLERO ACRILICO 1.20X80', unit: 'HOJA', stock: 3, price: 113643.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1701', name: 'COLORES JUMBO (KORES)', unit: 'UND', stock: 9, price: 13047.5, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1708', name: 'PORTAMINAS 0.7 FABER CASTELL', unit: 'UND', stock: 10, price: 4392.83, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1720', name: 'TINTA MARCADOR 30 ML', unit: 'UND', stock: 10, price: 16392.85, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1743', name: 'MATERIAL DIDACTICO CRT BOOK ORDER', unit: 'UND', stock: 20, price: 91146.05, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1744', name: 'CHINCHES PLANOS', unit: 'CAJ', stock: 3, price: 1144.0, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1747', name: 'CONTACT TRANSPARENTE ECONOMICO', unit: 'MTS', stock: 58, price: 2300.0, cat: 'Papelería y Útiles', minStock: 8 },
    { code: 'AL-PP1748', name: 'PORTAMINAS 0.7 ECONOMICO', unit: 'UND', stock: 11, price: 1487.08, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1765', name: 'LAPICERO GEL ECONOMICO', unit: 'UND', stock: 9, price: 2000.08, cat: 'Papelería y Útiles', minStock: 3 },
    { code: 'AL-PP1766', name: 'VINILO X KILO', unit: 'UND', stock: 30, price: 12648.43, cat: 'Papelería y Útiles', minStock: 4 },
    { code: 'AL-PP1767', name: 'SOBRE MEDIA CARTA MEMBRETEADO COLEGIO', unit: 'UND', stock: 100, price: 750.0, cat: 'Papelería y Útiles', minStock: 15 },
    { code: 'AL-SL4028', name: 'COPITOS', unit: 'PAQ', stock: 1, price: 2058.5, cat: 'Salud y Bienestar', minStock: 3 },
    { code: 'AL-SL4057', name: 'GUANTES MEDICOS', unit: 'CAJ', stock: 4, price: 19000.0, cat: 'Salud y Bienestar', minStock: 3 },
    { code: 'AL-SL4071', name: 'LACA FIJADORA', unit: 'UND', stock: 2, price: 12240.57, cat: 'Salud y Bienestar', minStock: 3 },
    { code: 'AL-SL4091', name: 'PAÑITOS HUMEDOS', unit: 'UND', stock: 5, price: 3600.0, cat: 'Salud y Bienestar', minStock: 3 },
    { code: 'AL-SL4172', name: 'PAÑITOS PAQ PEQUEÑO', unit: 'UND', stock: 7, price: 2600.0, cat: 'Salud y Bienestar', minStock: 3 },
  ] as const

  for (const item of itemsData) {
    const created = await prisma.item.upsert({
      where: { code: item.code },
      update: { stock: item.stock, price: item.price },
      create: {
        code: item.code, name: item.name, unit: item.unit,
        stock: item.stock, minStock: item.minStock, price: item.price,
        categoryId: categories[item.cat],
      },
    })
    itemMap[item.code] = created.id
  }
  console.log(`✅ ${itemsData.length} ítems de inventario creados`)

  // ─── REQUISICIONES DE EJEMPLO ───────────────────────────────
  const firstUser = await prisma.user.findFirst({ where: { role: Role.USER } })
  if (firstUser) {
    await prisma.requisition.createMany({
      data: [
        { userId: firstUser.id, type: RequisitionType.NORMAL, status: RequisitionStatus.PENDING, activity: 'Papeleria', section: firstUser.section ?? 'General', budget: 150000 },
        { userId: firstUser.id, type: RequisitionType.NORMAL, status: RequisitionStatus.APPROVED, activity: 'Estimulacion Temprana', section: firstUser.section ?? 'General', budget: 80000 },
        { userId: firstUser.id, type: RequisitionType.SPECIAL, status: RequisitionStatus.IN_PROGRESS, activity: 'Festival del Folclor', section: firstUser.section ?? 'General', budget: 500000 },
        { userId: firstUser.id, type: RequisitionType.NORMAL, status: RequisitionStatus.ISSUED, activity: 'STUCO', section: firstUser.section ?? 'General', budget: 200000 },
        { userId: firstUser.id, type: RequisitionType.NORMAL, status: RequisitionStatus.CANCELLED, activity: 'Papeleria', section: firstUser.section ?? 'General', budget: 30000 },
      ]
    })
    console.log('✅ 5 requisiciones de ejemplo creadas (PENDING, APPROVED, IN_PROGRESS, ISSUED, CANCELLED)')
  }

  console.log('')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎉 SEED COMPLETADO — Colegio Granadino')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🔐 ADMINISTRADOR:')
  console.log('   Email:     admin@colegiogranadino.edu.co')
  console.log('   Password:  Admin2026!')
  console.log('')
  console.log('👥 FUNCIONARIOS (102 usuarios):')
  console.log('   Email:     nombre.apellido@colegiogranadino.edu.co')
  console.log('   Password:  Granadino2026!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => { console.error('❌ Error en seed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
