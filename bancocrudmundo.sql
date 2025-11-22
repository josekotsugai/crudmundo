create database crud_mundo;
use crud_mundo;
#drop database crud_mundo;

create table continentes(
id_continentes int primary key auto_increment not null,
nm_continente varchar(100)
);

create table paises(
id_paises int primary key auto_increment not null,
nm_pais varchar(100),
lingua_falada varchar(100),
moeda VARCHAR(50),
id_continente int,
foreign key (id_continente) references continentes(id_continentes)
);

create table cidades(
id_cidades int primary key auto_increment not null,
nm_cidades varchar(100),
populacao INT,
id_pais int,
foreign key (id_pais) references paises(id_paises)
);

-- inserir continentes
insert into continentes (nm_continente) values 
('américa do sul'),
('europa'),
('ásia'),
('américa do norte'),
('áfrica');

-- inserir países
insert into paises (nm_pais, lingua_falada, moeda, id_continente) values 
('brasil', 'português', 'Real', 1),
('argentina', 'espanhol', 'Peso Argentino', 1),
('frança', 'francês', 'Euro', 2),
('espanha', 'espanhol', 'Euro', 2),
('japão', 'japonês', 'Iene', 3),
('china', 'mandarim', 'Yuan', 3),
('estados unidos', 'inglês', 'Dólar Americano', 4),
('canadá', 'inglês', 'Dólar Canadense', 4),
('egito', 'árabe', 'Libra Egípcia', 5),
('áfrica do sul', 'inglês', 'Rand', 5);

-- inserir cidades
insert into cidades (nm_cidades, populacao, id_pais) values 
-- cidades do brasil
('são paulo', 12300000, 1),
('rio de janeiro', 6748000, 1),
('brasília', 3055000, 1),
('salvador', 2887000, 1),
('fortaleza', 2669000, 1),

-- cidades da argentina
('buenos aires', 2890000, 2),
('cordoba', 1320000, 2),
('rosário', 1193000, 2),
('mendoza', 1150000, 2),
('la plata', 654000, 2),

-- cidades da frança
('paris', 2148000, 3),
('marselha', 861000, 3),
('lyon', 513000, 3),
('toulouse', 471000, 3),
('nice', 342000, 3),

-- cidades da espanha
('madri', 3223000, 4),
('barcelona', 1620000, 4),
('valência', 791000, 4),
('sevilla', 689000, 4),
('zaragoza', 666000, 4),

-- cidades do japão
('tóquio', 13960000, 5),
('osaka', 2691000, 5),
('kyoto', 1475000, 5),
('yokohama', 3758000, 5),
('nagoya', 2333000, 5);

select cont.nm_continente, pais.nm_pais, pais.lingua_falada, pais.moeda, cid.nm_cidades, cid.populacao
from cidades cid
inner join paises pais on cid.id_pais = pais.id_paises
inner join continentes cont on pais.id_continente = cont.id_continentes
order by cont.nm_continente, pais.nm_pais, cid.nm_cidades;