create table nakama.account (
    id serial primary key,
    username text not null,
    password text not null,
    displayname text not null,
    email text not null,
    role text not null default 'author',
    enabled boolean not null default TRUE,
    createdat timestamp with time zone not null default now(),
    unique (username)
);

create table nakama.category (
    id serial primary key,
    name text not null,
    createdat timestamp with time zone not null default now(),
    unique (name)
);

create table nakama.message (
    id serial primary key,
    title text not null,
    body text not null,
    bodyhtml text,
    published boolean not null default FALSE,
    authorname text not null,
    authorid integer,
    prettyurl text not null,
    createdat timestamp with time zone not null default now(),
    updatedat timestamp with time zone,
    messagetype text not null default 'MESSAGE',
    categories jsonb,
    constraint fk_message_accountid foreign key (authorid) references account (id)
);

create index on nakama.message(createdat);

create table nakama.comment (
    id serial primary key,
    body text not null,
    approved boolean not null default TRUE,
    email text,
    authorname text not null,
    authorid integer,
    messageid integer,
    createdat timestamp with time zone not null default now(),
    constraint fk_comment_messageid foreign key (messageid) references message (id),
    constraint fk_message_accountid foreign key (authorid) references account (id)
);

create index on nakama.comment(messageid);

create table nakama.file (
    id serial primary key,
    name text not null,
    filepath text not null,
    contenttype text not null default 'application/octet-stream',
    ownerid integer not null,
    ownername text not null,
    ispublic boolean not null default TRUE,
    createdat timestamp with time zone not null default now(),
    constraint fk_file_accountid foreign key (ownerid) references account (id)
);


create table nakama.statistics (
    id serial primary key,
    tablename text not null,
    statistic text not null,
    value text not null,
    createdat timestamp with time zone not null default now(),
    updatedat timestamp with time zone,
    unique(tablename, statistic)
);

-- Basic stats
insert into nakama.statistics(tablename, statistic, value) values('file', 'total_count', '0');
insert into nakama.statistics(tablename, statistic, value) values('message', 'total_count', '0');
insert into nakama.statistics(tablename, statistic, value) values('comment', 'total_count', '0');

-- Procedure to calculate stats
create or replace function calculate_statistics_message() returns trigger as $$
begin
    update statistics set (value) = (select count(*) from message) where tablename = 'message' and statistic = 'total_count';
    return NEW;
end;
$$
LANGUAGE plpgsql
SET search_path = nakama;

create or replace function calculate_statistics_file() returns trigger as $$
begin
    update statistics set (value) = (select count(*) from file) where tablename = 'file' and statistic = 'total_count';
    return NEW;
end;
$$
LANGUAGE plpgsql
SET search_path = nakama;

create or replace function calculate_statistics_comment() returns trigger as $$
begin
    update statistics set (value) = (select count(*) from comment) where tablename = 'comment' and statistic = 'total_count';
    return NEW;
end;
$$
LANGUAGE plpgsql
SET search_path = nakama;

-- Triggers to calculate statistics automatically
create trigger trg_message_insert_stats after insert on nakama.message execute Procedure calculate_statistics_message();
create trigger trg_message_delete_stats after delete on nakama.message execute Procedure calculate_statistics_message();

create trigger trg_file_insert_stats after insert on nakama.file execute Procedure calculate_statistics_file();
create trigger trg_file_delete_stats after delete on nakama.file execute Procedure calculate_statistics_file();

create trigger trg_comment_insert_stats after insert on nakama.comment execute Procedure calculate_statistics_comment();
create trigger trg_comment_delete_stats after delete on nakama.comment execute Procedure calculate_statistics_comment();
