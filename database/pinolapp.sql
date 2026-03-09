-- 1. Tabla de Usuarios (Clientes)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    password TEXT NOT NULL,
    ciudad VARCHAR(50), -- León, Chinandega, Managua
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Restaurantes (Socios)
CREATE TABLE IF NOT EXISTS restaurantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50), -- Restaurante, Farmacia, etc.
    imagen_url TEXT,
    tiempo_entrega VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'abierto',
    ubicacion TEXT
);

-- 3. Tabla de Menú (Precios en Córdobas)
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    restaurante_id INT REFERENCES restaurantes(id),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL, -- Ej: 300.00
    imagen_url TEXT
);

-- 4. Tabla de Pedidos (La que conecta todo)
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    restaurante_id INT REFERENCES restaurantes(id),
    repartidor_id INT, -- Se asigna cuando Joel M. acepta
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Recibido', -- Preparando, En camino, Entregado
    direccion_entrega TEXT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
