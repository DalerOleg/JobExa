CREATE TABLE t (
    merchant_id	integer,
    client_id	integer,
	transaction_dttm	timestamp,
	transaction_amt	numeric
);

CREATE TABLE m (
    merchant_id	SERIAL PRIMARY KEY NOT NULL,
    latitude	numeric NOT NULL,
	longtitude	numeric NOT NULL,
	mcc_cd	integer NOT NULL
);

CREATE TABLE c (
    client_id	SERIAL PRIMARY KEY NOT NULL,
    gender	boolean NOT NULL,
	age	integer NOT NULL
);

INSERT INTO c (client_id, gender, age) 
	VALUES (generate_series(1, 100), (RANDOM()::INT::BOOLEAN), (floor(random()*(80-18+1))+10));

INSERT INTO m (merchant_id, latitude, longtitude, mcc_cd) 
	VALUES (generate_series(1, 100), floor(random()*(555456-553503+1))+553503, floor(random()*(375500-372005+1))+372005,(floor(random()*(9999-1000+1))+1000));

INSERT INTO t (merchant_id, client_id, transaction_dttm, transaction_amt) 
	VALUES (floor(random()*(100-1+1))+1, floor(random()*(100-1+1))+1, generate_series('2022-01-01', '2022-12-31', interval '1 day'),(floor(random()*(100000-200+1))+200));

alter table c add column age_group text;
update c set age_group='>=31' 
	where age >= 31;

update c set age_group='<=18' 
	where age <= 18;

update c set age_group='19-30' 
	where age <= 30 and age >=19;

create table itog as
	select t.client_id, 
		t.merchant_id,
 		c.age_group,
 		c.gender,
		m.latitude,
		m.longtitude,
		m.mcc_cd,
		t.transaction_dttm,
		sum(t.transaction_amt) as "Сумма транзакций",
		max(t.transaction_amt) as "Максимальная транзакция",
		min(t.transaction_amt) as "Минимальная транзакция",
		avg(t.transaction_amt) as "Среднее по транзакциям",
		count(t.transaction_amt) as "Кол-во транзакций"
	from t
		inner join m on t.merchant_id=m.merchant_id
		inner join c on t.client_id=c.client_id

		group by 
			t.client_id, 
			t.merchant_id, 
 			c.age_group,
			c.gender,
			m.latitude,
			m.longtitude,
			m.mcc_cd,
			t.transaction_dttm;
			
select * from itog;