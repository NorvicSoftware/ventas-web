<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Sistema de Ventas para Micromercado

## Tabla de Contenidos
- [Introducción](#introducción)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Características](#características)
- [Instalación](#instalación)
- [Creditos](#creditos)
- [Licencia](#licencia)

## Introducción
Este proyecto fue desarrollado en el curso de <a href="https://norvicsoftware.com/curso-de-laravel-react-nextjs/" target="_blank">Laravel, React y NextJS</a>. es un sistema de ventas diseñado para un micromercado. Utiliza Laravel para el backend, React para el frontend y Next.js para consumir una API. El sistema permite la gestión de productos, categorías, clientes, proveedores, ventas, pedidos, usuarios, roles y permisos.

Aplicacion DEMO disponible en: <a href="https://ventas-app.norvicsoftware.com/" target="_blank">SISTEMA DE VENTAS</a>

## Tecnologías

- **Backend**: Laravel
- **Frontend**: React
- **API**: Next.js
- **Base de Datos**: MySQL o SQLite

## Requisitos

- PHP >= 8.2
- Composer
- Node.js
- MySQL o SQLite

## Características

- **Gestión de Usuarios, Roles y Permisos**: Crear, leer, actualizar y eliminar usuarios. Asignar roles y permisos específicos para controlar el acceso a diferentes funcionalidades del sistema.
- **Gestión de Categorías**: Crear, leer, actualizar y eliminar categorías de productos para organizar el inventario de manera efectiva.
- **Gestión de Productos**: Crear, leer, actualizar y eliminar productos, incluyendo detalles como código de barras, precio de venta, cantidad, estado e imagen del producto.
- **Gestión de Clientes**: Registrar y gestionar clientes, incluyendo la información de contacto, enviar mensajes de correo electronico, etc.
- **Gestión de Proveedores**: Registrar y gestionar proveedores, incluyendo la información de contacto, enviar mensajes de correo electronico, etc.
- **Gestión de Ventas**: Realizar y gestionar ventas, generando recivo y actualizando el inventario en tiempo real.
- **Gestión de Compras**: Realizar y gestionar compras de productos a proveedores, actualizando el inventario y registrando las transacciones.
- **Gestión de Reportes**: Generar reportes detallados sobre ventas, compras, inventario y desempeño del negocio para facilitar la toma de decisiones informadas.

## Instalación

### Backend (Laravel)

1. Clona el repositorio:

    ```bash
    git clone https://github.com/NorvicSoftware/ventas-web.git
    cd ventas-web
    ```

2. Instala las dependencias de PHP:

    ```bash
    composer install
    ```

3. Crea un archivo `.env`:

    ```bash
    cp .env.example .env
    ```

4. Configura el archivo `.env` con tu base de datos y otras configuraciones necesarias.

5. Genera la clave de la aplicación:

    ```bash
    php artisan key:generate
    ```
6. Crear la base de datos SQLite:

    ```bash
    Crear el archivo database.sqlite en la carpara database
    ```    

7. Ejecuta las migraciones y seeders:

    ```bash
    php artisan migrate:fresh --seed
    ```

8. Inicia el servidor:

    ```bash
    php artisan serve
    ```

### Frontend (React y Next.js)


1. Instala las dependencias de Node.js:

    ```bash
    npm install
    ```

2. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

## Creditos

Este proyecto ha sido posible gracias a los siguientes estudiantes, quienes colaboraron en el desarrollo este sistema de ventas para micromercados:

- **Americo Álvarez**
- **Anuar Rodriguez Medina**
- **Cristian Barrios**
- **Enrrique Arrazola**
- **Eusebio Panozo**
- **Georgina Wendy Perez**
- **Gilmar Casano**
- **Jorge Armando Pico**
- **Juan Gabriel Llanos**
- **Juan Manuel Camacho**
- **Luis Beltran**
- **Luis Fernando Quispe**
- **Rodrigo Montaño**
- **Rolando Cuevas**
- **Vicente Flores**
- **Victor Seleme**
- **Willian Castro**
- **Zara Zurita**
- **Ronald Guerra**
- **Yuri Rene Acurio**
- **Richard Tejeda**
- **Edwind Juarez**
- **Yesmani Fernandez**
- **Jesús Guevara**
- **Grober Mendieta**
- **Carlos Manuel**


¡Gracias a todos por su valiosa contribución!

## License

Este proyecto está licenciado bajo la Licencia MIT.
