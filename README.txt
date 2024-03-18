

Prueba Tecnica

requerimentos = Tener instalado Docker, Node, Postgresql

La api fue construida con express y ts, usando como ORM PrismaORM, base de datos POSTGRESQL. Opte por usar una arquitectura limpia, a primera impresion parece mucho para la prueba, pero para un proyecto real, mediano o grande, considero que es una arquietctura facil de seguir e implementar.

La web decidi desarrollarla con Next.js, ya que deja demostrar todos los conocimientos de React y aporta valor al tener menos dependecias y tener el codigo un poco mas simple y elegante gracias al pageRouter, decidi usa Redux toolkit para manejar el store por el mismo motivo, oden, mantenibilidad, legilibilidad y simpleza al poder escribir codigo mutante. Decidi usar MUI por sus componentes faciles de implementar y por ser una de las librerias de componentes mas utilizada para desarrolo en React. Para el manejor del formulario opte por "react-hook-form" por los mismos motivos, si bien el proyecto no lo requeria, use dicha libreria para demostrar conocimientos de la misma. No use context para administrar los estados y funciones relacionados a los libros ya que en un proyecto real, react recomienda usar context solo para estados que no van a cambiar mucho, por eso se suele usar para la autenticacion.

PD: voy a dejar el Link del repo, ya que me gustaria mejorar muchas cosas de la app, por ejemplo, no se requeria el add de la entidad, pero si el servicio esta creado, que mejor que la app lo consuma y ver su correccto funcionamiento, tambien me gustaria agregar algunos componentes para mejorar la UX/UI como alertas o barras de notificacion. El requerimento de la prueba esta terminado, pero si se clona el proyecto del repo, se podran ver las mejoras y el proyecto mucho mas pulido y profesional.

Desde ya muchas gracias.

Juan Ercole

Repo WEB: https://github.com/anujerco/Prueba-WEB

Repo API:  https://github.com/anujerco/Prueba-API

