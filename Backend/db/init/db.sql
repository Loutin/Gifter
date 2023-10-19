-- Role: gifter
DROP ROLE IF EXISTS gifter;

CREATE ROLE gifter WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:AVTNrP+uL1PCnchKiRQNVQ==$smZ0L25IOFffiDKun63mC6jpIVLMQpsBb+OoVcZl+L8=:60rK/VZ7MpPcCqjNeZMtIzaExRISwrCZ0swdvf35V7I=';

-- Database: gifter

DROP DATABASE IF EXISTS gifter;

CREATE DATABASE gifter
    WITH
    OWNER = gifter
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Uruguay.1252'
    LC_CTYPE = 'Spanish_Uruguay.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- SEQUENCE: public.usuario_id_seq

DROP SEQUENCE IF EXISTS public.usuario_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.usuario_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY users.id;

ALTER SEQUENCE public.usuario_id_seq
    OWNER TO gifter;

-- Table: public.users

DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
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

DROP TABLE IF EXISTS public.businesses;

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

DROP TABLE IF EXISTS public.clients;

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

DROP TABLE IF EXISTS public.distributors;

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

-- SEQUENCE: public.products_id_seq

DROP SEQUENCE IF EXISTS public.products_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.products_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY products.id;

ALTER SEQUENCE public.products_id_seq
    OWNER TO gifter;

-- Table: public.products

DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    name character varying(70) COLLATE pg_catalog."default" NOT NULL,
    type character varying(30) COLLATE pg_catalog."default" NOT NULL,
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

DROP TABLE IF EXISTS public.favorite_businesses;

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

DROP TABLE IF EXISTS public.favorite_products;

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

-- SEQUENCE: public.orders_id_seq

DROP SEQUENCE IF EXISTS public.orders_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.orders_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY orders.id;

ALTER SEQUENCE public.orders_id_seq
    OWNER TO gifter;

-- Table: public.orders

DROP TABLE IF EXISTS public.orders;

CREATE TABLE IF NOT EXISTS public.orders
(
    id integer NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    date date NOT NULL,
    state character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id_client integer NOT NULL,
    id_business integer NOT NULL,
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

DROP TABLE IF EXISTS public.order_details;

CREATE TABLE IF NOT EXISTS public.order_details
(
    id_order integer NOT NULL,
    id_product integer NOT NULL,
    count integer NOT NULL,
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

-- SEQUENCE: public.deliveries_id_seq

DROP SEQUENCE IF EXISTS public.deliveries_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.deliveries_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY deliveries.id;

ALTER SEQUENCE public.deliveries_id_seq
    OWNER TO gifter;

-- Table: public.deliveries

DROP TABLE IF EXISTS public.deliveries;

CREATE TABLE IF NOT EXISTS public.deliveries
(
    id integer NOT NULL DEFAULT nextval('deliveries_id_seq'::regclass),
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


