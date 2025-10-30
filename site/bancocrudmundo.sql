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
id_continente int,
foreign key (id_continente) references continentes(id_continentes)
);

create table cidades(
id_cidades int primary key auto_increment not null,
nm_cidades varchar(100),
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
insert into paises (nm_pais, lingua_falada, id_continente) values 
('brasil', 'português', 1),
('argentina', 'espanhol', 1),
('frança', 'francês', 2),
('espanha', 'espanhol', 2),
('japão', 'japonês', 3),
('china', 'mandarim', 3),
('estados unidos', 'inglês', 4),
('canadá', 'inglês', 4),
('egito', 'árabe', 5),
('áfrica do sul', 'inglês', 5);

-- inserir cidades
insert into cidades (nm_cidades, id_pais) values 
-- cidades do brasil
('são paulo', 1),
('rio de janeiro', 1),
('brasília', 1),
('salvador', 1),
('fortaleza', 1),

-- cidades da argentina
('buenos aires', 2),
('cordoba', 2),
('rosário', 2),
('mendoza', 2),
('la plata', 2),

-- cidades da frança
('paris', 3),
('marselha', 3),
('lyon', 3),
('toulouse', 3),
('nice', 3),

-- cidades da espanha
('madri', 4),
('barcelona', 4),
('valência', 4),
('sevilla', 4),
('zaragoza', 4),

-- cidades do japão
('tóquio', 5),
('osaka', 5),
('kyoto', 5),
('yokohama', 5),
('nagoya', 5);



select cont.nm_continente,pais.nm_pais,pais.lingua_falada,cid.nm_cidades
from cidades cid
inner join paises pais on cid.id_pais = pais.id_paises
inner join continentes cont on pais.id_continente = cont.id_continentes
order by cont.nm_continente, pais.nm_pais, cid.nm_cidades;