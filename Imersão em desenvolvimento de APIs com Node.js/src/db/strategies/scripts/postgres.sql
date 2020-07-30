drop TABLE IF not EXISTS tb_heroes

CREATE TABLE IF NOT EXISTS tb_heroes (
  id serial  primary key not null,
  nome text not null,
  poder text not null
)

insert into tb_heroes (nome , poder) values 	('flash', 'velocidade'),
	('aquaman', 'falar com os animais'),
	('batman', 'dinheiro')