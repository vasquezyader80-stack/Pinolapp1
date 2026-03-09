-- Tabla de Restaurantes (Socios)
CREATE TABLE restaurantes (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    ubicacion TEXT,
    imagen_url TEXT,
    categoria TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Productos (El Menú)
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    restaurante_id INTEGER REFERENCES restaurantes(id),
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL, -- En Córdobas (C$)
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE
);

-- Tabla de Pedidos (Ventas Reales)
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id UUID,
    restaurante_id INTEGER REFERENCES restaurantes(id),
    repartidor_id UUID,
    total DECIMAL(10,2) NOT NULL,
    estado TEXT DEFAULT 'Pendiente', -- Pendiente, Preparando, En camino, Entregado
    fecha TIMESTAMPTZ DEFAULT NOW()
);
