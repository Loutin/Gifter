-- --Drops

DROP TABLE IF EXISTS public.deliveries;
DROP TABLE IF EXISTS public.order_details;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.favorite_products;
DROP TABLE IF EXISTS public.favorite_businesses;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.distributors;
DROP TABLE IF EXISTS public.clients;
DROP TABLE IF EXISTS public.businesses;
DROP TABLE IF EXISTS public.users;

-- --Tables

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuario_pkey PRIMARY KEY (id),
    CONSTRAINT "emailUK" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to gifter;

-- Table: public.businesses

CREATE TABLE IF NOT EXISTS public.businesses
(
    id integer NOT NULL,
    address character varying(200) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT businesses_pkey PRIMARY KEY (id),
    CONSTRAINT id_fk FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.businesses
    OWNER to gifter;

-- Table: public.clients

CREATE TABLE IF NOT EXISTS public.clients
(
    id integer NOT NULL,
    phone character varying(30) COLLATE pg_catalog."default" NOT NULL,
    description character varying(150) COLLATE pg_catalog."default",
    CONSTRAINT clients_pkey PRIMARY KEY (id),
    CONSTRAINT id_fk FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clients
    OWNER to gifter;

-- Table: public.distributors

CREATE TABLE IF NOT EXISTS public.distributors
(
    id integer NOT NULL,
    phone character varying(30) COLLATE pg_catalog."default" NOT NULL,
    availability character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT distributors_pkey PRIMARY KEY (id),
    CONSTRAINT id_fk FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.distributors
    OWNER to gifter;


-- Table: public.products

CREATE TABLE IF NOT EXISTS public.products
(
    id SERIAL NOT NULL,
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    type character varying(30) COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying(250) COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    id_business integer NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT id_fk_business FOREIGN KEY (id_business)
        REFERENCES public.businesses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to gifter;

-- Table: public.favorite_businesses

CREATE TABLE IF NOT EXISTS public.favorite_businesses
(
    id_business integer NOT NULL,
    id_client integer NOT NULL,
    CONSTRAINT favorite_businesses_pkey PRIMARY KEY (id_business, id_client),
    CONSTRAINT id_business_fk FOREIGN KEY (id_business)
        REFERENCES public.businesses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_client_fk FOREIGN KEY (id_client)
        REFERENCES public.clients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favorite_businesses
    OWNER to postgres;

-- Table: public.favorite_products

CREATE TABLE IF NOT EXISTS public.favorite_products
(
    id_product integer NOT NULL,
    id_client integer NOT NULL,
    CONSTRAINT favorite_product_pkey PRIMARY KEY (id_product, id_client),
    CONSTRAINT id_client FOREIGN KEY (id_client)
        REFERENCES public.clients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_product_fk FOREIGN KEY (id_product)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favorite_products
    OWNER to gifter;


-- Table: public.orders

CREATE TABLE IF NOT EXISTS public.orders
(
    id SERIAL NOT NULL,
    date date NOT NULL,
    state character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id_client integer NOT NULL,
    id_business integer NOT NULL,
    description character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY (id),
    CONSTRAINT id_business_fk FOREIGN KEY (id_business)
        REFERENCES public.businesses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_client_fk FOREIGN KEY (id_client)
        REFERENCES public.clients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders
    OWNER to gifter;


-- Table: public.order_details

CREATE TABLE IF NOT EXISTS public.order_details
(
    id_order integer NOT NULL,
    id_product integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT order_details_pkey PRIMARY KEY (id_order, id_product),
    CONSTRAINT id_order_fk FOREIGN KEY (id_order)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_product_fk FOREIGN KEY (id_product)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.order_details
    OWNER to postgres;



-- Table: public.deliveries

CREATE TABLE IF NOT EXISTS public.deliveries
(
    id SERIAL NOT NULL,
    date date,
    id_distributor integer NOT NULL,
    id_order integer NOT NULL,
    state character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT deliveries_pk PRIMARY KEY (id),
    CONSTRAINT id_distributor_fk FOREIGN KEY (id_distributor)
        REFERENCES public.distributors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_order_fk FOREIGN KEY (id_order)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.deliveries
    OWNER to gifter;

-- --Inserts

--Users

INSERT INTO public.users (name, email, password) VALUES ('Rodrigo', 'j6H5x@example.com', '$2a$10$65ye74PkMImEWmI4a17RdO857NobFm.8Z7lPm3o3LSgHR6tSxgc8i');
INSERT INTO public.users (name, email, password) VALUES ('Agustin', 'a@b.com', '$2a$10$i5PZL8d6qoWvvvQ4ZVNY9uxNYhpyP46A1ZD7noAsq8YYlJ/wP2bui');
INSERT INTO public.users (name, email, password) VALUES ('Regalos Carloco', 'f@g.com', '$2a$10$5lhiASBq4habQ0nQmL1jj.r/hyL5dOp6eM5Z2rgNcAzg2LwGVEXBW');
INSERT INTO public.users (name, email, password) VALUES ('Regalados', 'x@g.com', '$2a$10$5lhiASBq4habQ0nQmL1jj.r/hyL5dOp6eM5Z2rgNcAzg2LwGVEXBW');

--Clients
INSERT INTO public.clients (id, phone, description) VALUES (1, '123456789', 'una descripción');

--Distributors
INSERT INTO public.distributors (id, phone, availability) VALUES (2, '987654321', 'disponible');

--Businesses
INSERT INTO public.businesses (id, address, phone) VALUES (3, 'calle falsa 123', '123456789');
INSERT INTO public.businesses (id, address, phone) VALUES (4, 'calle no tan falsa 123', '321456987');

--Products
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Chocolate', 150, 'food', 'https://upload.wikimedia.org/wikipedia/commons/9/95/Cadbury-Bournville.jpg', 'Una barra de chocolate', 3);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Torta Chocolate Don Carlos 1.25 Kg', 669, 'food', 'https://assets.vtex.app/unsafe/1041x1041/center/middle/https%3A%2F%2Ftatauy.vtexassets.com%2Farquivos%2Fids%2F637612%2FTorta-Chocolate-Don-Carlos-1-25-Kg-1-47.jpg%3Fv%3D638303025924270000', 'Una torta de chocolate', 3);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Taza para cumpleaños Estás mayor', 555, 'misc', 'https://www.curiosite.es/img/auto_catalogo/w540/17952.jpg', 'Una taza para cumpleaños', 3);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Bota Caterpillar Colorado 2.0 Honey Reset Para Hombre', 3495, 'clothes', 'https://http2.mlstatic.com/D_NQ_NP_865437-MLU72124987675_102023-W.webp', 'Un par de botas para hombre', 3);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Campera Columbia Rapid Expedition Ful', 3490, 'clothes', 'https://http2.mlstatic.com/D_NQ_NP_920518-MLU54789421645_042023-W.webp', 'Una campera para hombre', 3);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Pantalon New Balance De Dama', 2650, 'clothes', 'https://http2.mlstatic.com/D_NQ_NP_913073-MLU72396429544_102023-W.webp', 'Un pantalon de dama', 3);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Championes Under Armour Charged Revitalize Para Hombre', 4990, 'clothes', 'https://http2.mlstatic.com/D_NQ_NP_665268-MLU71879528075_092023-W.webp', 'Championes para hombre', 3);

INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Par Alianzas 3mm En Oro 18k.', 9900, 'jewelry', 'https://http2.mlstatic.com/D_NQ_NP_863034-MLU32936753820_112019-O.webp', 'Par de alianzas', 4);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Cadena En Acero Quirúrgico Plateado', 779, 'jewelry', 'https://http2.mlstatic.com/D_NQ_NP_928309-MLU43662921745_102020-O.webp', 'Cadena de acero quirúrgico', 4);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Anillo En Acero Quirúrgico Anubis Egipcio Anillos Hombre', 1329, 'jewelry', 'https://http2.mlstatic.com/D_NQ_NP_972088-MLU47189569758_082021-O.webp', 'Anillo de acero quirúrgico', 4);

INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Box De 6 Rosas Rojas - (ramo De Flores)', 1190, 'flowers', 'https://http2.mlstatic.com/D_NQ_NP_804298-MLU72767782778_112023-O.webp', 'Box de rosas rojas', 4);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Cono 12 Rosas Blancas - (ramo De Flores)', 1820, 'flowers', 'https://http2.mlstatic.com/D_NQ_NP_669804-MLU73004825807_112023-O.webp', 'Cono de rosas blancas', 4);
INSERT INTO public.products (name, price, type, image, description, id_business) VALUES ('Ramo Flor Silvestre', 120, 'flowers', 'https://http2.mlstatic.com/D_NQ_NP_908425-MLU53972102608_022023-O.webp', 'Ramo flor silvestre', 4);


--favorite_businesses
INSERT INTO public.favorite_businesses (id_business, id_client) VALUES (3, 1);

--favorite_products
INSERT INTO public.favorite_products (id_product, id_client) VALUES (1, 1);

--orders
INSERT INTO public.orders (date, state, id_client, id_business, description) VALUES ('2022-01-01', 'started', 1, 3, 'una descripción');
INSERT INTO public.orders (date, state, id_client, id_business, description) VALUES ('2022-01-01', 'processed', 1, 3, 'una descripción');
INSERT INTO public.orders (date, state, id_client, id_business, description) VALUES ('2022-01-01', 'processed', 1, 3, 'dos descripción');
INSERT INTO public.orders (date, state, id_client, id_business, description) VALUES ('2022-01-01', 'processed', 1, 3, 'tres descripción');

--order_details
INSERT INTO public.order_details (id_order, id_product, quantity) VALUES (1, 1, 5);
INSERT INTO public.order_details (id_order, id_product, quantity) VALUES (2, 1, 9);
INSERT INTO public.order_details (id_order, id_product, quantity) VALUES (3, 1, 17);
INSERT INTO public.order_details (id_order, id_product, quantity) VALUES (4, 1, 19);

--deliveries
INSERT INTO public.deliveries (date, id_distributor, id_order, state) VALUES ('2022-01-01', 2, 1, 'pending');