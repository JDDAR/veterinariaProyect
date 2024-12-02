/*Crear Base de Datos*/
create database proyect;
/*Uso de BD*/
use proyect;

/*Crear Tablas*/
/*Rol*/
create table Rol(
idRol int primary key auto_increment null,
nomRol varchar(20) not null,
areaRol varchar(20) not null,
estadoRol varchar(20) not null
);

/*Especialidades*/
create table Especilidades(
idEspe int primary key auto_increment null,
nomEspe varchar(20) not null,
descripEspe text not null,
estadoEspe varchar(20) not null
);

/*Usuario*/
create table Usuario(
idUsuario int primary key auto_increment null,
tipDocUsu varchar(20) not null,
numDocUsu int not null,
nomUsu varchar(20) not null,
apeUsu varchar (20) not null,
direcUsu varchar (20) not null,
teleUsu varchar(20) not null,
correUsu varchar(20) not null,
contraUsu varchar(20) not null,
estaUsu varchar (20) not null, 
idEspeFK int,
idRolFK int
); 

/*Mascota*/
create table Mascota(
idMascota int primary key auto_increment null,
nomMasc varchar(20) not null,
fechaNaMasc date,
estaMasc varchar (20) not null, 
idRazaFK int,
idUsuarioFK int
); 

/*Raza*/
create table Raza(
idRaza int primary key auto_increment null,
nomRaza varchar(20) not null,
especie varchar(20) not null
);

/*Historial Clinico*/
create table historialClinico(
idHistorialClinico int primary key auto_increment null,
especialidad varchar(20) not null,
fechaHC date not null,
descripHC text not null,
estaHC varchar(20) not null,
idAgendamientoFK int,
idMascotaFK int
); 

/*Agendamiento*/
create table Agendamiento(
idAgendamiento int primary key auto_increment null,
fecha date not null,
horaIni time not null,
horaFin time not null,
estaAgend varchar (20) not null,
idUsuarioFK int,
idServicioFK int
); 

/*Servicios*/
create table Servicio(
idServicio int primary key auto_increment null,
nomServi varchar (20) not null,
descripServi varchar (50) not null,
estaServi varchar (50) not null
); 

/*Relaciones*/
alter table Usuario add foreign key (idRolFK) references Rol(idRol);
alter table Usuario add foreign key (idEspeFK) references Especilidades(idEspe);
alter table Agendamiento add foreign key (idUsuarioFK) references Usuario(idUsuario);
alter table Agendamiento add foreign key (idServicioFK) references Servicio(idServicio);
alter table historialClinico add foreign key (idAgendamientoFK) references Agendamiento(idAgendamiento);
alter table historialClinico add foreign key (idMascotaFK) references Mascota(idMascota);
alter table Mascota add foreign key (idUsuarioFK) references Usuario(idUsuario);
alter table Mascota add foreign key (idRazaFK) references Raza(idRaza);

