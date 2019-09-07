create database if not exists bamazon;
use bamazon;
create table products (
item_id int not null auto_increment,
product_name varchar (80) null,
department_name varchar (200) null,
price decimal (10,4) null,
stick_quantity int (100) null,
primary key (item_id)
);
 select * from products;



